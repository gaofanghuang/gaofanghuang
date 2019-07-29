import Vue from 'vue'
import Vuex from 'vuex'
import $db from "./utils/Storage";

const state = {
    projectList: $db.getData('list') || [],
    tags: $db.getData('tags') || []
}

const getters = {}

const mutations = {
    SaveList(state, data) {
        state.projectList = data
        $db.setData('list', data)
    },
    SaveTags(state, data) {
        state.tags = data
        $db.setData('tags', data)
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