import{r as s}from"./app-DWPS2Hfb.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,r)=>r?r.toUpperCase():o.toLowerCase());/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=e=>{const t=b(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},L=s.createContext({}),W=()=>s.useContext(L),S=s.forwardRef(({color:e,size:t,strokeWidth:o,absoluteStrokeWidth:r,className:n="",children:a,iconNode:C,...l},p)=>{const{size:c=24,strokeWidth:u=2,absoluteStrokeWidth:m=!1,color:w="currentColor",className:x=""}=W()??{},f=r??m?Number(o??u)*24/Number(t??c):o??u;return s.createElement("svg",{ref:p,...i,width:t??c??i.width,height:t??c??i.height,stroke:e??w,strokeWidth:f,className:h("lucide",x,n),...!a&&!y(l)&&{"aria-hidden":"true"},...l},[...C.map(([k,g])=>s.createElement(k,g)),...Array.isArray(a)?a:[a]])});/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const o=s.forwardRef(({className:r,...n},a)=>s.createElement(S,{ref:a,iconNode:t,className:h(`lucide-${A(d(e))}`,`lucide-${e}`,r),...n}));return o.displayName=d(e),o};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],N=v("arrow-right",E);export{N as A,v as c};
