<template>
  <div class="t-item" @mouseenter="showBack" @mouseleave="backcastShow=false">
    <div class="item-date">
      <span class="ltext">{{todoInfo.createTime | timeFormate}}</span>
      <span class="ctext">-></span>
      <span class="rtext">{{todoInfo.finishTime | timeFormate}}</span>
    </div>
    <div class="item-title">
      <span>{{todoInfo.title}}</span>
    </div>
    <div class="item-des">
      <span>{{todoInfo.description}}</span>
    </div>
    <div class="item-state">
      <span>{{todoInfo.state}}</span>
    </div>

    <div v-if="backcastShow" class="backcast" @click="overTodo(todoInfo.tID)">
      <span>结束此项任务</span>
    </div>
  </div>
</template>

<script>
import tools from "../../../../../static/tools"
import config from "../../../../config"
export default {
  inject: ["reload"],
  props: {
    todoInfo: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      backcastShow: false
    }
  },
  methods: {
    showBack () {
      (this.todoInfo.state !== "完成") && (this.backcastShow = true)
    },
    overTodo (tID) {
      this.$confirm("确定要完成这项任务吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        let res = await this.$axios(`${config.serverIp}/todo/complete?tID=${tID}&state=完成`)
        res = res.data

        tools.resMessage(res, this, () => {
          this.reload()
        })
      }).catch(() => {})
    }
  },
  filters: {
    timeFormate (time) {
      if (time !== "pending") return tools.dateFormate(time, 2)
      else return "pending"
    }
  }
}
</script>

<style scoped>
  .backcast {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.466);
    top: 0;
    left: 0;
    text-align: center;
    line-height: 200px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  .item-state {
    text-align: right;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .item-state span {
    padding: 5px;
    font-size: 12px;
    color: #f39c12;
    border-radius: 5px;
  }

  .item-des {
    font-size: 14px;
    padding: 5px;
  }

  .item-title {
    text-align: center;
    margin-top: 5px;
    font-weight: 700;
  }

  .item-date > span {
    flex: 1;
  }

  .item-date {
    font-size: 14px;
    color: #999;
    display: flex;
  }

  .t-item {
    padding: 5px;
    background: #fff;
    border-radius: 5px;
    margin: 0 5px 10px;
    width: 260px;
    height: 200px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    position: relative;
  }

</style>
