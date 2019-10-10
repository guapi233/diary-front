import Vue from "vue"
import Vuex from "vuex"
import config from "../config"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    function_now: 0,
    function_list: config.function_list
  },
  mutations: {
    setFunctionNow (state, n) {
      state.function_now = n
    }
  },
  getters: {

  },
  actions: {

  },
  modules: {

  }
})

export default store
