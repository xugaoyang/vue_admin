#### 开发说明

---

##### 项目目录

```
├── public  ------------------------------ 静态文件夹
|  ├── css  ------------------------------ 全局主题样式
|  ├── images  --------------------------- 静态图片
|  ├── lib  ------------------------------ 工具库
|  ├── static  --------------------------- 第三方页面
|  ├── extraConfig.json  ----------------- 部署配置项
|  └── index.html  ----------------------- index.html
├── node_modules  ------------------------ 依赖
├── src  --------------------------------- 开发目录
|  ├── assets  --------------------------- 资源目录
|  |  ├── config  ------------------------ 项目插件配置
|  |  ├── images  ------------------------ 图片(无需动态替换)
|  |  ├── js  ---------------------------- 公用方法
|  |  └── scss  -------------------------- 共用样式
|  ├── components  ----------------------- 组件库
|  |  ├── layout  ------------------------ 布局
|  |  |  ├── index.vue  ------------------ 整体布局
|  |  |  ├── Header.vue  ----------------- 头部组件
|  |  |  └── SideBar.vue  ---------------- 侧边栏组件
|  |  └── xxx.vue  ----------------------- 其他组件
|  ├── models  --------------------------- vuex配置
|  ├── plugins  -------------------------- 插件引入
|  ├── router  --------------------------- vue-router
|  |  └── index.js
|  ├── services  ------------------------- 接口
|  |  ├── Callback.js  ------------------- 统一接口回调
|  |  ├── xx.js  ------------------------- 各种api
|  ├── views  ---------------------------- 业务视图
|  ├── App.vue
|  └── main.js
├── tests  ------------------------------- 单元测试
├── .env  -------------------------------- 本地环境变量配置
├── .yarnrc  ----------------------------- yarn配置
├── yarn.lock  --------------------------- yarn依赖版本锁定文件
├── .npmrc  ------------------------------ npm配置
├── package-lock.json  ------------------- npm依赖版本锁定文件
├── package.json
├── vue.config.js  ----------------------- webpack配置
└── README.md
```

##### 本地.yarnrc/.npmrc 文件配置

本机全局配置：
[公司内部源 npm 配置规范](https://www.tapd.cn/37492354/markdown_wikis/?#1137492354001001470)

```
// 项目配置
.yarnrc
registry "https://nexus.wiz.top/repository/npm-wizgroup/"
SASS_BINARY_PATH "C:/win32-x64-64_binding.node"

.npmrc
registry "https://nexus.wiz.top/repository/npm-wizgroup/"
SASS_BINARY_PATH=C:/win32-x64-64_binding.node

```

##### 环境变量配置说明

[环境变量定义规范链接](https://www.tapd.cn/37492354/markdown_wikis/?#1137492354001002072)

```
VUE_APP_DEBUG=true // 调试模式配置，生产环境设为false
VUE_APP_APP_ID=67df929b-3046-4e29-9f06-71fb77cad0b5 // 系统appId
VUE_APP_API_SERVER=https://easc35-api.dev.wiz.top // 接口地址
...
```

_注意：环境变量配置的增删改由前端团队评审确定之后方可使用，切勿私自添加，通过之后同步至运维团队，避免部署因环境变量信息不对称发生问题_

##### extraconfig 部署配置

```
// json format
{
  "VUE_APP_PLANT_SERVER":"https://wizplant.dev.wiz.top:8080",
  "VUE_APP_EASC_SERVER":"https://wizeasc.dev.wiz.top:8080"
}
```

_注意：检查运维部署至现场的配置文件格式，避免因格式问题造成低级错误_

#### 开始开发

##### git 拉取

1. 内网拉取使用 ssh 方式 [参考教程](https://www.tapd.cn/37492354/markdown_wikis/?#1137492354001002104)
2. 开发分支： dev
3. 自己的分支： 例如 yourname/dev
4. 合并流程： 获取主开发分支 dev、将 主开发分支 dev 合并到自己的 dev
5. 提交流程：提交自己的 dev、到 git 网页提交合并申请
6. 注意：每次改自己代码之前，先将 主分支 dev 拉取合并，不然冲突太多

##### 本地项目启动

```
1. yarn install
2. yarn serve:dev
```

_注意:[如果是因为 node-sass 的问题，起不来项目，请点击查看链接](https://www.tapd.cn/37492354/prong/stories/view/1137492354001031927?url_cache_key=9abefd2f6a44bfceebab4f3b8558d2a8&action_entry_type=story_tree_list)_

##### vuex

默认使用 vuex-persistedstate 进行持久化存储，避免项目 F5 刷新丢失 vuex 数据。

**常用存储参数:**

1. userInfo // 用户信息
2. refreshToken // 刷新 token
3. token // 当前 token
4. currentProject // 当前站点信息
5. ...

##### 常用库

1. lodash // js 操作工具库
2. dayjs // 时间处理库
3. localforage // localstorage 异步处理库
4. eslint // 代码规范（不可强制关闭）

##### 主题开发

```
// public/css/主题name/screen.scss内添加对应主题的样式，然后通过sass编译css
sass screen.scss screen.css
```

目前的主题定制化太强，涉及到 element 的内部修改，编译 scss 时间过长，故抽出来放在 public 文件下直接引入。

_如果要修改 element 内部样式，请参考 wizplant/wizdata 项目的修改方式，每一项内部的修改都要同步在 markdown 文件，方便后续人员维护_

##### https 证书安装

_如果因为证书问题导致浏览器打不开项目，请查看下面说明_
[https 安全证书安装](https://www.tapd.cn/37492354/ma4rkdown_wikis/?#1137492354001001505)
