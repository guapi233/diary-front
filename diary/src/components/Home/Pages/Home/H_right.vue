<template>
  <div id="h-right">
    <!-- 新闻 -->
    <News class="radius" />
    <!-- 公告 -->
    <div id="notice" class="radius">
      <div class="title">公告</div>
      <el-divider class="divider-modify"></el-divider>
      <textarea class="notice-input"  placeholder="编辑我的空间公告"></textarea>
    </div>
  </div>
</template>

<script>
import News from "./H_right/News"
export default {
  components: {News}
}
</script>

<style scoped>
  .notice-input {
    resize: none;
    border-radius: 5px;
    border-color: transparent;
    padding: 5px;
    box-sizing: border-box;
    transition: all .3s ease;
    width: 100%;
    height: 100px;
  }

  #notice {
    min-height: 200px;
    background: #fff;
    padding: 15px;
  }

  .divider-modify {
    margin: 10px 0;
  }

  .radius {
    border-radius: 3px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
  }

  #h-right {
    flex: 3;
  }
</style>
