(()=>{"use strict";const e=document.querySelector(".form"),t={login:{valueMissing:"Введите ваш login!"},email:{valueMissing:"Введите ваш email!",typeMismatch:"Не корректное значение - email!"},"credit-card":{valueMissing:"Введите номер вашей credit card!",patternMismatch:"Не корректное значение - credit card!"}},o=new class{constructor(){this.popoverList=[]}showPopover(e,t,o){const i=document.createElement("div");i.classList.add("popover");const s=document.createElement("div");s.classList.add("popover-title"),s.textContent=e,i.appendChild(s);const n=document.createElement("div");n.classList.add("popover-text"),n.textContent=t,i.appendChild(n);const r=performance.now();this.popoverList.push({id:r,element:i}),document.body.appendChild(i);const{left:d,top:a}=o.getBoundingClientRect();return i.style.left=d+o.offsetWidth/2-i.offsetWidth/2+"px",i.style.top=a-i.offsetHeight-8+"px",r}removePopover(e){this.popoverList.find((t=>t.id===e)).element.remove(),this.popoverList=this.popoverList.filter((t=>t.id!==e))}};let i=[];e.addEventListener("submit",(s=>{s.preventDefault(),i.forEach((e=>o.removePopover(e.id))),i=[];[...e.elements].some((e=>{const s=(e=>{const o=Object.keys(ValidityState.prototype).find((t=>{if(e.name&&"valid"!==t)return e.validity[t]}));if(o)return t[e.name][o]})(e);if(s)return n=s,r=e,i.push({name:r.name,id:o.showPopover(r.name,n,r)}),!0;var n,r}))}))})();