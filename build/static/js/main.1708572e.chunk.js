(this.webpackJsonpstatefulcomponent=this.webpackJsonpstatefulcomponent||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t(16),i=t.n(c),o=t(6),u=t(0),a=function(e){var n=e.personList,t=e.deleteHandler;return Object(u.jsxs)("div",{className:"NumberList",children:[Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("ul",{children:n.map((function(e){return Object(u.jsxs)("li",{children:[e.name," - ",void 0!==e.number?e.number:Object(u.jsx)("em",{children:'"Missing number!"'}),Object(u.jsx)("button",{style:{marginLeft:"10px"},onClick:function(){return t(e.id)},children:"Delete"})]},e.id)}))})]})},s=function(e){var n=e.addNameHandler;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Add new"}),Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{id:"name-input",type:"text",placeholder:"Add a new name..."}),Object(u.jsx)("br",{}),"number: ",Object(u.jsx)("input",{id:"number-input",type:"text",placeholder:"Add a new number..."})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})]})},d=t(3),l=t.n(d),f="/api/persons",b=function(){return l.a.get(f).then((function(e){return e.data}))},j=function(e){return l.a.post(f,{content:e}).then((function(e){return e.data}))},h=function(e){return l.a.delete("".concat(f,"/").concat(e)).then((function(e){return e}))},m=function(e,n){return l.a.put("".concat(f,"/").concat(n),{content:e}).then((function(e){return e.data}))},p=function(){var e=Object(r.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],i=Object(r.useState)(t),d=Object(o.a)(i,2),l=d[0],f=d[1],p=Object(r.useState)(""),x=Object(o.a)(p,2),g=x[0],w=x[1];Object(r.useEffect)((function(){b().then((function(e){c(e),f(e)}))}),[]);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(v,{message:g}),Object(u.jsx)(O,{personList:t,handler:function(e){f(e)}}),Object(u.jsx)(s,{addNameHandler:function(e){e.preventDefault();var n={name:e.target[0].value,number:e.target[1].value},r=void 0!==t.find((function(n){return n.name===e.target[0].value})),i=""!==n.number,o=""!==n.name;if(r){if(window.confirm("".concat(e.target[0].value," is already on the phonebook. Do you want to update their number?"))){var u=t.filter((function(e){return e.name===n.name}))[0].id;m(n,u).then((function(e){return c(t.filter((function(e){return e.id!==u})).concat(e)),f(l.filter((function(e){return e.id!==u})).concat(e)),e.name})).then((function(e){w("Modified ".concat(e,"'s entry on the phonebook!")),setTimeout((function(){w("")}),3e3)}))}}else i&&o?j(n).then((function(e){return c(t.concat(e)),f(l.concat(e)),e.name})).then((function(e){w("Added ".concat(e," to the phonebook!")),setTimeout((function(){w("")}),3e3)})):i?alert("Please enter a name"):alert("Please include ".concat(n.name,"'s number'"));e.target[0].value="",e.target[1].value=""}}),Object(u.jsx)(a,{personList:l,deleteHandler:function(e){window.confirm("Delete ".concat(t.find((function(n){return n.id===e})).name,"?"))&&h(e).then((function(n){var r=t.filter((function(n){return n.id!==e}));c(r),f(r)})).then((function(){w("Deletion complete!"),setTimeout((function(){w("")}),3e3)})).catch((function(n){console.log("ERROR DELETING NUMBER: The number has already been deleted from the server"),w("".concat(t.find((function(n){return n.id===e})).name," has already been deleted from the server!")),setTimeout((function(){w("")}),3e3),c(t.filter((function(n){return n.id!==e}))),f(t.filter((function(n){return n.id!==e})))}))}})]})},O=function(e){var n=e.personList,t=e.handler;return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:function(e){return e.preventDefault()},children:["filter shown with: ",Object(u.jsx)("input",{onChange:function(e){e.preventDefault();var r=n.filter((function(n){return""===e.target.value||RegExp("".concat(e.target.value),"i").test(n.name)}));t(r)}})]})})},v=function(e){var n=e.message;return""===n?null:Object(u.jsx)("div",{className:"notification",children:Object(u.jsx)("h3",{children:n})})};i.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.1708572e.chunk.js.map