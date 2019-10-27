// 功能列表页的方法
export const methods = {
  active (i) {
    this.$refs.active_line.style.left = `${20 + i * 85}px`
  },
  cancel () {
    this.$refs.active_line.style.left = `${20 + 85 * this.$store.state.function_now}px`
  },
  changePage (to, index) {
    if (this.$route.name !== to) {
      this.$store.commit("setFunctionNow", index)
      this.$router.replace({
        path: `/${to}`
      })
    }
  }
}
