# nest

## 安装创建

```
$ npm i -g @nestjs/cli
$ nest new project-name
$ npm run start
```

## 概念

### 初始目录

```
src
├── app.controller.ts     // 带有单个路由的基本控制器示例
├── app.module.ts         // 应用程序的根模块
└── main.ts               // 应用程序入口文件
```

### 控制器
负责处理传入的请求, 并返回对客户端的响应，控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求
为了创建一个基本的控制器，我们必须使用装饰器。装饰器将类与所需的元数据关联，并使Nest能够创建路由映射（`将请求绑定到相应的控制器`）。
### 路由

### Request 对象

express 装饰器
```
@Request()  =>	req
@Response()	=>  res
@Next()	=>  next 
@Session() =>  req.session
@Param(key?: string) => req.params / req.params[key]
@Body(key?: string) => req.body / req.body[key]
@Query(key?: string) => req.query / req.query[key]
@Headers(name?: string) => req.headers / req.headers[name]
```

### 资源

Nest以相同的方式提供其余的端点装饰器- `@Put() 、 @Delete()、 @Patch()、 @Options()、 @Head()和 @All()`

### 路由通配符

字符 ? 、 + 、 * 以及 () 是它们的正则表达式对应项的子集。连字符 (-) 和点 (.) 按字符串路径解析

### 状态码

默认情况下，响应的状态码总是200，除了 POST 请求外，此时它是201，我们可以通过在处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。

### Headers

```
@Post()
@Header('Cache-Control', 'none')
...
```

### 路由参数

为了定义带参数的路由，我们可以在路由中添加路由参数标记，以捕获请求 URL 中该位置的动态值。

@Get() 下面的装饰器示例中的路由参数标记演示了此用法。可以使用 @Param() 装饰器访问以这种方式声明的路由参数，该装饰器应添加到函数签名中。

```
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
}
```

### 路由注册顺序
每个路由的函数在类中出现的顺序很重要，假设您有一个`cats/:id`路由。如果在类定义中注册另一个路由 `/cats`， 请求不会命中第二个处理程序，因为所有路由参数都是可选的

### 范围
在 Nest 中几乎所有内容都可以在传入的请求之间共享
比如我们有一个数据库连接池，具有全局状态的单例服务等。

### 请求负载
DTO 是一个定义如何通过网络发送数据的对象。

### 处理错误

处理错误

### 类库特有 方式

### NestFactory

创建时选择平台：（NestExpressApplication 和 NestFastifyApplication）
```
const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
```

### 邮件服务

### 配置管理

### 服务监控
```
yarn add nest-status-monitor
```
### JWT
```
yarn add @nestjs/passport passport passport-local
yarn add --dev @types/passport-local
yarn add passport-jwt
```


## 参考资料

- [中文文档](https://docs.nestjs.cn/6/recipes?id=openapi-swagger)