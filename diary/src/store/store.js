import Vue from "vue"
import Vuex from "vuex"
import config from "../config"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 当前功能模块
    function_now: window.localStorage["functionNow"],
    // 功能列表
    function_list: config.function_list,
    // 用户状态
    user_state: {}

  },
  mutations: {
    // 设置当前显示功能模块
    setFunctionNow (state, param) {
      state.function_now = param
    },
    // 修改用户状态
    setUser (state, param) {
      for (let i in param) {
        state.user_state[i] = param[i]
      }
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
