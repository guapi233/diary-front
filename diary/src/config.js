export default {
  // 服务地址
  serverIp: "http://localhost:8181",

  // 功能列表
  function_list: [
    {
      name: "主页",
      icon: "home",
      to: "home"
    },
    {
      name: "日记",
      icon: "book",
      to: "diary"
    },
    {
      name: "待做",
      icon: "clock",
      to: "todo"
    },
    {
      name: "设置",
      icon: "cog",
      to: "setting"
    }
  ],

  // 信息保留时长
  messageTime: 2000
}
