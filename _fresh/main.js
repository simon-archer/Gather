import{A,T,d,fe,le}from"./chunk-4M2GZMYH.js";typeof Deno<"u"&&window.__PREACT_DEVTOOLS__&&window.__PREACT_DEVTOOLS__.attachPreact("10.15.1",d,{Fragment:A,Component:T});function U(o,s){(s==null||s>o.length)&&(s=o.length);for(var p=0,f=new Array(s);p<s;p++)f[p]=o[p];return f}function R(o,s){var p=typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(p)return(p=p.call(o)).next.bind(p);if(Array.isArray(o)||(p=function(l,c){if(l){if(typeof l=="string")return U(l,c);var y=Object.prototype.toString.call(l).slice(8,-1);return y==="Object"&&l.constructor&&(y=l.constructor.name),y==="Map"||y==="Set"?Array.from(l):y==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(y)?U(l,c):void 0}}(o))||s&&o&&typeof o.length=="number"){p&&(o=p);var f=0;return function(){return f>=o.length?{done:!0}:{done:!1,value:o[f++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var C={};function m(o){return o.type===A?"Fragment":typeof o.type=="function"?o.type.displayName||o.type.name:typeof o.type=="string"?o.type:"#text"}var O=[],E=[];function W(){return O.length>0?O[O.length-1]:null}var H=!1;function A2(o){return typeof o.type=="function"&&o.type!=A}function d2(o){for(var s=[o],p=o;p.__o!=null;)s.push(p.__o),p=p.__o;return s.reduce(function(f,l){f+="  in "+m(l);var c=l.__source;return c?f+=" (at "+c.fileName+":"+c.lineNumber+")":H||(H=!0,console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")),f+`
`},"")}var D=typeof WeakMap=="function";function z(o){return o?typeof o.type=="function"?z(o.__):o:{}}var J=T.prototype.setState;T.prototype.setState=function(o,s){return this.__v==null&&this.state==null&&console.warn(`Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.

`+d2(W())),J.call(this,o,s)};var X=T.prototype.forceUpdate;function v(o){var s=o.props,p=m(o),f="";for(var l in s)if(s.hasOwnProperty(l)&&l!=="children"){var c=s[l];typeof c=="function"&&(c="function "+(c.displayName||c.name)+"() {}"),c=Object(c)!==c||c.toString?c+"":Object.prototype.toString.call(c),f+=" "+l+"="+JSON.stringify(c)}var y=s.children;return"<"+p+f+(y&&y.length?">..</"+p+">":" />")}T.prototype.forceUpdate=function(o){return this.__v==null?console.warn(`Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.

`+d2(W())):this.__P==null&&console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

`+d2(this.__v)),X.call(this,o)},function(){(function(){var t=d.__b,e=d.diffed,n=d.__,a=d.vnode,u=d.__r;d.diffed=function(r){A2(r)&&E.pop(),O.pop(),e&&e(r)},d.__b=function(r){A2(r)&&O.push(r),t&&t(r)},d.__=function(r,_){E=[],n&&n(r,_)},d.vnode=function(r){r.__o=E.length>0?E[E.length-1]:null,a&&a(r)},d.__r=function(r){A2(r)&&E.push(r),u&&u(r)}})();var o=!1,s=d.__b,p=d.diffed,f=d.vnode,l=d.__r,c=d.__e,y=d.__,M=d.__h,I=D?{useEffect:new WeakMap,useLayoutEffect:new WeakMap,lazyPropTypes:new WeakMap}:null,k=[];d.__e=function(t,e,n,a){if(e&&e.__c&&typeof t.then=="function"){var u=t;t=new Error("Missing Suspense. The throwing component was: "+m(e));for(var r=e;r;r=r.__)if(r.__c&&r.__c.__c){t=u;break}if(t instanceof Error)throw t}try{(a=a||{}).componentStack=d2(e),c(t,e,n,a),typeof t.then!="function"&&setTimeout(function(){throw t})}catch(_){throw _}},d.__=function(t,e){if(!e)throw new Error(`Undefined parent passed to render(), this is the second argument.
Check if the element is available in the DOM/has the correct id.`);var n;switch(e.nodeType){case 1:case 11:case 9:n=!0;break;default:n=!1}if(!n){var a=m(t);throw new Error("Expected a valid HTML node as a second argument to render.	Received "+e+" instead: render(<"+a+" />, "+e+");")}y&&y(t,e)},d.__b=function(t){var e=t.type,n=z(t.__);if(o=!0,e===void 0)throw new Error(`Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports`+v(t)+`

`+d2(t));if(e!=null&&typeof e=="object")throw e.__k!==void 0&&e.__e!==void 0?new Error("Invalid type passed to createElement(): "+e+`

Did you accidentally pass a JSX literal as JSX twice?

  let My`+m(t)+" = "+v(e)+`;
  let vnode = <My`+m(t)+` />;

This usually happens when you export a JSX literal and not the component.

`+d2(t)):new Error("Invalid type passed to createElement(): "+(Array.isArray(e)?"array":e));if(e!=="thead"&&e!=="tfoot"&&e!=="tbody"||n.type==="table"?e==="tr"&&n.type!=="thead"&&n.type!=="tfoot"&&n.type!=="tbody"&&n.type!=="table"?console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent."+v(t)+`

`+d2(t)):e==="td"&&n.type!=="tr"?console.error("Improper nesting of table. Your <td> should have a <tr> parent."+v(t)+`

`+d2(t)):e==="th"&&n.type!=="tr"&&console.error("Improper nesting of table. Your <th> should have a <tr>."+v(t)+`

`+d2(t)):console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent."+v(t)+`

`+d2(t)),t.ref!==void 0&&typeof t.ref!="function"&&typeof t.ref!="object"&&!("$$typeof"in t))throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [`+typeof t.ref+`] instead
`+v(t)+`

`+d2(t));if(typeof t.type=="string"){for(var a in t.props)if(a[0]==="o"&&a[1]==="n"&&typeof t.props[a]!="function"&&t.props[a]!=null)throw new Error(`Component's "`+a+'" property should be a function, but got ['+typeof t.props[a]+`] instead
`+v(t)+`

`+d2(t))}if(typeof t.type=="function"&&t.type.propTypes){if(t.type.displayName==="Lazy"&&I&&!I.lazyPropTypes.has(t.type)){var u="PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";try{var r=t.type();I.lazyPropTypes.set(t.type,!0),console.warn(u+"Component wrapped in lazy() is "+m(r))}catch{console.warn(u+"We will log the wrapped component's name once it is loaded.")}}var _=t.props;t.type.__f&&delete(_=function(h,w){for(var S in w)h[S]=w[S];return h}({},_)).ref,function(h,w,S,x,T2){Object.keys(h).forEach(function(g){var b;try{b=h[g](w,g,x,"prop",null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(L){b=L}b&&!(b.message in C)&&(C[b.message]=!0,console.error("Failed prop type: "+b.message+(T2&&`
`+T2()||"")))})}(t.type.propTypes,_,0,m(t),function(){return d2(t)})}s&&s(t)},d.__r=function(t){l&&l(t),o=!0},d.__h=function(t,e,n){if(!t||!o)throw new Error("Hook can only be invoked from render methods.");M&&M(t,e,n)};var N=function(t,e){return{get:function(){var n="get"+t+e;k&&k.indexOf(n)<0&&(k.push(n),console.warn("getting vnode."+t+" is deprecated, "+e))},set:function(){var n="set"+t+e;k&&k.indexOf(n)<0&&(k.push(n),console.warn("setting vnode."+t+" is not allowed, "+e))}}},Y={nodeName:N("nodeName","use vnode.type"),attributes:N("attributes","use vnode.props"),children:N("children","use vnode.props.children")},F=Object.create({},Y);d.vnode=function(t){var e=t.props;if(t.type!==null&&e!=null&&("__source"in e||"__self"in e)){var n=t.props={};for(var a in e){var u=e[a];a==="__source"?t.__source=u:a==="__self"?t.__self=u:n[a]=u}}t.__proto__=F,f&&f(t)},d.diffed=function(t){if(t.__k&&t.__k.forEach(function(g){if(typeof g=="object"&&g&&g.type===void 0){var b=Object.keys(g).join(",");throw new Error("Objects are not valid as a child. Encountered an object with the keys {"+b+`}.

`+d2(t))}}),o=!1,p&&p(t),t.__k!=null)for(var e=[],n=0;n<t.__k.length;n++){var a=t.__k[n];if(a&&a.key!=null){var u=a.key;if(e.indexOf(u)!==-1){console.error('Following component has two or more children with the same key attribute: "'+u+`". This may cause glitches and misbehavior in rendering process. Component: 

`+v(t)+`

`+d2(t));break}e.push(u)}}if(t.__c!=null&&t.__c.__H!=null){var r=t.__c.__H.__;if(r)for(var _=0;_<r.length;_+=1){var h=r[_];if(h.__H){for(var w,S=R(h.__H);!(w=S()).done;)if((T2=w.value)!=T2){var x=m(t);throw new Error("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index "+_+" in component "+x+" was called with NaN.")}}}}var T2}}();var BUILD_ID="db2fcfc9a4d6eb78162ef609ff0cb84366516120";var ASSET_CACHE_BUST_KEY="__frsh_c";function asset(path){if(!path.startsWith("/")||path.startsWith("//"))return path;try{let url=new URL(path,"https://freshassetcache.local");return url.protocol!=="https:"||url.host!=="freshassetcache.local"||url.searchParams.has(ASSET_CACHE_BUST_KEY)?path:(url.searchParams.set(ASSET_CACHE_BUST_KEY,BUILD_ID),url.pathname+url.search+url.hash)}catch(err){return console.warn(`Failed to create asset() URL, falling back to regular path ('${path}'):`,err),path}}function assetSrcSet(srcset){if(srcset.includes("("))return srcset;let parts=srcset.split(","),constructed=[];for(let part of parts){let trimmed=part.trimStart(),leadingWhitespace=part.length-trimmed.length;if(trimmed==="")return srcset;let urlEnd=trimmed.indexOf(" ");urlEnd===-1&&(urlEnd=trimmed.length);let leading=part.substring(0,leadingWhitespace),url=trimmed.substring(0,urlEnd),trailing=trimmed.substring(urlEnd);constructed.push(leading+asset(url)+trailing)}return constructed.join(",")}function assetHashingHook(vnode){if(vnode.type==="img"||vnode.type==="source"){let{props}=vnode;if(props["data-fresh-disable-lock"])return;typeof props.src=="string"&&(props.src=asset(props.src)),typeof props.srcset=="string"&&(props.srcset=assetSrcSet(props.srcset))}}function createRootFragment(parent,replaceNode,endMarker){return replaceNode=[].concat(replaceNode),parent.__k={nodeType:1,parentNode:parent,firstChild:replaceNode[0],childNodes:replaceNode,insertBefore(node,child){parent.insertBefore(node,child??endMarker)},appendChild(child){parent.insertBefore(child,endMarker)},removeChild(child){parent.removeChild(child)}}}function isCommentNode(node){return node.nodeType===Node.COMMENT_NODE}function isTextNode(node){return node.nodeType===Node.TEXT_NODE}function isElementNode(node){return node.nodeType===Node.ELEMENT_NODE}function revive(islands,props){_walkInner(islands,props,[],[le(A,null)],document.body)}function ServerComponent(props){return props.children}ServerComponent.displayName="PreactServerComponent";function addPropsChild(parent,vnode){let props=parent.props;props.children===null?props.children=vnode:Array.isArray(props.children)?props.children.push(vnode):props.children=[props.children,vnode]}function _walkInner(islands,props,markerStack,vnodeStack,node){let sib=node;for(;sib!==null;){let marker=markerStack.length>0?markerStack[markerStack.length-1]:null;if(isCommentNode(sib)){let comment=sib.data;if(comment.startsWith("!--")&&(comment=comment.slice(3,-2)),comment.startsWith("frsh-slot"))markerStack.push({startNode:sib,text:comment,endNode:null,kind:1}),vnodeStack.push(le(ServerComponent,{key:comment}));else if(marker!==null&&(comment.startsWith("/frsh")||marker.text===comment)){marker.endNode=sib,markerStack.pop();let parent=markerStack.length>0?markerStack[markerStack.length-1]:null;if(marker.kind===1){if(parent?.kind===0){let vnode=vnodeStack.pop(),islandParent=vnodeStack[vnodeStack.length-1];islandParent.props.children=vnode}marker.startNode?.remove(),sib=sib.nextSibling,marker.endNode.remove();continue}else if(marker.kind===0){if(markerStack.length===0){let children=[],child=marker.startNode;for(;(child=child.nextSibling)!==null&&child!==marker.endNode;)children.push(child);let vnode=vnodeStack[vnodeStack.length-1];if(vnode.props.children==null){let[id,exportName,n]=comment.slice(6).split(":"),sel=`#frsh-slot-${id}-${exportName}-${n}-children`,template=document.querySelector(sel);if(template!==null){markerStack.push({kind:1,endNode:null,startNode:null,text:"foo"});let node2=template.content.cloneNode(!0);_walkInner(islands,props,markerStack,vnodeStack,node2),markerStack.pop()}}vnodeStack.pop();let parentNode=sib.parentNode,endMarker=new Text("");parentNode.insertBefore(endMarker,marker.endNode);let _render=()=>fe(vnode,createRootFragment(parentNode,children,endMarker));"scheduler"in window?scheduler.postTask(_render):setTimeout(_render,0),marker.startNode?.remove(),sib=sib.nextSibling,marker.endNode.remove();continue}else if(parent?.kind===1){let vnode=vnodeStack.pop(),parent2=vnodeStack[vnodeStack.length-1];addPropsChild(parent2,vnode)}}}else if(comment.startsWith("frsh")){let[id,exportName,n]=comment.slice(5).split(":"),islandProps=props[Number(n)];markerStack.push({startNode:sib,endNode:null,text:comment,kind:0});let vnode=le(islands[id][exportName],islandProps);vnodeStack.push(vnode)}}else if(isTextNode(sib)){let parentVNode=vnodeStack[vnodeStack.length-1];marker!==null&&marker.kind===1&&addPropsChild(parentVNode,sib.data)}else{let parentVNode=vnodeStack[vnodeStack.length-1];if(marker!==null&&marker.kind===1&&isElementNode(sib)){let props2={children:sib.childNodes.length<=1?null:[]};for(let i=0;i<sib.attributes.length;i++){let attr=sib.attributes[i];props2[attr.nodeName]=typeof sib[attr.nodeName]=="boolean"?!0:attr.nodeValue}let vnode=le(sib.localName,props2);addPropsChild(parentVNode,vnode),vnodeStack.push(vnode)}sib.firstChild&&sib.nodeName!=="SCRIPT"&&_walkInner(islands,props,markerStack,vnodeStack,sib.firstChild),marker!==null&&(marker.kind===1||markerStack.length>1&&markerStack[markerStack.length-2].kind===0)&&vnodeStack.pop()}sib=sib.nextSibling}}var originalHook=d.vnode;d.vnode=vnode=>{assetHashingHook(vnode),originalHook&&originalHook(vnode)};export{revive};
//# sourceMappingURL=main.js.map
