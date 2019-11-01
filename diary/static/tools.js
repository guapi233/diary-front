import config from "../src/config"
import qs from "qs"

export default {
  checkLogin (vue) {
    return new Promise((resolve, reject) => {
      vue.$axios({
        method: "GET",
        url: `${config.serverIp}/user`
      }).then((res) => {
    
        res = res.data
        if (!res.result && vue.$route.name !== "Login") {
          vue.$router.replace({
            path: "/login"
          })
        }else {
          resolve(true)
        }
      }).catch(error => {
        vue.$router.replace({
          path: "/login"
        })
      })
    })
  },
  // 登录异常
  loginError (vue) {
    vue.$message({
      type: "error",
      message: "登录异常，请尝试重新登录"
    })

    vue.$router.replace({
      path: "/login"
    })
  },

  /**
   * 检测对象中是否含有非0的为空简单属性
   * @param valve 开启后必须obj全部的属性为空才返回true(createTime不算)
   */
  emptyObj (obj, valve=false) {
    if (valve) {
      for (let i in obj) {
        if (typeof obj[i] !== "object" && (obj[i] === 0 || obj[i]) &&  i !== "createTime") {
          return false
        } 
      }
      return true
    } else {
      for (let i in obj) {
        if (typeof obj[i] !== "object" &&  obj[i] !== 0 && !obj[i]) {
          return true
        } 
      }
      return false
    }
  },

  /**
   * 响应结果消息
   * @param {*} res 响应对象
   * @param {*} vue vue实例
   */
  resMessage (res, vue, fn=null) {
    // 弹窗显示登陆结果
    let messageInfo = {
      message: res.message,
      type: res.result ? "success" : "error",
      duration: config.messageTime
    }
    vue.$message(messageInfo)

    setTimeout(() => {
      fn && fn()
    }, config.messageTime);
  },

  /**
   * 
   * @param {*} time 时间戳  
   * @param num 1、4间隔时间展示
   */
  dateFormate (time, num=1) {
    time = new Date(Number(time))
        
    if (num === 1) {
        return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}\t\t${time.getHours()}:${time.getMinutes() >=10 ? time.getMinutes() : "0" + time.getMinutes()}`
    } else if (num === 2) {
      return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
    }
  },

  /**
   * 
   * @param {*} deviation 时间偏移量，默认为凌晨4点为每天的刷新点
   */
  getLastTime (deviation=4) {
    return new Date(new Date().toLocaleDateString()).getTime() + deviation * (config.messageTime * 60 *60)
  },

  /**
   * 获取用户信息
   */
  getUserInfo () {
    return JSON.parse(window.localStorage["userInfo"] || `{}`)
  },

  /**
   * 暂时将日记信息书写进浏览器缓存中 
   * @param {*} diaryObj 对象: 日记的各种信息
   * @param {*} vue 对象: Vue实例
   */
  saveTempDiary (diaryObj, vue) {

    // 如果传入的内容为空，清除缓存信息
    if (this.emptyObj(diaryObj, true)) {
      this.clearTemp("diaryObj")

      vue.$message({
        message: "已清空缓存信息",
        type: "success",
        duration: config.messageTime
      })
    } else {

      window.localStorage.diaryObj = JSON.stringify(diaryObj)

      vue.$message({
        message: "保存成功",
        type: "success",
        duration: config.messageTime
      })
    }
  },

  /**
   * 获取缓存中的文章信息
   */
  getTempDiary (vue=null) {
    let article = null;
    if (window.localStorage.diaryObj) {
      article = JSON.parse(window.localStorage.diaryObj)
    }

    if (article) {

      if (vue) {
       setTimeout(() => {
        vue.$message({
          message: "检测到您的缓存中含有保存的文章信息，已为您同步至编译界面 : )",
          duration: config.messageTime
        })
       }, 300);
      }

      return article
    } else {
      return false
    }
  },

  /**
   * 清理缓存
   * @param  key 需要清理的属性键值 
   */
  clearTemp (key) {
    window.localStorage.removeItem(key)

  },

  /**
   * 检测对象中是否含有内容
   * @param obj 需要检测的对象
   */
  hasContent (obj) {
    for (let i in obj) {
      if (typeof obj[i] !== "object" && (obj[i] === 0 || obj[i]) && i != "createTime") {
        return true
      }
    }
    return false
  },

  /**
   * 获取创建时间
   */
  getCreatedDate (time) {
    let distance = new Date().getTime() - Number(time)

    distance = Math.ceil((Math.floor(distance / 1000 / 60 / 60)) / 24)

    return distance
  },

  /**
   * 检查是否为音频文件
   * @param {*} files 文件
   */
  isMusicFile (files) {
    let isMusicFile = true

    files.forEach(item => {
      let name = item.name.substr(-3)
      let rule = /[mp3|m4a]/i
      if (!rule.test(name)) isMusicFile = false
    })

    return isMusicFile
  },

  /**
   * 上传音频
   * @param {*} fn 回调函数
   * @param {*} dID 文章编号
   */
  async musicUpload (files, dID, vue, fn=null) {
    let form = new FormData()
    let headers = {"Content-Type": "multipart/form-data"}

    // 因为koa-body的问题，需要收集音乐名称
    let musicList = []
    files.forEach(file => {
      musicList.push(file.name)
    })

    // Tips：FormData的值不可以是一个数组，但是向FormData中的同一属性添加多个文件是被允许的
    files.forEach(file => {
      form.append("music", file)
    })

    form.append("dID", dID)
    form.append("musicList", JSON.stringify(musicList))

    let res = await vue.$axios({
      method: "POST",
      url: `${config.serverIp}/diary/addmusic`,
      data: form,
      header: qs.stringify(headers)
    })
    res = res.data

    fn && fn()

    this.resMessage(res, vue)
  }
}