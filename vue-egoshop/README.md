## 项目规划

### 增加elementui组件库
vue add element

### 前后端配置同时运行
"dev":"concurrently \"npm run serve\" \"nodemon mock/index.js\""

### 页面创建与路由配置

### 导航实现
使用了ElementUI组件库中的menu和icon

### 判断用户是否登陆
路由导航守卫  路由元信息meta  token验证

### 登录页面UI效果
ElementUI的card form  input  button

### 获取登陆输入数据 编写后台接口
引入mysql库  增加数据库访问

### 封装axios网络请求
参考axios的文档

### 封装了请求方案
api文件处理

### 实现网络请求处理
跨域处理
跨域处理目前有3中常见方式:
    1.jsonp:方便快捷，需要后台配合，缺点就是无法发送post请求
    2.cors:纯后台解决方案，不需要前台做任何事情，也是上线的推荐处理方案
    3.proxy:纯前台解决方案，采用的是node服务器的代理方案，缺点是只适合开发模式

### 后台生成token
jsonwebtoken  jwt

### 登录完成流程

### 退出登陆

### 查询商品接口
导入数据库

### 查询商品获取数据

### 分页器效果

### 百度富文本编辑器
https://github.com/HaoChuan9421/vue-ueditor-wrap
