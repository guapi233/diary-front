<template>
  <div id="d-left">
    <div class="chapter-s">
      <Chapter />
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import Chapter from "../Chapter"
export default {
  components: {Chapter}
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
