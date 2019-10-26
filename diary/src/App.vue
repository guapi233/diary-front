<template>
  <div id="app">
    <div id="backboard"></div>
    <router-view v-if="isShow" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    async reload () {
      this.isShow = false
      await this.$nextTick()
      this.isShow = true
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #backboard {
    background: url("./assets/5.jpg") no-repeat;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1000;
  }

  html {height: 100%;}

  body {
    /* overflow: hidden; */
    font-family: Microsoft Yahei;
  }

  div ,input {
    box-sizing: border-box;
  }

  input , button{
    outline: none;
    border: none;
  }

  a{
    text-decoration: none;
    color: #333;
    cursor: pointer;
    transition: all .3s ease;
  }

  a:hover {
    color: #1e90ff;
  }
</style>
