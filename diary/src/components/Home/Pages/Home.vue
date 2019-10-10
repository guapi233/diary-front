<template>
  <div id="main">
    <L7r3>
      <Hleft slot="left" />
      <Hright slot="right" />
    </L7r3>
  </div>
</template>

<script>
import L7r3 from "./layout/L7r3"
import Hleft from "./Home/H_left"
import Hright from "./Home/H_right"
export default {
  components: {L7r3, Hleft, Hright}
}
</script>

<style scoped>

</style>
