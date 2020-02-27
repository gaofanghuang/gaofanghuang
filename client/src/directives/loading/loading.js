import Vue from 'vue';
import Loading from './Loading.vue';

const Mask = Vue.extend(Loading);

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      // 控制loading组件显示
      el.instance.visible = true;
      // 插入到目标元素
      insertDom(el, el, binding);
    });
  } else {
    el.instance.visible = false;
  }
};
const insertDom = (parent, el) => {
  parent.appendChild(el.mask);
};

export default {
  bind: function(el, binding) {
    const mask = new Mask({
      el: document.createElement('div'),
      data() {},
    });
    el.instance = mask;
    el.mask = mask.$el;
    el.maskStyle = {};

    binding.value && toggleLoading(el, binding);
  },
  update: function(el, binding) {
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        el.className = el.className + ' loading-parent';
      } else {
        el.className = el.className.replace('loading-parent', '');
      }
      toggleLoading(el, binding);
    }
  },
  unbind: function(el) {
    el.className = el.className.replace('loading-parent', '');
    el.instance && el.instance.$destroy();
  },
};
