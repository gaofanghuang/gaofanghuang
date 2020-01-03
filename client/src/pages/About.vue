<template>
  <div class="about-wrap">
    <div class="about-left">
      <div class="about-side">
        <section>
          <div class="about-title">ABOUT ME</div>
          <div class="about-summary flex">
            <div class="about-summary-avatar">
              <img :src="avatar" alt="avatar" />
            </div>
            <div class="about-summary-word flex ml15 tl">
              <div class="about-summary-name tc">黄高芳</div>
              <div class="about-summary-enname">Gaofang Huang</div>
              <div class="about-summary-local flex flex-x">
                <Icon name="location" class="mr5" />桂林
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="about-title">CONTACT ME</div>
          <div class="about-contact">
            <div class="about-mail flex flex-y">
              <Icon name="mail" class="mr5" />
              <a href="mailto:gaofanghuang@vip.qq.com" class="a">gaofanghuang@vip.qq.com</a>
            </div>
            <div class="about-github flex flex-y mt10">
              <Icon name="github-fill" class="mr5" />
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
          <div class="about-title"><Icon name="block" class="mr5" /> 工作经历</div>
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
.is-pc.ignore {
  .about-wrap {
    justify-content: space-between;
    display: flex;
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    background: $white;

    .about-right {
      width: 62%;
      display: flex;
      padding-top: 24px;
      background: $white;
      .icon {
        font-size: 20px;
      }
    }

    .about-content {
      width: 60%;
      padding-right: 20px;
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
      width: 32%;
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
      flex-shrink: 0;
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
      flex-wrap: wrap;
    }

    .about-summary-local {
      align-self: flex-end;
    }

    .about-summary-name {
      font-size: 18px;
      line-height: 1;
    }

    .about-summary-enname {
      font-size: 14px;
      color: $light;
    }

    .about-contact {
      font-size: 12px;
      .icon {
        font-size: 20px;
      }
    }
  }
  &.is-dark {
    .about-wrap.ignore {
      background: lighten($color: $black, $amount: 3%);
      .about-left {
        background: darken($color: $black, $amount: 3%);
      }
      .about-right {
        background: lighten($color: $black, $amount: 3%);
      }
      .about-exp-tag {
        background: darken($color: $black, $amount: 3%);
      }
      .about-contact,
      .about-title,
      .about-summary-local,
      .about-summary-name {
        color: $gray;
      }
    }
  }
}
// 移动端
.is-mobile {
  .about-left {
    padding: 40px;
    background: #f2f2f2;
  }
  .about-summary-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .about-side {
    text-align: center;
  }
  .about-summary {
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 60px;
  }
  .about-summary-word {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  .about-summary-name,
  .about-summary-local {
    width: 100%;
  }
  .about-summary-enname {
    color: $light;
    font-size: 20px;
    margin-top: 10px;
  }
  .about-summary-local {
    align-items: center;
    font-size: 20px;
    margin-top: 10px;
  }
  .about-title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .about-contact {
    margin-bottom: 60px;
    .about-github,
    .about-mail {
      justify-content: center;
    }
  }
  .about-right {
    padding: 40px;
  }
  .about-exp-item {
    margin-bottom: 20px;
  }
  .about-exp-tag {
    font-size: 24px;
    display: inline-block;
    background: #eaeaef;
    color: $gray;
    padding: 4px 12px;
    margin-right: 6px;
    border-radius: 6px;
    margin-bottom: 6px;
  }
  &.is-dark {
    .about-left {
      background: darken($color: $black, $amount: 3%);
    }
    .about-exp-tag {
      background: darken($color: $black, $amount: 3%);
    }
  }
}
</style>
