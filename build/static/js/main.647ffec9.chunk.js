(this.webpackJsonpmg_client=this.webpackJsonpmg_client||[]).push([[0],{152:function(e,t,n){},153:function(e){e.exports=JSON.parse('{"colors":{"black":"#000000","white":"#ffffff","blue01":"#39536f","blue02":"#496a8c","blue03":"#5980a9","blueLight01":"#bfd6ef","grey01":"#808080","grey02":"#e8e8e8"},"materialUI":{"primary":"colors.blue01","secondary":"colors.blue02"},"backgrounds":{"primary":"colors.blue01","secondary":"colors.blueLight01","active":"colors.blue02","hover":"colors.blue03","code":"colors.grey02"},"texts":{"primary":"colors.white","secondary":"colors.blue01","placeholder":"colors.grey01"},"searchBar":{"bg":"backgrounds.primary","fg":"texts.primary"},"schemePanel":{"bg":"backgrounds.code","divider":"colors.blue02","selected":"texts.primary","notSelected":"colors.blue03"},"canvases":{"bg":"backgrounds.secondary","fg":"texts.secondary","moveOnCircle":"colors.blueLight01","moveOnText":"colors.blue01","packBgStart":"backgrounds.primary","packBgEnd":"backgrounds.hover"}}')},154:function(e){e.exports=JSON.parse('{"icons":{"back":{"type":null,"name":"keyboard_arrow_left"},"remove":{"type":null,"name":"delete_outline"},"edit":{"type":null,"name":"edit"},"add":{"type":null,"name":"add"},"playCircle":{"type":null,"name":"play_circle_filled"},"list":{"type":null,"name":"view_list"}},"searchBar":{"back":"icons.back"},"listItem":{"remove":"icons.remove","edit":"icons.edit"},"leftPanel":{"add":"icons.add"},"schemePanel":{"code":"icons.playCircle","scheme":"icons.list"}}')},155:function(e){e.exports=JSON.parse('{"flexViews":{"leftPanel":0.2,"schemePanel":0.3},"zIndexViews":{"leftPanel":3,"schemePanel":2,"mainCanvas":1}}')},156:function(e){e.exports=JSON.parse('{"schemePanel":{"transition":3000,"showEditor":3000,"removeCanvas":4000}}')},174:function(e,t,n){e.exports=n(295)},179:function(e,t,n){},215:function(e,t){},217:function(e,t){},252:function(e,t){},253:function(e,t){},295:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),c=n.n(i),o=(n(179),n(11)),l=n(164),s=n(328),u=n(153),f=n(154),d=n(155),h=n(156);function m(e,t){if(!t)return e;var n=e;"string"===typeof t&&(t=t.split(/[.,]/));for(var a=0;a<t.length;a++){if("undefined"===typeof n)return;n=n[t[a]]}return n}var v=function(e){return m(d,e)},b=function(e){return m(h,e)},g=function e(t){var n=m(u,t);return"string"!==typeof n?n:n.startsWith("#")?n:n.indexOf(".")>-1||n.indexOf(",")>-1?e(n):void 0},y=function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=n?"type":"name",r=m(f,t);return"string"===typeof r&&(r.indexOf(".")>-1||r.indexOf(",")>-1)?e(r,n):r?r[a]?r[a]:r:void 0},p=function(e){return e},k=n(13),w=n(3),x=n.n(w),O=n(14);function C(){var e=Object(k.a)(["\n  position: absolute;\n  top: ",";\n  bottom: ",";\n  left: ",";\n  right: ",";\n  opacity: ",";\n  background: ",";\n"]);return C=function(){return e},e}var j=O.a.div(C(),(function(e){return e.top||0}),(function(e){return e.bottom||0}),(function(e){return e.left||0}),(function(e){return e.right||0}),(function(e){return e.opacity}),(function(e){return e.mask}));j.defaultProps={opacity:.7,mask:"white"},j.propTypes={opacity:x.a.number,mask:x.a.string};var E=j;function P(){var e=Object(k.a)(["\n  z-index: ",";\n  position: relative;\n  min-width: 100px;\n  height: ",";\n  background: ",";\n  display: flex;\n  flex: ",";\n  flex-direction: column;\n  justify-content: flex-start;\n  overflow: auto;\n  box-shadow: 1px 0px 4px 0px ",";\n"]);return P=function(){return e},e}var S=O.a.div(P(),(function(e){return e.zIndex}),(function(e){return e.height}),(function(e){return e.background}),(function(e){return e.flex}),(function(e){return e.shadowColor}));S.defaultProps={zIndex:1,flex:.2,height:"100%",background:"inherit",shadowColor:"rgb(93, 107, 140)"},S.propTypes={flex:x.a.number,height:x.a.oneOfType([x.a.string,x.a.number]),background:x.a.string,shadowColor:x.a.string};var B=S,L=n(324),I=n(326),z=n(321);function T(){var e=Object(k.a)(["  \n  z-index: ",";\n  position: relative; \n  overflow: hidden;\n  min-height: 50px;\n  height: ",";\n  width: ",";\n  background: ",";\n  color: ",";\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  cursor:  ",";\n  box-shadow: 0px 1px 4px 0px ",";\n  :hover {\n    background: ",";\n    color: ",";\n  }\n  :active {\n    background: ",";\n    color: ",";\n  }\n"]);return T=function(){return e},e}var D=O.a.div(T(),(function(e){return e.zIndex}),(function(e){return e.height}),(function(e){return e.width}),(function(e){return e.background}),(function(e){return e.color}),(function(e){return e.menuItem&&"pointer"}),(function(e){return e.shadowColor}),(function(e){return e.menuItem&&g("backgrounds.hover")}),(function(e){return e.menuItem&&g("texts.primary")}),(function(e){return e.menuItem&&g("backgrounds.active")}),(function(e){return e.menuItem&&g("texts.primary")}));D.defaultProps={zIndex:1,width:"100%",height:"50px",background:"inherit",color:g("texts.secondary"),shadowColor:"rgb(93, 107, 140)"},D.propTypes={width:x.a.oneOfType([x.a.string,x.a.number]),height:x.a.oneOfType([x.a.string,x.a.number]),background:x.a.string,shadowColor:x.a.string};var K=D;function R(){var e=Object(k.a)(["   \n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  padding: 0 10px;\n  width: ",";\n  color: ",";\n  font-size: ",";\n  font-weight:  ",";\n"]);return R=function(){return e},e}var N=O.a.div(R(),(function(e){return e.width||"fit-content"}),(function(e){return e.color||"inherit"}),(function(e){return e.fontSize||"inherit"}),(function(e){return e.weight||"400"})),A=Object(z.a)((function(e){return{btn:{marginLeft:10,marginTop:2,color:g("searchBar.fg")}}}));var V=function(e){var t=e.label,n=e.nested,a=e.onBack,i=A();return r.a.createElement(K,{background:g("searchBar.bg")},function(){if(n)return r.a.createElement(L.a,{className:i.btn,size:"small",onClick:a},r.a.createElement(I.a,null,y("searchBar.back")))}(),r.a.createElement(N,{color:g("searchBar.fg")},t))};function _(){var e=Object(k.a)(["   \n  width: ",";\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n"]);return _=function(){return e},e}function J(){var e=Object(k.a)(["   \n  width: ",";\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n"]);return J=function(){return e},e}O.a.div(J(),(function(e){return e.width||"50px"}));var F=O.a.div(_(),(function(e){return e.width||"50px"}));function G(){var e=Object(k.a)(["\n  justify-content: space-between;\n  background: ",";\n  color: ",";\n"]);return G=function(){return e},e}var M=Object(O.a)(K)(G(),(function(e){return e.selected?g("backgrounds.primary"):"inherit"}),(function(e){return e.selected?g("texts.primary"):"inherit"})),U=Object(z.a)((function(e){return{btn:{color:g("texts.primary"),padding:5,fontSize:20}}}));var W=function(e){var t=e.label,n=e.handleRowClick,a=e.handleRemove,i=(e.handleEdit,e.parent),c=U(),l=Object(o.useBranch)({selected:["selected"]}).selected,s=function(e){e.stopPropagation(),a(t)},u=l==="".concat(i,":").concat(t);return r.a.createElement(M,{key:t,menuItem:!0,selected:u,onClick:function(){n(t)}},r.a.createElement(N,null,t),r.a.createElement(F,{width:"50px"},null,r.a.createElement(L.a,{size:"small",onClick:s},r.a.createElement(I.a,{className:c.btn},y("listItem.remove")))))},X=n(30),Y=n(329);function q(){var e=Object(k.a)(["\n  position: absolute;\n  top: ",";\n  bottom: ",";\n  left: ",";\n  right: ",";\n  background: transparent;\n"]);return q=function(){return e},e}var H=O.a.div(q(),(function(e){return e.top}),(function(e){return e.bottom}),(function(e){return e.left}),(function(e){return e.right}));H.defaultProps={top:0,bottom:0,left:0,right:0},H.propTypes={top:x.a.number,bottom:x.a.number,left:x.a.number,right:x.a.number};var Q=H,Z=!1,$=Object(z.a)((function(e){return{btn:{color:g("texts.secondary"),padding:5,fontSize:20}}}));var ee,te=function(e){var t=e.label,n=e.handleAdd,i=$(),c=Object(a.useState)(""),o=Object(X.a)(c,2),l=o[0],s=o[1];Object(a.useEffect)((function(){Z=!1}),[]);var u=function(){n(l),s("")};return r.a.createElement(K,{style:{cursor:"pointer"},onKeyUp:function(e){if(l)switch(e.key){case"Escape":s("");break;case"Enter":u()}}},r.a.createElement(Y.a,{autoFocus:Z,fullWidth:!0,value:l,onChange:function(e){Z||(Z=!0),s(e.target.value.trimStart())},label:t,variant:"filled"}),l?r.a.createElement(Q,{left:null},r.a.createElement(K,null,r.a.createElement(L.a,{size:"small",onClick:u},r.a.createElement(I.a,{className:i.btn},y("leftPanel.add"))))):null)},ne=n(187),ae="http://localhost:5588/mocking_G";function re(e,t){var n="".concat(ae).concat(e),a={params:t};return ne.get(n,a)}function ie(e,t){e.set(["selectedLibrary"],t)}function ce(e,t){e.set(["libs"],t)}function oe(e,t){e.set(["focus","lib"],t),t&&ie(e,t)}function le(e,t){re("/addLibrary",{library:t}).then((function(t){e.set("libs",t.data)})).catch((function(e){console.log(e.response.data.message)}))}function se(e,t){re("/removeLibrary",{library:t}).then((function(t){e.set("libs",t.data)}))}function ue(e,t){re("/getCategoriesFromLibrary",{library:t}).then((function(n){e.set("cats",n.data),setTimeout((function(){e.set(["focus","lib"],t),ie(e,t)}))}))}var fe=function(e){ee=e},de=function(){return ee};function he(e,t){e.set(["selectedCategory"],t)}function me(e,t){e.set(["cats"],t)}function ve(e,t){e.set(["focus","cat"],t),t&&he(e,t)}function be(e,t){re("/addCategory",{library:e.get(["focus","lib"]),category:t}).then((function(t){e.set("cats",t.data)})).catch((function(e){console.log(e.response.data.message)}))}function ge(e,t){re("/removeCategory",{library:e.get(["focus","lib"]),category:t}).then((function(t){e.set("cats",t.data)}))}function ye(e,t){re("/getScheme",{library:e.get(["focus","lib"]),category:t}).then((function(n){e.set("items",n.data),setTimeout((function(){e.set(["focus","cat"],t),he(e,t),function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;re("/generate",{library:e.get(["focus","lib"]),category:t,amount:n}).then((function(t){e.set("mockData",t.data)})).catch((function(t){e.set("mockData",null),console.log(t.response.data.message)}))}(e,t)}))}))}function pe(e,t){var n=t.newKey,a=t.schemeName,r=e.get("viewKey"),i=e.get(["focus","lib"]),c=de();r!==n?(e.set("viewKey",n),setTimeout((function(){c.onCategorySelected(i,a)}),200)):c.onCategorySelected(i,a)}function ke(e,t){!function(e,t){re("/generate",{scheme:t,amount:arguments.length>2&&void 0!==arguments[2]?arguments[2]:1}).then((function(t){e.set("mockData",t.data)})).catch((function(t){e.set("mockData",null),console.log(t.response.data.message)}))}(e,t,1),function(e,t){var n=e.get("selectedLibrary"),a=e.get("selectedCategory"),r=de();re("/replaceScheme",{scheme:t,library:n,category:a}).then((function(t){e.set("items",t.data),r.onChangeFromEditor(n,a,t.data)})).catch((function(e){console.log(e.response.data.message)}))}(e,t)}function we(e,t){e.set(["focus","item"],t)}function xe(e,t){var n=e.get(["focus","cat"]);e.set(["selected"],"".concat(n,":").concat(t))}function Oe(e,t){var n=e.get(["focus"]);re("/removeFromScheme",{library:n.lib,category:n.cat,field:t}).then((function(t){e.set("items",t.data)}))}function Ce(e,t){var n=t.newKey,a=t.schemeName,r=e.get("viewKey"),i=e.get("focus"),c=de();r!==n?(e.set("viewKey",n),setTimeout((function(){c.onItemSelected(i.lib,i.cat,a)}),200)):c.onItemSelected(i.lib,i.cat,a)}var je=function(){var e=Object(o.useBranch)({libs:["libs"]}),t=e.libs,n=e.dispatch,i=Object(o.useBranch)({cats:["cats"]}).cats,c=Object(o.useBranch)({items:["items"]}).items,l=Object(o.useBranch)({focus:["focus"]}).focus,s=de();Object(a.useEffect)((function(){re("/getAllLibraries").then((function(e){n(ce,e.data)}))}),[]);var u=v("zIndexViews.leftPanel"),f=v("flexViews.leftPanel");return r.a.createElement(B,{flex:f,zIndex:u},r.a.createElement(V,{label:function(){var e=l.lib,t=l.cat;return e&&t?"".concat(e," - ").concat(t):e||p("Project Name")}(),nested:l.lib,onBack:function(){var e=l.lib;l.cat?(n(ve,null),s.onBack(e)):e&&(n(oe,null),s.onBack())}}),r.a.createElement((function(){var e=l.lib?"cats":"libs";l.lib&&(e=l.cat?"items":"cats");switch(e){case"libs":return r.a.createElement(te,{label:p("Add Library"),handleAdd:function(e){e=e.trim(),n(le,e),s.onAddLibrary(e)}});case"cats":return r.a.createElement(te,{label:p("Add Category"),handleAdd:function(e){e=e.trim(),n(be,e),s.onAddCategory(l.lib,e)}});case"items":return r.a.createElement(te,{label:p("Add Field"),handleAdd:function(e){e=e.trim()}});default:return}}),null),r.a.createElement(B,{flex:1},r.a.createElement((function(){var e=l.lib?"cats":"libs";l.lib&&(e=l.cat?"items":"cats");var a=function(e){n(ue,e),s.onLibrarySelected(e)},o=function(e){n(ye,e),s.onCategorySelected(l.lib,e),n(pe,{newKey:"showScheme",schemeName:e})},u=function(e){n(xe,e),n(Ce,{newKey:"showScheme",schemeName:e})},f=function(e){n(se,e),s.onRemoveLibrary(e)},d=function(e){n(ge,e),s.onRemoveCategory(l.lib,e)},h=function(e){n(Oe,e),s.onRemoveItem(l.lib,l.cat,e)},m=function(e){},v=function(e){};switch(e){case"libs":return t.map((function(e){return r.a.createElement(W,{key:e,label:e,handleRowClick:a,handleRemove:f,handleEdit:m})}));case"cats":return i.map((function(e){return r.a.createElement(W,{key:e,parent:l.lib,label:e,handleRowClick:o,handleRemove:d,handleEdit:v})}));case"items":return Object.keys(c).map((function(e){return r.a.createElement(W,{key:e,parent:l.cat,label:e,handleRowClick:u,handleRemove:h})}));default:return null}}),null)))},Ee=n(163),Pe=n.n(Ee);n(209),n(210),n(211);var Se=function(e){var t=e.width,n=e.data,i=e.isData,c=Object(o.useBranch)({items:["focus","cat"]}).dispatch,l=Object(a.useState)(""),s=Object(X.a)(l,2),u=s[0],f=s[1],d=Object(a.useState)(""),h=Object(X.a)(d,2),m=h[0],v=h[1],b=JSON.stringify(n,null,2);null!==n&&b!==u&&(f(b),v(b));var g={height:"100%",width:t};return r.a.createElement(Pe.a,{style:g,placeholder:"Placeholder Text",mode:"json",theme:"xcode",name:"blah2",onLoad:function(){},onChange:function(e){v(e),i||function(e){try{e=JSON.parse(e),c(ke,e)}catch(t){}}(e)},fontSize:14,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,value:m,setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!1,enableSnippets:!1,showLineNumbers:!0,tabSize:2}})},Be=n(330),Le=n(327);function Ie(){var e=Object(k.a)(['\n  &:before {\n    content: "";\n    height: 35px;\n    margin-right: 5px;\n    border-left: solid 1px ',";\n  }\n"]);return Ie=function(){return e},e}var ze=Object(O.a)(F)(Ie(),g("schemePanel.divider")),Te=Object(z.a)((function(e){return{selectedBtn:{color:g("schemePanel.selected"),fontSize:11},btn:{color:g("schemePanel.notSelected"),fontSize:11},indicator:{backgroundColor:g("schemePanel.selected")}}}));function De(e){var t=e.onSwitch,n=e.value,a="code"===n,i=!e.mockData,c=Te(),o=a?c.selectedBtn:c.btn,l=a?c.btn:c.selectedBtn;return r.a.createElement(ze,{width:"fit-content"},r.a.createElement(Be.a,{value:n,onChange:function(e,n){t(n)},classes:{indicator:c.indicator}},r.a.createElement(Le.a,{classes:{root:l},label:p("Scheme"),value:"scheme"}),r.a.createElement(Le.a,{classes:{root:o},label:p("Generate"),value:"code",disabled:i})))}De.defaultProps={onSwitch:1,value:"100%"};var Ke=De,Re=n(37),Ne=n(26),Ae=n(72),Ve=n(73),_e=n(27),Je=n(74),Fe=n(18),Ge=n(58),Me=function(e){function t(e){var n;return Object(Re.a)(this,t),(n=Object(Ae.a)(this,Object(Ve.a)(t).call(this,e))).width=0,n.height=0,n.measure=n.measure.bind(Object(_e.a)(n)),n.createCanvas=n.createCanvas.bind(Object(_e.a)(n)),n}return Object(Je.a)(t,e),Object(Ne.a)(t,[{key:"componentDidMount",value:function(){this.measure();var e=this.createCanvas();this.do(e)}},{key:"do",value:function(e){var t=this.props.margin,n=this.width-(t.left+t.right),a=this.height-(t.top+t.bottom);return this.props.canvasReady(e,n,a)}},{key:"createCanvas",value:function(){var e=this.props.margin;return Fe.i("#".concat(this.id)).append("svg").attr("width",this.width).attr("height",this.height).append("g").attr("transform","translate(".concat(e.left,",").concat(e.top,")"))}},{key:"measure",value:function(){var e=document.getElementById(this.id).getBoundingClientRect();this.width=e.width,this.height=e.height}},{key:"render",value:function(){return this.id="cont"+Object(Ge.v4)(),r.a.createElement("div",{id:this.id,style:{height:"100%",width:"100%"}})}}]),t}(a.Component);Me.defaultProps={margin:{top:0,bottom:0,left:0,right:0}};var Ue=null,We=function(e,t,n){var a=Fe.f().x((function(e){return e.x})).y((function(e){return e.y})).curve(Fe.a);t.on("mouseout",(function(){Ue=null})),t.on("mousemove",(function(t,r){var i={x:Fe.d.offsetX,y:Fe.d.offsetY};if(Ue){var c=[Ue,i];Ue=i,e.append("path").attr("d",a(c)).attr("fill","none").attr("stroke",n).attr("stroke-width",2).transition().duration(450).attr("stroke-width",0).ease((function(e){return Fe.b(e)})).transition().duration(10).remove()}else Ue=i}))},Xe=function(e,t,n,a){n.on("mousemove",(function(n,r){var i={x:Fe.d.offsetX,y:Fe.d.offsetY};e.append("circle").attr("cx",i.x).attr("cy",i.y).attr("r",1).attr("fill",a).transition().duration(1500).attr("cy",t).ease((function(e){return Fe.c(e)})).transition().duration(10).remove()}))};n(152);var Ye=function(){var e=Object(o.useBranch)({viewKey:["viewKey"]}).viewKey,t=Object(a.useState)(!1),n=Object(X.a)(t,2),i=n[0],c=n[1];if(i)return null;"initKey"!==e&&setTimeout((function(){c(!0)}),b("schemePanel.removeCanvas"));var l=function(e,t,n){var a=function(e,t,n){var a=e.append("rect").attr("width",t).attr("height",n).attr("fill",g("canvases.fg"));return a.transition().duration(b("schemePanel.removeCanvas")).attr("fill","transparent"),a}(e,t,n);Xe(e,n,a,g("canvases.bg"))};return r.a.createElement("div",{style:{width:"30vw",flex:1,cursor:"none",overflow:"hidden"}},r.a.createElement(Me,{canvasReady:l,margin:{top:0,bottom:0,left:0,right:0}}))};function qe(){var e=Object(k.a)(["\n  min-width: 0;\n  transition: flex ","ms;\n  box-shadow: -2px 0px 4px 4px rgb(17, 38, 90);\n"]);return qe=function(){return e},e}function He(){var e=Object(k.a)(["\n  justify-content: space-between;\n"]);return He=function(){return e},e}function Qe(){var e=Object(k.a)(["\n  flex: ",";\n"]);return Qe=function(){return e},e}var Ze=Object(O.a)(K)(Qe(),(function(e){return e.flex})),$e=Object(O.a)(K)(He()),et=Object(O.a)(B)(qe(),b("schemePanel.transition"));var tt=function(){var e=Object(o.useBranch)({viewKey:["viewKey"]}).viewKey,t=Object(o.useBranch)({items:["items"]}).items,n=Object(o.useBranch)({mockData:["mockData"]}).mockData,i=Object(o.useBranch)({selectedCategory:["selectedCategory"]}).selectedCategory,c=Object(a.useRef)(),l=Object(a.useState)(0),s=Object(X.a)(l,2),u=s[0],f=s[1],d=Object(a.useState)("scheme"),h=Object(X.a)(d,2),m=h[0],y=h[1],p=function(e){y(e)},k="initKey"!==e?v("flexViews.schemePanel"):0,w="initKey"!==e?.99:0,x=v("zIndexViews.schemePanel");return r.a.createElement(Ze,{ref:c,flex:k,zIndex:x,background:g("canvases.bg"),height:"100%",shadowColor:"none"},r.a.createElement(et,{flex:w,background:g("schemePanel.bg")},r.a.createElement($e,{background:g("searchBar.bg")},r.a.createElement(N,{color:g("searchBar.fg"),style:{minWidth:120}},i),r.a.createElement(Ke,{onSwitch:p,value:m,mockData:n})),"initKey"===e?null:r.a.createElement(Ye,null),function(){var a="code"===m;if("initKey"===e)return null;if(setTimeout((function(){c.current&&f(c.current.getBoundingClientRect().width)}),b("schemePanel.showEditor")),0===u)return null;var i=u-u/100,o=t;return a&&(o=n),r.a.createElement(Se,{isData:a,width:i,data:o})}()))},nt=n(19),at=function(e){function t(e){return Object(Re.a)(this,t),Object(Ae.a)(this,Object(Ve.a)(t).call(this,e))}return Object(Je.a)(t,e),Object(Ne.a)(t,[{key:"findLibrary",value:function(e){return Object(nt.find)(this.mainData.children,(function(t){return t.name===e}))}},{key:"findCategory",value:function(e,t){return Object(nt.find)(e.children,(function(e){return e.name===t}))}},{key:"findItem",value:function(e,t){return Object(nt.find)(e.children,(function(e){return e.name===t}))}},{key:"onLibrarySelected",value:function(e){var t=this.findLibrary(e);this.createPack(t)}},{key:"onCategorySelected",value:function(e,t){var n=this.findLibrary(e),a=this.findCategory(n,t);this.createPack(a)}},{key:"onItemSelected",value:function(e,t,n){var a=this.findLibrary(e),r=this.findCategory(a,t),i=this.findItem(r,n);this.createPack(i)}},{key:"onRemoveLibrary",value:function(e){var t=this.mainData;t.children=t.children.filter((function(t){return t.name!==e})),this.createPack(t)}},{key:"onRemoveCategory",value:function(e,t){var n=this.findLibrary(e);n.children=n.children.filter((function(e){return e.name!==t})),this.createPack(n)}},{key:"onRemoveItem",value:function(e,t,n){var a=this.findLibrary(e),r=this.findCategory(a,t);r.children=r.children.filter((function(e){return e.name!==n})),this.createPack(r)}},{key:"onChangeFromEditor",value:function(e,t,n){var a=this.mainData,r=this.findLibrary(e),i=this.findCategory(r,t),c={name:i.name,value:1,children:[],id:i.id,level:2};i=this.normalizeData(n,c);var o=Object(nt.findIndex)(a.children,["name",e]),l=Object(nt.findIndex)(r.children,["name",t]);a.children[o].children[l]=i,this.createPack(i)}},{key:"onAddLibrary",value:function(e){var t=this.mainData;t.children.push({name:e,value:1,children:[],id:Object(Ge.v4)(),level:1}),this.createPack(t)}},{key:"onAddCategory",value:function(e,t){var n=this.findLibrary(e);n.children.push({name:t,value:1,children:[],id:Object(Ge.v4)(),level:2}),this.createPack(n)}},{key:"onBack",value:function(e){var t=this.mainData;if(e){var n=this.findLibrary(e);return this.createPack(n)}this.createPack(t)}}]),t}(function(){function e(t){Object(Re.a)(this,e),this.circlePadding=Object(nt.get)(t,"circlePadding",30),this.margin=Object(nt.get)(t,"margin",45),this.marginBottom=Object(nt.get)(t,"marginBottom",10),this.showMainCircle=Object(nt.get)(t,"showMainCircle",!0),this.moveOnCircleColor=Object(nt.get)(t,"moveOnCircleColor",g("canvases.moveOnCircle")),this.moveOnTextColor=Object(nt.get)(t,"moveOnTextColor",g("canvases.moveOnText")),this.getTranslate=this.getTranslate.bind(this),this.createPack=this.createPack.bind(this),this.normalizeData=this.normalizeData.bind(this),this.firstLevelClick=function(){},this.secondLevelClick=function(){},this.thirdLevelClick=function(){},this.onClick=function(){},this.clickIsBlock=!1,this.packDomain=0,this.colorScaleRange=[g("canvases.packBgStart"),g("canvases.packBgEnd")],this.init(t)}return Object(Ne.a)(e,[{key:"init",value:function(e){this.canvas=e.canvas,this.width=e.width,this.height=e.height,this.mainGroup=this.canvas.append("g").attr("class","pack"),this.mainData=this.normalizeData(e.data),this.createPack(this.mainData,!0)}},{key:"normalizeData",value:function(e,t){if(t||(t={name:"Project Name",value:1,children:[],id:"id",level:0}),"string"==typeof e||"number"==typeof e)return t.value=1,t.name="".concat(t.name,": ").concat(e),delete t.children,t;for(var n in e){var a={name:n,value:1,children:[],id:"".concat(t.id,"-").concat(n),level:t.level+1},r=this.normalizeData(e[n],a);t.value+=r.value,t.children.push(a)}return t}},{key:"createPack",value:function(e,t){var n=this.width,a=this.height,r=this.margin,i=this.circlePadding,c=this.showMainCircle,o=[n,a-r];t&&(this.mainData=e),this.packDomain=e.value;var l=Fe.g().size(o).padding(i),s=Fe.e(e);l(s);var u=s.descendants();u=u.filter((function(e){return c?e.depth<3:e.depth>0&&e.depth<3})),this.createNodes(u)}},{key:"createNodes",value:function(e){var t=this.moveOnCircleColor,n=this.moveOnTextColor,a=this.canvas,r=this.mainGroup;this.paintCircles(e),this.paintTexts(e);var i=r.selectAll("circle"),c=r.selectAll("text");We(a,i,t),We(a,c,n),this.handleNodeClick(i,c)}},{key:"paintCircles",value:function(e){var t=this,n=this.colorScaleRange,a=this.packDomain,r=this.mainGroup,i=Fe.h().domain([0,a]).range(n),c=r.selectAll("circle").data(e,(function(e){return e.data.id}));return c.enter().append("circle").attr("r",0).attr("transform",t.getTranslate).attr("fill-opacity",.5).transition().duration(2e3).attr("fill",(function(e){return i(e.data.value)})).attr("transform",t.getTranslate).attr("r",(function(e){return e.r})),function(e){e.exit().transition().duration(2e3).attr("r",0).transition().remove()}(c),function(e){e.transition().duration(2e3).attr("fill",(function(e){return i(e.data.value)})).attr("transform",t.getTranslate).attr("r",(function(e){return e.r}))}(c),c}},{key:"paintTexts",value:function(e){var t=this,n=this.mainGroup,a=function(e){return Object(nt.isEmpty)(e.data.children)||2===e.depth},r=function(e){var t=e.data.name,n=e.r,r=25;return a(e)?(r=n<70?16:r,r=n<50?14:r,r=n<40?12:r,r=n<35?9:r,r=n<30?7:r,r=n<20?3:r,t.length<=r?t:t.substring(0,r)+"..."):t},i=function(e){var t=Math.floor(e.r/3);return t=(t=(t=t<8?8:t)>14?14:t)>30?20:t},c=function(e){return 0!==e.depth||Object(nt.isEmpty)(e.data.children)?a(e)?0:-(e.r+5):-(e.r+10)},o=n.selectAll("text").data(e,(function(e){return e.data.id}));return o.enter().append("text").attr("transform",t.getTranslate).attr("y",c).attr("class",(function(e){return a(e)?"light-text":"text"})).attr("text-anchor","middle").attr("font-size","0").text((function(e){return r(e)})).transition().duration(2e3).attr("font-size",(function(e){return i(e)})),function(e){e.exit().transition().duration(2e3).attr("font-size",0).transition().remove()}(o),function(e){e.transition().duration(1e3).attr("font-size",0).transition().duration(10).attr("transform",t.getTranslate).transition().duration(1e3).text((function(e){return r(e)})).attr("y",c).attr("class",(function(e){return a(e)?"light-text":"text"})).attr("font-size",(function(e){return i(e)}))}(o),o}},{key:"handleNodeClick",value:function(e,t){var n=this,a=function(e){if(!n.clickIsBlock&&0!==e.depth){switch(2===e.depth&&(e=e.parent),e.data.level){case 1:n.firstLevelClick(e.data.name);break;case 2:n.secondLevelClick(e.data.name);break;case 3:n.thirdLevelClick(e.data.name);break;default:n.onClick(e.data.name)}n.createPack(e.data),n.clickIsBlock=!0,setTimeout((function(){n.clickIsBlock=!1}),2e3)}};e.on("click",(function(e){a(e)})),t.on("click",(function(e){a(e)}))}},{key:"getTranslate",value:function(e){return"translate(".concat(e.x,",").concat(e.y+this.margin-this.marginBottom,")")}},{key:"setLevelClick",value:function(e,t){switch(e){case 1:this.firstLevelClick=t;break;case 2:this.secondLevelClick=t;break;case 3:this.thirdLevelClick=t;break;default:this.onClick=t}}}]),e}());var rt=function(){var e=Object(o.useBranch)({viewKey:["viewKey"]}),t=e.viewKey,n=e.dispatch,a=function(e){re("/getCategoriesFromLibrary",{library:e}).then((function(t){n(me,t.data),setTimeout((function(){n(oe,e)}))}))},i=function(e){n(ye,e),n(pe,{newKey:"showScheme",schemeName:e})},c=function(e){n(we,e),n(xe,e)},l=function(e,t,n){var r=function(e,t,n){return e.append("rect").attr("width",t).attr("height",n).attr("fill",g("canvases.bg"))}(e,t,n);We(e,r,g("canvases.fg")),function(e,t,n){re("/getAll").then((function(r){var o=r.data,l=new at({canvas:e,width:t,height:n,data:o});l.setLevelClick(1,a),l.setLevelClick(2,i),l.setLevelClick(3,c),fe(l)}))}(e,t,n)},s=v("zIndexViews.schemePanel");return r.a.createElement("div",{style:{flex:function(){var e=v("flexViews.schemePanel"),n=v("flexViews.leftPanel");return"initKey"!==t?1-(n+e):1-n}(),cursor:"none",zIndex:s}},r.a.createElement(Me,{canvasReady:l,margin:{top:0,bottom:0,left:0,right:0}}))};var it=function(){var e=Object(o.useBranch)({viewKey:["viewKey"]}).viewKey;return r.a.createElement(E,{opacity:1,style:{display:"flex"}},r.a.createElement(je,null),r.a.createElement(tt,null),r.a.createElement(rt,{key:e}))},ct=g("materialUI.primary"),ot=g("materialUI.secondary"),lt=Object(l.a)({palette:{primary:{main:ct},secondary:{main:ot}}});var st=function(e){var t=e.tree,n=Object(o.useRoot)(t);return r.a.createElement(n,null,r.a.createElement(s.a,{theme:lt},r.a.createElement(it,null)))},ut=n(94),ft=new(n.n(ut).a)({libs:[],cats:[],items:null,mockData:null,focus:{lib:null,cat:null,item:null},selected:null,selectedCategory:null,selectedLibrary:null,viewKey:"initKey"});window.tree=ft;var dt=ft;c.a.render(r.a.createElement(st,{tree:dt}),document.getElementById("root"))}},[[174,1,2]]]);
//# sourceMappingURL=main.647ffec9.chunk.js.map