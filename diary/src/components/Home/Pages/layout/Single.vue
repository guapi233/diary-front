<template>
  <div id="main">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  #main > div{
    min-height: 560px;
    margin-bottom: 20px;
  }
</style>
