import { useEffect, useRef } from 'react';
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    DynamicDrawUsage,
    InstancedBufferAttribute,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    Matrix4,
    Mesh,
    NormalBlending,
    OrthographicCamera,
    PlaneGeometry,
    Points,
    Scene,
    ShaderMaterial,
    WebGLRenderer,
} from 'three';

// Plum & Mist: plum-600 plate glow/edges, mauve-300 pulses; core glows magenta like the hero (still mixes to white). Decorative only.
const ACCENT = new Color('#6A3497');
const CORE = new Color('#FF2E7E');
const PULSE = new Color('#C9C1CF');
const PAD = 28; // glow margin around each plate, in CSS px

const plateVertex = /* glsl */ `
    attribute vec2 aSize;
    attribute float aAlpha;
    attribute float aGlow;
    varying vec2 vUv;
    varying vec2 vSize;
    varying float vAlpha;
    varying float vGlow;
    void main() {
        vUv = uv;
        vSize = aSize;
        vAlpha = aAlpha;
        vGlow = aGlow;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    }
`;

// Frosted-glass rounded plate: faint fill with a top highlight, 1px edge, and an accent glow that grows as it nears the core.
const plateFragment = /* glsl */ `
    uniform vec3 uAccent;
    uniform float uPad;
    varying vec2 vUv;
    varying vec2 vSize;
    varying float vAlpha;
    varying float vGlow;
    float sdRoundRect(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    }
    void main() {
        vec2 full = vSize + 2.0 * uPad;
        vec2 p = (vUv - 0.5) * full;
        float d = sdRoundRect(p, vSize * 0.5, min(12.0, vSize.y * 0.5));
        float inside = 1.0 - smoothstep(-0.75, 0.75, d);
        float topness = clamp(p.y / max(vSize.y, 1.0) + 0.5, 0.0, 1.0);
        float aFill = inside * (0.035 + 0.035 * topness);
        float edge = 1.0 - smoothstep(0.0, 1.25, abs(d));
        float aEdge = edge * (0.11 + 0.1 * topness + 0.45 * vGlow);
        float aGlow = d > 0.0 ? exp(-d / 11.0) * 0.4 * vGlow : 0.0;
        float a = aFill + aEdge + aGlow;
        vec3 edgeCol = mix(vec3(1.0), uAccent, clamp(vGlow * 1.2, 0.0, 1.0));
        vec3 col = (vec3(1.0) * aFill + edgeCol * aEdge + uAccent * aGlow) / max(a, 1e-4);
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0) * vAlpha);
    }
`;

// Glowing core with an emissive ring; uIntensity rises as the chips merge.
const coreFragment = /* glsl */ `
    uniform vec3 uAccent;
    uniform float uIntensity;
    uniform float uTime;
    uniform float uSize;
    varying vec2 vUv;
    void main() {
        float r = length(vUv - 0.5) * uSize;
        float breathe = 0.92 + 0.08 * sin(uTime * 1.3);
        float core = exp(-r / 26.0) * 0.95;
        float halo = exp(-r / 120.0) * 0.28;
        float ring = (1.0 - smoothstep(0.0, 1.6, abs(r - 54.0))) * 0.55;
        float a = (core + halo + ring) * uIntensity * breathe;
        vec3 col = mix(uAccent, vec3(1.0), clamp(core * 0.9, 0.0, 0.85));
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
    }
`;

const basicVertex = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const pulseVertex = /* glsl */ `
    attribute float aAlpha;
    uniform float uDpr;
    varying float vAlpha;
    void main() {
        vAlpha = aAlpha;
        gl_PointSize = 5.0 * uDpr;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const pulseFragment = /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(uColor, a);
    }
`;

/**
 * Imperative Three.js layer for the "subscription pile" collapse.
 * It owns no animation loop: StackCollapse calls api.render(state) from its scroll-driven frame,
 * so HTML labels and GL plates always move in lockstep.
 */
