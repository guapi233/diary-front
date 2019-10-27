<template>
  <div id="whole">
    <div class="return-home"><router-link to="/">←</router-link></div>
    <div class="modify"><a href="javascript:;" @click="write_page=true">修改</a></div>
    <div id="wrrap">
      <!-- 音乐播放 -->
      <Music :musicList="musicList" :state="musicState" @click.native="musicState = !musicState" @end="musicState=false"/>
      <div class="h22"><h2>{{diaryInfo.title}}</h2></div>
      <!-- <Mark v-if="diaryInfo.originText" :input="diaryInfo.originText" /> -->
      <div ref="mark"></div>
    </div>

    <Write v-if="write_page" :oldInfo="diaryInfo" @closeWindow="reLoad" />
  </div>
</template>

<script>
import Mark from "../Home/Pages/Mark"
import config from "../../config.js"
import Write from "../Home/Pages/Write"
import Music from "./ReadMusic"
import "../../../static/vueHigh.css"
export default {
  components: {Mark, Write, Music},
  inject: ["reload"],
  data () {
    return {
      diaryInfo: {},
      write_page: false,
      musicState: false
    }
  },
  computed: {
    musicList () {
      if (this.diaryInfo.music) return JSON.parse(this.diaryInfo.music) || []
    }
  },
  methods: {
    reLoad () {
      this.write_page = false
      this.reload()
    },
    // 获取文章信息
    async getDiaryInfo () {
      let diaryId = this.$route.params.id

      let res = await this.$axios({
        method: "GET",
        url: `${config.serverIp}/diary/get?dID=${diaryId}`
      })
      res = res.data

      if (res.result) {
        this.diaryInfo = res.data
        this.$refs.mark.innerHTML = this.diaryInfo.showText
        let targets = Array.from(this.$refs.mark.querySelectorAll("code"))

        targets.forEach(target => {
          this.$highlight.highlightBlock(target)
        })
      }
    }
  },
  async created () {
    // 加载文章信息
    this.getDiaryInfo()
  }
}
</script>

<style scoped>

  .modify {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 60px;
    left: 20px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    line-height: 30px;
  }

  .modify > a {
    padding: 6px 0;
  }

  .return-home {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    user-select: none;
    text-align: center;
    font-size: 26px;
    background-color: #fff;
    border-radius: 50%;
  }

  .h22 {
    text-align: center;
  }

  #wrrap {
    width: 700px;
    padding: 15px;
    min-height: 800px;
    background: rgba(255, 255, 255, 0.658);
    margin: 50px auto;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    position: relative;
  }
</style>
