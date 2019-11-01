<template>
  <div id="h-left">
    <div class="h-content">
      <!-- 当天日记 -->
      <div class="diary">
        <el-divider content-position="left"><a class="h-section-title">当天日记</a></el-divider>
        <div class="padding-50" v-if="hasDiary"><Chapter :diaryInfo="diaryInfo" /></div>
        <div class="no-has" v-else>
          今天还没有写日记，不要忘记<span class="color-link" @click="write_page=true">创建</span>哦
        </div>
      </div>
      <!-- 待做 -->
      <div class="todo">
        <el-divider content-position="left"><a class="h-section-title">待做</a></el-divider>
        <div v-if="hasTodo" class="padding-50"><TodoItem v-for="item in todoList" :key="item.tID" :todoInfo="item"></TodoItem></div>
        <div class="no-has" v-else>
          暂时没有待做的事哦，点击<router-link to="/todo" class="color-link">创建</router-link>
        </div>
      </div>

    </div>

    <Write v-if="write_page" @closeWindow="reLoad" />
  </div>
</template>

<script>
import Chapter from "../Chapter"
import Write from "../Write"
import TodoItem from "../Todo/TodoItem"
import config from "../../../../config.js"
import tools from "../../../../../static/tools.js"
export default {
  components: {Chapter, Write, TodoItem},
  inject: ["reload"],
  data () {
    return {
      write_page: false,
      hasDiary: false,
      hasTodo: false,
      diaryInfo: {},
      todoList: []
    }
  },
  methods: {
    reLoad () {
      this.write_page = false
      this.reload()
    },
    async checkTodayHasDiary () {
      let date = tools.getLastTime()

      let res = await this.$axios({
        method: "GET",
        url: `${config.serverIp}/diary?date=${date}`
      })
      res = res.data
      if (res.result) {
        this.hasDiary = true
        this.diaryInfo = res.data
      }
    },
    // 获取待做信息
    async getTodo () {
      let res = await this.$axios(`${config.serverIp}/todo?limit=3`)
      res = res.data

      if (res.result) {
        this.todoList = res.data
        this.hasTodo = true
      }
    }
  },
  created () {
    // 检测有没有写当天的日记
    this.checkTodayHasDiary()
    // 检测有没有待做
    this.getTodo()
  }
}
</script>

<style scoped>
  .padding-50 {padding: 0 50px;}

  .no-has {
    padding: 0 50px;
  }

  .color-link {
    color: #1e90ff;
    cursor: pointer;
  }

  .h-section-title {
    font-size: 20px;
    font-weight: 600;
  }

  #h-left {
    background: rgba(255, 255, 255, 0.822);
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    padding: 15px;
    border-radius: 5px;
    box-sizing: border-box;
  }
</style>
