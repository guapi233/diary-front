<template>
  <div class="main">
    <div class="left"><slot name="left" /></div>
    <div class="right"><slot name="right" /></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .right {
    flex: 3;
  }

  .left {
    flex: 7.5;
  }

  .left > div {
    min-height: 560px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .main {
    display: flex;
  }
</style>
