<template>
  <Single>
    <div id="write">
      <div class="w-left">
        <textarea class="input" placeholder="record everday..." v-model="input" @keydown.prevent.ctrl.83="save"></textarea>
        <div class="build-time">
          <span>2019-10-9&nbsp;&nbsp;&nbsp;&nbsp;15:22</span>
        </div>
      </div>
      <div class="w-right">
        <Mark :input="input" />
      </div>
    </div>
  </Single>
</template>

<script>
import Single from "./layout/Single"
import Mark from "./Mark"
export default {
  components: {Single, Mark},
  data () {
    return {
      input: ""
    }
  },
  methods: {
    // 保存文章   !
    save ($event) {
      // 判断条件
      this.$message({
        message: "保存成功",
        type: "success"
      })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .build-time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #7bed9f;
  }

  .w-right {
    flex: 5;
  }

  .input {
    width: 100%;
    min-height: 100%;
    border: 0;
    font-size: 20px;
    border: 2px solid #333;
    padding: 15px;
    border-radius: 5px;
    background: #2f3542;
    color: #fff;
    box-sizing: border-box;
    resize: none;
    transition: all .3s ease;
    outline: none;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    overflow: hidden;
  }

  .input:focus {
    border-color: #1e90ff;
  }

  .w-left {
    flex: 5;
    min-height: 300px;
    position: relative;
  }

  #write {
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
    border-radius: 5px;
    padding: 20px 15px;
    min-height: 600px;
    margin-bottom: 20px;
    display: flex;
  }
</style>
