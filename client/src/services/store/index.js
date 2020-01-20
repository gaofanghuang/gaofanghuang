import Vue from 'vue';
import Vuex from 'vuex';
import $db from '@/services/Storage';
import * as api from '@/services/api';
import fix from '@/services/fix';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cacheTime: $db.getData('cacheTime') || '',
    projects: $db.getData('projects') || [],
    checklist: $db.getData('checklist') || [],
    tags: $db.getData('tags') || [],
    user: $db.getData('user') || {},
    token: $db.getData('token') || '',
  },
  mutations: {
    SaveProjects(state, data) {
      state.projects = data;
      $db.setData('projects', data);
    },
    SaveChecklist(state, data) {
      state.checklist = data;
      $db.setData('checklist', data);
    },
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
  },
  actions: {
    GetProjects({ commit }) {
      api.getProjects().then(({ data }) => {
        let _data = [];
        if (data.data.length > 0) {
          _data = fix.sort(data.data, 'sort');
        }
        commit('SaveProjects', _data);
      });
    },
    GetChecklist({ commit }) {
      api.getChecklist().then(({ data }) => {
        let _data = [];
        if (data.data.length > 0) {
          _data = fix.sort(data.data, 'sort');
        }
        commit('SaveChecklist', _data);
      });
    },
    GetTags({ commit }) {
      api.getTags().then(({ data }) => {
        let _data = [];
        if (data.data.length > 0) {
          _data = fix.sort(data.data, 'sort');
        }
        commit('SaveTags', _data);
      });
    },
  },
  modules: {},
});
