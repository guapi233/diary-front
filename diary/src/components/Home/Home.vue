<template>
  <div id="whole">
    <Nav></Nav>
    <div id="main">
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
  #main {
    width: 1200px;
    margin: 0 auto;
  }

  #whole {
    background-color: #f6f6f6;
    min-height: 100vh;
  }

</style>
