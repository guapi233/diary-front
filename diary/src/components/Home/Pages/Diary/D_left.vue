<template>
  <div id="d-left">
    <div class="chapter-s" v-for="item in diaryInfoList" :key="item.dID" >
      <Chapter :diaryInfo="item" />
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import Chapter from "../Chapter"
import config from "../../../../config.js"
export default {
  components: {Chapter},
  data () {
    return {
      diaryInfoList: []
    }
  },
  async created () {
    let res = await this.$axios({
      method: "GET",
      url: `${config.serverIp}/diary`
    })
    res = res.data
    console.log(res)
    if (res.result) {
      this.diaryInfoList = res.data
    }
  }
}
</script>

<style scoped>
  #d-left {
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    border-radius: 5px;
    padding: 20px 15px;
  }
</style>
