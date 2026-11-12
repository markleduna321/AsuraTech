import { useEffect, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Clock, Mesh, NormalBlending, OrthographicCamera, PlaneGeometry, Points, Scene, ShaderMaterial, WebGLRenderer } from 'three';

const PARTICLES = 24;

const glowVertex = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`;

const glowFragment = /* glsl */ `
    uniform vec3 uColor;
    uniform float uAspect;
    uniform float uTime;
    varying vec2 vUv;
    void main() {
        vec2 p = vUv - vec2(0.66, 0.5);
        p.x *= uAspect;
        float breathe = 0.92 + 0.08 * sin(uTime * 0.35);
        float glow = exp(-dot(p, p) * 7.0) * 0.26 * breathe;
        float halo = exp(-dot(p, p) * 1.6) * 0.06;
        float edge = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y) * smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        gl_FragColor = vec4(uColor, (glow + halo) * edge);
    }
`;

const pointVertex = /* glsl */ `
    attribute vec4 aSeed;
    uniform float uTime;
    uniform float uPixelRatio;
    varying float vAlpha;
    void main() {
        float t = uTime * (0.012 + aSeed.w * 0.018);
        vec2 pos = vec2(
            aSeed.x + sin(uTime * 0.11 + aSeed.z * 6.28) * 0.04,
            fract(aSeed.y + t) * 2.2 - 1.1
        );
        vAlpha = (0.35 + 0.65 * aSeed.w) * smoothstep(1.1, 0.6, abs(pos.y));
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = (1.5 + aSeed.z * 2.0) * uPixelRatio;
    }
`;

const pointFragment = /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.45;
        gl_FragColor = vec4(mix(vec3(1.0), uColor, 0.55) * a, a);
    }
`;

/**
 * Ambient WebGL backdrop for the demo stage: one soft glow that eases toward the active tab's tint,
 * plus a few slow drifting points. Renders only while `running`; stops when the tab is hidden.
 */
export default function DemoBackdrop({ tint, running, onReady, onError }) {
    const hostRef = useRef(null);
    const apiRef = useRef(null);
    const tintRef = useRef(tint);
    const runningRef = useRef(running);

    tintRef.current = tint;
    runningRef.current = running;

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;

        let renderer;
        try {
            renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
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
        const camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
        const color = tintRef.current.slice();

        const glowGeometry = new PlaneGeometry(2, 2);
        const glowMaterial = new ShaderMaterial({
            vertexShader: glowVertex,
            fragmentShader: glowFragment,
            uniforms: { uColor: { value: color }, uAspect: { value: 1 }, uTime: { value: 0 } },
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: NormalBlending,
        });
        scene.add(new Mesh(glowGeometry, glowMaterial));

        const seeds = new Float32Array(PARTICLES * 4);
        for (let i = 0; i < PARTICLES; i += 1) {
            seeds[i * 4] = Math.random() * 1.9 - 0.95;
            seeds[i * 4 + 1] = Math.random();
            seeds[i * 4 + 2] = Math.random();
            seeds[i * 4 + 3] = Math.random();
        }
        const pointGeometry = new BufferGeometry();
        pointGeometry.setAttribute('position', new BufferAttribute(new Float32Array(PARTICLES * 3), 3));
        pointGeometry.setAttribute('aSeed', new BufferAttribute(seeds, 4));
        const pointMaterial = new ShaderMaterial({
            vertexShader: pointVertex,
            fragmentShader: pointFragment,
            uniforms: { uColor: { value: color }, uTime: { value: 0 }, uPixelRatio: { value: dpr } },
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: AdditiveBlending,
            premultipliedAlpha: true,
        });
        const points = new Points(pointGeometry, pointMaterial);
        points.frustumCulled = false;
        scene.add(points);

        const resize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            glowMaterial.uniforms.uAspect.value = w / h;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        const clock = new Clock(false);
        let elapsed = Math.random() * 20;
        let frame = 0;
        let lost = false;

        const tick = () => {
            frame = window.requestAnimationFrame(tick);
            const dt = Math.min(clock.getDelta(), 0.1);
            elapsed += dt;
            const target = tintRef.current;
            const k = Math.min(1, dt * 2.5);
            for (let c = 0; c < 3; c += 1) color[c] += (target[c] - color[c]) * k;
            glowMaterial.uniforms.uTime.value = elapsed;
            pointMaterial.uniforms.uTime.value = elapsed;
            renderer.render(scene, camera);
        };

        const sync = () => {
            const shouldRun = runningRef.current && !document.hidden && !lost;
            if (shouldRun && !frame) {
                clock.start();
                tick();
            } else if (!shouldRun && frame) {
                window.cancelAnimationFrame(frame);
                frame = 0;
                clock.stop();
            }
        };

        const onContextLost = (e) => {
            e.preventDefault();
            lost = true;
            sync();
            onError?.(new Error('WebGL context lost'));
        };

        renderer.domElement.addEventListener('webglcontextlost', onContextLost);
        document.addEventListener('visibilitychange', sync);
        apiRef.current = { sync };
        sync();
        renderer.render(scene, camera);
        onReady?.();

        return () => {
            apiRef.current = null;
            window.cancelAnimationFrame(frame);
            ro.disconnect();
            document.removeEventListener('visibilitychange', sync);
            renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
            glowGeometry.dispose();
            pointGeometry.dispose();
            glowMaterial.dispose();
            pointMaterial.dispose();
            renderer.dispose();
            if (!lost) renderer.forceContextLoss();
            renderer.domElement.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        apiRef.current?.sync();
    }, [running]);

    return <div ref={hostRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}
