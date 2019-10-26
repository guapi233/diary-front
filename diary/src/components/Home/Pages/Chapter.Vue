<template>
  <div>
    <div class="diary-box" v-cloak >
      <!-- 图片 -->
      <div class="img-box">
        <el-image class="img-show" :src="cover" :fit="'fill'" :preview-src-list="srcList" />
      </div>
      <!-- 日记信息 -->
      <div class="diary-info">
        <!-- 上半部分 -->
        <div class="top-info">
          <router-link :to="`/read/${diaryInfo.dID}`" class="title">{{diaryInfo.title}}</router-link>
          <div class="icon">
            <v-icon v-for="(item, key) in has" :key="item.dID" class="diary-icon" :name="key" :style="{color:`${item}`}" :title="`has ${key}`"></v-icon>
          </div>
        </div>
        <!-- 简述 -->
        <div class="sketch">
          <p>{{diaryInfo.sketch}}</p>
        </div>
        <!-- 下半部分 -->
        <p class="extra-info">
          <span class="build-date">创建日期：{{diaryInfo.createTime | dateFormate}}</span><br>
          <span class="modify-date">最后修改：{{diaryInfo.modifyTime | dateFormate}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import tools from "../../../../static/tools.js"
import config from "../../../config.js"
export default {
  props: {
    diaryInfo: {
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      srcList: [

      ]
    }
  },
  computed: {
    cover () {
      if (this.diaryInfo.cover === "defaultCover.jpg") {
        return `${config.serverIp}/img/defaultCover.jpg`
      } else {
        return this.diaryInfo.cover
      }
    },
    has () {
      if (this.diaryInfo.has) {
        return JSON.parse(this.diaryInfo.has)
      }
    }
  },
  filters: {
    dateFormate (time) {
      return tools.dateFormate(time)
    }
  },
  created () {
    // 添加大图预览
    if (this.diaryInfo.cover === "defaultCover.jpg") {
      this.srcList.push(`${config.serverIp}/img/defaultCover.jpg`)
    } else {
      this.srcList.push(this.diaryInfo.cover)
    }
  }
}
</script>

<style scoped>
  .v-cloak {
    display: none;
  }

  .diary-icon {
    margin-right: 5px;
  }

  .sketch {
    padding: 0 20px 0 0;
    font-size: 15px;
    margin-bottom: 20px;
    height: 80px;
    overflow: hidden;
    color: #666;
  }

  .top-info {
    margin-bottom: 10px;
  }

  .diary-info {
    flex: 1;
  }

  .icon {
    float: right;
  }

  .title {
    font-size: 20px;
  }

  .extra-info {
    font-size: 12px;
    color: #999;
  }

  .diary-box {
    display: flex;
  }

  .img-show {
    width: 280px;
    height: 175px;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .5);
    margin-right: 30px;
  }
</style>
