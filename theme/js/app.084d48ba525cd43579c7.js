webpackJsonp([0],{EGi2:function(t,a){},NHnr:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("/5sW"),n={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"about-wrap"},[s("div",{staticClass:"about-bar"},[s("div",{staticClass:"about-bar-con"},[s("div",{staticClass:"about-avatar"}),t._v(" "),s("div",{staticClass:"about-info"},[s("p",{staticClass:"about-name"},[t._v("GaoFang")]),t._v(" "),s("p",{staticClass:"about-position"},[t._v("前端开发工程师")]),t._v(" "),s("p",{staticClass:"about-local"},[t._v("广州 → 深圳")]),t._v(" "),s("hr",{staticClass:"hr-line"}),t._v(" "),t._m(0),t._v(" "),s("hr",{staticClass:"hr-line"}),t._v(" "),s("ul",{staticClass:"about-tags"},t._l(t.tags,function(a){return s("li",{key:a,staticClass:"about-tag"},[s("a",{attrs:{href:"http://blog.huanggaofang.com/archive?tag="+a,target:"_blank"}},[t._v(t._s(a))])])}))]),t._v(" "),s("div",{staticClass:"about-contact"},[s("a",{staticClass:"about-email",attrs:{href:"mailto:gaofanghuang@vip.qq.com"}},[t._v("gaofanghuang@vip.qq.com")]),t._v(" "),s("ul",{staticClass:"about-sns-list"},t._l(t.sns,function(t){return s("li",{staticClass:"about-sns-item"},[s("a",{attrs:{href:t.url,target:"_blank"}},[s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":t.icon}})])])])}))])])]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"about-summary"},[this._v("\n          三年设计·三年前端\n          "),a("br")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"about-content"},[a("div",{staticClass:"about-last-project"},[a("div",{staticClass:"about-tips"},[a("p",[this._v("...to btn continue.")]),this._v(" "),a("a",{attrs:{href:"http://blog.huanggaofang.com"}},[this._v("→ Welcome to my blog ←")])])])])}]};var i={name:"App",components:{CV:s("VU/8")({data:function(){return{list:[],sns:[{icon:"#icon-bijiben",url:"http://blog.huanggaofang.com"},{icon:"#icon-github",url:"https://github.com/gaofanghuang"},{icon:"#icon-behance-square-fill",url:"https://www.behance.net/huanggaofang"}],tags:["Vue.js","SCSS","ES6","Webpack","Node.js","Photoshop","Sketch","Premiere","Effects"]}},beforeMount:function(){},mounted:function(){},methods:{}},n,!1,function(t){s("aO7n")},null,null).exports}},o={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"layout-wrap"},[a("CV")],1)])},staticRenderFns:[]};var r=s("VU/8")(i,o,!1,function(t){s("tIws")},null,null).exports,c=(s("EGi2"),void 0),u=void 0,l=void 0,h=void 0;var v=!0,f={acceptStatement:!0,bind:function(t,a){t.handler=function(t){var s=a.value;t.index=s.index,s.methods.call(this,t)},t.addEventListener("touchstart",function(t){c=t.touches[0].pageX,u=t.touches[0].pageY},!1),t.addEventListener("touchend",function(a){v&&(!function(t,a){l=t.changedTouches[0].pageX,h=t.changedTouches[0].pageY;var s=t.target.offsetWidth,e=t.target.offsetHeight,n=void 0;if(!(s<10||e<10)){Math.abs(h-u)>10&&Math.abs(l-c)<Math.abs(h-u)?n=h>u?"down":"up":Math.abs(l-c)>10&&Math.abs(l-c)>Math.abs(h-u)&&(n=l>c?"right":"left");var i={direction:n,x1:c,y1:u,x2:l,y2:h,devW:s,devH:e};(Math.abs(h-u)>10||Math.abs(l-c)>10)&&a.handler(i)}}(a,t),v=!1,setTimeout(function(){v=!0},600))},!1)}},g={install:function(t){t.directive("swipe",f)}};e.a.use(g),e.a.config.productionTip=!1,"serviceWorker"in navigator&&navigator.serviceWorker.register("./service-worker.js").then(function(t){console.log("Successfully registered service worker",t)}).catch(function(t){console.warn("Error whilst registering service worker",t)}),new e.a({el:"#app",render:function(t){return t(r)}})},aO7n:function(t,a){},tIws:function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.084d48ba525cd43579c7.js.map