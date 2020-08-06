# 简介

## 框架介绍

Nest 是一个用于构建高效、可扩展的 Node.js 服务端应用框架，基于 TypeScript 编写并且结合了 OOP（Object Oriented Programming）、FP（Function Programming）、FRP(Function Reactive Programming) 的相关理念。
Nest 类似是 Node.js 版的 Spring 框架。
Nest 的目标是一个平台无关的框架。
Nest 和传统的 MVC 框架的区别在于它更注重于后端部分（控制器、服务与数据）的架构，视图层相对比较独立，完全可以由用户自定义配置。
## 安装

```
$ npm i -g @nestjs/cli
$ nest new project-name
$ npm run start
```

## 目录

```
src
├── app.controller.spec.ts        // 
├── app.controller.ts             // 路由的控制器
├── app.module.ts                 // 应用程序的根模块（root module）
├── app.service.ts
└── main.ts                       // 应用程序的入口文件，使用 NestFactory 方法创建应用实例
```


## 核心

### 模块 Module

- 带有@Module()装饰器的类
- 每个 Nest 应用都有一个根模块，通常命名为 AppModule。根模块提供了用来启动应用的引导机制。 一个应用通常会包含很多功能模块。
- Module装饰器接受一个对象：
  - `providers` 由nest注入器实例化的服务，可以在这个模块之间共享
  - `controllers` 存放创建的一组控制器
  - `imports` 导入此模块中所需要提供程序的模块列表
  - `exports`导出这个模块可以在其它模块享用`providers`中的服务
- 专注于某个应用领域、某个工作流或一组紧密相关的能力，将控制器和一组相关（服务）代码关联起来，形成功能单元。
- 一个模块结构图：
  - CoreModule 核心模块（注册中间件、过滤器、管道、守卫、拦截器、装饰器等）
  - ShareModule 共享模块（注册服务、mongodb、redis等）
  - ConfigModule 配置模块（系统配置）
  - FeatureModule 特性模块 （业务模块、用户模块等）
  
### 控制器 Controller
- 处理客户端传入的请求参数并向客户端返回响应数据，简单理解就是路由Router。
- `@Controller`装饰器，将类与基本的元数据相关联，将控制器映射到相应的路由。
- 参数装饰器
  - @Request
  - @Response
  - @Next
  - @Session
  - @Param(param?: string)
  - @Body(param?: string)
  - @Query(param?: string)
  - @Headers(param?: string)
- 方法装饰器
  - @Post
  - @Get
  - @Put
  - @Delete
  - @All
  - @Patch
  - @Options
  - @Head
  - @Render
  - @Header
  - @HttpCode

- 响应数据的2种解决方案
  - 默认
    - 直接返回一个JavaScript对象或数组时，它将被自动解析为JSON；
    - 返回一个字符串时，只发送一个字符串，而不尝试解析它；
    - 默认情况下，响应的状态代码总是200；
  - 使用库特定的响应对象
    - 使用@res()修饰符在函数签名中注入该对象，res.status(HttpStatus.CREATED).send()或者res.status(HttpStatus.OK).json([])等Express的res方法

> 禁止同时使用这两种方法，如果2个都使用，那么会出现这个路由不工作的情况。
> 控制器必须注册到该模块元数据的controllers里才能正常工作。

### 服务与依赖注入 Provider Dependency injection
控制器中和逻辑有关的功能与其他类型的处理分离开，可以让控制器类更加精简、高效。理想情况下，控制器的工作只管申明装饰器和响应数据，而不用顾及其它。提供请求和响应桥梁，以便作为视图和应用逻辑的中介者。通过依赖注入能更容易地将应用逻辑分解为服务，并让这些服务可用于各个控制器中。
  
把一个类定义为服务，就要用 @Injectable 装饰器来提供元数据，以便让 Nest 可以把它作为依赖注入到控制器中。

使用 @Injectable 装饰器来表明一个控制器或其它类（比如另一个服务、模块等）拥有一个依赖。 依赖并不必然是服务，它也可能是函数或值等等。

### 中间件 Middleware
- 中间件是在路由处理程序之前调用的函数。
- 中间件功能可以访问请求和响应对象，以及应用程序请求-响应周期中的下一个中间件功能。
- 下一个中间件函数通常由一个名为next的变量表示。
- 中间件功能：
  - 执行任何代码
  - 对请求和响应对象进行更改。
  - 请求-响应周期结束，调用堆栈中的下一个中间件函数。
  - 如果当前中间件函数没有结束请求-响应周期，它必须调用next()将控制权传递给下一个中间件函数。否则，请求将被挂起。
- 中间件要么是一个函数，要么是一个带有@Injectable()装饰器的类。类应该实现NestMiddleware接口，而函数却没有任何特殊要求。
- 注册使用方式
  - 全局注册
  - 模块内局部注册

### 异常过滤器 Exception filter
异常过滤器层负责在整个应用程序中处理所有抛出的异常。当发现未处理的异常时，最终用户将收到适当的用户友好响应

默认显示 JSON 信息：
```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

底层过滤器：
```
@Post()
async create(@Body() createCatDto: CreateCatDto) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

HttpException 接受2个参数
- 消息内容，可以是字符串错误消息或者对象 `{status: 状态码，error：错误消息}`
- 状态码

过滤器也支持扩展和定制快捷过滤器对象
```
export class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN);
    }
}
```

