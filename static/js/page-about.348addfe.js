(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page-about"],{"2a45":function(t,a,s){},"849d":function(t,a,s){"use strict";var n=s("2a45"),o=s.n(n);o.a},a1d1:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("Transition",{attrs:{"enter-active-class":"animated bounceInRight","leave-active-class":"animated bounceOutLeft"}},[s("div",{staticClass:"about-wrap"},[s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"youxi"}}),t._v("Who")],1),s("div",{staticClass:"content"},[s("p",{staticClass:"about-name-cn"},[s("a",{attrs:{href:"https://huanggaofang.com"}},[t._v("黄高芳")])]),s("p",{staticClass:"about-name-en"},[t._v("GaoFang Huang")])])]),s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"ditu"}}),t._v("Location")],1),s("div",{staticClass:"content"},[s("p",{staticClass:"location-name"},[t._v("深圳 · 桂林")])])]),s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"xin"}}),t._v("Experience")],1),s("div",{staticClass:"content"},t._l(t.skill,function(a,n){return s("dl",{key:"skill-"+n,staticClass:"about-skill"},[s("dt",[t._v(t._s(a.name)),s("small",[t._v("（"+t._s(a.time)+"）")])]),s("dd",t._l(a.tags,function(a,n){return s("span",{key:"tag-"+a+"-"+n,staticClass:"skill-tag",on:{click:function(s){t.toTag(a)}}},[t._v("\n                            "+t._s(a)+"\n                        ")])}),0)])}),0)]),s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"bijidiannao"}}),t._v("Education")],1),s("div",{staticClass:"content"},t._l(t.school,function(a,n){return s("dl",{key:"school-"+n,staticClass:"about-skill"},[s("dt",[t._v(t._s(a.name)),s("small",[t._v("（"+t._s(a.time)+"）")])]),s("dd",t._l(a.tags,function(a,n){return s("span",{key:"tag-"+a+"-"+n,staticClass:"school-tag",on:{click:function(s){t.toTag(a)}}},[t._v("\n                            "+t._s(a)+"\n                        ")])}),0)])}),0)]),s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"xinxi"}}),t._v("Contact")],1),s("div",{staticClass:"content"},[s("p",[t._v("可以在这里找到我：")]),s("p",[t._v("Email："),s("a",{attrs:{href:"mailto:gaofanghuang@vip.qq.com"}},[t._v("gaofanghuang@vip.qq.com")])]),s("p",[t._v("Github："),s("a",{attrs:{href:"https://github.com/gaofanghuang"}},[t._v("https://github.com/gaofanghuang")])])])]),s("section",{staticClass:"about-section"},[s("h2",[s("Icon",{attrs:{type:"bianji"}}),t._v("Copyright")],1),s("div",{staticClass:"content"},[s("p",[t._v("1、本站所有文章均为本人原创，仅代表个人思想，与其他任何人或组织无关。")]),s("p",[t._v("2、本站采用"),s("a",{attrs:{href:"https://creativecommons.org/licenses/by/4.0/deed.zh",target:"_blank"}},[t._v("署名 4.0 国际 (CC\n                        BY4.0)")]),t._v("创作共享协议。即，如需转载本站文章只要署名即可对本站所有原创内容进行转载、节选、混编、二次创作，允许商业性使用。")])])]),s("button",{staticClass:"about-btn",on:{click:t.goHome}},[t._v("Go Home ->")])])])},o=[],i={data:function(){return{skill:[{name:"前端开发",time:"2016.03 - 至今",tags:["Vue","Node","Flutter","微信小程序","ES6","Html5","CSS3","JQuery","SPA","HyBird APP","客服系统","电商平台","企业官网","后台管理系统"]},{name:"网页设计",time:"2014.03 - 2016.03",tags:["PS","AI","CDR","3ds Max","CAD","AE","PR","网页设计","UI设计","平面设计","室内设计","淘宝美工"]},{name:"运营推广",time:"2011.11 - 2013.10",tags:["SEO优化","推广软文","产品编辑","淘宝店铺装修","详情页设计"]}],school:[{name:"华南师范大学·自考本科·艺术设计",time:"2015.09 - 2018.06",tags:["字体设计","版式设计","VI设计","绘画色彩","设计素描"]},{name:"广西职业技术学院·统招大专·计算机应用",time:"2009.09 - 2012.06",tags:["C语言程序设计","计算机网络基础","图形图像处理","网页制作","计算机应用基础"]}]}},methods:{goHome:function(){this.$router.push("/")},toTag:function(t){this.$router.push("/tag/".concat(t))}}},e=i,c=(s("849d"),s("2877")),l=Object(c["a"])(e,n,o,!1,null,null,null);a["default"]=l.exports}}]);