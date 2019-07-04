<template>
    <Transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="about-wrap">
            <section class="about-section">
                <h2><Icon type="youxi" />Who</h2>
                <div class="content">
                    <p class="about-name-cn"><a href="https://huanggaofang.com">黄高芳</a></p>
                    <p class="about-name-en">GaoFang Huang</p>
                </div>
            </section>
            <section class="about-section">
                <h2>
                    <Icon type="ditu" />Location</h2>
                <div class="content">
                    <p>深圳·桂林</p>
                </div>
            </section>
            <section class="about-section">
                <h2>
                    <Icon type="xin" />Experience</h2>
                <div class="content">
                    <dl class="about-skill" v-for="(item, key) in skill" :key="`skill-${key}`">
                        <dt>{{ item.name }}<small>（{{ item.time }}）</small> </dt>
                        <dd>
                            <span @click="toTag(item2)" class="skill-tag" v-for="(item2, key2) in item.tags" :key="`tag-${item2}-${key2}`">
                                {{ item2 }}
                            </span>
                        </dd>
                    </dl>
                </div>
            </section>
            <section class="about-section">
                <h2>
                    <Icon type="bijidiannao" />Education</h2>
                <div class="content">
                    <dl class="about-skill" v-for="(item, key) in school" :key="`school-${key}`">
                        <dt>{{ item.name }}<small>（{{ item.time }}）</small> </dt>
                        <dd>
                            <span @click="toTag(item2)" class="school-tag" v-for="(item2, key2) in item.tags" :key="`tag-${item2}-${key2}`">
                                {{ item2 }}
                            </span>
                        </dd>
                    </dl>
                </div>
            </section>
            <section class="about-section">
                <h2>
                    <Icon type="xinxi" />Contact</h2>
                <div class="content">
                    <p>可以在这里找到我：</p>
                    <p>Email：<a href="mailto:gaofanghuang@vip.qq.com">gaofanghuang@vip.qq.com</a></p>
                    <p>Github：<a href="https://github.com/gaofanghuang">https://github.com/gaofanghuang</a></p>
                    <p>Huaban：<a href="http://huaban.com/unclefang/">http://huaban.com/unclefang/</a></p>
                    <p>Weibo：<a href="https://weibo.com/3384570100/" target="_blank">https://weibo.com/3384570100/</a>
                    </p>
                </div>
            </section>
            <section class="about-section">
                <h2>
                    <Icon type="bianji" />Copyright</h2>
                <div class="content">
                    <p>1、本站所有文章均为本人原创，仅代表个人思想，与其他任何人或组织无关。</p>
                    <p>2、本站采用<a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">署名 4.0 国际 (CC
                            BY4.0)</a>创作共享协议。即，如需转载本站文章只要署名即可对本站所有原创内容进行转载、节选、混编、二次创作，允许商业性使用。</p>
                </div>
            </section>
            <button class="about-btn" @click="goHome">Go Home -></button>
        </div>
    </Transition>
</template>

<script>
    export default {
        data() {
            return {
                skill: [{
                    name: '前端开发',
                    time: '2016.03 - 至今',
                    tags: ['Vue', 'Node', 'Flutter', '微信小程序', 'ES6', 'Html5', 'CSS3', 'JQuery', 'SPA', 'HyBird APP', '客服系统', '电商平台', '企业官网', '后台管理系统']
                }, {
                    name: '网页设计',
                    time: '2014.03 - 2016.03',
                    tags: ['PS', 'AI', 'CDR', '3ds Max', 'CAD', 'AE', 'PR', '网页设计', 'UI设计', '平面设计', '室内设计',
                        '淘宝美工'
                    ]
                }, {
                    name: '运营推广',
                    time: '2011.11 - 2013.10',
                    tags: ['SEO优化', '推广软文', '产品编辑', '淘宝店铺装修', '详情页设计']
                }],
                school: [{
                    name: '华南师范大学·自考本科·艺术设计',
                    time: '2015.09 - 2018.06',
                    tags: ['字体设计', '版式设计', 'VI设计', '绘画色彩', '设计素描']
                }, {
                    name: '广西职业技术学院·统招大专·计算机应用',
                    time: '2009.09 - 2012.06',
                    tags: ['C语言程序设计', '计算机网络基础', '图形图像处理', '网页制作', '计算机应用基础']
                }]
            }
        },
        methods: {
            goHome() {
                this.$router.push('/')
            },
            toTag(tag) {
                this.$router.push(`/tag/${tag}`)
            }
        }
    }
</script>

<style lang="scss">
    .about-wrap {
        position: relative;
        width: 100%;
        min-height: 96vh;
        background: #ffffff;
        color: #666666;
        position: relative;
        padding: 40px;

        .about-btn {
            width: 300px;
            height: 66px;
            border-radius: 33px;
            margin-top: 40px;
            margin-bottom: 40px;
            background: linear-gradient(45deg, $green, $primary);
            color: #ffffff;
            font-weight: 200;
            cursor: pointer;
        }

        .about-section {
            padding: 20px;
            font-size: 24px;

            h2 {
                font-size: 48px;
                margin-bottom: 20px;
            }

            .icon {
                font-size: 48px;
                margin-right: 20px;
            }

            p {
                margin-bottom: 10px;
            }

            a {
                color: $primary;
                transition: 0.2s;
            }
        }

        .about-name-cn {
            font-size: 72px;

            a {
                color: #666666;

                &:hover {
                    color: $primary;
                }
            }
        }

        .about-name-en {
            font-size: 36px;
            margin-top: -20px;
        }

        .about-skill {
            margin-bottom: 40px;
            &:last-of-type {
                margin-bottom: 0;
            }

            dt {
                font-size: 36px;
                margin-bottom: 10px;
            }

            .skill-tag {
                display: inline-block;
                background: #eaeaef;
                color: #666666;
                padding: 6px 20px;
                margin-right: 10px;
                border-radius: 6px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: 0.2s;
                &:hover {
                    background: darken($color: #eaeaef, $amount: 5%);
                }
            }
        }
    }
</style>