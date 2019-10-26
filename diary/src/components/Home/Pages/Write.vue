<template>
  <Full>
    <div id="write" v-loading="load">
      <!-- 创建时间 -->
      <span class="create-time">create：{{diaryObj.createTime | timeFormate}}</span>
      <!-- 标题 -->
      <div class="title">
        <input class="title_input" type="text" v-model="diaryObj.title" placeholder="请输入标题..." />
      </div>
      <!-- 主题文本 -->
      <div class="w-content">
        <div class="w-left">
          <textarea
            class="input"
            placeholder="record everday..."
            v-model="diaryObj.input"
            @keydown.ctrl.83.prevent="save"
          ></textarea>
          <div class="build-time">
            <span>{{diaryObj.modifyTime | timeFormate}}</span>
          </div>
        </div>
        <div class="w-right" ref="mark">
          <Mark :input="diaryObj.input" cla="1" />
        </div>
      </div>
      <!-- 音乐提交 -->
      <div class="music-up">
        <svg t="1571996087827" class="music-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1162" width="200" height="200"><path d="M626.82758633 521.31034443v-391.03448203c-18.62068974-6.20689658-40.34482734-9.31034443-58.96551709-12.41379316v403.44827519h58.96551709z" p-id="1163"></path><path d="M567.86206924 422c-9.31034443-3.10344786-18.62068974-6.20689658-27.93103506-6.20689658h-58.96551709c-21.7241376 0-43.44827607 9.31034443-58.96551709 24.82758632-18.62068974 18.62068974-27.93103418 43.44827607-27.93103417 71.37931026v6.20689658c0 27.93103418 12.41379317 52.7586205 27.93103417 71.37931025 15.51724102 15.51724102 37.24137949 24.82758633 58.96551709 24.82758634h58.96551709c49.65517266 0 86.89655215-43.44827607 86.89655215-96.20689659v-6.20689658c0-40.34482734-24.82758633-77.58620684-58.96551709-90" p-id="1164"></path><path d="M437.51724102 192.34482734c-111.7241376 46.55172393-201.7241376 136.55172393-248.27586152 248.2758624h65.17241366c37.24137949-80.68965557 102.41379316-145.86206924 183.10344786-183.10344872v-65.17241368z" p-id="1165"></path><path d="M437.51724102 192.34482734z" p-id="1166"></path><path d="M580.2758624 766.48275898v65.17241368c111.7241376-46.55172393 201.7241376-136.55172393 248.27586153-248.2758624h-65.17241367c-40.34482734 77.58620684-105.51724102 142.75862051-183.10344786 183.10344872" p-id="1167"></path><path d="M512 912.34482734c-220.34482734 0-400.34482734-180-400.34482734-400.34482734 0-220.34482734 180-400.34482734 400.34482734-400.34482734 18.62068974 0 37.24137949 3.10344786 55.86206924 3.10344785 21.7241376 3.10344786 40.34482734 6.20689658 58.96551709 12.41379316 164.48275898 49.65517266 285.51724102 201.7241376 285.51724101 381.72413848-3.10344786 223.44827607-180 403.44827607-400.34482734 403.44827519m0-850.34482734c-248.2758624 0-450 201.7241376-450 450s201.7241376 450 450 450 450-201.7241376 450-450-201.7241376-450-450-450" p-id="1168"></path></svg>
        <input type="file" class="music-file" ref="music" multiple @change="musicUpload">
      </div>

      <!-- 操作按钮 -->
      <div class="sub">
        <el-button type="danger" @click="cancel">关闭</el-button>
        <el-button type="primary" @click="submitDiary">保存</el-button>
      </div>
    </div>
  </Full>
</template>

