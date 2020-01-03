import Vue from 'vue';
import Vuex from 'vuex';
import $db from './Storage';

const state = {
  list: $db.getData('list') || [],
  tags: $db.getData('tags') || [],
  darkMode: $db.getData('darkMode') || false,
  showBigImg: false,
  bigPath: ''
};

const getters = {
  darkMode: () => {
    return state.darkMode;
  },
};

const mutations = {
  SaveList(state, data) {
    state.list = data;
    $db.setData('list', data);
  },
  SaveTags(state, data) {
    state.tags = data;
    $db.setData('tags', data);
  },
  ToggleDarkMode(state, data) {
    state.darkMode = data;
    $db.setData('darkMode', data);
  },
  toggleBigImg(state, data) {
      state.showBigImg = data.showBigImg
      state.bigPath = data.bigPath
  }
};

const actions = {};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
