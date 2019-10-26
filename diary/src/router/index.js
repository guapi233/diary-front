import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login/Login"
import Home from "@/components/Home/Home"
import Phome from "@/components/Home/Pages/Home"
import Diary from "@/components/Home/Pages/Diary"
import Setting from "@/components/Home/Pages/Setting"
import Todo from "@/components/Home/Pages/Todo"
import Read from "@/components/Read/Read"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          name: "home",
          component: Phome
        },
        {
          path: "/home",
          name: "home",
          component: Phome
        },
        {
          path: "/diary",
          name: "diary",
          component: Diary
        },
        {
          path: "/setting",
          name: "setting",
          component: Setting
        },
        {
          path: "/todo",
          name: "todo",
          component: Todo
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
      name: "read",
      component: Read
    }
  ]
})
