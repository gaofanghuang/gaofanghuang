(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page-edit"],{2709:function(t,e,i){},"499b":function(t,e,i){},"58b7":function(t,e,i){"use strict";var n=i("499b"),s=i.n(n);s.a},"70e2":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit-wrap"},[i("transition-group",{staticClass:"edit-content",class:{"is-mobile":t.browser.isMobile},attrs:{name:"fadeIn",tag:"div"}},[i("textarea",{directives:[{name:"show",rawName:"v-show",value:!t.browser.isMobile||!t.isPreview,expression:"!browser.isMobile || !isPreview"},{name:"model",rawName:"v-model",value:t.content,expression:"content"}],key:"编辑框",staticClass:"edit-input",domProps:{value:t.content},on:{paste:function(e){return t.getCutImg()},input:function(e){e.target.composing||(t.content=e.target.value)}}}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isPreview,expression:"isPreview"}],key:"预览框",staticClass:"edit-view markdown-view",domProps:{innerHTML:t._s(t.compiledMarkdown)}})]),i("div",{staticClass:"edit-footer"},[i("div",{staticClass:"edit-upload-img"},[i("Upload",{on:{file:t.insetImg}})],1),i("div",{staticClass:"edit-tags"},[t.tags.length>0?i("ul",{staticClass:"edit-tags-list"},t._l(t.tags,function(e,n){return i("li",{key:e+"-"+n,staticClass:"edit-tags-item",on:{click:function(e){return t.deleteTag(n)}}},[t._v("\n                    "+t._s(e)+"\n                ")])}),0):t._e(),i("input",{directives:[{name:"model",rawName:"v-model",value:t.tag,expression:"tag"}],staticClass:"edit-tags-input",attrs:{type:"text",placeholder:"这里输入标签"},domProps:{value:t.tag},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTag(e)},input:function(e){e.target.composing||(t.tag=e.target.value)}}})]),t.browser.isMobile?i("span",{staticClass:"edit-preview",on:{click:function(e){t.isPreview=!t.isPreview}}},[t._v(t._s(t.isPreview?"MD":"View"))]):t._e()])],1)},s=[],a=(i("a481"),i("4917"),i("6762"),i("2fdb"),i("1487")),o=i.n(a),r=i("0e54"),c=i.n(r),l=i("9870"),u=i("f5ef"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-wrap"},[i("Icon",{attrs:{type:"tupian"},on:{click:t.uploadFile}}),i("input",{ref:"uploadFile",attrs:{type:"file"},on:{change:t.getFile}})],1)},g=[],h={methods:{uploadFile:function(){this.$refs.uploadFile.click()},getFile:function(t){console.log(t);var e=t.target.files[0];if(!/image\/\w+/.test(e.type))return alert("只能选择图片"),!1;var i=this,n=new FileReader;n.readAsDataURL(e),n.onload=function(t){l["i"]({base64:this.result}).then(function(t){var e=t.data;console.log(e),i.$emit("file",e.id)})}}}},f=h,v=(i("f463"),i("2877")),m=Object(v["a"])(f,d,g,!1,null,null,null),p=m.exports,w=function(){},b={data:function(){return{content:"",tags:[],tag:"",isPreview:!0,fetching:!1,range:""}},computed:{compiledMarkdown:function(){return c.a.setOptions({renderer:new c.a.Renderer,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!0,smartLists:!0,smartypants:!1,highlight:function(t){return o.a.highlightAuto(t).value}}),c()(this.content,{sanitize:!0})},isEdit:function(){return this.$route.path.includes("edit")},id:function(){return this.$route.params.id},isProgress:function(){return this.$store.state.isProgress},browser:function(){return this.$store.state.browser}},components:{Upload:p},watch:{$route:function(t){t.path.includes("add")?(this.content="",this.tags=[],this.tag=""):this.getInfo()}},mounted:function(){var t=this;this.isEdit&&this.getInfo(),this.browser.isMobile&&(this.isPreview=!1),u["a"].$on("saveInfo",function(){t.doSave()}),w=setInterval(function(){localStorage.setItem("content",t.content)},5e3)},destroyed:function(){u["a"].$off("changeTitle"),u["a"].$off("saveInfo"),clearInterval(w)},methods:{getInfo:function(){var t=this;l["d"]({id:this.id}).then(function(e){var i=e.data;t.content=i.content,t.tags=i.tags})},addTag:function(){console.log("添加标签"),this.tag&&(this.tags.push(this.tag),this.tag="")},deleteTag:function(t){console.log("删除标签"),this.tags.splice(t,1)},insetImg:function(t){var e="";e="https://github.com/gaofanghuang/gaofanghuang/raw/master/server/public/uploads/".concat(t);var i="![".concat(t,"](").concat(e,")");this.content+=i},getCutImg:function(){var t,e,i,n=event.clipboardData,s=0;if(n){if(t=n.items,!t)return;for(e=t[0],i=n.types||[];s<i.length;s++)if("Files"===i[s]){e=t[s];break}e&&"file"===e.kind&&e.type.match(/^image\//i)&&this.imgReader(e)}},imgReader:function(t){var e=this,i=t.getAsFile(),n=new FileReader;n.readAsDataURL(i),n.onloadend=function(){var t=this.result,i=new Image;i.src=t,l["i"]({base64:this.result}).then(function(t){var i=t.data;e.insetImg(i.id)})}},doSave:function(){var t=this;if(console.log("保存文章"),this.content&&!this.fetching){this.fetching=!0,this.$store.commit("ToggleProgress",!0);var e=(new Date).getTime(),i=/(#+)[^\n]*?\n/g,n=null!==this.content.match(i)?this.content.match(i)[0]:"";n&&(n=n.substring(2).substring(-1));var s=/(>+)[^\n]*?\n/g,a=null!==this.content.match(s)?this.content.match(s)[0]:"";a&&(a=a.substring(2).substring(-1));var o=/\!\[(.*?)\]\((.*)\)/i,r=null!==this.content.match(o)&&3==this.content.match(o).length?this.content.match(o)[2]:"",c={id:this.isEdit?this.id:e,title:n,summary:a,cover:r,tags:this.tags,content:this.content,lasttime:e};l["g"](c).then(function(e){var i=e.data;setTimeout(function(){t.$store.commit("ToggleProgress",!1),t.fetching=!1},600),t.isEdit||t.$router.replace("/edit/".concat(i.id)),console.log(i)}).catch(function(){t.fetching=!1})}}}},k=b,y=(i("58b7"),Object(v["a"])(k,n,s,!1,null,null,null));e["default"]=y.exports},f463:function(t,e,i){"use strict";var n=i("2709"),s=i.n(n);s.a}}]);