<template>
  <div id="login">
    <div class="main">
      <div class="form">
        <header><span>登录</span></header>
        <main>
          <InputC class="user-input" :input_info="{name: '用户名', icon: 'user'}" @log="userLog" @getValue="getData('user_number', $event)"></InputC>
          <InputC class="password-input" :input_info="{name: '密码', icon: 'lock'}" @log="userLog" @getValue="getData('password', $event)"></InputC>
          <div class="login-button">
            <button class="button" @click="userLog">
              登录
              <div class="button-animate"></div>
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import InputC from "./Input"
import {methods} from "./source"
export default {
  components: {InputC},
  data () {
    return {
      user_number: "",
      password: ""
    }
  },
  methods,
  created () {
    if (this.$store.state.user_state.login) {
      this.$router.push("/")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button {
    width: 100%;
    font-size: 17px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background: transparent;
    cursor: pointer;
  }

  .button-animate {
    position: absolute;
    z-index: -1;
    width: 300%;
    height: 100%;
    background: -webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
    top: 0;
    left: 0;
    transform: translateX(-35%);
    transition: all 0.4s;
  }

  .button:hover > .button-animate {
    transform: translateX(0);
  }

  .login-button {
    position: relative;
    height: 50px;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
    margin: 30px auto 0;
    box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
  }

  .user-input {
    margin-bottom: 25px;
  }

  .form > header > span {
    display: block;
    font-size: 39px;
    color: #333;
    line-height: 1.2;
    text-align: center;
  }

  .form > header {
    margin-bottom: 49px;
  }

  .main {
    width: 500px;
    background: #fff;
    overflow: hidden;
    padding: 65px 55px 54px;
    border-radius: 10px;
  }

  #login {
    min-height: 100vh;
    background: url("../../assets/bg-01.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }
</style>
