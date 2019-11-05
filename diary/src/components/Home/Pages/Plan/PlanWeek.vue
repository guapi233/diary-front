<template>
  <div>
    <div class="p-operate">
      <el-button type="primary" @click="dialogShow=true">修改流水</el-button>
    </div>

    <div class="plan">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="time" label="时间" ></el-table-column>
          <el-table-column prop="Monday" label="周一" width="100"></el-table-column>
          <el-table-column prop="Tuesday" label="周二" width="100"></el-table-column>
          <el-table-column prop="Wednesday" label="周三" width="100"></el-table-column>
          <el-table-column prop="Thursday" label="周四" width="100"></el-table-column>
          <el-table-column prop="Friday" label="周五" width="100"></el-table-column>
          <el-table-column prop="Saturday" label="周六" width="100"></el-table-column>
          <el-table-column prop="Sunday" label="周日" width="100"></el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog :visible.sync="dialogShow">
      <div class="plan-input">
        <el-input type="textarea" autosize :rows="10" placeholder="计划要好好的完成，不然有什么意义呢" v-model="planInput" />
      </div>
      <div class="rtext m-top15"><el-button @click="submit">添加时间轴</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
import config from "../../../../config"
import tools from "../../../../../static/tools"
export default {
  inject: ["reload"],
  data () {
    return {
      tableData: [],
      dialogShow: false,
      planInput: "",
      planInfo: {}
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return "warning-row"
      } else if (rowIndex === 3) {
        return "success-row"
      }
      return ""
    },
    async submit () {
      if (!this.planInput) {
        this.$message({
          type: "error",
          message: "内容不能为空"
        })
      } else {
        let res = await this.$axios({
          method: "POST",
          url: `${config.serverIp}/plan/add`,
          data: {
            originText: this.planInput,
            pID: 2
          }
        })
        res = res.data

        tools.resMessage(res, this, () => {
          this.dialogShow = false
          this.reload()
        })
      }
    },
    async getPlan () {
      let res = await this.$axios(`${config.serverIp}/plan`)
      res = res.data

      if (res.result) {
        this.planInfo = res.data
        this.tableData = JSON.parse(res.data.planObj)
      }
    }
  },
  created () {
    this.getPlan()
  }
}
</script>

<style scoped>
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #fff !important;
  }

  .p-operate {
    text-align: right;
    margin-bottom: 15px;
  }
</style>
