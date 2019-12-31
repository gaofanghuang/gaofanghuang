<template>
  <div class="about-wrap ignore">
    <div class="about-left">
      <div class="about-side">
        <section>
          <div class="about-title">ABOUT ME</div>
          <div class="about-summary flex">
            <div class="about-summary-avatar">
              <img :src="avatar" alt="avatar" />
            </div>
            <div class="about-summary-word ml15 tl">
              <div class="about-summary-name">黄高芳</div>
              <div class="about-summary-enname">Gaofang Huang</div>
              <div class="about-summary-local"><Icon name="location" class="mr5" />桂林</div>
            </div>
          </div>
        </section>
        <section>
          <div class="about-title">CONTACT ME</div>
          <div class="about-contact">
            <div class="about-mail">
              <Icon name="mail" class="mr10" />
              <a href="mailto:gaofanghuang@vip.qq.com" class="a">gaofanghuang@vip.qq.com</a>
            </div>
            <div class="about-github mt10">
              <Icon name="github-fill" class="mr10" />
              <a href="https://github.com/gaofanghuang" class="a"
                >https://github.com/gaofanghuang</a
              >
            </div>
          </div>
        </section>
        <section>
          <div class="about-title">WECHAT QR CODE</div>
          <div class="about-qrcode">
            <img :src="qrcode" alt="gaofang's qrcode" />
          </div>
        </section>
      </div>
    </div>
    <div class="about-right">
      <div class="about-content">
        <section class="about-exp">
          <div class="about-title"><i class="icon icon-exp"></i> 工作经历</div>
          <div class="about-exp-list">
            <dl class="about-exp-item" v-for="(item, key) in exp" :key="`exp-${key}`">
              <dt class="mb10">
                {{ item.name }}<small>（{{ item.time }}）</small>
              </dt>
              <dd>
                <span
                  @click="toTag(item2)"
                  class="about-exp-tag"
                  v-for="(item2, key2) in item.tags"
                  :key="`tag-${item2}-${key2}`"
                >
                  {{ item2 }}
                </span>
              </dd>
            </dl>
          </div>
        </section>
        <section class="about-project">
          <div class="about-title flex flex-both">
            <span><i class="icon icon-project"></i> 业余项目</span>
            <router-link class="about-project-more" to="/list">更多>></router-link>
          </div>
          <div class="about-project-list flex flex-both">
            <div class="about-project-item" v-for="item in list" :key="`project-${item.id}`">
              <a :href="`/info/${item.id}`">
                <div class="about-project-cover">
                  <img v-if="item.cover" :src="item.cover.path | getImg" alt="item.name" />
                </div>
                <div class="about-project-name">{{ item.name }}</div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/assets/carrot.jpg';
import QrCode from '@/assets/qrcode.png';
export default {
  data() {
    return {
      avatar: Avatar,
      qrcode: QrCode,
      list: [],
      exp: [
        {
          name: '前端开发',
          time: '2016.03 - 至今',
          tags: [
            'Vue',
            'Angular',
            'React',
            'React Native',
            'Node',
            'Flutter',
            'Android',
            '微信小程序',
            'ES6',
            'Html5',
            'CSS3',
            'JQuery',
            'SPA',
            'HyBird APP',
            '客服系统',
            '电商平台',
            '企业官网',
            '后台管理系统',
          ],
        },
        {
          name: '网页设计',
          time: '2014.03 - 2016.03',
          tags: [
            'PS',
            'AI',
            'CDR',
            '3ds Max',
            'CAD',
            'AE',
            'PR',
            '网页设计',
            'UI设计',
            '平面设计',
            '室内设计',
            '淘宝美工',
          ],
        },
        {
          name: '运营推广',
          time: '2011.11 - 2013.10',
          tags: ['SEO优化', '推广软文', '产品编辑', '淘宝店铺装修', '详情页设计'],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
// pc端
.is-pc {
  .about-wrap.ignore {
    justify-content: space-between;
    display: flex;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    background: $white;

    .about-right {
      width: 62%;
      display: flex;
      padding-top: 24px;
      background: $white;
    }

    .about-content {
      width: 60%;
      padding-right: 20px;
    }

    .about-project-more {
      font-size: 14px;
      color: $light;

      &:hover {
        color: $primary;
      }
    }

    .about-project-item {
      width: 32%;
      height: 28%;
      position: relative;
      cursor: pointer;

      &:hover img {
        filter: none;
      }
    }

    .about-project-name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: $white;
      text-align: center;
      text-shadow: 0 0 1px rgba($black, 0.8);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: linear-gradient(0deg, rgba($black, 0.4) 0%, rgba($black, 0) 100%);
    }

    .about-project-cover {
      width: 100%;
      height: 80%;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.6s;
        filter: grayscale(100%);
        filter: gray;
      }
    }

    section {
      margin-bottom: 60px;
    }

    .about-exp-item {
      margin-bottom: 20px;

      dt {
        font-size: 18px;
      }

      small {
        font-size: 14px;
        color: $light;
      }
    }

    .about-exp-tag {
      display: inline-block;
      background: #eaeaef;
      color: $gray;
      padding: 3px 10px;
      margin-right: 6px;
      border-radius: 4px;
      margin-bottom: 6px;
      cursor: pointer;
      transition: 0.2s;
      font-size: 12px;

      &:hover {
        background: darken($color: #eaeaef, $amount: 5%);
      }
    }

    .about-left {
      width: 38%;
      padding-top: 24px;
      background: $black;
      color: #ffffff;
    }

    .about-side {
      width: 260px;
      padding-left: 20px;
    }

    .about-title {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
    }

    .about-summary-avatar {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .about-summary-word {
      display: flex;
    }

    .about-summary-local {
      align-self: flex-end;
    }

    .about-summary-name {
      font-size: 18px;
      margin-bottom: 10px;
      line-height: 1;
    }

    .about-summary-enname {
      font-size: 14px;
      color: $light;
    }

    .about-contact {
      font-size: 12px;
    }
  }
}
</style>