export default function CollapseScene({ count, onReady, onError }) {
    const hostRef = useRef(null);

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

        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        renderer.setPixelRatio(dpr);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
        host.appendChild(renderer.domElement);

        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, -10, 10);

        // Core glow
        const CORE_SIZE = 520;
        const coreMaterial = new ShaderMaterial({
            vertexShader: basicVertex,
            fragmentShader: coreFragment,
            uniforms: { uAccent: { value: CORE }, uIntensity: { value: 0.2 }, uTime: { value: 0 }, uSize: { value: CORE_SIZE } },
            transparent: true,
            depthWrite: false,
            depthTest: false,
            blending: NormalBlending,
        });
        const coreGeometry = new PlaneGeometry(CORE_SIZE, CORE_SIZE);
        const core = new Mesh(coreGeometry, coreMaterial);
        core.renderOrder = 0;
        scene.add(core);

        // Connection lines (chip -> core), RGBA vertex colours so they fade on the transparent canvas
        const linePositions = new Float32Array(count * 6);
        const lineColors = new Float32Array(count * 8);
        const lineGeometry = new BufferGeometry();
        lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3).setUsage(DynamicDrawUsage));
        lineGeometry.setAttribute('color', new BufferAttribute(lineColors, 4).setUsage(DynamicDrawUsage));
        const lineMaterial = new LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, depthTest: false });
        const lines = new LineSegments(lineGeometry, lineMaterial);
        lines.renderOrder = 1;
        scene.add(lines);

        // Instanced glass plates (one per tool chip)
        const plateGeometry = new PlaneGeometry(1, 1);
        const sizeAttr = new InstancedBufferAttribute(new Float32Array(count * 2), 2).setUsage(DynamicDrawUsage);
        const alphaAttr = new InstancedBufferAttribute(new Float32Array(count), 1).setUsage(DynamicDrawUsage);
        const glowAttr = new InstancedBufferAttribute(new Float32Array(count), 1).setUsage(DynamicDrawUsage);
        plateGeometry.setAttribute('aSize', sizeAttr);
        plateGeometry.setAttribute('aAlpha', alphaAttr);
        plateGeometry.setAttribute('aGlow', glowAttr);
        const plateMaterial = new ShaderMaterial({
            vertexShader: plateVertex,
            fragmentShader: plateFragment,
            uniforms: { uAccent: { value: ACCENT }, uPad: { value: PAD } },
            transparent: true,
            depthWrite: false,
            depthTest: false,
        });
        const plates = new InstancedMesh(plateGeometry, plateMaterial, count);
        plates.instanceMatrix.setUsage(DynamicDrawUsage);
        plates.frustumCulled = false;
        plates.renderOrder = 2;
        scene.add(plates);

        // Mauve pulses travelling along the lines into the core
        const pulsePositions = new Float32Array(count * 3);
        const pulseAlphas = new Float32Array(count);
        const pulseGeometry = new BufferGeometry();
        pulseGeometry.setAttribute('position', new BufferAttribute(pulsePositions, 3).setUsage(DynamicDrawUsage));
        pulseGeometry.setAttribute('aAlpha', new BufferAttribute(pulseAlphas, 1).setUsage(DynamicDrawUsage));
        const pulseMaterial = new ShaderMaterial({
            vertexShader: pulseVertex,
            fragmentShader: pulseFragment,
            uniforms: { uColor: { value: PULSE }, uDpr: { value: dpr } },
            transparent: true,
            depthWrite: false,
            depthTest: false,
        });
        const pulses = new Points(pulseGeometry, pulseMaterial);
        pulses.frustumCulled = false;
        pulses.renderOrder = 3;
        scene.add(pulses);

        const matrix = new Matrix4();

        const api = {
            resize(width, height) {
                if (!width || !height) return;
                renderer.setSize(width, height, false);
                camera.left = -width / 2;
                camera.right = width / 2;
                camera.top = height / 2;
                camera.bottom = -height / 2;
                camera.updateProjectionMatrix();
            },
            render(state) {
                const { chips, coreIntensity, time } = state;
                for (let i = 0; i < count; i += 1) {
                    const c = chips[i];
                    const w = c.w * c.s;
                    const h = c.h * c.s;
                    matrix.makeScale(w + PAD * 2, h + PAD * 2, 1);
                    matrix.setPosition(c.x, -c.y, 0);
                    plates.setMatrixAt(i, matrix);
                    sizeAttr.setXY(i, w, h);
                    alphaAttr.setX(i, c.alpha);
                    glowAttr.setX(i, c.glow);

                    const l = i * 6;
                    linePositions[l] = c.x;
                    linePositions[l + 1] = -c.y;
                    linePositions[l + 3] = 0;
                    linePositions[l + 4] = 0;
                    const k = i * 8;
                    lineColors[k] = ACCENT.r;
                    lineColors[k + 1] = ACCENT.g;
                    lineColors[k + 2] = ACCENT.b;
                    lineColors[k + 3] = c.line * 0.55;
                    lineColors[k + 4] = ACCENT.r;
                    lineColors[k + 5] = ACCENT.g;
                    lineColors[k + 6] = ACCENT.b;
                    lineColors[k + 7] = c.line * 0.08;

                    const travel = (time * 0.55 + i * 0.137) % 1;
                    pulsePositions[i * 3] = c.x * (1 - travel);
                    pulsePositions[i * 3 + 1] = -c.y * (1 - travel);
                    pulseAlphas[i] = c.line * Math.sin(Math.PI * travel);
                }
                plates.instanceMatrix.needsUpdate = true;
                sizeAttr.needsUpdate = true;
                alphaAttr.needsUpdate = true;
                glowAttr.needsUpdate = true;
                lineGeometry.attributes.position.needsUpdate = true;
                lineGeometry.attributes.color.needsUpdate = true;
                pulseGeometry.attributes.position.needsUpdate = true;
                pulseGeometry.attributes.aAlpha.needsUpdate = true;
                coreMaterial.uniforms.uIntensity.value = coreIntensity;
                coreMaterial.uniforms.uTime.value = time;
                renderer.render(scene, camera);
            },
        };

        onReady?.(api);

        return () => {
            onReady?.(null);
            [coreGeometry, lineGeometry, plateGeometry, pulseGeometry].forEach((g) => g.dispose());
            [coreMaterial, lineMaterial, plateMaterial, pulseMaterial].forEach((m) => m.dispose());
            plates.dispose();
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return <div ref={hostRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}
