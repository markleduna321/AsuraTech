import{r as a,j as _}from"./app-DWfLrt9N.js";import{W as k,S as j,s as D,t as N,u as E,N as O,c as V,B as q,f as G,d as H,p as I,v as J}from"./three.module-Dsws8TXN.js";const C=24,K=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
`,Q=`
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
`,X=`
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
`,Y=`
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.45;
        gl_FragColor = vec4(mix(vec3(1.0), uColor, 0.55) * a, a);
    }
`;function ee({tint:S,running:f,onReady:p,onError:n}){const y=a.useRef(null),h=a.useRef(null),w=a.useRef(S),R=a.useRef(f);return w.current=S,R.current=f,a.useEffect(()=>{const o=y.current;if(!o)return;let t;try{t=new k({antialias:!1,alpha:!0,powerPreference:"low-power"})}catch(e){n==null||n(e);return}const P=Math.min(window.devicePixelRatio||1,1.75);t.setPixelRatio(P),t.setClearColor(0,0),t.domElement.style.cssText="position:absolute;inset:0;width:100%;height:100%;",o.appendChild(t.domElement);const u=new j,T=new D(-1,1,1,-1,-1,1),d=w.current.slice(),M=new N(2,2),m=new E({vertexShader:K,fragmentShader:Q,uniforms:{uColor:{value:d},uAspect:{value:1},uTime:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1,blending:O});u.add(new V(M,m));const i=new Float32Array(C*4);for(let e=0;e<C;e+=1)i[e*4]=Math.random()*1.9-.95,i[e*4+1]=Math.random(),i[e*4+2]=Math.random(),i[e*4+3]=Math.random();const v=new q;v.setAttribute("position",new G(new Float32Array(C*3),3)),v.setAttribute("aSeed",new G(i,4));const g=new E({vertexShader:X,fragmentShader:Y,uniforms:{uColor:{value:d},uTime:{value:0},uPixelRatio:{value:P}},transparent:!0,depthTest:!1,depthWrite:!1,blending:H,premultipliedAlpha:!0}),F=new I(v,g);F.frustumCulled=!1,u.add(F);const L=()=>{const e=o.clientWidth,l=o.clientHeight;!e||!l||(t.setSize(e,l,!1),m.uniforms.uAspect.value=e/l)};L();const U=new ResizeObserver(L);U.observe(o);const x=new J(!1);let b=Math.random()*20,s=0,A=!1;const z=()=>{s=window.requestAnimationFrame(z);const e=Math.min(x.getDelta(),.1);b+=e;const l=w.current,W=Math.min(1,e*2.5);for(let c=0;c<3;c+=1)d[c]+=(l[c]-d[c])*W;m.uniforms.uTime.value=b,g.uniforms.uTime.value=b,t.render(u,T)},r=()=>{const e=R.current&&!document.hidden&&!A;e&&!s?(x.start(),z()):!e&&s&&(window.cancelAnimationFrame(s),s=0,x.stop())},B=e=>{e.preventDefault(),A=!0,r(),n==null||n(new Error("WebGL context lost"))};return t.domElement.addEventListener("webglcontextlost",B),document.addEventListener("visibilitychange",r),h.current={sync:r},r(),t.render(u,T),p==null||p(),()=>{h.current=null,window.cancelAnimationFrame(s),U.disconnect(),document.removeEventListener("visibilitychange",r),t.domElement.removeEventListener("webglcontextlost",B),M.dispose(),v.dispose(),m.dispose(),g.dispose(),t.dispose(),A||t.forceContextLoss(),t.domElement.remove()}},[]),a.useEffect(()=>{var o;(o=h.current)==null||o.sync()},[f]),_.jsx("div",{ref:y,className:"pointer-events-none absolute inset-0","aria-hidden":"true"})}export{ee as default};
