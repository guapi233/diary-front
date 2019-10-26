<template>
  <div id="full">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  #full {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    overflow: hidden;
  }
</style>
