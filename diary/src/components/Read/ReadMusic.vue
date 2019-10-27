<template>
  <div class="music">
    <svg ref="musicIcon" t="1571996087827" class="music-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1162" width="200" height="200"><path d="M626.82758633 521.31034443v-391.03448203c-18.62068974-6.20689658-40.34482734-9.31034443-58.96551709-12.41379316v403.44827519h58.96551709z" p-id="1163"></path><path d="M567.86206924 422c-9.31034443-3.10344786-18.62068974-6.20689658-27.93103506-6.20689658h-58.96551709c-21.7241376 0-43.44827607 9.31034443-58.96551709 24.82758632-18.62068974 18.62068974-27.93103418 43.44827607-27.93103417 71.37931026v6.20689658c0 27.93103418 12.41379317 52.7586205 27.93103417 71.37931025 15.51724102 15.51724102 37.24137949 24.82758633 58.96551709 24.82758634h58.96551709c49.65517266 0 86.89655215-43.44827607 86.89655215-96.20689659v-6.20689658c0-40.34482734-24.82758633-77.58620684-58.96551709-90" p-id="1164"></path><path d="M437.51724102 192.34482734c-111.7241376 46.55172393-201.7241376 136.55172393-248.27586152 248.2758624h65.17241366c37.24137949-80.68965557 102.41379316-145.86206924 183.10344786-183.10344872v-65.17241368z" p-id="1165"></path><path d="M437.51724102 192.34482734z" p-id="1166"></path><path d="M580.2758624 766.48275898v65.17241368c111.7241376-46.55172393 201.7241376-136.55172393 248.27586153-248.2758624h-65.17241367c-40.34482734 77.58620684-105.51724102 142.75862051-183.10344786 183.10344872" p-id="1167"></path><path d="M512 912.34482734c-220.34482734 0-400.34482734-180-400.34482734-400.34482734 0-220.34482734 180-400.34482734 400.34482734-400.34482734 18.62068974 0 37.24137949 3.10344786 55.86206924 3.10344785 21.7241376 3.10344786 40.34482734 6.20689658 58.96551709 12.41379316 164.48275898 49.65517266 285.51724102 201.7241376 285.51724101 381.72413848-3.10344786 223.44827607-180 403.44827607-400.34482734 403.44827519m0-850.34482734c-248.2758624 0-450 201.7241376-450 450s201.7241376 450 450 450 450-201.7241376 450-450-201.7241376-450-450-450" p-id="1168"></path></svg>
    <audio ref="audioE" :src="musicSrc"></audio>
  </div>
</template>

<script>
import config from "../../config"
export default {
  props: {
    musicList: {
      default () {
        return []
      }
    },
    state: {
      default: false
    }
  },
  data () {
    return {
      nowPlay: 0
    }
  },
  computed: {
    musicSrc () {
      if (!this.musicList[this.nowPlay]) return ""

      return `${config.serverIp}/upload/music/${this.musicList[this.nowPlay]}`
    }
  },
  methods: {
    // 音乐结束时的回调
    musicPlayer () {
      if (this.nowPlay < this.musicList.length - 1) {
        this.nowPlay++

        // 因为chrome对于音频自动播放的限制，只能通过手动触发
        document.onmousemove = () => {
          this.$refs.audioE.play()
          document.onmousemove = null
        }
      } else {
        this.$emit("end")
        this.nowPlay = 0
      }
    }
  },
  watch: {
    // 监视音乐控制器的播放与暂停
    state (value) {
      if (value) {
        // 没有音频的话提示
        if (!this.musicList[0]) {
          this.$message({
            type: "error",
            message: "这篇文章还没有上传任何音频哦  : ("
          })
        } else {
          this.$refs.audioE.play()
          this.$refs.musicIcon.style.animationPlayState = "running"
        }
      } else {
        this.$refs.audioE.pause()
        this.$refs.musicIcon.style.animationPlayState = "paused"
      }
    }
  },
  mounted () {
    // 监听音乐结束
    this.$refs.audioE.addEventListener("ended", () => {
      this.musicPlayer()
    }, false)
  }
}
</script>

<style scoped>
 .music {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .music-icon {
    width: 30px;
    height: 30px;
    animation: musicRotate 3600s ease;
    animation-play-state: paused;
    cursor: pointer;
  }

  .music:hover {
    fill: #27ae60;
  }

  @keyframes musicRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(99999deg);
    }
  }
</style>
