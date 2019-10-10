<template>
  <div id="h-left">
    <div class="h-content">
      <!-- 当天日记 -->
      <div class="diary">
        <el-divider content-position="left"><a class="h-section-title">当天日记</a></el-divider>
        <!-- <Chapter /> -->
        <div class="no-diary">
          今天还没有写日记，不要忘记<span class="color-link" @click="drawer=true">创建</span>哦
        </div>
      </div>
      <!-- 下一个功能 -->
    </div>
  </div>
</template>

<script>
import Chapter from "../Chapter"
export default {
  components: {Chapter},
  data () {
    return {

    }
  },
  methods: {

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
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    padding: 15px;
    border-radius: 5px;
    box-sizing: border-box;
  }
</style>
