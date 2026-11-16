import{r as R,j as Q}from"./app-B7p-JbdK.js";import{W as $,S as ee,s as te,u as F,N as ae,C as Z,t as K,c as re,B as Y,f as x,m as i,L as se,e as oe,K as E,l as ne,p as ie,q as le}from"./three.module-Dsws8TXN.js";const l=new Z("#818cf8"),ce=new Z("#22d3ee"),T=28,ue=`
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
`,pe=`
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
`,ve=`
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
`,de=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,fe=`
    attribute float aAlpha;
    uniform float uDpr;
    varying float vAlpha;
    void main() {
        vAlpha = aAlpha;
        gl_PointSize = 5.0 * uDpr;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,me=`
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vAlpha;
        gl_FragColor = vec4(uColor, a);
    }
`;function we({count:r,onReady:u,onError:b}){const I=R.useRef(null);return R.useEffect(()=>{const _=I.current;if(!_)return;let s;try{s=new $({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch(a){b==null||b(a);return}const j=Math.min(window.devicePixelRatio||1,1.75);s.setPixelRatio(j),s.setClearColor(0,0),s.domElement.style.cssText="position:absolute;inset:0;width:100%;height:100%;",_.appendChild(s.domElement);const m=new ee,p=new te(-1,1,1,-1,-10,10),y=520,w=new F({vertexShader:de,fragmentShader:ve,uniforms:{uAccent:{value:l},uIntensity:{value:.2},uTime:{value:0},uSize:{value:y}},transparent:!0,depthWrite:!1,depthTest:!1,blending:ae}),B=new K(y,y),D=new re(B,w);D.renderOrder=0,m.add(D);const h=new Float32Array(r*6),o=new Float32Array(r*8),v=new Y;v.setAttribute("position",new x(h,3).setUsage(i)),v.setAttribute("color",new x(o,4).setUsage(i));const L=new se({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1}),O=new oe(v,L);O.renderOrder=1,m.add(O);const g=new K(1,1),S=new E(new Float32Array(r*2),2).setUsage(i),U=new E(new Float32Array(r),1).setUsage(i),C=new E(new Float32Array(r),1).setUsage(i);g.setAttribute("aSize",S),g.setAttribute("aAlpha",U),g.setAttribute("aGlow",C);const V=new F({vertexShader:ue,fragmentShader:pe,uniforms:{uAccent:{value:l},uPad:{value:T}},transparent:!0,depthWrite:!1,depthTest:!1}),c=new ne(g,V,r);c.instanceMatrix.setUsage(i),c.frustumCulled=!1,c.renderOrder=2,m.add(c);const M=new Float32Array(r*3),W=new Float32Array(r),d=new Y;d.setAttribute("position",new x(M,3).setUsage(i)),d.setAttribute("aAlpha",new x(W,1).setUsage(i));const q=new F({vertexShader:fe,fragmentShader:me,uniforms:{uColor:{value:ce},uDpr:{value:j}},transparent:!0,depthWrite:!1,depthTest:!1}),P=new ie(d,q);P.frustumCulled=!1,P.renderOrder=3,m.add(P);const G=new le,H={resize(a,f){!a||!f||(s.setSize(a,f,!1),p.left=-a/2,p.right=a/2,p.top=f/2,p.bottom=-f/2,p.updateProjectionMatrix())},render(a){const{chips:f,coreIntensity:J,time:N}=a;for(let t=0;t<r;t+=1){const e=f[t],X=e.w*e.s,k=e.h*e.s;G.makeScale(X+T*2,k+T*2,1),G.setPosition(e.x,-e.y,0),c.setMatrixAt(t,G),S.setXY(t,X,k),U.setX(t,e.alpha),C.setX(t,e.glow);const A=t*6;h[A]=e.x,h[A+1]=-e.y,h[A+3]=0,h[A+4]=0;const n=t*8;o[n]=l.r,o[n+1]=l.g,o[n+2]=l.b,o[n+3]=e.line*.55,o[n+4]=l.r,o[n+5]=l.g,o[n+6]=l.b,o[n+7]=e.line*.08;const z=(N*.55+t*.137)%1;M[t*3]=e.x*(1-z),M[t*3+1]=-e.y*(1-z),W[t]=e.line*Math.sin(Math.PI*z)}c.instanceMatrix.needsUpdate=!0,S.needsUpdate=!0,U.needsUpdate=!0,C.needsUpdate=!0,v.attributes.position.needsUpdate=!0,v.attributes.color.needsUpdate=!0,d.attributes.position.needsUpdate=!0,d.attributes.aAlpha.needsUpdate=!0,w.uniforms.uIntensity.value=J,w.uniforms.uTime.value=N,s.render(m,p)}};return u==null||u(H),()=>{u==null||u(null),[B,v,g,d].forEach(a=>a.dispose()),[w,L,V,q].forEach(a=>a.dispose()),c.dispose(),s.dispose(),s.forceContextLoss(),s.domElement.remove()}},[r]),Q.jsx("div",{ref:I,className:"pointer-events-none absolute inset-0","aria-hidden":"true"})}export{we as default};
