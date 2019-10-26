<template>
  <div v-html="compiledMarkdown" class="markdown-body"></div>
</template>

<script>
import "github-markdown-css"
export default {
  props: {
    input: {
      default: ""
    }
  },
  computed: {
    compiledMarkdown () {
      return this.$marked(this.input)
    }
  }
}
</script>

<style scoped>
  .aa img {
    width: 100%;
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 15px;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
