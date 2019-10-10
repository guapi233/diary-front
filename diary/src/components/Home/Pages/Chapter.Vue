<template>
  <div id="diary">
    <!-- 图片 -->
    <div class="img-box">
      <el-image class="img-show" :src="'http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg'" :fit="'fill'" :preview-src-list="srcList"></el-image>
    </div>
    <!-- 日记信息 -->
    <div class="diary-info">
      <!-- 上半部分 -->
      <div class="top-info">
        <a class="title">我的第一次日记</a>
        <div class="icon">
          <v-icon class="diary-icon" name="bug" style="color:#ff4757;" title="has bug"></v-icon>
          <v-icon class="diary-icon" name="music" style="color:#ffa502;" title="has music"></v-icon>
          <v-icon class="diary-icon" name="code" style="color:#ff7f50;" title="has code"></v-icon>
          <v-icon class="diary-icon" name="video" style="color:#2ed573;" title="has vedio"></v-icon>
        </div>
      </div>
      <!-- 简述 -->
      <div class="sketch">
        <p>吧啦啦啦啦巴拉阿拉喇叭啦啦啦啦巴啦啦啦啦巴啦啦啦巴啦啦啦巴拉拉链把拉拉</p>
      </div>
      <!-- 下半部分 -->
      <p class="extra-info">
        <span class="build-date">创建日期：2019-10-8</span><br>
        <span class="modify-date">最后修改：2019-10-8</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      srcList: [
        "http://pic27.nipic.com/20130321/9678987_225139671149_2.jpg"
      ]
    }
  }
}
</script>

<style>
  .diary-icon {
    margin-right: 3px;
  }

  .sketch {
    padding: 0 20px 0 0;
    font-size: 15px;
    margin-bottom: 20px;
    height: 80px;
    overflow: hidden;
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

  #diary {
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
