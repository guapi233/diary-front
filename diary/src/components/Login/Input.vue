<template>
  <div class="login-input">
    <span class="input-title">{{input_info.name}}</span>
    <input v-model="input_value" :type="input_type" :placeholder="`请输入${input_info.name}`" class="input-area" ref="input_area"  @focus="inputFocus" @blur="inputBlur"/>
    <span class="focus-input" ref="user_icon">
      <v-icon :name="input_info.icon" class="user-icon"></v-icon>
    </span>
    <i v-if="input_info.name == '密码'" @click="showPass" ref="pass_eye"
        class="el-input__icon el-icon-view el-input__clear pass-eye"></i>
  </div>
</template>

<script>
export default {
  props: ["input_info"],
  data () {
    return {
      input_value: "",
      pass_show: this.input_info.name !== "密码"
    }
  },
  computed: {
    input_type () {
      return this.pass_show ? "text" : "password"
    }
  },
  methods: {
    inputFocus () {
      this.$refs.user_icon.style.color = "#a64bf4"
      this.$refs.pass_eye && (this.$refs.pass_eye.style.display = "block")

      if (this.$refs.input_area.value === "") {
        this.$refs.input_area.placeholder = ""
      }
    },
    inputBlur () {
      if (this.$refs.input_area.value === "") {
        this.$refs.input_area.placeholder = `请输入${this.input_info.name}`
        this.$refs.user_icon.style.color = " #adadad"
        this.$refs.pass_eye && (this.$refs.pass_eye.style.display = "none")
      }

      // 向父组件提交数据
      this.$emit("getValue", this.input_value)
    },
    showPass () {
      this.pass_show = !this.pass_show
    }
  }
}
</script>

<style scoped>
  .pass-eye {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    display: none;
  }

  .user-icon {
    position: absolute;
    top: 40px;
    left: 10px;
    width: 20px;
    height: 20px;
  }

  .focus-input::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #7f7f7f;
    transition: all 0.4s;
  }

  .focus-input {
    color: #adadad;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .input-area {
    width: 100%;
    font-size: 17px;
    line-height: 1.2;
    display: block;
    height: 55px;
    background: transparent;
    padding: 0 7px 0 43px;
  }

  .input-area:focus + .focus-input::before {
    width: 100% !important;
  }

  .input-title {
    font-size: 14px;
    line-height: 1.5;
    padding-left: 7px;
  }

  .login-input {
    color: #333333;
    border-bottom: 2px solid #d9d9d9;
    position: relative;
  }
</style>
