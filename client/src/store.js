import Vue from 'vue'
import Vuex from 'vuex'
import { detectOS } from "@/util/detectOS";

const state = {
    isProgress: false,
    browser: detectOS(),
    list: []
}

const getters = {}

const mutations = {
    ToggleProgress(state, data) {
        state.isProgress = data
    },
    SaveList(state, data) {
        state.list = data
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