import Vue from 'vue'
import Vuex from 'vuex'
import $db from "./utils/Storage";

const state = {
    list: $db.getData('list') || [],
    tags: $db.getData('tags') || [],
    showBig: false,
    bigPath: ''
}

const getters = {}

const mutations = {
    SaveList(state, data) {
        state.list = data
        $db.setData('list', data)
    },
    SaveTags(state, data) {
        state.tags = data
        $db.setData('tags', data)
    },
    toggleBig(state, data) {
        state.showBig = data.showBig
        state.bigPath = data.bigPath
    }
}

const actions = {}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})