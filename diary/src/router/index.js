import Vue from "vue"
import config from "../config"
import Router from "vue-router"
import Login from "@/components/Login/Login"
import Home from "@/components/Home/Home"
import Phome from "@/components/Home/Pages/Home"
import Diary from "@/components/Home/Pages/Diary"
import Setting from "@/components/Home/Pages/Setting"
import Todo from "@/components/Home/Pages/Todo"
import Plan from "@/components/Home/Pages/Plan"
import Read from "@/components/Read/Read"

Vue.use(Router)

// 后期配置为lazy load
const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        {
          path: "/home",
          name: "Home",
          component: Phome
        },
        {
          path: "/diary",
          name: "Diary",
          component: Diary
        },
        {
          path: "/setting",
          name: "Setting",
          component: Setting
        },
        {
          path: "/todo",
          name: "Todo",
          component: Todo
        },
        {
          path: "/plan",
          name: "Plan",
          component: Plan
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/read/:id",
      name: "Read",
      component: Read
    }
  ]
})

// 路由跳转之后滚至页顶
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)

  // 更新当前展示功能
  let functionNow = 0
  config.function_list.forEach(item => {
    if (item.to.toUpperCase() === to.name.toUpperCase()) {
      functionNow = item.no
    }
  })

  window.localStorage["functionNow"] = functionNow
})

export default router
