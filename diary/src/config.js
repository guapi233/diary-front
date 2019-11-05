export default {
  // 服务地址
  serverIp: "http://localhost:8181",

  // 功能列表
  function_list: [
    {
      name: "主页",
      icon: "home",
      to: "home",
      no: 0
    },
    {
      name: "日记",
      icon: "book",
      to: "diary",
      no: 1
    },
    {
      name: "待做",
      icon: "clock",
      to: "todo",
      no: 2
    },
    {
      name: "流水",
      icon: "calendar",
      to: "plan",
      no: 3
    },
    {
      name: "设置",
      icon: "cog",
      to: "setting",
      no: 4
    }
  ],

  // 信息保留时长
  messageTime: 2000
}
