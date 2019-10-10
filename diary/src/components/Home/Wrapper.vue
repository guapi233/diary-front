<template>
  <div id="wrapper">
    <div class="wrapper-user-info">
      <el-avatar class="avatar" :size="72" :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" :fit="'cover'">
         <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
      </el-avatar>
      <div class="user-box">
        <div>
          <span class="user-name">用户名</span>
          <span class="user-age">200</span>
        </div>
        <input type="text" class="user-sign" maxlength="40" placeholder="编辑个性签名">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
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
    font-size: 12px;
    background: red;
    border-radius: 5px;
    padding: 2px;
    color: rgba(255, 255, 255, 0.651);
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
    background: url("https://i0.hdslb.com/bfs/space/0ad193946df21899c6cc69fc36484a7f96e22f75.png") no-repeat;
    background-size: cover;
    overflow: hidden;
  }
</style>
