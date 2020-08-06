# 异常过滤器

Nest 框架内部实现了一个异常处理层，专门用来负责应用程序中未处理的异常。

```
Client side ----> Filter... ----> Pipe ---->  @Get() Route Handler
```

默认情况未处理的异常会被全局过滤异常器 HttpException 或者它的子类处理

```
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

## 基础异常
从控制器的方法中手动抛出一个异常：
```
@Get()
async findAll () {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

Client

```
{
    "statusCode": 403,
    "message": "Forbidden"
}
```

自定义返回状态值和错误信息：
```
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, 403);
}
```

## 异常的级别
比较好的做法是实现你自己想要的异常类。

```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

## 异常过滤器

给异常返回值加一些动态的参数，可以使用异常过滤器来实现。

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        
        res.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}
```

> 所有的异常过滤器都必须实现泛型接口 ExceptionFilter。就是说你必须要提供一个 catch(exception: T, host: ArgumentsHost) 方法

## 参数宿主
```
export interface ArgumentsHost {
  getArgs<T extends Array<any> = any[]>(): T;
  getArgByIndex<T = any>(index: number): T;
  switchToRpc(): RpcArgumentsHost;
  switchToHttp(): HttpArgumentsHost;
  switchToWs(): WsArgumentsHost;
}
```

## 绑定过滤器
可以使用 @UseFilters 装饰器让一个控制器方法具有过滤器处理逻辑。
```
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

过滤器可以被使用在不同的作用域上：方法作用域、控制器作用域、全局作用域。
```
@UseFilters(new HttpExceptionFilter())
export class CatsController {}


async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ApplicationModule {}
```

## 捕获所有异常

@Catch() 装饰器不传入参数就默认捕获所有的异常：

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

## 继承

通常你可能并不需要自己实现完全定制化的异常过滤器，可以继承自 BaseExceptionFilter 即可复用内置的过滤器逻辑。

```
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```