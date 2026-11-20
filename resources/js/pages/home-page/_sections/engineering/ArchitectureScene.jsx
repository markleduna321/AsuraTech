import { useEffect, useRef } from 'react';
import {
    AdditiveBlending,
    BoxGeometry,
    BufferGeometry,
    Clock,
    Color,
    CylinderGeometry,
    DoubleSide,
    DynamicDrawUsage,
    EdgesGeometry,
    Float32BufferAttribute,
    Group,
    IcosahedronGeometry,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
    WireframeGeometry,
} from 'three';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { easeInOutCubic } from '../platform/scrollHooks';

// Plum & Mist at rest: mauve-500 edges, plum-400 links, plum-500 fills + glow.
// Accent Phase C: the lit zone lerps to magenta (edges/links/nodes #FF2E7E, fill #D6136B, orb glow #FF2E7E);
// pulses alternate magenta-400 #FF5C9D / iris-400 #A78BFA via instance colors (base material stays white).
const EDGE = new Color('#93879C');
const ACCENT = new Color('#A27CC6');
const FILL = new Color('#8350AE');
const LIT = new Color('#FF2E7E');
const LIT_FILL = new Color('#D6136B');
const PULSE = new Color('#FFFFFF');
const PULSE_COLORS = [new Color('#FF5C9D'), new Color('#A78BFA')];
const FLOOR_Y = -1.4;
const TWEEN_S = 0.8;

// Camera presets per offer: position + look-at target.
const PRESETS = {
    erp: { pos: new Vector3(3.6, 2.3, 7.6), target: new Vector3(0, 0.05, 0) },
    apps: { pos: new Vector3(0.4, 3.9, 9.2), target: new Vector3(-0.55, 1.75, -0.2) },
    ai: { pos: new Vector3(6.4, 1.9, 7.0), target: new Vector3(1.7, 0.35, 0.4) },
    consult: { pos: new Vector3(7.2, 5.2, 14.2), target: new Vector3(0, 0.7, 0) },
};
const ZONES = ['erp', 'apps', 'ai', 'consult'];

const floorVertex = /* glsl */ `
    varying vec3 vWorld;
    void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
    }
`;

// Blueprint grid: fine + major lines, faded out with distance (acts as fog for the floor).
const floorFragment = /* glsl */ `
    uniform vec3 uColor;
    varying vec3 vWorld;
    float grid(vec2 p) {
        vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
        return 1.0 - min(min(g.x, g.y), 1.0);
    }
    void main() {
        float minor = grid(vWorld.xz / 0.5);
        float major = grid(vWorld.xz / 2.5);
        float d = length(vWorld.xz);
        float fade = exp(-d * d / 42.0);
        float a = (minor * 0.07 + major * 0.16) * fade;
        gl_FragColor = vec4(uColor, a);
    }
`;

// Camera-facing glow quad: the only "bloom" in the scene, on the AI orb.
const glowVertex = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        mv.xy += position.xy;
        gl_Position = projectionMatrix * mv;
    }
`;

const glowFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
        float r = length(vUv - 0.5) * 2.0;
        float a = (exp(-r * r * 9.0) * 0.85 + exp(-r * 3.2) * 0.22) * smoothstep(1.0, 0.55, r);
        gl_FragColor = vec4(uColor, a * uIntensity);
    }
`;

function segments(flat) {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(flat, 3));
    return g;
}

function polyline(points, out = []) {
    for (let i = 0; i < points.length - 1; i += 1) {
        out.push(...points[i], ...points[i + 1]);
    }
    return out;
}

function ring(cx, cy, cz, r, n, out = [], plane = 'xz') {
    for (let i = 0; i < n; i += 1) {
        const a0 = (i / n) * Math.PI * 2;
        const a1 = ((i + 1) / n) * Math.PI * 2;
        if (plane === 'xz') out.push(cx + Math.cos(a0) * r, cy, cz + Math.sin(a0) * r, cx + Math.cos(a1) * r, cy, cz + Math.sin(a1) * r);
        else out.push(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, cz, cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, cz);
    }
    return out;
}

