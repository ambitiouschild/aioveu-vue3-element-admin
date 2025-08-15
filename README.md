  <div align="center">
      <img alt="aioveu-vue3-element-admin" width="300" height="300" src="https://cdn.jsdelivr.net/gh/ambitiouschild/ambitiouschild/images/aioveu.png">
      <h1>aioveu-vue3-element-admin</h1>  
      </div>




<div align="center">
  <a target="_blank" href="https://vue.aioveu.com">🖥️ 在线预览</a> | <a target="_blank" href="https://app.aioveu.com">📲 移动端预览</a> |  <a target="_blank" href="https://juejin.cn/post/7228990409909108793">📑 阅读文档</a>|  <a target="_blank" href="https://github.com/ambitiouschild/aioveu-vue3-element-admin">🌐 官网</a> | <a href="./README.en-US.md">💬 English
</div>



## 项目简介

[aioveu-vue3-element-admin](https://github.com/ambitiouschild/aioveu-vue3-element-admin) 基于 Vue3、Vite、TypeScript 和 Element-Plus 搭建的极简开箱即用企业级后台管理前端模板。 配套 Java 后端 [aioveu-boot](https://github.com/ambitiouschild/aioveu-boot) 和 Node 后端 [aioveu-nest](https://github.com/ambitiouschild/aioveu-boot) 。 提供开发简版[vue3-element-template](https://github.com/ambitiouschild/aioveu-vue3-element-admin) 和 JS 版本[vue3-element-admin-js](https://github.com/ambitiouschild/aioveu-vue3-element-admin) 供开发者快速开发。


## 项目特色

- **简洁易用**：基于 [vue-element-admin](https://github.com/ambitiouschild/aioveu-vue3-element-admin) 升级的 Vue3 版本，无过渡封装 ，易上手。
- **数据交互**： 支持 `Mock` 数据和线上接口文档，并提供配套的 [Java](https://github.com/ambitiouschild/aioveu-boot) 和 [Node](https://gitee.com/youlaiorg/youlai-nest) 后端源码。

- **系统功能：** 提供用户管理、角色管理、菜单管理、部门管理、字典管理等功能模块。
- **权限管理：** 支持动态路由、按钮权限、角色权限和数据权限等多种权限管理方式。

- **基础设施：** 提供国际化、多布局、暗黑模式、全屏、水印、接口文档和代码生成器等功能。
- **持续更新**：项目持续开源更新，实时更新工具和依赖。


## 项目截图

🖥️ **控制台**



⚡**接口文档**



📲 **移动端**



## 项目源码

| 项目 | Github | Gitee | GitCode|
| ---- | ----| ---- | ---- |
| vue3-element-admin ✅| [aioveu-vue3-element-admin](https://github.com/ambitiouschild/aioveu-vue3-element-admin) |  |         |
| vue3-element-admin JS版| [vue3-element-admin-js](https://github.com/ambitiouschild/aioveu-vue3-element-admin) |  |  |
| vue3-element-admin 精简版 | [vue3-element-template](https://github.com/ambitiouschild/aioveu-vue3-element-admin) |  |         |
| vue-uniapp-admin 移动版 | [vue-uniapp-admin](https://github.com/ambitiouschild/aioveu-vue3-element-admin) |  |         |
| Java 后端 | [aioveu-boot](https://github.com/ambitiouschild/aioveu-boot) |  |         |
| Node 后端 | [aioveu-nest](https://github.com/ambitiouschild/aioveu-boot) |  |         |



## 开发指南

| 名称          | 地址     |
|---------------|--------------------|
| 视频教程 | [https://www.bilibili.com/video/BV1eFUuYyEFj](https://www.bilibili.com/video/BV1eFUuYyEFj)  |
| 项目搭建  | [基于 Vue3 + Vite + TypeScript + Element-Plus 从0到1搭建后台管理系统](https://blog.csdn.net/u013737132/article/details/130191394)  |
| 官方文档 | [https://www.youlai.tech/vue3-element-admin/](https://www.youlai.tech/vue3-element-admin/)  |
| 代码规范     | [ESLint V9 + Prettier + Stylelint + EditorConfig 约束和统一前端代码规范](https://youlai.blog.csdn.net/article/details/145608723) |
| 提交规范 | [Husky + Lint-staged + Commitlint + Commitizen + cz-git 配置 Git 提交规范](https://youlai.blog.csdn.net/article/details/145615236) |
| 接口文档 |                                                              |



## 📁目录结构



```
aioveu-admin/
├── node_modules/                    # 项目依赖包
├── public/                         # 公共资源
│   ├── favicon.ico                 # 网站图标
│   └── index.html                  # 主入口HTML文件    
├── src/                             # 前端源代码
│   ├── api/                         # API接口封装
│   │   ├── auth/                 # 认证相关接口
│   │   ├── file/                  # 文件相关接口
│   │   ├── oms/                  # 订单管理接口
│   │   ├── pms/                  # 商品管理接口
│   │   ├── sms/                  # 营销管理接口
│   │   ├── system/                  # 系统管理接口
│   │   └── ums/                # 用户管理接口
│   ├── assets/                      # 静态资源
│   │   ├── icons/                  # SVG图标
│   │   ├── images/                 # 图片资源
│   │   ├── fonts/                  # 字体文件
│   │   └── styles/                 # 全局样式
│   │       └── variables.scss      # SCSS变量
│   ├── components/                  # 公共组件
│   │   ├── AppLink.vue                  # 增强的路由链接组件
│   │   ├── Breadcrumb.vue                   # 面包屑导航
│   │   ├── Dictionary.vue                   # 字典组件
│   │   ├── GithubCorner.vue                   # GitHub角标组件
│   │   ├── Hamburger.vue                   # 折叠菜单按钮
│   │   ├── IconSelect.vue                   # 图标选择器
│   │   ├── LangSelect.vue                   # 语言选择器
│   │   ├── Pagination.vue                   # 分页组件
│   │   ├── SizeSelect.vue                   # 尺寸选择器
│   │   ├── SvgIcon.vue                   # SVG图标组件
│   │   ├── Upload.vue                   # 文件上传组件
│   │   └── WangEditor.vue                 # 富文本编辑器
│   ├── composables/                  # Vue 3中基于组合式API（Composition API）封装的、可复用的有状态逻辑函数
│   ├── constants/                  # 常数
│   ├── directives/                   # 自定义指令
│   │   └── permission/                  # 权限指令
│   │       └── index.ts                   # 权限指令入口
│   ├── enums/                       # 枚举定义
│   │   ├── DeviceEnum.ts              # 设备枚举
│   │   ├── LanguageEnum.ts            # 语言枚举 
│   │   ├── LayoutEnum.ts              # 菜单布局枚举
│   │   ├── MenuTypeEnum.ts            # 菜单类型枚举
│   │   ├── SidebarStatusEnum.ts       # 侧边栏状态枚举
│   │   ├── SizeEnum.ts                # 布局大小枚举
│   │   └── ThemeEnum.ts               # 主题枚举
│   ├── lang/                        # 国际化语言包
│   │   ├── package/                 # 语言包
│   │   │   ├── en.ts                  # 英文语言包
│   │   │   └── zh-cn.ts               # 中文语言包
│   │   └── index                   # 本地化入口文件
│   ├── layout/                      # 布局组件
│   │   ├── components/                 # 布局子组件
│   │   │   ├── Appmian/                  # 主内容区域
│   │   │   │   └── index.vue                   # 
│   │   │   ├── NavBar/                   # 顶部导航栏
│   │   │   │   ├── components                 # 
│   │   │   │   │   ├── NavbarLeft.vue                   # 
│   │   │   │   │   └── NavbarRight.vue                   # 
│   │   │   │   └── index.vue                   # 
│   │   │   ├── Settings/                  #系统设置 
│   │   │   │   ├── components/                 # 
│   │   │   │   │   ├── LayoutSelect.vue                   # 
│   │   │   │   │   └── ThemeColorPicker.vue                   # 
│   │   │   │   └── index.vue                   # 
│   │   │   ├── Sidebar/                  # 侧边栏
│   │   │   │   ├── components/                 # 
│   │   │   │   │   ├── SidebarLogo.vue                   # 
│   │   │   │   │   ├── SidebarMenu.vue                   # 
│   │   │   │   │   ├── SidebarMenuItem.vue                   # 
│   │   │   │   │   ├── SidebarMenuItemTitle.vue                   # 
│   │   │   │   │   └── SidebarMixTopMenu.vue                   # 
│   │   │   │   └── index.vue                   # 
│   │   │   └── TagsViews/               # 标签页导航
│   │   │   │   └── index.vue                   # 
│   │   └── index.vue                   # 布局主入口
│   ├── plugins/                    # 插件
│   │   ├── i18n.ts                   # 国际化插件
│   │   ├── icons.ts                   # 全局图标注册
│   │   ├── index.ts                   # 插件入口文件
│   │   └── permisssion.ts                   # 路由权限控制
│   ├── router                      # 路由配置
│   │   └── index.ts                   # 路由主入口
│   ├── store/                       # Vuex/Pinia状态管理
│   │   ├── modules/                  # 模块化状态 
│   │   │   ├── app.ts                  # 应用状态
│   │   │   ├── permission.ts                  # 权限状态
│   │   │   ├── settings.ts                  # 系统设置状态
│   │   │   ├── tagsView.ts                  # 标签页状态
│   │   │   └── user.ts                  # 用户状态
│   │   └── index.ts                # Store入口文件
│   ├── styles/                        # 全局样式（位置调整）
│   │   │   ├── index.scss                  # 全局样式入口
│   │   │   ├── reset.scss                  # 样式重置
│   │   │   ├── variables.module.scss                  # SCSS变量（模块化）
│   │   │   └── variable.scss                  # 全局SCSS变量
│   ├── types/                       # TypeScript类型定义
│   │   │   ├── auto-imports.d.ts                  #自动导入声明 
│   │   │   ├── components.d.ts                  # 组件类型声明
│   │   │   ├── env.d.ts                  # 环境变量类型
│   │   │   ├── global.d.ts                  # 全局类型声明
│   │   │   └── shims-vue.d.ts                  # Vue类型补充
│   ├── utils/                       # 工具函数
│   │   │   ├── color.ts                  # 颜色处理工具
│   │   │   ├── filter.ts                  # 全局过滤器
│   │   │   ├── i18n.ts                  # 国际化工具
│   │   │   ├── index.ts                  # 工具主入口
│   │   │   ├── nprogress.ts                  # 进度条控制
│   │   │   └── request.ts                  # Axios请求封装
│   ├── views/                       # 页面视图组件
│   │   │   ├── dashboard/                  #仪表盘
│   │   │   │   ├── components/                 # 
│   │   │   │   │   ├── barChart.vue                   # 柱状图
│   │   │   │   │   ├── FunnelChart.vue                   # 漏斗图
│   │   │   │   │   ├── PieChart.vue                   # 饼图
│   │   │   │   │   ├── RadarChart.vue                   # 雷达图 
│   │   │   │   └── index.vue                   # 主视图
│   │   │   ├── demo/                  # 功能示例
│   │   │   │   ├── multi-level/                  # 多级菜单
│   │   │   │   │   ├── children                # 
│   │   │   │   │   │   ├── children                # 
│   │   │   │   │   │   │   ├── level3-1.vue                # 三级菜单
│   │   │   │   │   │   │   └── level3-2.vue                # 三级菜单
│   │   │   │   │   │   └── level2.vue                # 二级菜单
│   │   │   │   │   └── level1.vue                   # 一级菜单
│   │   │   │   ├── api-doc.vue                   #  API文档
│   │   │   │   ├── icon-selector.vue                   # 图标选择
│   │   │   │   ├── signature.vue                   # 签名组件
│   │   │   │   ├── upload.vue                   # 文件上传
│   │   │   │   └── wang-editor.vue                   # 富文本编辑
│   │   │   ├── error-page/                   # 错误页面
│   │   │   │   ├── 401.vue                   # 未授权
│   │   │   │   └── 404.vue                   # 未找到
│   │   │   ├── login/                  # 登录页 
│   │   │   │   └── index.vue                   # 
│   │   │   ├── oms/                  # 订单管理
│   │   │   │   └── order/                   # 订单管理
│   │   │   │       └── index.vue                   # 订单列表
│   │   │   ├── pms/                  # 商品管理
│   │   │   │   ├── brand/                   # 品牌管理
│   │   │   │   │   └──  index.vue                   # 
│   │   │   │   ├── category/                   # 分类管理
│   │   │   │   │   ├── components/                  # 
│   │   │   │   │   │   ├── Attrtbute.vue                  # 分类属性
│   │   │   │   │   │   └── Category.vue                  # 分类树
│   │   │   │   │   └── index.vue                   # 主视图
│   │   │   │   ├── goods/                   # 商品管理
│   │   │   │   │   ├── components/                 # 
│   │   │   │   │   │   ├── GoodsAttribute.vue                  # 商品属性
│   │   │   │   │   │   ├── GoodsCategory.vue                  # 商品分类
│   │   │   │   │   │   ├── GoodInfo.vue                  # 商品信息
│   │   │   │   │   │   └── GoodStock.vue                  # 商品库存
│   │   │   │   │   ├── detail.vue                   # 商品详情
│   │   │   │   │   └── index.vue                   # 商品列表
│   │   │   ├── redirect/                  # 重定向页
│   │   │   │   └── index.vue                   # 
│   │   │   ├── sms/                  # 营销管理
│   │   │   │   ├── advert/                 # 广告管理 
│   │   │   │   │   └── index.vue                   # 
│   │   │   │   └── coupon                   # 优惠券管理
│   │   │   │       └── index.vue                   # 
│   │   │   ├── system/                 #系统管理
│   │   │   │   ├── dept/                 # 部门管理
│   │   │   │   │   └── index.vue                   # 
│   │   │   │   ├── dict/                  # 字典管理
│   │   │   │   │   ├── DictData.vue                   # 字典数据
│   │   │   │   │   └── index.vue                   # 主视图
│   │   │   │   ├── menu/                  # 菜单管理
│   │   │   │   │   └── index.vue                   # 
│   │   │   │   ├── role/                  # 角色管理
│   │   │   │   │   └── index.vue                   # 
│   │   │   │   ├── user/                  # 用户管理
│   │   │   │   │   ├── components/                   # 
│   │   │   │   │   │   └── dept-tree.vue                   # 部门树
│   │   │   │   │   └── index.vue                   # 用户列表
│   │   │   └── ums/                  # 会员管理
│   │   │       └── member/                   # 会员管理
│   │   │           └── index.vue                   # 会员列表
│   ├── App.vue                     # 根组件
│   ├── main.ts                     # 应用入口文件
│   └── setting.ts                     # 全局配置
├── tests/                          # 测试目录
│   ├── unit/                       # 单元测试
│   └── e2e/                        # E2E测试
├── .editorconfig                   # 编辑器配置
├── .env                            # 基础环境变量
├── .env.development                # 开发环境变量
├── .env.production                 # 生产环境变量
├── .eslintignore                   # ESLint忽略配置
├── .eslintrc.cjs                   # ESLint规则配置
├── .eslintrc-auto-import.json      # 自动导入配置
├── .gitignore                      # git忽略文件
├── .prettierignore                 # Prettier忽略配置
├── .prettierrc.cjs                 # Prettier格式化配置
├── .stylelintignore                # Stylelint忽略配置
├── .stylelintrc.cjs                # Stylelint样式检查配置 
├── commitlint.config.cjs           # CommitLint提交规范配置
├── package.json                    # 项目配置和依赖管理
├── vite.config.ts                  # Vite构建配置（Vue3推荐使用Vite）
├── index.html                      # 项目入口HTML（通常放在根目录）
├── tsconfig.json                   # TypeScript配置
├── tsconfig.node.json              # Node端TS配置
└── README.md                       # 项目说明文档
└── end    
```



## 项目启动


- **环境准备**

| 环境类型       | 名称                     |
|----------------|-----------------------------|
| **开发工具**   | [Visual Studio Code](https://code.visualstudio.com/Download) |
| **运行环境**   | Node 18 + (推荐[22.9.0](https://npmmirror.com/mirrors/node/v22.9.0/))  |
> ⚠️ 注意：Node.js 20.6.0版本存在兼容性问题，请勿使用


- **快速开始**

```bash
# 克隆代码
git@github.com:ambitiouschild/aioveu-vue3-element-admin.git

# 切换目录
cd vue3-element-admin

# 安装 pnpm
npm install pnpm -g

# 设置镜像源(可忽略)
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```


## 项目部署

执行 `pnpm run build` 命令后，项目将被打包并生成 `dist` 目录。接下来，将 `dist` 目录下的文件上传到服务器 `/usr/share/nginx/html` 目录下，并配置 Nginx 进行反向代理。

```bash
pnpm run build
```

以下是 Nginx 的配置示例：

```nginx
server {
    listen      80;
    server_name localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    # 反向代理配置
    location /prod-api/ {
        # 请将 api.aioveu.com 替换为您的后端 API 地址，并注意保留后面的斜杠 /
        proxy_pass http://api.aioveu.com/;
    }
}
```

更多详细信息，请参考这篇文章：[Nginx 安装和配置](https://blog.csdn.net/u013737132/article/details/145667694)。

## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为  `true` **即可**。



**Vue 中的Mock是一种模拟数据或接口的方法，主要用于在开发和测试阶段替代真实的后端服务**‌。Mock的主要作用包括提高开发效率、便于测试以及减少对后端的依赖。

### Mock的定义和作用

Mock在软件开发中通常指的是模拟对象或模拟数据，用来替代真实的后端API或数据库查询。其主要作用包括：

1. **提高开发效率**‌：在后端API尚未完成时，前端开发人员可以使用Mock数据进行开发，不必等待后端接口的完成。
2. **便于测试**‌：在测试阶段，使用Mock数据可以避免频繁调用真实的后端服务，减少对系统资源的消耗。
3. **减少对后端的依赖**‌：在前后端分离开发时，前端可以独立进行开发和测试，不依赖于后端接口的完成情况‌

## 后端接口

> 如果您具备Java开发基础，按照以下步骤将在线接口转为本地后端接口，创建企业级前后端分离开发环境，助您走向全栈之路。

1. 获取基于 `Java` 和 `SpringBoot` 开发的后端 [aioveu-boot](https://github.com/ambitiouschild/aioveu-boot) 源码。
2. 根据后端工程的说明文档 README.md完成本地启动。
3. 修改 `.env.development` 文件中的 `VITE_APP_API_URL` 的值，将其从 https://api.aioveu.com 更改为 http://localhost:8989 即可。


## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

	重启 VSCode 尝试

- **其他问题**

  如果有其他问题或者建议，建议 [ISSUE](https://github.com/ambitiouschild/aioveu-vue3-element-admin/issues/new)


## 提交规范

执行 `pnpm run commit` 唤起 git commit 交互，根据提示完成信息的输入和选择。

![](https://foruda.gitee.com/images/1687755823165218215/c1705416_716974.png)




## 加群交流

① 关注「可我不敌可爱」公众号，点击菜单 **交流群** 获取加群二维码。

② 直接添加微信 **`ambitiouschild`** 备注「前端/后端/全栈」。

| 公众号                                                       | 交流群                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img height="180px" src="https://cdn.jsdelivr.net/gh/ambitiouschild/ambitiouschild/images/ambitiouschild_Public_Platform.jpg"/> | <img src="https://cdn.jsdelivr.net/gh/ambitiouschild/ambitiouschild/images/ambitiouschild_group.jpg" height="300px"> |