<script>
import Full from "./layout/Full"
import Mark from "./Mark"
import tools from "../../../../static/tools.js"
import config from "../../../config.js"
export default {
  props: {
    oldInfo: {
      default: null
    }
  },
  components: { Full, Mark },
  data () {
    return {
      load: false,
      diaryObj: {
        input: "",
        title: "",
        createTime: 0
      }
    }
  },
  computed: {
    userInfo () {
      return tools.getUserInfo()
    }
  },
  methods: {
    // 上传音频文件
    musicUpload () {
      let files = Array.from(this.$refs.music.files)

      if (tools.isMusicFile(files)) {
        this.load = true
        let dID = this.diaryObj.dID
        tools.musicUpload(files, dID, this, () => {
          this.load = false
        })
      } else {
        this.$message({
          type: "error",
          message: "上传文件不受支持  : ("
        })
      }
    },

    // 保存文章   !
    save ($event) {
      let diaryObj = this.diaryObj

      tools.saveTempDiary(diaryObj, this)
    },

    // 提交文章
    async submitDiary () {
      this.load = true

      let commitData = this.diaryObj
      // 获取文章
      commitData.showText = this.$refs.mark.innerHTML

      // 用户ID
      commitData.uID = this.userInfo.uID

      // 如果有传入dID，则表示本次的提交为修改原有文章
      if (this.diaryObj.dID) commitData.dID = this.diaryObj.dID

      if (!commitData.uID) {
        tools.loginError(this)
      }

      let res = await this.$axios({
        method: "POST",
        url: `${config.serverIp}/diary/add`,
        data: commitData
      })
      res = res.data

      this.load = false
      tools.resMessage(res, this, () => {
        this.$emit("closeWindow")

        // 顺便清空下缓存中的文章
        tools.clearTemp("diaryObj")
      })
    },

    // 关闭窗口
    cancel () {
      // 如果输入框中有文章信息且未执行保存操作，询问之后根据判断执行关闭指令 (或者缓存内容不是本章的)
      let tempDiary = tools.getTempDiary()
      if ((!tempDiary || tempDiary.dID !== this.diaryObj.dID) && tools.hasContent(this.diaryObj)) {
        this.$confirm("检测到您有未保存的文章，关闭窗口会丢失信息，确定要继续吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          this.$emit("closeWindow")
        }).catch(() => {})
      } else {
        this.$emit("closeWindow")
      }
    }
  },
  filters: {
    timeFormate (time) {
      return tools.dateFormate(time, 1)
    }
  },
  created () {
    if (this.oldInfo) {
      this.diaryObj = this.oldInfo
      // 初始化修改时间
      this.diaryObj.modifyTime = new Date().getTime()

      // 如果缓存数据来源于修改界面，则允许其覆盖初始值
      let tempDiary = tools.getTempDiary()
      if (this.diaryObj.dID === tempDiary.dID) {
        this.diaryObj = tools.getTempDiary(this)
      }
    } else {
      // 初始化创建时间
      this.diaryObj.createTime = new Date().getTime()
      this.diaryObj.modifyTime = new Date().getTime()

      // 检测有无缓存文章
      this.diaryObj = tools.getTempDiary(this) || this.diaryObj
    }
  }
}
</script>

<style scoped>
.music-file {
  display: block;
  height: 35px;
  width: 35px;
  margin-top: -40px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  font-size: 0;
}

.music-file > input {
  cursor: pointer !important;
}

.music-up {
  float: left;
}

.music-icon {
  margin-top: 10px;
  width: 35px;
  height: 35px;
  transition: all .3s ease;
}

.music-up:hover {
  fill: #27ae60 !important;
}

.create-time {
  position: absolute;
  margin-top: 10px;
  color: #999;
}

.title_input {
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid #333;
}

.title_input:focus::placeholder {
  color: transparent;
}

.title {
  text-align: center;
  margin: 0 500px 20px;
}

.sub {
  float: right;
}

.build-time {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #7bed9f;
}

.w-right {
  flex: 5;
  overflow: auto;
  height: 600px;
  position: relative;
}

.w-right::after {
  content: "review";
  color: #3742fa;
  position: absolute;
  right: 0px;
  top: -5px;
  font-size: 12px;
  z-index: 5;
}

.input {
  width: 100%;
  min-height: 100%;
  border: 0;
  font-size: 20px;
  border: 2px solid #333;
  padding: 15px;
  border-radius: 5px;
  background: #2f3542;
  color: #fff;
  box-sizing: border-box;
  resize: none;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
  overflow: hidden;
}

.input:focus {
  border-color: #1e90ff;
}

.w-left {
  flex: 5;
  min-height: 300px;
  position: relative;
}

.w-content {
  min-height: 600px;
  display: flex;
}

#write {
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
  border-radius: 5px;
  padding: 20px 15px;
  overflow: hidden;
}
</style>
