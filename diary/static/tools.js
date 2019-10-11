import config from "../src/config"

export default {
  checkLogin (vue) {
    vue.$axios({
      method: "GET",
      url: `${config.serverIp}/user`
    }).then((res) => {
  
      res = res.data
      if (!res.result && vue.$route.name !== "Login") {
        vue.$router.push({
          path: "/login"
        })
      }
    })
  }
}