<template>
  <L7r3>
    <div class="t-left" slot="left" >
      <!-- 待完成 -->
      <div v-if="displayP==='pending'">
        <div class="t-operate rtext">
          <el-button type="primary" @click="dialogFormVisible=true">添加待做</el-button>
        </div>

        <div class="t-parcel">
          <TodoItem v-for="item in pending" :todoInfo="item" :key="item.tID" />
        </div>

        <el-dialog title="添加待做" :visible.sync="dialogFormVisible">
          <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 已完成 -->
      <div v-else-if="displayP==='completion'">
        <div class="t-operate ltext">
          <span class="return-pending" @click="displayP='pending'">返回</span>
        </div>

        <div class="t-parcel">
          <TodoItem v-for="item in completion" :todoInfo="item" :key="item.tID" />
        </div>
      </div>
    </div>
    <div class="t-right" slot="right">
      <div class="overview">
        <span>累计完成</span>
        <p class="seeCompletion" @click="displayP='completion'">{{completion.length}}</p>
      </div>
    </div>
  </L7r3>
</template>

<script>
import L7r3 from "./layout/L7r3"
import TodoItem from "./Todo/TodoItem"
import config from "../../../config"
import tools from "../../../../static/tools"
export default {
  inject: ["reload"],
  components: { L7r3, TodoItem },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        description: "",
        createTime: `${new Date().getTime()}`
      },
      rules: {
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"}
        ],
        description: [
          {required: true, message: "描述不可为空", trigger: "blur"}
        ]
      },
      todoList: [],
      displayP: "pending"
    }
  },
  computed: {
    completion () {
      return this.todoList.filter(item => item.state === "完成")
    },
    pending () {
      return this.todoList.filter(item => item.state !== "完成")
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios({
            method: "POST",
            url: `${config.serverIp}/todo/add`,
            data: this.form
          })
          res = res.data

          tools.resMessage(res, this, () => {
            this.dialogFormVisible = false
            this.reload()
          })
        } else {
          return false
        }
      })
    }
  },
  async created () {
    let res = await this.$axios(`${config.serverIp}/todo`)
    res = res.data

    if (res.result) {
      this.todoList = res.data
    }
  }
}
</script>

<style scoped>

  .seeCompletion:hover, .return-pending:hover {
    color: #27ae60;
    cursor: pointer;
  }

  .overview {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
  }

  .t-right {
    text-align: center;
  }

  /* ------------ */
  .t-parcel {
    flex-wrap: wrap;
    display: flex;
  }

  .t-operate {
    margin-bottom: 10px;
  }

  .t-left {
    background: rgba(255, 255, 255, 0.822);
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.2);
    border-radius: 5px;
    min-height: 600px;
    padding: 15px;
  }
</style>