// Quadratic arc between two points, sampled into a polyline.
function arc(a, b, lift, n = 28) {
    const c = new Vector3().addVectors(a, b).multiplyScalar(0.5);
    c.y += lift;
    const pts = [];
    for (let i = 0; i <= n; i += 1) {
        const t = i / n;
        const u = 1 - t;
        pts.push(new Vector3(u * u * a.x + 2 * u * t * c.x + t * t * b.x, u * u * a.y + 2 * u * t * c.y + t * t * b.y, u * u * a.z + 2 * u * t * c.z + t * t * b.z));
    }
    return pts;
}

function samplePath(pts, t, out) {
    const f = t * (pts.length - 1);
    const i = Math.min(Math.floor(f), pts.length - 2);
    return out.lerpVectors(pts[i], pts[i + 1], f - i);
}

function makeLabel(text, variant, anchor = [0.5, 0.5]) {
    const el = document.createElement('div');
    el.className = `arch-label${variant ? ` arch-label--${variant}` : ''}`;
    el.textContent = text;
    const obj = new CSS2DObject(el);
    obj.center.set(anchor[0], anchor[1]);
    return obj;
}

/**
 * Explorable "system architecture" for the custom engineering section.
 * One renderer, one scene, four zone groups (erp / apps / ai / consult) that are dimmed or lit as units.
 * Renders only while `running`; with `reduced`, it snaps to each preset and draws a single static frame.
 */
