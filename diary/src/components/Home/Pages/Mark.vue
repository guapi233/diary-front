<template>
  <div v-html="compiledMarkdown" class="markdown-body"></div>
</template>

<script>
import "github-markdown-css"
export default {
  props: ["input"],
  computed: {
    compiledMarkdown () {
      return this.$marked(this.input)
    }
  }
}
</script>

<style scoped>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 15px;
    font-size: 20px;
    position: relative;
  }

  .markdown-body::before {
    content: "review";
    color: #3742fa;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
