import config from "../../config"
import tools from "../../../static/tools"

export const methods = {
  // 获取子组件“输入框”中的数据
  getData (key, userNumber) {
    this[key] = userNumber
  },
  async userLog () {
    let res = await this.$axios({
      method: "POST",
      url: `${config.serverIp}/user/login`,
      data: {
        user: this.user_number || "",
        password: this.password || ""
      }
    })
    res = res.data

    if (res.result) {
      // 写入登陆状态, 跳转至Home页
      window.localStorage["userInfo"] = JSON.stringify(res.data)

      setTimeout(() => {
        this.$store.commit("setUser", res.data)
        this.$router.push("/")
        // 关闭弹窗
        this.$message.close()
      }, 1000)
    }

    tools.resMessage(res, this)
  }
}
