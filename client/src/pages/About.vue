<template>
    <Transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="about-wrap">
            <div class="about-head">About</div>
            <section class="about-section">
                <h2>Who</h2>
                <div class="content">
                    <p>我的名字是黄高芳，做过网页设计，现在的职位是前端开发。</p>
                    <p>来自桂林，坐标深圳。</p>
                    <p>喜欢猫、做饭、打游戏。</p>
                </div>
            </section>
            <section class="about-section">
                <h2>Contact</h2>
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
                <h2>Copyright</h2>
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
        methods: {
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss">
    .about-wrap {
        width: 100%;
        min-height: 100vh;
        background: #ffffff;
        color: #666666;
        position: relative;

        .about-head {
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: linear-gradient(45deg, $green, $primary);
            color: #ffffff;
            font-weight: 200;
            letter-spacing: 2px;
        }

        .about-section {
            padding: 20px;
            font-size: 24px;

            h2 {
                font-size: 32px;
                margin-bottom: 20px;
            }

            p {
                margin-bottom: 10px;
            }

            a {
                color: $primary;
            }
        }

        .about-btn {
            position: absolute;
            bottom: 10vh;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 66px;
            border-radius: 33px;
            background: linear-gradient(45deg, $green, $primary);
            color: #ffffff;
            font-weight: 200;
        }
    }
</style>