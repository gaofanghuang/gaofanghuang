import Vue from 'vue';
import Vuex from 'vuex';
import $db from '@/utils/Storage';

const state = {
  tags: $db.getData('tags') || [],
  user: $db.getData('user') || {},
  token: $db.getData('token') || '',
};

const getters = {};

const mutations = {
  SaveTags(state, data) {
    state.tags = data;
    $db.setData('tags', data);
  },
  Login(state, data) {
    state.token = data.token;
    state.user = data;
    $db.setData('token', data.token);
    $db.setData('user', data);
  },
  Logout(state) {
    state.token = '';
    state.user = {};
    $db.clearData();
  },
};

const actions = {};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
