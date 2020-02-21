import Vue from 'vue';
import Vuex from 'vuex';
import $db from '@/services/Storage';
import * as api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cacheTime: $db.getData('cacheTime') || '',
    projects: $db.getData('projects') || [],
    checklist: $db.getData('checklist') || [],
    tags: $db.getData('tags') || [],
    user: $db.getData('user') || null,
    token: $db.getData('token') || '',
    config: $db.getData('config') || null,
  },
  getters: {
    canComment(state) {
      return state.config && state.config.canComment;
    },
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
    SaveConfig(state, data) {
      state.config = data;
      $db.setData('config', data);
    },
  },
  actions: {
    GetProjects({ commit }) {
      api.getProjects().then(({ data }) => {
        if (data.code) {
          commit('SaveProjects', data.data);
        }
      });
    },
    GetChecklist({ commit }) {
      api.getChecklist().then(({ data }) => {
        if (data.code) {
          commit('SaveChecklist', data.data);
        }
      });
    },
    GetTags({ commit }) {
      api.getTags().then(({ data }) => {
        if (data.code) {
          commit('SaveTags', data.data);
        }
      });
    },
    GetConfig({ commit }) {
      api.getConfig().then(({ data }) => {
        if (data.code) {
          commit('SaveConfig', data.data);
        }
      });
    },
  },
  modules: {},
});
