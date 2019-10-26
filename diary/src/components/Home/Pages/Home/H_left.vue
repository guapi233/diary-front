<template>
  <div id="h-left">
    <div class="h-content">
      <!-- 当天日记 -->
      <div class="diary">
        <el-divider content-position="left"><a class="h-section-title">当天日记</a></el-divider>
        <Chapter v-if="hasDiary" :diaryInfo="diaryInfo" />
        <div class="no-diary" v-else>
          今天还没有写日记，不要忘记<span class="color-link" @click="write_page=true">创建</span>哦
        </div>
      </div>
      <!-- 下一个功能 -->
    </div>

    <Write v-if="write_page" @closeWindow="reLoad" />
  </div>
</template>

<script>
import Chapter from "../Chapter"
import Write from "../Write"
import config from "../../../../config.js"
import tools from "../../../../../static/tools.js"
export default {
  components: {Chapter, Write},
  inject: ["reload"],
  data () {
    return {
      write_page: false,
      hasDiary: false,
      diaryInfo: {}
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
    }
  },
  created () {
    // 检测有没有写当天的日记
    this.checkTodayHasDiary()
  }
}
</script>

<style scoped>
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
