<template>
  <div>
    <div id="box">
    <div id="function-list">
      <a v-for="(item, index) in function_list"
        :key="item.name" class="function" :class="[index === activer ? 'active' : '']"
        @mouseenter="active(index)" @mouseleave="cancel" @click="changePage(item.to, index)">
        <v-icon class="function-icon" :name="item.icon"></v-icon>
        <span>{{item.name}}</span>
      </a>
    </div>
      <div class="active-line" :style="{left: initActiveLine}" ref="active_line"></div>
    </div>
    <!-- 功能内容 -->
    <div id="func-page">
      <router-view />
    </div>
  </div>
</template>

<script>
import {methods} from "./source/Functions.js"
export default {
  components: {},
  data () {
    return {

    }
  },
  methods,
  computed: {
    activer () {
      return this.$store.state.function_now
    },
    function_list () {
      return this.$store.state.function_list
    },
    initActiveLine () {
      return `${20 + this.activer * 85}px`
    }
  },
  created () {
    // 改变选中的功能tab      bug
    let index = this.function_list.findIndex(item => {
      return item.to === this.$route.name
    })
    if (index !== -1) this.$store.commit("setFunctionNow", index)
  }
}
</script>

<style scoped>
  #func-page {
    margin-top: 10px;
  }

  .active {
    color: #00a1d6;
  }

  .function-icon {
    vertical-align: middle;
  }

  #box {
    position: relative;
  }

  .active-line {
    width: 55px;
    background: #00a1d6;
    transition: all .2s ease;
    height: 3px;
    position: absolute;
    bottom: -1px;
  }

  .function {
    padding: 0 15px;
    line-height: 66px;
    width: 55px;
    text-align: center;
    display: block;
    font-size: 14px;
    cursor: pointer;
  }

  .function:nth-child(1) {
    padding-left: 0;
  }

  #function-list {
    background: #fff;
    padding: 0 20px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
  }
</style>
