<template>
  <div id="whole">
    <Nav />
    <div class="main">
      <Wrapper />
      <Functions />
    </div>
  </div>
</template>

<script>
import Nav from "./Nav"
import Wrapper from "./Wrapper"
import Functions from "./Functions"
import tools from "../../../static/tools"
export default {
  components: {Nav, Wrapper, Functions},
  created () {
    tools.checkLogin(this)
  }
}
</script>

<style scoped>
  .main {
    width: 1200px;
    margin: 0 auto;
  }

  #whole {
    min-height: 100vh;
    /* overflow: auto; */
  }

</style>
