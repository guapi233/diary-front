<template>
  <div id="wrapper">
    <div class="wrapper-user-info">
      <el-avatar class="avatar" :size="72" :src="userInfo.avatar" :fit="'cover'">
         <img :src="defaultAvatarPath"/>
      </el-avatar>
      <div class="user-box">
        <div>
          <span class="user-name">{{userInfo.name}}</span>
          <span class="user-age">{{createdDate}}</span>
        </div>
        <input type="text" class="user-sign" maxlength="40" v-model="userInfo.sign" placeholder="编辑个性签名">
      </div>
    </div>
  </div>
</template>

<script>
import tools from "../../../static/tools.js"
import config from "../../config.js"
export default {
  data () {
    return {
    }
  },
  computed: {
    userInfo () {
      return tools.getUserInfo()
    },
    defaultAvatarPath () {
      return `${config.serverIp}/img/defaultAvatar.jpg`
    },
    createdDate () {
      return tools.getCreatedDate(this.userInfo.createTime)
    }
  },
  methods: {
  },
  created () {

  }
}
</script>

<style>
  .user-sign {
    width: 600px;
    padding: 5px 3px;
    margin-top: 5px;
    background: transparent;
    color: #d6dee4;
    transition: all .3s ease;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .user-sign:hover {
    background: #ffffff46;
    border-color: #ffffff80;
  }

  .user-sign:focus {
    background: #fff;
    color: #666;
  }

  .user-sign::placeholder {
    color: #d6dee4;
  }

  .user-age {
    display: inline-block;
    min-width: 20px;
    text-align: center;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.568);
    border-radius: 5px;
    padding: 2px;
    color: #27ae60;
    font-weight: 700;
  }

  .user-name {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-right: 5px;
  }

  .user-box {
    padding: 10px;
    margin-left: 10px;
  }

  .wrapper-user-info {
    padding: 116px 20px 0 20px;
    display: flex;
  }

  .avatar {
    border: 2px solid hsla(0,0%,100%,.4);
    cursor: pointer;
  }

  .avatar img {
    transition: all .3s ease;
  }

  .avatar img:hover{
    filter: blur(2px);
  }

  #wrapper {
    min-height: 200px;
    background-color: rgba(255, 255, 255, .3);
    background-size: cover;
    overflow: hidden;
  }
</style>