Nest 常用的HTTP状态错误：
- BadRequestException 400
- UnauthorizedException 401
- ForbiddenException 403
- NotFoundException 404
- NotAcceptableException 406
- RequestTimeoutException 408
- ConflictException 409
- GoneException 410
- PayloadTooLargeException 413
- UnsupportedMediaTypeException 415
- UnprocessableEntityException 422
- InternalServerErrorException 500
- NotImplementedException 501
- BadGatewayException 502
- ServiceUnavailableException 503
- GatewayTimeoutException 504

自定义扩展
- 扩展样例
- 使用
  - @UseFilters()，作用当前路由的响应结果
  - @UseFilters()，作用当前控制器路由所有的响应结果
  - 全局注册使用内置实例方法useGlobalFilters，作用整个项目

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        reponse.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}

使用一：

@Post()
@UseFilters(HttpExceptionFilter | new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

使用二：

@UseFilters(HttpExceptionFilter | new HttpExceptionFilter())
export class CatsController {}

使用三：

const app = await NestFactory.create(ApplicationModule);
app.useGlobalFilters(new HttpExceptionFilter());

```

### 管道 Pipe
- 管道可以把你的请求参数根据特定条件验证类型、对象结构或映射数据。
- 管道是一个纯函数，不应该从数据库中选择或调用任何服务操作。
- 管道是用@Injectable()装饰器注释的类。应该实现PipeTransform接口，具体代码在transform实现。
- 内置了2个通用的管道，一个数据验证ValidationPipe，一个数据转换ParseIntPipe。
- 使用方式：
  - @Body()装饰器里面使用，只作用当前body这个参数
  - @UsePipes()装饰器里面使用，作用当前这条路由所有的请求参数
  - @UsePipes()装饰器里面使用，作用当前控制器路由所有的请求参数
  - 全局注册使用内置实例方法useGlobalPipes，作用整个项目。

> 使用`ValidationPipe`需要配合`class-validator class-transformer`

```
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}


@Post()
create(@Body(ValidationPipe | new ValidationPipe()) createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
}

@Post()
@UsePipes(ValidationPipe | new ValidationPipe())
create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
}


@Get(':id')
async findOne(@Param('id', ParseIntPipe | new ParseIntPipe()) id) {
  return await this.catsService.findOne(id);
}
```

### 守卫 Guard
- 守卫可以做权限认证，如果你没有权限可以拒绝你访问这个路由，默认返回403错误。
- 用@Injectable()装饰器注释的类。应该实现CanActivate接口，具体代码在canActivate方法实现，返回一个布尔值，true就表示有权限，false抛出异常403错误
- 使用方式
  - @UseGuards()装饰器里面使用，作用当前控制器路由所有的请求参数
  - 全局注册使用内置实例方法useGlobalGuards，作用整个项目。


```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

@Controller('cats')
@UseGuards(RolesGuard | new RolesGuard())
export class CatsController {}

const app = await NestFactory.create(ApplicationModule);
app.useGlobalGuards(new RolesGuard());
```

### 拦截器 Interceptor
- 用@Injectable()装饰器注释的类。应该实现NestInterceptor接口，具体代码在intercept方法实现，返回一个Observable。
- 用途
  - 在方法执行之前/之后绑定额外的逻辑
  - 转换从函数返回的结果
  - 转换从函数抛出的异常
  - 扩展基本的函数行为
  - 完全覆盖一个函数取决于所选择的条件(例如缓存)
- 使用方法
  - @UseInterceptors()装饰器里面使用，作用当前路由，还可以传参数，需要特殊处理，写成高阶函数，也可以使用依赖注入。
  - @UseInterceptors()装饰器里面使用，作用当前控制器路由，这个不能传参数，可以使用依赖注入
  - 全局注册使用内置实例方法useGlobalInterceptors，作用整个项目。
- 应用场景
  - 缓存处理
  - 响应数据转换
  - 异常捕获转换
  - 响应超时报错
  - 打印请求响应日志

```
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        console.log('Before...');
        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`After ...`))
        )
    }
}


@Post('upload')
@UseInterceptors(FileFieldsInterceptor | FileFieldsInterceptor([
    { name: 'xxx', maxCount: 1},
    { name: 'xxx', maxCount: 1}
]))
uploadFile (@UploadFiles() files) {
    console.log(files)
}

@UseInterceptors(LoggingInterceptor | new LoggingInterceptor())
export class CatsController {}

const app = await NestFactory.create(ApplicationModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

## 总结

- 全局 管道、守卫、过滤器和拦截器，只能new;
- 全局管道、守卫、过滤器和拦截器，中间件都不能依赖注入。
- 中间件模块注册也不能用new，可以依赖注入。
- 除了管道以为其他都可以依赖注入。
- 全局中间件是纯函数
- 管道、守卫、过滤器和拦截器局部注册可以使用new和类名
- 拦截器和守卫可以写成高阶方法来传参，达到定制目的。
- 拦截器和守卫与模块结合在一起，而管道和过滤器则运行在模块区域之外。
- 管道任务是根据特定条件验证类型、对象结构或映射数据。
- 过滤器任务是捕获各种错误返回给客户端。
- 管道不是从数据库中选择或调用任何服务的适当位置。
- 拦截器不应该验证对象模式或修饰数据。如果需要重写，则必须由数据库调用服务引起。
- 守卫决定了哪些路由可以访问，它接管你的验证责任。

执行顺序
```
客户端请求  --> 中间件 --> 守卫 --> 拦截器之前 --> 管道 --> 控制器处理并响应 --> 拦截器之后 --> 过滤器
```