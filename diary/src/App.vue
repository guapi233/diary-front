<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: Microsoft Yahei;
    overflow-x: hidden;
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
