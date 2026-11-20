import React, { useEffect, useRef } from 'react';
import {
    AdditiveBlending,
    AmbientLight,
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    Color,
    DirectionalLight,
    DynamicDrawUsage,
    EdgesGeometry,
    Fog,
    GridHelper,
    Group,
    IcosahedronGeometry,
    InstancedMesh,
    LineBasicMaterial,
    LineLoop,
    LineSegments,
    MathUtils,
    Matrix4,
    Mesh,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    PerspectiveCamera,
    PointLight,
    Points,
    PointsMaterial,
    Quaternion,
    Scene,
    Sprite,
    SpriteMaterial,
    Vector3,
    WebGLRenderer,
} from 'three';

const BG = '#000000';
// Network: mauve lines + plum-600 blocks on the black field. Core: hot pink-white glow with a magenta halo.
// Pulses alternate magenta / iris; active links + edges tint toward magenta.
const ACCENT = new Color('#93879C');
const CORE = new Color('#FFD1E3');
const HALO = new Color('#FF2E7E');
const PULSE = new Color('#FF5C9D');
const PULSE_ALT = new Color('#A78BFA');
const LINK_HOT = new Color('#FF5C9D');
const BLOCK_BASE = new Color('#6A3497');
const BLOCK_HOT = new Color('#93879C');
const EDGE_LOOSE = new Color('#401364');

export const CLUSTERS = [
    { key: 'saas', label: 'SaaS Platforms', angle: 150 },
    { key: 'engineering', label: 'Custom Engineering', angle: 30 },
    { key: 'ai', label: 'AI Automation', angle: 270 },
];

const ASSEMBLE_AT = 1.5;
const SNAP_DURATION = 0.9;
const CLUSTER_RADIUS = 2.75;
const BLOCK_SIZE = 0.34;
const SPACING = 0.5;

const easeOutBack = (x) => {
    const c1 = 1.35;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function makeGlowTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new CanvasTexture(canvas);
}

function buildLayout(lite) {
    // Local lattice offsets (x, y, depth) for each cluster; index 0 is the cluster hub.
    const pattern = lite
        ? [[0, 0, 0], [1, 0, 0.12], [-1, 0, 0.12], [0, 1, -0.12], [0, -1, -0.12]]
        : [
              [0, 0, 0],
              [1, 0, 0.14], [-1, 0, 0.14], [0, 1, 0.14], [0, -1, 0.14],
              [1, 1, -0.16], [-1, 1, -0.16], [1, -1, -0.16], [-1, -1, -0.16],
          ];

    const blocks = [];
    const hubs = [];
    CLUSTERS.forEach((cluster, c) => {
        const a = MathUtils.degToRad(cluster.angle);
        const center = new Vector3(Math.cos(a) * CLUSTER_RADIUS, Math.sin(a) * CLUSTER_RADIUS * 0.92, 0);
        const orient = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), a);
        hubs.push(blocks.length);

        pattern.forEach(([px, py, pz], i) => {
            const target = new Vector3(px * SPACING, py * SPACING, pz).applyQuaternion(orient).add(center);
            blocks.push({
                cluster: c,
                isHub: i === 0,
                target,
                targetQuat: orient.clone(),
                start: new Vector3(
                    MathUtils.randFloatSpread(9),
                    MathUtils.randFloatSpread(6),
                    MathUtils.randFloat(-3, 1.5),
                ),
                phase: Math.random() * Math.PI * 2,
                amp: MathUtils.randFloat(0.25, 0.6),
                axis: new Vector3().randomDirection(),
                spin: MathUtils.randFloat(0.25, 0.7) * (Math.random() < 0.5 ? -1 : 1),
                delay: c * 0.12 + i * 0.035 + Math.random() * 0.12,
                k: 0,
            });
        });
    });

    // Connections: core → hub, hub → every block in its cluster, plus a hub ring (the backbone).
    const links = [];
    hubs.forEach((h, c) => {
        links.push({ a: -1, b: h, cluster: c });
        blocks.forEach((b, i) => {
            if (b.cluster === c && !b.isHub) links.push({ a: h, b: i, cluster: c });
        });
    });
    hubs.forEach((h, c) => links.push({ a: h, b: hubs[(c + 1) % hubs.length], cluster: -1 }));

    return { blocks, hubs, links };
}

/**
 * Decorative "connected backbone" Three.js scene. All meaningful copy lives in the HTML hero.
 */
