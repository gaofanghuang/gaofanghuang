(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page-list"],{"04ba":function(t,e,i){"use strict";var n=i("b338"),s=i.n(n);s.a},"2f21":function(t,e,i){"use strict";var n=i("79e5");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,i){"use strict";var n=i("5ca1"),s=i("d8e8"),r=i("4bf8"),o=i("79e5"),a=[].sort,c=[1,2,3];n(n.P+n.F*(o(function(){c.sort(void 0)})||!o(function(){c.sort(null)})||!i("2f21")(a)),"Array",{sort:function(t){return void 0===t?a.call(r(this)):a.call(r(this),s(t))}})},b338:function(t,e,i){},e00c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-wrap"},[i("div",{staticClass:"list-search"},[i("Icon",{attrs:{type:"sousuo"}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],attrs:{type:"text",placeholder:"输入文章标题或标签名称搜索"},domProps:{value:t.keyword},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleSearch(e):null},input:function(e){e.target.composing||(t.keyword=e.target.value)}}})],1),t.keyword?i("div",{staticClass:"search-status"},[t._v("search for "),i("span",[t._v(t._s(t.keyword))]),t._v(", "+t._s(t.searchList.length)+"\n        result.")]):t._e(),t.keyword?t._l(t.searchList,function(t){return i("Article",{key:t.id,attrs:{info:t}})}):t._l(t.list,function(t){return i("Article",{key:t.id,attrs:{info:t}})})],2)},s=[],r=(i("55dd"),i("6762"),i("2fdb"),i("9870")),o=i("f5ef"),a={data:function(){return{keyword:"",list:[],canSearch:!0,searchList:[]}},watch:{tag:function(){void 0!==this.tag&&(this.keyword=this.tag)},$route:function(t){t.path.includes("list")&&(this.keyword="")},keyword:function(){this.keyword&&this.list.length>0&&this.handleSearch()}},computed:{tag:function(){return this.$route.params.tag}},created:function(){this.getList()},mounted:function(){var t=this;this.$store.state.list.length>0&&(this.list=this.$store.state.list),void 0!==this.tag&&(this.keyword=this.tag,setTimeout(function(){t.handleSearch()},300)),o["a"].$on("handleMore",function(){t.showMore()})},destroyed:function(){o["a"].$off("handleMore")},methods:{getList:function(){var t=this;this.list.length>0||r["e"]().then(function(e){var i=e.data;i.sort(function(t,e){return e.lasttime-t.lasttime}),t.list=i,t.$store.commit("SaveList",t.list)})},handleSearch:function(){var t=this;if(this.canSearch){this.canSearch=!1;var e=this.keyword.toLowerCase(),i=this.list;for(var n in this.searchList=[],i){var s=i[n].tags.join(",").toLowerCase(),r=i[n].title.toLowerCase();(s.indexOf(e)>-1||r.indexOf(e)>-1)&&this.searchList.push(i[n])}setTimeout(function(){t.canSearch=!0},1e3)}},showMore:function(){var t=this,e=[];e.push({text:"回到首页",method:function(){t.$router.push("/")}}),o["a"].$emit("actionSheet",e,"取消")}}},c=a,u=(i("04ba"),i("2877")),h=Object(u["a"])(c,n,s,!1,null,null,null);e["default"]=h.exports}}]);