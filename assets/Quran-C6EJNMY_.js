import{r,j as e,u as P,L as _}from"./index-CTRoY2jq.js";import{c as k,a as z}from"./index-CfEoBwjC.js";import{M as F,u as A,P as I,a as D,b as V,c as H,m as O,L as Q}from"./proxy-DmScbh7B.js";import{S as U,M as W,H as X}from"./sun-BSgLh3y-.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],K=k("ArrowLeft",J);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}],["line",{x1:"12",x2:"12",y1:"7",y2:"13",key:"1cppfj"}],["line",{x1:"15",x2:"9",y1:"10",y2:"10",key:"1gty7f"}]],Y=k("BookmarkPlus",G);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]],q=k("Bookmark",Z);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],te=k("Pause",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],re=k("Play",se);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],ae=k("Search",ne);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]],ce=k("SkipBack",oe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]],le=k("SkipForward",ie);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]],R=k("Type",de);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],he=k("Volume2",ue);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],xe=k("X",me);class ge extends r.Component{getSnapshotBeforeUpdate(i){const a=this.props.childRef.current;if(a&&i.isPresent&&!this.props.isPresent){const l=a.offsetParent,g=l instanceof HTMLElement&&l.offsetWidth||0,c=this.props.sizeRef.current;c.height=a.offsetHeight||0,c.width=a.offsetWidth||0,c.top=a.offsetTop,c.left=a.offsetLeft,c.right=g-c.width-c.left}return null}componentDidUpdate(){}render(){return this.props.children}}function pe({children:n,isPresent:i,anchorX:a}){const l=r.useId(),g=r.useRef(null),c=r.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:d}=r.useContext(F);return r.useInsertionEffect(()=>{const{width:h,height:o,top:b,left:u,right:m}=c.current;if(i||!g.current||!h||!o)return;const y=a==="left"?`left: ${u}`:`right: ${m}`;g.current.dataset.motionPopId=l;const p=document.createElement("style");return d&&(p.nonce=d),document.head.appendChild(p),p.sheet&&p.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${h}px !important;
            height: ${o}px !important;
            ${y}px !important;
            top: ${b}px !important;
          }
        `),()=>{document.head.removeChild(p)}},[i]),e.jsx(ge,{isPresent:i,childRef:g,sizeRef:c,children:r.cloneElement(n,{ref:g})})}const fe=({children:n,initial:i,isPresent:a,onExitComplete:l,custom:g,presenceAffectsLayout:c,mode:d,anchorX:h})=>{const o=A(ye),b=r.useId(),u=r.useCallback(y=>{o.set(y,!0);for(const p of o.values())if(!p)return;l&&l()},[o,l]),m=r.useMemo(()=>({id:b,initial:i,isPresent:a,custom:g,onExitComplete:u,register:y=>(o.set(y,!1),()=>o.delete(y))}),c?[Math.random(),u]:[a,u]);return r.useMemo(()=>{o.forEach((y,p)=>o.set(p,!1))},[a]),r.useEffect(()=>{!a&&!o.size&&l&&l()},[a]),d==="popLayout"&&(n=e.jsx(pe,{isPresent:a,anchorX:h,children:n})),e.jsx(I.Provider,{value:m,children:n})};function ye(){return new Map}const T=n=>n.key||"";function L(n){const i=[];return r.Children.forEach(n,a=>{r.isValidElement(a)&&i.push(a)}),i}const be=({children:n,custom:i,initial:a=!0,onExitComplete:l,presenceAffectsLayout:g=!0,mode:c="sync",propagate:d=!1,anchorX:h="left"})=>{const[o,b]=D(d),u=r.useMemo(()=>L(n),[n]),m=d&&!o?[]:u.map(T),y=r.useRef(!0),p=r.useRef(u),N=A(()=>new Map),[s,w]=r.useState(u),[j,C]=r.useState(u);V(()=>{y.current=!1,p.current=u;for(let f=0;f<j.length;f++){const t=T(j[f]);m.includes(t)?N.delete(t):N.get(t)!==!0&&N.set(t,!1)}},[j,m.length,m.join("-")]);const S=[];if(u!==s){let f=[...u];for(let t=0;t<j.length;t++){const x=j[t],v=T(x);m.includes(v)||(f.splice(t,0,x),S.push(x))}return c==="wait"&&S.length&&(f=S),C(L(f)),w(u),null}const{forceRender:$}=r.useContext(H);return e.jsx(e.Fragment,{children:j.map(f=>{const t=T(f),x=d&&!o?!1:u===j||m.includes(t),v=()=>{if(N.has(t))N.set(t,!0);else return;let M=!0;N.forEach(E=>{E||(M=!1)}),M&&($==null||$(),C(p.current),d&&(b==null||b()),l&&l())};return e.jsx(fe,{isPresent:x,initial:!y.current||a?void 0:!1,custom:i,presenceAffectsLayout:g,mode:c,onExitComplete:x?void 0:v,anchorX:h,children:f},t)})})},B=n=>n.normalize("NFD").replace(/[\u064B-\u065F]/g,""),je=()=>{const[n,i]=r.useState([]),[a,l]=r.useState(""),[g,c]=r.useState(!0),{setSelectedSurah:d,darkMode:h}=P();return r.useEffect(()=>{c(!0),z.get("https://api.alquran.cloud/v1/surah").then(o=>{i(o.data.data),c(!1)}).catch(o=>{console.error("Error fetching Surah list",o),c(!1)})},[]),g?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"})}):e.jsxs("div",{className:`p-4 rounded-xl transition-colors duration-300 ${h?"bg-gray-900 text-white":"bg-white text-gray-900"}`,children:[e.jsxs("div",{className:"relative mb-4",children:[e.jsx(ae,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),e.jsx("input",{type:"text",placeholder:"ابحث عن سورة...",className:`w-full pl-10 pr-4 py-2 rounded-lg outline-none transition-colors ${h?"bg-gray-800 text-white placeholder-gray-500 border-gray-700":"bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200"} border`,onChange:o=>l(B(o.target.value.toLowerCase()))})]}),e.jsx("div",{className:"max-h-[calc(100vh-16rem)] overflow-y-auto",children:n.filter(o=>o.englishName.toLowerCase().includes(a)||B(o.name).includes(a)||o.number.toString().includes(a)).map(o=>e.jsx("button",{onClick:()=>d(o),className:`w-full text-right p-3 rounded-lg mb-2 transition-colors cursor-pointer ${h?"hover:bg-gray-800 focus:bg-gray-800":"hover:bg-gray-100 focus:bg-gray-100"}`,children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-sm opacity-75",children:["#",o.number]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold",children:o.name}),e.jsxs("p",{className:`text-sm ${h?"text-gray-400":"text-gray-600"}`,children:[o.englishName," • ",o.numberOfAyahs," آية"]})]})]})},o.number))})]})},Ne=({message:n,onClose:i})=>(r.useEffect(()=>{const a=setTimeout(()=>{i()},3e3);return()=>clearTimeout(a)},[i]),e.jsx(be,{children:e.jsx(O.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},exit:{opacity:0,y:-50},className:"fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg",children:n})})),ke=()=>{const[n,i]=r.useState([]),[a,l]=r.useState(1),[g,c]=r.useState(!0),[d,h]=r.useState(!1),[o,b]=r.useState(""),{selectedSurah:u,darkMode:m,setDarkMode:y,fontSize:p,setFontSize:N,currentPage:s,setCurrentPage:w,addBookmark:j,updateReadingProgress:C}=P();r.useEffect(()=>{u&&(c(!0),z.get(`https://api.alquran.cloud/v1/surah/${u.number}`).then(t=>{i(t.data.data.ayahs),l(Math.ceil(t.data.data.ayahs.length/10)),w(1),c(!1)}).catch(t=>{console.error("Error fetching Surah text",t),c(!1)}))},[u]);const S=()=>{s<a&&(w(s+1),C(s+1))},$=()=>{s>1&&(w(s-1),C(s-1))},f=()=>{var x;const t={id:Date.now(),surah:u.name,page:s,number:u.number,ayah:(x=n[(s-1)*10])==null?void 0:x.numberInSurah};j(t),b(`تمت إضافة إشارة مرجعية لسورة ${u.name}، الصفحة ${s}`),h(!0)};return g?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"})}):e.jsxs("div",{className:`p-6 rounded-xl transition-colors duration-300 ${m?"bg-gray-900 text-white":"bg-white text-gray-900"}`,children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>y(!m),className:`p-2 rounded-lg cursor-pointer transition-colors ${m?"bg-gray-800 text-white":"bg-gray-100 text-gray-800"}`,children:m?e.jsx(U,{className:"w-5 h-5"}):e.jsx(W,{className:"w-5 h-5"})}),e.jsxs("button",{onClick:()=>N(t=>t+2),className:`p-2 rounded-lg cursor-pointer transition-colors ${m?"bg-gray-800 text-white":"bg-gray-100 text-gray-800"}`,children:[e.jsx(R,{className:"w-5 h-5"}),"+"]}),e.jsxs("button",{onClick:()=>N(t=>Math.max(t-2,12)),className:`p-2 rounded-lg cursor-pointer transition-colors ${m?"bg-gray-800 text-white":"bg-gray-100 text-gray-800"}`,children:[e.jsx(R,{className:"w-5 h-5"}),"-"]})]}),e.jsx("button",{onClick:f,className:"p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer",children:e.jsx(Y,{className:"w-5 h-5"})}),d&&e.jsx(Ne,{message:o,onClose:()=>h(!1)})]}),e.jsx("div",{className:` leading-relaxed text-right ${m?"text-gray-100":"text-gray-900"}`,style:{fontSize:`${p}px`},children:n.slice((s-1)*10,s*10).map(t=>e.jsxs("span",{className:"px-1 py-2 font-semibold",children:[t.text," ",e.jsxs("span",{className:"text-gray-500",children:["(",t.number,")"]})]},t.number))}),e.jsxs("div",{className:"flex justify-between items-center mt-6",children:[e.jsx("button",{onClick:$,disabled:s===1,className:`px-4 py-2 rounded-lg transition-colors ${s===1?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`,children:"السابق"}),e.jsxs("span",{className:m?"text-gray-300":"text-gray-600",children:["صفحة ",s," من ",a]}),e.jsx("button",{onClick:S,disabled:s===a,className:`px-4 py-2 rounded-lg cursor-pointer transition-colors ${s===a?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`,children:"التالي"})]})]})},ve=()=>{const{selectedSurah:n}=P(),[i,a]=r.useState(!0),[l,g]=r.useState(""),[c,d]=r.useState(!1),[h,o]=r.useState(0),[b,u]=r.useState(0),[m,y]=r.useState(1),[p,N]=r.useState(1),s=r.useRef(null);r.useEffect(()=>{if(n){a(!0);const t=`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${n.number}.mp3`;g(t),a(!1)}},[n]),r.useEffect(()=>{var t;if(l&&n){const x=JSON.parse(localStorage.getItem("quran_audio")||"{}"),v=parseFloat(((t=x[n.number])==null?void 0:t.currentTime)||0);o(isNaN(v)?0:v),s.current&&s.current.pause(),s.current=new Audio(l),s.current.currentTime=v,s.current.volume=m,s.current.playbackRate=p,s.current.onloadedmetadata=()=>{u(s.current.duration)},s.current.onloadeddata=()=>{c&&s.current.play().catch(E=>console.warn("Playback Error:",E))};const M=()=>{o(s.current.currentTime),localStorage.setItem("quran_audio",JSON.stringify({...x,[n.number]:{currentTime:s.current.currentTime}}))};return s.current.addEventListener("timeupdate",M),()=>{s.current.removeEventListener("timeupdate",M),s.current.pause()}}},[l,n,c,m,p]);const w=()=>{s.current&&(s.current.paused?s.current.play().then(()=>d(!0)).catch(t=>console.warn("Error playing:",t)):(s.current.pause(),d(!1)))},j=t=>{s.current&&(s.current.currentTime=Math.min(Math.max(s.current.currentTime+t,0),b),o(s.current.currentTime))},C=t=>{const x=parseFloat(t.target.value);s.current&&(s.current.currentTime=x,o(x))},S=t=>{const x=parseFloat(t.target.value);y(x),s.current&&(s.current.volume=x)},$=t=>{N(t),s.current&&(s.current.playbackRate=t)},f=t=>{if(isNaN(t)||t<0)return"00:00";const x=Math.floor(t/60),v=Math.floor(t%60);return`${x.toString().padStart(2,"0")}:${v.toString().padStart(2,"0")}`};return e.jsxs("div",{className:"bg-gray-900 text-white p-6 rounded-lg shadow-md mt-4",children:[e.jsxs("h2",{className:"text-xl font-semibold mb-4 text-center",children:["🎧 استمع إلى ",n==null?void 0:n.name]}),i?e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-center items-center gap-4 mb-4",children:[e.jsx("button",{onClick:()=>j(-10),className:"p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer",children:e.jsx(ce,{className:"w-5 h-5"})}),e.jsx("button",{onClick:w,className:"p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors cursor-pointer",children:c?e.jsx(te,{className:"w-6 h-6"}):e.jsx(re,{className:"w-6 h-6"})}),e.jsx("button",{onClick:()=>j(10),className:"p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer",children:e.jsx(le,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{className:"text-sm",children:f(h)}),e.jsx("input",{type:"range",min:"0",max:b||100,value:h,onChange:C,className:"flex-1 h-2 rounded-lg appearance-none bg-gray-700 accent-blue-500 cursor-pointer"}),e.jsx("span",{className:"text-sm",children:f(b)})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(he,{className:"w-5 h-5"}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:m,onChange:S,className:"w-24 h-2 rounded-lg appearance-none bg-gray-700 accent-blue-500 cursor-pointer"})]}),e.jsx("div",{className:"flex justify-center gap-2 mt-4",children:[.5,1,1.5,2].map(t=>e.jsxs("button",{onClick:()=>$(t),className:`px-2 py-1 rounded cursor-pointer transition-colors ${p===t?"bg-blue-500 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:[t,"x"]},t))})]})]})},we=()=>{const{bookmarks:n,removeBookmark:i,setSelectedSurah:a,setShowBookmarks:l,darkMode:g}=P(),c=d=>{fetch(`https://api.alquran.cloud/v1/surah/${d.number}`).then(h=>h.json()).then(h=>{a(h.data),l(!1)}).catch(h=>console.error("Error loading surah:",h))};return e.jsxs("div",{className:`p-4 rounded-xl transition-colors duration-300 ${g?"bg-gray-900 text-white":"bg-white text-gray-900"}`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("h2",{className:"text-xl font-bold flex items-center gap-2",children:[e.jsx(q,{className:"w-5 h-5"}),"الإشارات المرجعية"]}),e.jsx("button",{onClick:()=>l(!1),className:"p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer",children:e.jsx(K,{className:"w-5 h-5"})})]}),n.length===0?e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsx("p",{className:" text-center",children:"لم تقم بإضافة أي إشارات مرجعية بعد"})}):e.jsx("div",{className:"space-y-4 flex-1 overflow-y-auto cursor-pointer",children:n.map(d=>e.jsxs("div",{className:`flex items-center justify-between p-4  rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 transition-colors ${g?"bg-gray-50 dark:bg-gray-700":"bg-white text-gray-900"}`,children:[e.jsxs("button",{onClick:()=>c(d),className:"flex-1 text-right",children:[e.jsx("h3",{className:"font-bold cursor-pointer",children:d.surah}),e.jsxs("p",{className:"text-sm  cursor-pointer",children:["صفحة ",d.page," • آية ",d.ayah]})]}),e.jsx("button",{onClick:()=>i(d.id),className:"p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer",children:e.jsx(xe,{className:"w-5 h-5"})})]},d.id))})]})};function Pe(){const{selectedSurah:n,showBookmarks:i,setShowBookmarks:a}=P();return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-2 px-2",children:e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs("header",{className:"flex justify-between items-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold ",children:"📖 القرآن الكريم"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs(_,{to:"/worship",className:"inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors",children:[e.jsx(Q,{className:"mr-2 h-4 w-4"}),"العبادات اليومية"]}),e.jsxs(_,{to:"/",className:"inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors",children:[e.jsx(X,{className:"mr-2 h-4 w-4"}),"الرئيسية"]})]})]}),e.jsx("div",{className:"text-center mb-6",children:e.jsxs("button",{onClick:()=>a(!i),className:"inline-flex items-center px-4 py-2 text-sm font-medium cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",children:[e.jsx(q,{className:"mr-2 h-4 w-4"}),"الإشارات المرجعية"]})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e.jsx("div",{className:"lg:col-span-1 h-[calc(100vh-12rem)] flex flex-col",children:i?e.jsx(we,{}):e.jsx(je,{})}),n?e.jsxs("div",{className:"lg:col-span-2 space-y-8",children:[e.jsx(ke,{}),e.jsx(ve,{})]}):e.jsx("div",{className:"lg:col-span-2 flex items-center justify-center h-[calc(100vh-12rem)]",children:e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-700 dark:text-gray-300",children:"اختر سورة للبدء في القراءة"}),e.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"يمكنك البحث عن السورة باسمها أو رقمها من القائمة"})]})})]})]})})}export{Pe as default};
