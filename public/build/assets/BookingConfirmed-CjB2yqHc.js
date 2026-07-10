import{a as h,r as n,j as e,L as r,H as u}from"./app-B4SSaSPy.js";import{N as b,F as y}from"./Footer-DSBU4EaK.js";const j={standard:"Standard Clean",deep:"Deep Clean",move_out:"Move-in/out Clean",commercial:"Commercial Office Clean"};function v({style:a}){return e.jsx("div",{className:"confetti-particle",style:a})}function g({booking:a}){const{auth:o}=h().props,[i,l]=n.useState(!1);n.useEffect(()=>{l(!0);const t=setTimeout(()=>l(!1),4e3);return()=>clearTimeout(t)},[]);const d=Array.from({length:30},(t,s)=>({left:`${Math.random()*100}%`,animationDelay:`${Math.random()*2}s`,animationDuration:`${2+Math.random()*2}s`,backgroundColor:["#3FAD00","#7ed957","#c8f5a0","#1F3612","#fff"][s%5],width:`${6+Math.random()*8}px`,height:`${6+Math.random()*8}px`,borderRadius:Math.random()>.5?"50%":"2px"}));if(!a)return e.jsx("div",{className:"sparkle-body min-h-screen flex items-center justify-center",children:e.jsxs("div",{className:"bg-white rounded-3xl p-10 max-w-sm text-center shadow-xl space-y-4",children:[e.jsx("div",{className:"text-5xl",children:"🔍"}),e.jsx("h1",{className:"text-xl font-bold text-[#1F3612]",children:"No Booking Found"}),e.jsx("p",{className:"text-sm text-[#839086]",children:"We couldn't find your booking details."}),e.jsx(r,{href:"/",className:"btn-premium inline-block mt-2 text-sm",children:"Back to Home"})]})});const c=a.booking_date?new Date(a.booking_date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—",m=j[a.service_type]||a.service_type;return e.jsxs(e.Fragment,{children:[e.jsxs(u,{children:[e.jsx("title",{children:"Booking Confirmed | MintyFresh Cleaning"}),e.jsx("meta",{name:"description",content:"Your MintyFresh cleaning appointment is confirmed and scheduled."})]}),e.jsx("style",{children:`
                @keyframes confetti-fall {
                    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .confetti-particle {
                    position: fixed;
                    top: -20px;
                    animation: confetti-fall linear forwards;
                    z-index: 999;
                    pointer-events: none;
                }
                @keyframes pop-in {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes checkmark-draw {
                    from { stroke-dashoffset: 60; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes fade-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .pop-in   { animation: pop-in 0.6s cubic-bezier(.36,.07,.19,.97) both; }
                .fade-up  { animation: fade-up 0.5s ease forwards; }
                .fade-up-1 { animation-delay: 0.2s; opacity: 0; }
                .fade-up-2 { animation-delay: 0.35s; opacity: 0; }
                .fade-up-3 { animation-delay: 0.5s; opacity: 0; }
                .fade-up-4 { animation-delay: 0.65s; opacity: 0; }
                .checkmark-path {
                    stroke-dasharray: 60;
                    stroke-dashoffset: 60;
                    animation: checkmark-draw 0.5s ease 0.5s forwards;
                }
            `}),i&&d.map((t,s)=>e.jsx(v,{style:t},s)),e.jsxs("div",{className:"sparkle-body min-h-screen relative flex flex-col",children:[e.jsx("div",{className:"glow-blob glow-blob-1"}),e.jsx("div",{className:"glow-blob glow-blob-2"}),e.jsx(b,{auth:o}),e.jsx("main",{className:"flex-1 py-20 px-4 flex items-center justify-center",children:e.jsxs("div",{className:"w-full max-w-2xl space-y-6",children:[e.jsxs("div",{className:"bg-white rounded-3xl shadow-2xl shadow-[#3FAD00]/10 border border-[#3FAD00]/15 overflow-hidden",children:[e.jsxs("div",{className:"bg-[#3FAD00] px-8 py-10 text-center",children:[e.jsx("div",{className:"pop-in w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center mx-auto mb-6",children:e.jsx("svg",{width:"40",height:"40",viewBox:"0 0 50 50",fill:"none",children:e.jsx("path",{className:"checkmark-path",d:"M10 26 L21 37 L40 16",stroke:"white",strokeWidth:"5",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("h1",{className:"fade-up fade-up-1 text-3xl sm:text-4xl font-black text-white tracking-tight",children:"Booking Confirmed"}),e.jsxs("p",{className:"fade-up fade-up-2 mt-2 text-white/80 text-sm max-w-md mx-auto",children:["Thank you, ",e.jsx("span",{className:"font-bold text-white",children:a.customer_name}),". Your MintyFresh cleaning is officially scheduled and secure."]})]}),e.jsxs("div",{className:"p-8 space-y-6 fade-up fade-up-3",children:[e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("span",{className:"inline-flex items-center gap-2 bg-[#3FAD00]/10 text-[#2C7A00] text-xs font-bold px-4 py-1.5 rounded-full border border-[#3FAD00]/20",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#3FAD00] animate-pulse inline-block"}),"Booking #",String(a.id).padStart(5,"0")]})}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:[{label:"Service",value:m},{label:"Size",value:`${a.bedrooms} Bed / ${a.bathrooms} Bath`},{label:"Date",value:c},{label:"Arrival",value:a.booking_time},{label:"Cleaner",value:a.cleaner?.name||"First Available",green:!0},{label:"Total Paid",value:`$${a.total_price}`,bold:!0},{label:"Address",value:`${a.address}, ${a.city}`,span:!0}].map(({label:t,value:s,green:x,bold:f,span:p})=>e.jsxs("div",{className:`bg-[#FAF9F5] rounded-2xl p-4 border border-[#3FAD00]/10 ${p?"col-span-2 sm:col-span-3":""}`,children:[e.jsx("span",{className:"text-[10px] text-[#839086] font-bold uppercase tracking-widest block",children:t}),e.jsx("p",{className:`mt-1 text-sm ${f?"text-xl font-black text-[#3FAD00]":x?"font-bold text-[#3FAD00]":"font-semibold text-[#1F3612]"}`,children:s})]},t))}),e.jsx("div",{className:"bg-[#3FAD00]/5 border border-[#3FAD00]/15 rounded-2xl px-5 py-3.5",children:e.jsxs("p",{className:"text-xs text-[#2C7A00] leading-relaxed",children:["A confirmation email with full receipt details has been sent to"," ",e.jsx("span",{className:"font-bold",children:a.customer_email}),"."]})})]}),e.jsxs("div",{className:"fade-up fade-up-4 border-t border-[#3FAD00]/10 px-8 py-6 bg-[#FAF9F5] flex flex-col sm:flex-row gap-3",children:[e.jsx(r,{href:"/book",className:"btn-premium flex-1 text-center text-sm py-3",children:"Book Another Session"}),e.jsx(r,{href:"/",className:"flex-1 text-center px-6 py-3 rounded-xl bg-white border border-[#3FAD00]/25 text-[#2C7A00] hover:bg-[#3FAD00]/5 transition-colors text-sm font-semibold",children:"Back to Home"})]})]}),e.jsxs("div",{className:"text-center text-xs text-[#839086] fade-up fade-up-4",children:["Questions? Contact us at"," ",e.jsx("a",{href:"mailto:hello@mintyfresh.com",className:"text-[#3FAD00] font-semibold hover:underline",children:"hello@mintyfresh.com"})]})]})}),e.jsx(y,{})]})]})}export{g as default};
