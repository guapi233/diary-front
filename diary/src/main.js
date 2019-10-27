import Vue from "vue"
import App from "./App"
import router from "./router"
import marked from "marked"
import store from "./store/store"
// import VueHighlight from "vue-highlightjs"
// import "highlight.js/styles/atom-one-dark.css"
import highlightjs from "highlight.js"
import axios from "axios"
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import {Input, Message, Avatar, Divider, Image, Carousel, CarouselItem, Drawer, Button, Loading, MessageBox} from "element-ui"

Vue.config.productionTip = false

Vue.component("v-icon", Icon)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Drawer)
Vue.use(Button)
Vue.use(Loading)

// console.log(VueHighlight)
// 语法高亮
// Vue.use(VueHighlight)

// Vue.use 会使Message在页面刷新时自动弹出，不手动挂载$message无法使用
Vue.component(Message)
Vue.component(MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$highlight = highlightjs

// 允许携带cookie
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

// markdown语法支持
marked.setOptions({
  renderer: new marked.Renderer()
})
Vue.prototype.$marked = marked

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})
