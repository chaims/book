# 控制器

控制器（Controller）负责处理客户端请求并发送响应内容，在传统的 MVC 架构中控制器就是负责处理指定请求与应用程序的对应关系，路由则决定具体处理哪个请求。

```

Client side -> (HttpRequest) -> xxxController 

```

## 路由

使用类来实现控制器的功能，使用装饰器来实现路由功能。它们分别需要配合 `@Controller` 和 `@Get` 饰器来使用，前者是控制器类的装饰，后者是具体方法的装饰器。
控制器类的装饰器和 HTTP 方法的装饰器共同决定了一个路由规则。

```
import {Controller, Get} from '@nestjs/common';

@Controller('/cat')
export class CatController {
    @Get()
    findAll () : string {
        return 'get all cats';
    }
}
```


> 使用 `$ nest g controller cats` 可以快速创建cats controller

### 返回

有两种方法来指定返回的状态码：

- 标准模式（建议的）
  - 如果返回一个 JavaScript 对象或者数据，将自动序列化成 JSON，如果是字符串将默认不会序列化，响应的返回状态码 默认 总是 200，除非是 POST 请求会默认设置成 201。可以使用 @HttpCode() 装饰器来改变它
- 指定框架
  - 可以使用 @Res() 装饰器来装饰响应对象使用，这样以来你就可以使用类 Express API 的方式处理响应了：response.status(200).send()  
  
> 注意：你可以同时使用上面两种方法，但是 Nest 会检测到，同时标准模式会在这个路由上被禁用

### 请求对象

```
@Request() -> req
@Response()	-> res
@Next()	 -> next
@Session()	-> req.session
@Param(key?: string) -> req.params / req.params[key]
@Body(key?: string) ->	req.body / req.body[key]
@Query(key?: string) ->	req.query / req.query[key]
@Headers(name?: string)	-> req.headers / req.headers[name]
```

```
@Get()
fetch (@Query() { id }):string {
    return `id: ${id}`;
}
```

### 资源装饰器

HTTP 方法装饰器， 比如：@Get(), @Put(), @Delete(), @Patch(), @Options(), @Head(), and @All()，注意 All 并不是 HTTP 的方法，而是 Nest 提供的一个快捷方式，表示接收任何类型的 HTTP 请求。

### 路由通配符

Nest 支持基于模式的路由规则匹配，比如：星号（*）表示匹配任意的字母组合。

```
*     匹配任意数量的任意字符
?     匹配任意单个字符
[]    匹配方括号中的任意一
[a-z] 匹配字母、数字区间
```

### 状态码

响应的默认状态码是 200，POST 则是 201，我们可以使用装饰器 @HttpCode(204) 来指定处理器级别的 默认 HttpCode 为 204。
如果想动态指定状态码，就要使用 @Res() 装饰器来注入响应对象，同时调用响应的状态码设置方法。

```
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

### 请求头

同样的我们可以使用 @Header() 来设置自定义的请求头，也可以使用 response.header() 设置

```
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

### 路由参数
通常我们需要设置一些动态的路由来接收一些客户端的查询参数，通过指定路由参数可以很方便的捕获到 URL 上的动态参数到控制器中。
@Param() 装饰器可以在方法中直接访问到路由装饰器 @Get() 中的的参数字典
```
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

### 路由顺序

路由的注册顺序与控制器类中的方法顺序相关，如果你先装饰了一个 cats/:id 的路由，后面又装饰了一个 cats 路由，那么当用户访问到 GET /cats 时，后面的路由将不会被捕获，因为参数才都是非必选的。