export default function ConnectedBackboneScene({ highlight = false, lite = false, showLabels = true, onReady, onError }) {
    const containerRef = useRef(null);
    const labelRefs = useRef([]);
    const highlightRef = useRef(highlight);
    const wakeRef = useRef(null);
    const callbacksRef = useRef({ onReady, onError });
    callbacksRef.current = { onReady, onError };

    useEffect(() => {
        highlightRef.current = highlight;
        wakeRef.current?.();
    }, [highlight]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let renderer;
        try {
            renderer = new WebGLRenderer({ antialias: !lite, alpha: true, powerPreference: 'high-performance' });
        } catch (err) {
            callbacksRef.current.onError?.(err);
            return undefined;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75));
        renderer.setClearColor(0x000000, 0);
        const canvas = renderer.domElement;
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.prepend(canvas);

        const disposables = [];
        const track = (obj) => {
            disposables.push(obj);
            return obj;
        };

        const scene = new Scene();
        scene.fog = new Fog(BG, 11, 24);
        const camera = new PerspectiveCamera(38, 1, 0.1, 100);
        const root = new Group();
        scene.add(root);

        scene.add(new AmbientLight('#C9C1CF', 0.7));
        const key = new DirectionalLight('#ffffff', 1.4);
        key.position.set(4, 6, 8);
        scene.add(key);
        const coreLight = new PointLight(HALO, 14, 9, 2);
        root.add(coreLight);

        // Faint engineering grid
        const grid = new GridHelper(26, 26, ACCENT, ACCENT);
        grid.material.transparent = true;
        grid.material.opacity = 0.07;
        grid.material.depthWrite = false;
        grid.position.y = -3.4;
        track(grid.geometry);
        track(grid.material);
        scene.add(grid);

        // Core: dark faceted body, emissive edge lines, orbit rings and a soft glow sprite (light "bloom").
        const coreGeo = track(new IcosahedronGeometry(0.62, lite ? 0 : 1));
        const coreMat = track(new MeshStandardMaterial({
            color: '#2B024A',
            emissive: CORE,
            emissiveIntensity: 0.28,
            roughness: 0.35,
            metalness: 0.3,
            flatShading: true,
        }));
        const core = new Mesh(coreGeo, coreMat);
        root.add(core);

        const coreEdgeGeo = track(new EdgesGeometry(coreGeo));
        const coreEdgeMat = track(new LineBasicMaterial({ color: '#FFD1E3', transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));
        core.add(new LineSegments(coreEdgeGeo, coreEdgeMat));

        const ringPts = [];
        for (let i = 0; i < 96; i += 1) {
            const t = (i / 96) * Math.PI * 2;
            ringPts.push(Math.cos(t), Math.sin(t), 0);
        }
        const ringGeo = track(new BufferGeometry());
        ringGeo.setAttribute('position', new BufferAttribute(new Float32Array(ringPts), 3));
        const ringMat = track(new LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35, depthWrite: false }));
        const rings = [1.05, 1.35].map((r, i) => {
            const ring = new LineLoop(ringGeo, ringMat);
            ring.scale.setScalar(r);
            ring.rotation.set(Math.PI / 2.4 + i * 0.5, i * 0.6, 0);
            root.add(ring);
            return ring;
        });

        const glowTex = track(makeGlowTexture());
        const glowMat = track(new SpriteMaterial({ map: glowTex, color: HALO, transparent: true, opacity: 0.85, blending: AdditiveBlending, depthWrite: false }));
        const glow = new Sprite(glowMat);
        glow.scale.setScalar(3.4);
        root.add(glow);

        // Blocks — single InstancedMesh, frosted translucent panels.
        const { blocks, hubs, links } = buildLayout(lite);
        const count = blocks.length;
        const blockGeo = track(new BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE * 0.55));
        const blockMat = track(new MeshPhysicalMaterial({
            color: '#ffffff',
            roughness: 0.55,
            metalness: 0,
            clearcoat: 0.6,
            clearcoatRoughness: 0.5,
            transparent: true,
            opacity: 0.5,
            emissive: ACCENT,
            emissiveIntensity: 0.08,
        }));
        const blockMesh = new InstancedMesh(blockGeo, blockMat, count);
        blockMesh.instanceMatrix.setUsage(DynamicDrawUsage);
        for (let i = 0; i < count; i += 1) blockMesh.setColorAt(i, BLOCK_BASE);
        root.add(blockMesh);

        // Block edge lines (fine line work), rebuilt from instance matrices.
        const blockEdges = new EdgesGeometry(blockGeo);
        const edgeTemplate = blockEdges.getAttribute('position').array.slice();
        blockEdges.dispose();
        const edgeVertsPerBlock = edgeTemplate.length / 3;
        const edgePos = new Float32Array(count * edgeTemplate.length);
        const edgeCol = new Float32Array(count * edgeVertsPerBlock * 4);
        const edgeGeo = track(new BufferGeometry());
        edgeGeo.setAttribute('position', new BufferAttribute(edgePos, 3).setUsage(DynamicDrawUsage));
        edgeGeo.setAttribute('color', new BufferAttribute(edgeCol, 4).setUsage(DynamicDrawUsage));
        const edgeMat = track(new LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }));
        const edgeLines = new LineSegments(edgeGeo, edgeMat);
        edgeLines.frustumCulled = false;
        root.add(edgeLines);

        // Connection lines
        const linkPos = new Float32Array(links.length * 6);
        const linkCol = new Float32Array(links.length * 8);
        const linkGeo = track(new BufferGeometry());
        linkGeo.setAttribute('position', new BufferAttribute(linkPos, 3).setUsage(DynamicDrawUsage));
        linkGeo.setAttribute('color', new BufferAttribute(linkCol, 4).setUsage(DynamicDrawUsage));
        const linkMat = track(new LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }));
        const linkLines = new LineSegments(linkGeo, linkMat);
        linkLines.frustumCulled = false;
        root.add(linkLines);

        // Pulses travel core → hub → block (second colour, used only here).
        const pulseCount = lite ? 9 : 21;
        const leavesByCluster = CLUSTERS.map((_, c) => blocks.map((b, i) => (b.cluster === c && !b.isHub ? i : -1)).filter((i) => i >= 0));
        const pulses = Array.from({ length: pulseCount }, (_, i) => {
            const leaves = leavesByCluster[i % CLUSTERS.length];
            return {
                block: leaves[Math.floor(i / CLUSTERS.length) % leaves.length],
                p: Math.random(),
                speed: MathUtils.randFloat(0.22, 0.38),
            };
        });
        const pulsePos = new Float32Array(pulseCount * 3);
        const pulseCol = new Float32Array(pulseCount * 4);
        const pulseGeo = track(new BufferGeometry());
        pulseGeo.setAttribute('position', new BufferAttribute(pulsePos, 3).setUsage(DynamicDrawUsage));
        pulseGeo.setAttribute('color', new BufferAttribute(pulseCol, 4).setUsage(DynamicDrawUsage));
        const pulseMat = track(new PointsMaterial({
            size: lite ? 0.2 : 0.17,
            map: glowTex,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
        }));
        const pulsePoints = new Points(pulseGeo, pulseMat);
        pulsePoints.frustumCulled = false;
        root.add(pulsePoints);

        // Per-frame scratch objects
        const dummy = new Object3D();
        const mtx = new Matrix4();
        const v = new Vector3();
        const driftPos = new Vector3();
        const driftQuat = new Quaternion();
        const tmpColor = new Color();
        const positions = blocks.map(() => new Vector3());
        const origin = new Vector3();
        const hubOf = (c) => positions[hubs[c]];
        const clusterCenters = CLUSTERS.map(() => new Vector3());
        const labels = labelRefs.current;

        let elapsed = reducedMotion ? 100 : 0;
        let highlightAmt = highlightRef.current ? 1 : 0;
        let pulseAmt = 0;
        const pointer = { x: 0, y: 0 };
        const parallax = { x: 0, y: 0 };

        // RGBA vertex colours with real alpha: additive blending on a transparent canvas renders faded colours as black.
        function writeColor(arr, vertex, color, alpha) {
            const o = vertex * 4;
            arr[o] = color.r;
            arr[o + 1] = color.g;
            arr[o + 2] = color.b;
            arr[o + 3] = MathUtils.clamp(alpha, 0, 1);
        }

        function update(dt) {
            const t = elapsed;
            const hTarget = highlightRef.current ? 1 : 0;
            highlightAmt = reducedMotion ? hTarget : MathUtils.damp(highlightAmt, hTarget, 6, dt);

            let settled = 0;
            for (let i = 0; i < count; i += 1) {
                const b = blocks[i];
                const raw = MathUtils.clamp((t - ASSEMBLE_AT - b.delay) / SNAP_DURATION, 0, 1);
                b.k = raw;
                if (raw >= 1) settled += 1;
                const eased = raw >= 1 ? 1 : easeOutBack(raw);

                driftPos.set(
                    b.start.x + Math.sin(t * 0.45 + b.phase) * b.amp,
                    b.start.y + Math.cos(t * 0.37 + b.phase) * b.amp,
                    b.start.z + Math.sin(t * 0.29 + b.phase * 1.3) * b.amp * 0.6,
                );
                driftQuat.setFromAxisAngle(b.axis, b.phase + t * b.spin);

                dummy.position.lerpVectors(driftPos, b.target, eased);
                dummy.quaternion.slerpQuaternions(driftQuat, b.targetQuat, MathUtils.clamp(eased, 0, 1));
                dummy.scale.setScalar(b.isHub ? 1.25 : 1);
                dummy.updateMatrix();
                blockMesh.setMatrixAt(i, dummy.matrix);
                positions[i].copy(dummy.position);

                const glowK = raw * (0.6 + 0.4 * highlightAmt);
                tmpColor.copy(BLOCK_BASE).lerp(BLOCK_HOT, glowK * 0.35 + highlightAmt * 0.55);
                blockMesh.setColorAt(i, tmpColor);

                // Edges: dim plum while loose, mauve once locked in.
                mtx.copy(dummy.matrix);
                tmpColor.copy(EDGE_LOOSE).lerp(ACCENT, raw).lerp(LINK_HOT, highlightAmt * 0.5);
                const edgeScale = 0.35 + raw * 0.35 + highlightAmt * 0.3;
                const base = i * edgeTemplate.length;
                for (let e = 0; e < edgeVertsPerBlock; e += 1) {
                    v.fromArray(edgeTemplate, e * 3).applyMatrix4(mtx);
                    v.toArray(edgePos, base + e * 3);
                    writeColor(edgeCol, i * edgeVertsPerBlock + e, tmpColor, edgeScale);
                }
            }
            blockMesh.instanceMatrix.needsUpdate = true;
            if (blockMesh.instanceColor) blockMesh.instanceColor.needsUpdate = true;
            edgeGeo.attributes.position.needsUpdate = true;
            edgeGeo.attributes.color.needsUpdate = true;

            const assembled = settled / count;

            links.forEach((link, li) => {
                const a = link.a < 0 ? origin : positions[link.a];
                const b = positions[link.b];
                a.toArray(linkPos, li * 6);
                b.toArray(linkPos, li * 6 + 3);
                const k = link.a < 0 ? blocks[link.b].k : Math.min(blocks[link.a].k, blocks[link.b].k);
                const strength = k * k * (link.cluster < 0 ? 0.35 : 0.5) * (1 + highlightAmt * 0.8);
                // Core spokes carry a faint magenta tint; everything warms toward magenta on highlight.
                tmpColor.copy(ACCENT).lerp(LINK_HOT, Math.min(1, (link.a < 0 ? 0.35 : 0) + highlightAmt * 0.6));
                writeColor(linkCol, li * 2, tmpColor, strength);
                writeColor(linkCol, li * 2 + 1, tmpColor, strength * (link.a < 0 ? 0.8 : 0.65));
            });
            linkGeo.attributes.position.needsUpdate = true;
            linkGeo.attributes.color.needsUpdate = true;

            // Pulses only once the backbone is connected.
            pulseAmt = reducedMotion ? 0 : MathUtils.damp(pulseAmt, assembled >= 1 ? 1 : 0, 2.5, dt);
            pulsePoints.visible = pulseAmt > 0.01;
            if (pulsePoints.visible) {
                pulses.forEach((pulse, pi) => {
                    pulse.p += dt * pulse.speed * (1 + highlightAmt * 0.6);
                    if (pulse.p > 1) {
                        pulse.p -= 1;
                        pulse.speed = MathUtils.randFloat(0.22, 0.38);
                    }
                    const block = blocks[pulse.block];
                    const hub = hubOf(block.cluster);
                    if (pulse.p < 0.55) v.lerpVectors(origin, hub, pulse.p / 0.55);
                    else v.lerpVectors(hub, positions[pulse.block], (pulse.p - 0.55) / 0.45);
                    v.toArray(pulsePos, pi * 3);
                    writeColor(pulseCol, pi, pi % 2 ? PULSE_ALT : PULSE, Math.sin(Math.PI * pulse.p) * pulseAmt);
                });
                pulseGeo.attributes.position.needsUpdate = true;
                pulseGeo.attributes.color.needsUpdate = true;
            }

            // Core: gentle breathing; brighter as the system connects.
            const breathe = reducedMotion ? 0 : Math.sin(t * 1.6) * 0.5 + 0.5;
            coreMat.emissiveIntensity = 0.18 + assembled * 0.25 + breathe * 0.08 + highlightAmt * 0.15;
            glowMat.opacity = 0.35 + assembled * 0.4 + breathe * 0.1 + highlightAmt * 0.15;
            glow.scale.setScalar(2.6 + assembled * 0.9 + breathe * 0.15);
            coreLight.intensity = 6 + assembled * 10 + highlightAmt * 6;
            if (!reducedMotion) {
                core.rotation.y = t * 0.25;
                core.rotation.x = t * 0.12;
                rings[0].rotation.z = t * 0.18;
                rings[1].rotation.z = -t * 0.12;
            }

            // Restrained idle sway + mouse parallax
            if (!reducedMotion) {
                parallax.x = MathUtils.damp(parallax.x, pointer.x, 3, dt);
                parallax.y = MathUtils.damp(parallax.y, pointer.y, 3, dt);
            }
            root.rotation.y = (reducedMotion ? 0 : Math.sin(t * 0.18) * 0.12) + parallax.x * 0.22;
            root.rotation.x = -0.08 + parallax.y * 0.14;
            root.position.y = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.05;

            // Cluster labels (HTML, decorative) follow projected cluster centres.
            if (showLabels && labels.length) {
                root.updateMatrixWorld();
                const w = container.clientWidth;
                const h = container.clientHeight;
                CLUSTERS.forEach((cluster, c) => {
                    const el = labels[c];
                    if (!el) return;
                    const a = MathUtils.degToRad(cluster.angle);
                    clusterCenters[c].copy(hubOf(c)).add(v.set(Math.cos(a), Math.sin(a), 0).multiplyScalar(1.35));
                    v.copy(clusterCenters[c]).applyMatrix4(root.matrixWorld).project(camera);
                    const clusterK = blocks[hubs[c]].k;
                    const halfW = el.offsetWidth / 2 + 6;
                    const halfH = el.offsetHeight / 2 + 6;
                    const x = MathUtils.clamp(((v.x + 1) / 2) * w, halfW, w - halfW);
                    const y = MathUtils.clamp(((1 - v.y) / 2) * h, halfH, h - halfH);
                    el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                    el.style.opacity = String(clusterK * (0.55 + highlightAmt * 0.45));
                    el.dataset.active = highlightAmt > 0.5 ? 'true' : 'false';
                });
            }
        }

        function resize() {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            const aspect = w / h;
            camera.aspect = aspect;
            const fit = 4.1 / (Math.tan(MathUtils.degToRad(camera.fov / 2)) * Math.pow(Math.min(1, aspect), lite ? 0.55 : 1));
            camera.position.set(0, 1.1, fit);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
        }

        let frame = 0;
        let running = false;
        let inView = true;
        let lastTime = 0;
        let readyFired = false;

        function render() {
            renderer.render(scene, camera);
            if (!readyFired) {
                readyFired = true;
                callbacksRef.current.onReady?.();
            }
        }

        function renderStatic() {
            update(0);
            render();
        }

        function tick(now) {
            if (!running) return;
            const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
            lastTime = now;
            elapsed += dt;
            update(dt);
            render();
            frame = requestAnimationFrame(tick);
        }

        function start() {
            if (reducedMotion || running || !inView || document.hidden) return;
            running = true;
            lastTime = 0;
            frame = requestAnimationFrame(tick);
        }

        function stop() {
            running = false;
            cancelAnimationFrame(frame);
        }

        wakeRef.current = () => {
            if (reducedMotion) renderStatic();
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reducedMotion || !running) renderStatic();
        });
        resizeObserver.observe(container);

        const io = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) start();
            else stop();
        }, { threshold: 0 });
        io.observe(container);

        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);

        const onPointerMove = (e) => {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const parallaxEnabled = !reducedMotion && !lite;
        if (parallaxEnabled) window.addEventListener('pointermove', onPointerMove, { passive: true });

        const onContextLost = (e) => {
            e.preventDefault();
            stop();
            callbacksRef.current.onError?.(new Error('WebGL context lost'));
        };
        canvas.addEventListener('webglcontextlost', onContextLost);

        resize();
        renderStatic();
        start();

        return () => {
            stop();
            wakeRef.current = null;
            resizeObserver.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            if (parallaxEnabled) window.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('webglcontextlost', onContextLost);
            blockMesh.dispose();
            disposables.forEach((d) => d.dispose());
            renderer.dispose();
            renderer.forceContextLoss();
            canvas.remove();
        };
    }, [lite, showLabels]);

    return (
        <div ref={containerRef} className="relative h-full w-full" aria-hidden="true">
            {showLabels && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {CLUSTERS.map((cluster, i) => (
                        <span
                            key={cluster.key}
                            ref={(el) => {
                                labelRefs.current[i] = el;
                            }}
                            className="aurora-border absolute left-0 top-0 whitespace-nowrap rounded-full bg-black/85 px-2.5 py-1 text-[12px] font-medium tracking-wide text-mist opacity-0 backdrop-blur-sm transition-shadow duration-300 motion-reduce:transition-none"
                        >
                            {cluster.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
