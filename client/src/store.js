import Vue from 'vue'
import Vuex from 'vuex'
import { detectOS } from "@/util/detectOS";

const state = {
    isProgress: false,
    browser: detectOS()
}

const getters = {}

const mutations = {
    ToggleProgress(state, data) {
        state.isProgress = data
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