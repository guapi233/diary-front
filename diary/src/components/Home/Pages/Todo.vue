<template>
  <L7r3>
    <div class="t-left" slot="left"></div>
    <div class="t-right" slot="right"></div>
  </L7r3>
</template>

<script>
import L7r3 from "./layout/L7r3"
export default {
  components: {L7r3}
}
</script>

<style scoped>

  .t-left {
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    border-radius: 5px;
    min-height: 600px;
  }
</style>
