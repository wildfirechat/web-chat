## 野火IM解决方案

野火IM是一套跨平台开源的即时通讯解决方案，主要包含以下内容。

| 仓库                                                         | 说明                                                    | 备注 |
| ------------------------------------------------------------ | ------------------------------------------------------- | ---- |
| [android-chat](https://github.com/wildfirechat/android-chat) | Android平台的SDK和Demo                                  |      |
| [ios-chat](https://github.com/wildfirechat/ios-chat)         | iOS平台的SDK和Demo                                      |      |
| [pc-chat](https://github.com/wildfirechat/pc-chat)           | 基于[Electron](https://electronjs.org/)开发的PC平台Demo |      |
| [web-chat](https://github.com/wildfirechat/pc-chat)          | Web平台的Demo[体验地址](http://web.wildfirechat.cn)     |      |
| [proto](https://github.com/wildfirechat/proto)               | 野火IM的协议栈实现                                      |      |
| [server](https://github.com/wildfirechat/server)             | IM server                                               |      |
| [app server](https://github.com/wildfirechat/app_server)     | 应用服务端Demo                                          |      |
| [robot_server](https://github.com/wildfirechat/robot_server) | 机器人服务端Demo                                        |      |
| [push_server](https://github.com/wildfirechat/push_server)   | 推送服务器                                              |      |
| [docs](https://github.com/wildfirechat/docs)                 | 野火IM相关文档，包含设计、概念、开发、使用说明          |      |
> 上述仓库中只有PC有个功能库没有开源需要授权才能使用，其它代码全部开源。详细说明请参加[费用](http://docs.wildfirechat.cn/#费用)

## web-chat说明

本工程是野火IM Web平台Demo，详情可以阅读[docs](http://docs.wildfirechat.cn).

开发一套IM系统真的很艰辛，请路过的朋友们给点个star，支持我们坚持下去🙏🙏🙏🙏🙏

### 联系我们

> 商务合作请优先采用邮箱和我们联系。技术问题请到[野火IM论坛](http://bbs.wildfirechat.cn/)发帖交流。

1. heavyrain.lee  邮箱: heavyrain.lee@wildfirechat.cn  微信：wildfirechat
2. imndx  邮箱: imndx@wildfirechat.cn  微信：wfchat


### 问题交流

1. 如果大家发现bug，请在GitHub提issue
2. 其他问题，请到[野火IM论坛](http://bbs.wildfirechat.cn/)进行交流学习
3. 微信公众号

<img src="http://static.wildfirechat.cn/wx_wfc_qrcode.jpg" width = 50% height = 50% />


## 体验

[在线体验野火IM Web版](http://web.wildfirechat.cn)，请使用野火IM Andorid或iOS Demo扫码登录


## 截图

![home](./screenshots/home.png)


![chat](./screenshots/chat.png)



![create_conversation](./screenshots/create_conversation.png)

更多截图，请查看[wewechat readme](./README_wewechat.MD)


## 开发
```
$ npm install
$ npm run dev
浏览器访问: http://localhost:3000

```
> 目前有问题，前端跨域，欢迎提交PR，谢谢。请打包部署测试。

## 打包

```
$ npm install
$ npm run build
```



更多信息，请查看[wewechat readme](./README_wewechat.MD)


## License

1. Under the MIT license. See the [LICENSE](https://github.com/wildfirechat/mars/blob/firechat/LICENSE) file for details.

2. Under the 996ICU License. See the [LICENSE](https://github.com/996icu/996.ICU/blob/master/LICENSE) file for details.



# 鸣谢

本项目基于[wewechat](https://github.com/trazyn/weweChat)开发，原项目的READ见[wewechat readme](./README_wewechat.MD)