export default function ArchitectureScene({ focus, running, reduced, onReady, onError }) {
    const hostRef = useRef(null);
    const apiRef = useRef(null);
    const focusRef = useRef(focus);
    const runningRef = useRef(running);
    const reducedRef = useRef(reduced);

    focusRef.current = focus;
    runningRef.current = running;
    reducedRef.current = reduced;

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;

        let renderer;
        try {
            renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        } catch (error) {
            onError?.(error);
            return undefined;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
        host.appendChild(renderer.domElement);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.domElement.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
        host.appendChild(labelRenderer.domElement);

        const scene = new Scene();
        const camera = new PerspectiveCamera(32, 1, 0.1, 100);
        const disposables = [];
        const track = (...items) => {
            disposables.push(...items);
            return items[0];
        };

        // ---- Zones: one shared material set per zone so each dims as a unit ----
        const tune = {
            erp: { edge: 0.4, edgeGlow: 0.5, fill: 0.03, fillGlow: 0.06, link: 0.22, linkGlow: 0.45 },
            apps: { edge: 0.4, edgeGlow: 0.5, fill: 0.03, fillGlow: 0.05, link: 0.22, linkGlow: 0.5 },
            ai: { edge: 0.4, edgeGlow: 0.5, fill: 0.05, fillGlow: 0.1, link: 0.2, linkGlow: 0.5 },
            consult: { edge: 0.06, edgeGlow: 0.3, fill: 0, fillGlow: 0, link: 0.12, linkGlow: 0.35 },
        };
        const zones = {};
        ZONES.forEach((key) => {
            const group = new Group();
            scene.add(group);
            zones[key] = {
                group,
                tune: tune[key],
                edgeMat: track(new LineBasicMaterial({ color: EDGE.clone(), transparent: true, depthWrite: false })),
                fillMat: track(new MeshBasicMaterial({ color: FILL, transparent: true, depthWrite: false, side: DoubleSide })),
                linkMat: track(new LineBasicMaterial({ color: ACCENT, transparent: true, depthWrite: false })),
                labels: [],
                vis: 1,
                glow: 0,
            };
        });

        const addEdges = (zone, geometry, parent = zone.group) => {
            const lines = new LineSegments(track(new EdgesGeometry(geometry, 15)), zone.edgeMat);
            lines.renderOrder = 2;
            parent.add(lines);
            return lines;
        };
        const addFill = (zone, geometry, parent = zone.group) => {
            const mesh = new Mesh(geometry, zone.fillMat);
            mesh.renderOrder = 1;
            parent.add(mesh);
            return mesh;
        };
        const addLines = (zone, flat, mat = zone.edgeMat, parent = zone.group) => {
            const lines = new LineSegments(track(segments(flat)), mat);
            lines.renderOrder = 2;
            parent.add(lines);
            return lines;
        };
        const addLabel = (zone, text, position, opts = {}) => {
            const obj = makeLabel(text, opts.variant, opts.anchor);
            obj.position.copy(position);
            (opts.parent || zone.group).add(obj);
            zone.labels.push({ obj, glowOnly: !!opts.glowOnly, explode: !!opts.explode, lit: null });
            return obj;
        };

        // ---- Floor: blueprint grid ----
        const floorGeometry = track(new PlaneGeometry(40, 40));
        const floorMaterial = track(
            new ShaderMaterial({
                vertexShader: floorVertex,
                fragmentShader: floorFragment,
                uniforms: { uColor: { value: EDGE } },
                transparent: true,
                depthWrite: false,
            }),
        );
        const floor = new Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = FLOOR_Y;
        floor.renderOrder = 0;
        scene.add(floor);

        // ---- ERP core: module slabs on a database cylinder ----
        const erp = zones.erp;
        const dbGeometry = track(new CylinderGeometry(1, 1, 0.5, 48, 1));
        const db = addFill(erp, dbGeometry);
        db.position.y = -1.1;
        addLines(erp, ring(0, -0.85, 0, 1, 64, ring(0, -1.1, 0, 1, 64, ring(0, -1.35, 0, 1, 64))));
        addLabel(erp, 'Database', new Vector3(1.12, -1.1, 0.45), { anchor: [0, 0.5] });

        const slabGeometry = track(new BoxGeometry(2.4, 0.16, 1.7));
        const SLAB_Y = [-0.55, -0.2, 0.15, 0.5];
        const MODULES = ['Finance', 'HR', 'Inventory', 'Sales'];
        const slabs = SLAB_Y.map((y, i) => {
            const g = new Group();
            g.position.y = y;
            addFill(erp, slabGeometry, g);
            addEdges(erp, slabGeometry, g);
            addLabel(erp, MODULES[i], new Vector3(1.28, 0, 0.85), { parent: g, anchor: [0, 0.5], explode: true });
            erp.group.add(g);
            return g;
        });
        const SPINE_TOP = new Vector3(0, 1.45, 0);
        const spinePath = [new Vector3(0, -0.85, 0), SPINE_TOP.clone()];
        addLines(erp, polyline(spinePath.map((v) => v.toArray())), erp.linkMat);
        addLabel(erp, 'ERP / CRM core', new Vector3(-1.3, 0.62, 0.85), { anchor: [1, 0.5] });

        // ---- Apps: browser + phone panels above the core ----
        const apps = zones.apps;
        const browser = new Group();
        browser.position.set(-2.5, 2.35, -0.3);
        browser.rotation.y = 0.28;
        const browserPlane = track(new PlaneGeometry(1.9, 1.2));
        addFill(apps, browserPlane, browser);
        addEdges(apps, browserPlane, browser);
        const bFlat = [-0.95, 0.42, 0, 0.95, 0.42, 0, -0.5, 0.51, 0, 0.62, 0.51, 0, -0.45, 0.42, 0, -0.45, -0.6, 0];
        [-0.86, -0.78, -0.7].forEach((x) => ring(x, 0.51, 0, 0.022, 8, bFlat, 'xy'));
        bFlat.push(-0.85, 0.28, 0, -0.55, 0.28, 0, -0.85, 0.16, 0, -0.6, 0.16, 0, -0.85, 0.04, 0, -0.58, 0.04, 0);
        bFlat.push(-0.33, 0.27, 0, 0.45, 0.27, 0, -0.33, 0.15, 0, 0.15, 0.15, 0);
        polyline([[-0.33, -0.48, 0], [-0.08, -0.3, 0], [0.14, -0.36, 0], [0.38, -0.12, 0], [0.6, -0.2, 0], [0.84, 0.02, 0]], bFlat);
        bFlat.push(-0.33, -0.52, 0, 0.86, -0.52, 0);
        addLines(apps, bFlat, apps.edgeMat, browser);
        apps.group.add(browser);
        addLabel(apps, 'Web app', new Vector3(-2.5, 3.08, -0.3), { anchor: [0.5, 1] });

        const phone = new Group();
        phone.position.set(1.35, 2.55, -0.5);
        phone.rotation.y = -0.22;
        const phonePlane = track(new PlaneGeometry(0.62, 1.15));
        addFill(apps, phonePlane, phone);
        addEdges(apps, phonePlane, phone);
        const pFlat = [-0.08, 0.5, 0, 0.08, 0.5, 0, -0.22, 0.32, 0, 0.12, 0.32, 0, -0.22, 0.22, 0, 0.2, 0.22, 0];
        pFlat.push(-0.22, 0.04, 0, 0.22, 0.04, 0, 0.22, 0.04, 0, 0.22, -0.2, 0, 0.22, -0.2, 0, -0.22, -0.2, 0, -0.22, -0.2, 0, -0.22, 0.04, 0);
        pFlat.push(-0.22, -0.32, 0, 0.16, -0.32, 0, -0.1, -0.5, 0, 0.1, -0.5, 0);
        addLines(apps, pFlat, apps.edgeMat, phone);
        apps.group.add(phone);
        addLabel(apps, 'Mobile', new Vector3(1.35, 3.22, -0.5), { anchor: [0.5, 1] });

        const browserFoot = new Vector3(-2.5, 1.75, -0.3);
        const phoneFoot = new Vector3(1.35, 1.97, -0.5);
        const appPaths = [arc(browserFoot, SPINE_TOP, 0.25), arc(phoneFoot, SPINE_TOP, 0.12)];
        addLines(apps, appPaths.flatMap((p) => polyline(p.map((v) => v.toArray()))), apps.linkMat);

        // ---- AI layer: orb + node cluster, linked into the database and apps ----
        const ai = zones.ai;
        const ORB = new Vector3(2.9, 0.15, 1.1);
        const orb = new Group();
        orb.position.copy(ORB);
        const orbWire = new LineSegments(track(new WireframeGeometry(track(new IcosahedronGeometry(0.34, 1)))), ai.edgeMat);
        orbWire.renderOrder = 2;
        orb.add(orbWire);
        addFill(ai, track(new IcosahedronGeometry(0.17, 2)), orb);

        const glowMaterial = track(
            new ShaderMaterial({
                vertexShader: glowVertex,
                fragmentShader: glowFragment,
                uniforms: { uColor: { value: FILL.clone() }, uIntensity: { value: 0.5 } },
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: AdditiveBlending,
            }),
        );
        const glow = new Mesh(track(new PlaneGeometry(2.6, 2.6)), glowMaterial);
        glow.renderOrder = 4;
        orb.add(glow);

        const cluster = new Group();
        const NODES = [
            [0.78, 0.42, 0.1],
            [0.62, -0.5, 0.35],
            [-0.15, 0.8, 0.25],
            [0.1, -0.72, -0.4],
            [-0.7, 0.3, -0.35],
            [0.35, 0.2, 0.75],
            [-0.45, -0.45, 0.5],
        ].map((p) => new Vector3(...p));
        const nodeMaterial = track(new MeshBasicMaterial({ color: ACCENT, transparent: true, depthWrite: false }));
        const nodes = new InstancedMesh(track(new IcosahedronGeometry(0.05, 1)), nodeMaterial, NODES.length);
        const m = new Matrix4();
        NODES.forEach((p, i) => nodes.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
        nodes.renderOrder = 3;
        cluster.add(nodes);
        const nFlat = [];
        NODES.forEach((p) => nFlat.push(0, 0, 0, p.x, p.y, p.z));
        [
            [0, 2],
            [0, 5],
            [1, 3],
            [1, 6],
            [2, 4],
            [3, 6],
            [4, 6],
        ].forEach(([a, b]) => nFlat.push(...NODES[a].toArray(), ...NODES[b].toArray()));
        addLines(ai, nFlat, ai.linkMat, cluster);
        addLabel(ai, 'OpenAI', NODES[0], { parent: cluster, variant: 'chip', anchor: [-0.15, 0.5], glowOnly: true });
        addLabel(ai, 'Claude', NODES[1], { parent: cluster, variant: 'chip', anchor: [-0.15, 0.5], glowOnly: true });
        addLabel(ai, 'LLM', NODES[2], { parent: cluster, variant: 'chip', anchor: [0.5, 1.3], glowOnly: true });
        orb.add(cluster);
        ai.group.add(orb);
        addLabel(ai, 'AI layer · API', new Vector3(ORB.x, ORB.y - 0.95, ORB.z), { anchor: [0.5, 0] });

        const aiPaths = [
            arc(ORB, new Vector3(0.96, -1.1, 0.3), -0.35),
            arc(ORB, phoneFoot, 0.35),
            arc(ORB, browserFoot, 1.5, 40),
        ];
        addLines(ai, aiPaths.flatMap((p) => polyline(p.map((v) => v.toArray()))), ai.linkMat);

        // ---- Consultancy: security shell around the whole system ----
        const consult = zones.consult;
        const shell = new LineSegments(track(new WireframeGeometry(track(new IcosahedronGeometry(1, 1)))), consult.edgeMat);
        shell.scale.set(4.9, 3.3, 3.5);
        shell.position.set(0, 0.85, 0.2);
        shell.renderOrder = 2;
        consult.group.add(shell);
        const footprint = [];
        ring(0, FLOOR_Y + 0.001, 0.2, 1, 96, footprint);
        const foot = addLines(consult, footprint, consult.linkMat);
        foot.scale.set(4.6, 1, 3.25);
        addLabel(consult, 'Security shell · architecture', new Vector3(0, 4.3, 0.2), { anchor: [0.5, 1], glowOnly: true });

        // ---- Pulses: instanced dots travelling along every connection ----
        const pulses = [
            { path: spinePath, zone: 'erp', speed: 0.32, offset: 0 },
            { path: spinePath, zone: 'erp', speed: 0.32, offset: 0.5 },
            { path: appPaths[0], zone: 'apps', speed: 0.4, offset: 0 },
            { path: appPaths[0], zone: 'apps', speed: 0.4, offset: 0.5 },
            { path: [...appPaths[1]].reverse(), zone: 'apps', speed: 0.45, offset: 0.25 },
            { path: [...appPaths[1]].reverse(), zone: 'apps', speed: 0.45, offset: 0.75 },
            { path: aiPaths[0], zone: 'ai', speed: 0.38, offset: 0.1 },
            { path: [...aiPaths[0]].reverse(), zone: 'ai', speed: 0.38, offset: 0.6 },
            { path: aiPaths[1], zone: 'ai', speed: 0.42, offset: 0.35 },
            { path: aiPaths[2], zone: 'ai', speed: 0.3, offset: 0.8 },
        ];
        const pulseMaterial = track(new MeshBasicMaterial({ color: PULSE, transparent: true, opacity: 0.95, depthWrite: false, blending: AdditiveBlending }));
        const pulseMesh = new InstancedMesh(track(new IcosahedronGeometry(1, 1)), pulseMaterial, pulses.length);
        pulseMesh.instanceMatrix.setUsage(DynamicDrawUsage);
        pulseMesh.frustumCulled = false;
        pulseMesh.renderOrder = 3;
        // Set before the first render so the instance-color shader variant is compiled up front.
        pulses.forEach((_, i) => pulseMesh.setColorAt(i, PULSE_COLORS[i % PULSE_COLORS.length]));
        scene.add(pulseMesh);

        // ---- State ----
        const camPos = PRESETS[focusRef.current].pos.clone();
        const camTarget = PRESETS[focusRef.current].target.clone();
        const fromPos = camPos.clone();
        const fromTarget = camTarget.clone();
        let tween = 1;
        let currentFocus = focusRef.current;
        let explode = currentFocus === 'erp' ? 1 : 0;
        const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
        const tmp = new Vector3();
        const offset = new Vector3();
        let distanceScale = 1;
        let elapsed = 0;

        const zoneTargets = (key) => {
            const out = {};
            ZONES.forEach((z) => {
                if (key === 'consult') out[z] = { vis: z === 'consult' ? 1 : 0.75, glow: z === 'consult' ? 1 : 0.12 };
                else if (z === 'consult') out[z] = { vis: 0.8, glow: 0 };
                else out[z] = { vis: z === key ? 1 : 0.25, glow: z === key ? 1 : 0 };
            });
            return out;
        };

        const snapZones = () => {
            const t = zoneTargets(currentFocus);
            ZONES.forEach((z) => {
                zones[z].vis = t[z].vis;
                zones[z].glow = t[z].glow;
            });
            explode = currentFocus === 'erp' ? 1 : 0;
        };
        snapZones();

        const applyZones = () => {
            ZONES.forEach((key) => {
                const z = zones[key];
                const k = z.tune;
                z.edgeMat.opacity = z.vis * (k.edge + k.edgeGlow * z.glow);
                z.edgeMat.color.copy(EDGE).lerp(LIT, z.glow);
                z.fillMat.opacity = z.vis * (k.fill + k.fillGlow * z.glow);
                z.fillMat.color.copy(FILL).lerp(LIT_FILL, z.glow);
                z.linkMat.opacity = z.vis * (k.link + k.linkGlow * z.glow);
                z.linkMat.color.copy(ACCENT).lerp(LIT, z.glow);
                const lit = z.glow > 0.5;
                z.labels.forEach((l) => {
                    const o = z.vis * (l.glowOnly ? z.glow : 0.55 + 0.45 * z.glow) * (l.explode ? explode : 1);
                    l.obj.visible = o > 0.02;
                    l.obj.element.style.opacity = o.toFixed(3);
                    if (l.lit !== lit) {
                        l.lit = lit;
                        l.obj.element.dataset.lit = lit ? 'true' : 'false';
                    }
                });
            });
            nodeMaterial.opacity = zones.ai.vis * (0.45 + 0.55 * zones.ai.glow);
            nodeMaterial.color.copy(ACCENT).lerp(LIT, zones.ai.glow);
            glowMaterial.uniforms.uColor.value.copy(FILL).lerp(LIT, zones.ai.glow);
            glowMaterial.uniforms.uIntensity.value = zones.ai.vis * (0.3 + 0.7 * zones.ai.glow) * (reducedRef.current ? 1 : 0.92 + 0.08 * Math.sin(elapsed * 1.4));
            slabs.forEach((g, i) => {
                g.position.y = SLAB_Y[i] + explode * (0.1 + i * 0.24);
            });
        };

        const applyPulses = () => {
            const still = reducedRef.current;
            pulseMesh.visible = !still;
            if (still) return;
            const ambient = zones.consult.glow * 0.5;
            pulses.forEach((p, i) => {
                const z = zones[p.zone];
                const amp = Math.max(z.vis * z.glow, ambient);
                const t = (elapsed * p.speed + p.offset) % 1;
                samplePath(p.path, t, tmp);
                const s = 0.045 * amp * Math.sqrt(Math.sin(Math.PI * t));
                m.makeScale(s, s, s).setPosition(tmp);
                pulseMesh.setMatrixAt(i, m);
            });
            pulseMesh.instanceMatrix.needsUpdate = true;
        };

        const placeCamera = () => {
            offset.subVectors(camPos, camTarget).multiplyScalar(distanceScale);
            if (!reducedRef.current) {
                offset.applyAxisAngle(camera.up, Math.sin(elapsed * 0.13) * 0.08);
                offset.x += pointer.sx * 0.4;
                offset.y += -pointer.sy * 0.25;
            }
            camera.position.copy(camTarget).add(offset);
            camera.lookAt(camTarget);
        };

        const draw = () => {
            applyZones();
            applyPulses();
            placeCamera();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        };

        const setFocus = (key) => {
            if (!PRESETS[key] || key === currentFocus) return;
            currentFocus = key;
            if (reducedRef.current) {
                camPos.copy(PRESETS[key].pos);
                camTarget.copy(PRESETS[key].target);
                tween = 1;
                snapZones();
                draw();
                return;
            }
            fromPos.copy(camPos);
            fromTarget.copy(camTarget);
            tween = 0;
        };

        const resize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            labelRenderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            // Narrow frames pull the camera back so the presets still fit horizontally.
            distanceScale = Math.max(1, 1.12 / camera.aspect);
            if (!frame) draw();
        };

        const clock = new Clock(false);
        let frame = 0;
        let lost = false;

        const tick = () => {
            frame = window.requestAnimationFrame(tick);
            const dt = Math.min(clock.getDelta(), 0.1);
            elapsed += dt;

            if (tween < 1) {
                tween = Math.min(1, tween + dt / TWEEN_S);
                const e = easeInOutCubic(tween);
                camPos.lerpVectors(fromPos, PRESETS[currentFocus].pos, e);
                camTarget.lerpVectors(fromTarget, PRESETS[currentFocus].target, e);
            }

            const k = 1 - Math.exp(-dt * 5.5);
            const targets = zoneTargets(currentFocus);
            ZONES.forEach((z) => {
                zones[z].vis += (targets[z].vis - zones[z].vis) * k;
                zones[z].glow += (targets[z].glow - zones[z].glow) * k;
            });
            explode += ((currentFocus === 'erp' ? 1 : 0) - explode) * k;
            cluster.rotation.y += dt * 0.12;

            const pk = 1 - Math.exp(-dt * 3);
            pointer.sx += (pointer.x - pointer.sx) * pk;
            pointer.sy += (pointer.y - pointer.sy) * pk;

            draw();
        };

        const onPointerMove = (e) => {
            const r = host.getBoundingClientRect();
            if (!r.width || !r.height) return;
            pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
            pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
        };

        const sync = () => {
            const shouldRun = runningRef.current && !reducedRef.current && !document.hidden && !lost;
            if (shouldRun && !frame) {
                clock.start();
                window.addEventListener('pointermove', onPointerMove, { passive: true });
                tick();
            } else if (!shouldRun && frame) {
                window.cancelAnimationFrame(frame);
                frame = 0;
                clock.stop();
                window.removeEventListener('pointermove', onPointerMove);
            }
            if (reducedRef.current && !lost) {
                pointer.sx = 0;
                pointer.sy = 0;
                camPos.copy(PRESETS[currentFocus].pos);
                camTarget.copy(PRESETS[currentFocus].target);
                tween = 1;
                snapZones();
                draw();
            }
        };

        const onContextLost = (e) => {
            e.preventDefault();
            lost = true;
            sync();
            onError?.(new Error('WebGL context lost'));
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);
        renderer.domElement.addEventListener('webglcontextlost', onContextLost);
        document.addEventListener('visibilitychange', sync);
        apiRef.current = { sync, setFocus };
        draw();
        sync();
        onReady?.();

        return () => {
            apiRef.current = null;
            window.cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', onPointerMove);
            ro.disconnect();
            document.removeEventListener('visibilitychange', sync);
            renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
            disposables.forEach((d) => d.dispose());
            nodes.dispose();
            pulseMesh.dispose();
            renderer.dispose();
            if (!lost) renderer.forceContextLoss();
            renderer.domElement.remove();
            labelRenderer.domElement.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        apiRef.current?.setFocus(focus);
    }, [focus]);

    useEffect(() => {
        apiRef.current?.sync();
    }, [running, reduced]);

    return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
