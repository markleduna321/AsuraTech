import{j as e}from"./app-BLRpzCVz.js";import{m as r}from"./proxy-CPgU7C5y.js";import{S as s}from"./shield-check-T6T-YMnh.js";import{c as i}from"./createLucideIcon-CUywZsvX.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],n=i("calendar",d);function x({issuedDate:a}){const t=new Date(a).toLocaleDateString("en-US",{day:"numeric",month:"long",year:"numeric"});return e.jsxs(r.div,{initial:{opacity:0,y:16,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{delay:.6,duration:.5,ease:[.33,1,.68,1]},className:`inline-flex items-center gap-3 px-5 py-3 rounded-2xl
				border border-emerald-500/20 bg-emerald-500/[0.06] backdrop-blur-xl
				shadow-[0_0_30px_rgba(16,185,129,0.12)]`,children:[e.jsx("div",{className:"p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20",children:e.jsx(s,{className:"w-5 h-5 text-emerald-400"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-emerald-400",children:"Verified Certificate"}),e.jsxs("div",{className:"flex items-center gap-1.5 mt-0.5",children:[e.jsx(n,{className:"w-3 h-3 text-slate-500"}),e.jsxs("p",{className:"text-xs text-slate-500",children:["Issued on ",t]})]})]})]})}export{x as default};
