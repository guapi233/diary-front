<template>
  <div>
    <L7r3>
      <Dleft slot="left" />
      <div id="d-right" slot="right">
        <div class="placeholder">待开发...</div>
      </div>
    </L7r3>
  </div>
</template>

<script>
import L7r3 from "./layout/L7r3"
import Dleft from "./Diary/D_left"
export default {
  components: {L7r3, Dleft}
}
</script>

<style scoped>
  .placeholder {
    min-height: 100px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    padding: 15px;
  }
</style>
