(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page-list"],{"04ba":function(t,e,n){"use strict";var s=n("b338"),i=n.n(s);i.a},"2f21":function(t,e,n){"use strict";var s=n("79e5");t.exports=function(t,e){return!!t&&s(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,n){"use strict";var s=n("5ca1"),i=n("d8e8"),o=n("4bf8"),r=n("79e5"),a=[].sort,c=[1,2,3];s(s.P+s.F*(r(function(){c.sort(void 0)})||!r(function(){c.sort(null)})||!n("2f21")(a)),"Array",{sort:function(t){return void 0===t?a.call(o(this)):a.call(o(this),i(t))}})},b338:function(t,e,n){},e00c:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("LoadMore",{ref:"loadmore",staticClass:"list-wrap",attrs:{showBottom:!1},on:{onRefresh:t.onRefresh}},[n("div",{staticClass:"list-search"},[n("Icon",{attrs:{type:"sousuo"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],attrs:{type:"text",placeholder:"输入文章标题或标签名称搜索"},domProps:{value:t.keyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch(e)},input:function(e){e.target.composing||(t.keyword=e.target.value)}}})],1),t.keyword?n("div",{staticClass:"search-status"},[t._v("search for "),n("span",[t._v(t._s(t.keyword))]),t._v(", "+t._s(t.searchList.length)+"\n        result.")]):t._e(),t.keyword?t._l(t.searchList,function(t){return n("Article",{key:t.id,attrs:{info:t}})}):t._l(t.list,function(t){return n("Article",{key:t.id,attrs:{info:t}})})],2)},i=[],o=(n("55dd"),n("6762"),n("2fdb"),n("9870")),r=n("f5ef"),a=function(){},c={data:function(){return{keyword:"",list:[],canSearch:!0,searchList:[]}},watch:{tag:function(){void 0!==this.tag&&(this.keyword=this.tag)},$route:function(t){t.path.includes("list")&&(this.keyword="")},keyword:function(){this.keyword&&this.list.length>0&&this.handleSearch()}},computed:{tag:function(){return this.$route.params.tag}},mounted:function(){var t=this;this.$store.state.list.length>0&&(this.list=this.$store.state.list),void 0!==this.tag&&(this.keyword=this.tag,setTimeout(function(){t.handleSearch()},300)),r["a"].$on("handleMore",function(){t.showMore()})},destroyed:function(){r["a"].$off("handleMore")},methods:{onRefresh:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;this.list.length>0||o["e"]().then(function(n){var s=n.data;s.sort(function(t,e){return e.lasttime-t.lasttime}),t.list=s,t.$store.commit("SaveList",t.list),e(!0)})},handleSearch:function(){var t=this;if(this.canSearch){this.canSearch=!1;var e=this.keyword.toLowerCase(),n=this.list;for(var s in this.searchList=[],n){var i=n[s].tags.join(",").toLowerCase(),o=n[s].title.toLowerCase();(i.indexOf(e)>-1||o.indexOf(e)>-1)&&this.searchList.push(n[s])}setTimeout(function(){t.canSearch=!0},1e3)}},showMore:function(){var t=this,e=[];e.push({text:"回到首页",method:function(){t.$router.push("/")}}),r["a"].$emit("actionSheet",e,"取消")}}},u=c,h=(n("04ba"),n("2877")),l=Object(h["a"])(u,s,i,!1,null,null,null);e["default"]=l.exports}}]);