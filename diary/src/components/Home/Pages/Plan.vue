<template>
  <L7r3>
    <div class="p-left" slot="left">
      <el-switch v-model="showType" active-text="日详情" inactive-text="周预览"></el-switch>

      <!-- 周预览 -->
      <div v-if="!showType">
        <PlanWeek />
      </div>

      <!-- 日详情 -->
      <div v-else>
        aa
      </div>
    </div>
    <div class="p-right" slot="right">a</div>
  </L7r3>
</template>

<script>
import L7r3 from "./layout/L7r3"
import PlanWeek from "./Plan/PlanWeek"
export default {
  components: {L7r3, PlanWeek},
  data () {
    return {
      showType: false
    }
  },
  methods: {

  }
}
</script>

<style scoped>

  .p-left {
    min-height: 600px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    padding: 15px;
    border-radius: 5px;
  }
</style>
