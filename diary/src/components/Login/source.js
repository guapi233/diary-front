import config from "../../config"

export const methods = {
  getUser (userNumber) {
    this.user_number = userNumber
  },
  getPassword (password) {
    this.password = password
  },
  async userLog () {
    let res = await this.$axios({
      method: "POST",
      url: `${config.serverIp}/user/login`,
      data: {
        user: this.user_number,
        password: this.password
      }
    })
    res = res.data

    let messageInfo = {
      message: res.message,
      type: res.result ? "success" : "error"
    }
    this.$message(messageInfo)
  }
}
