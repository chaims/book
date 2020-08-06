# 拦截器

## 概念

拦截器（Interceptors）是一个使用 @Injectable() 装饰的类，它必须实现 NestInterceptor 接口。

拦截器的功能的设计灵感来自于面向切面的编程（AOP）技术。这使得下面这些功能成为可能：
- 在函数执行前/后绑定额外的逻辑
- 转换一个函数的返回值
- 转换函数抛出的异常
- 扩展基础函数的行为
- 根据特定的条件完全的重写一个函数（比如：缓存）


每个拦截器都要实现 intercept() 方法，此方法有两个参数。第一个是 ExecutionContext 实例（这和守卫中的对象一样）。ExecutionContext 继承自 ArgumentsHost。

### 执行上下文

```
export interface ExecutionContext extends ArgumentsHost {
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

### 调用处理器
如果 intercept() 方法中没调用 handle() 方法，那么路由处理器将不会被执行。

### 切面拦截

example 用户登录的交互:

```
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(tab(() => console.log(`After...${Date.now() - now}ms`)))
    }
}
```

在 Observable 流的正常或异常终止时调用我们的匿名日志记录函数，但不会干扰到响应周期。

### 绑定拦截器

用 @UseInterceptors() 装饰器来绑定一个拦截器，和管道、守卫一样，它即可以是控制器作用域的，也可以是方法作用域的，或者是全局的。

```
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

### 响应映射

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({ data })));
    }
}
```

拦截器对于创建整个应用层面的可复用方案有非常大的意义。比如说，我们需要将所有响应中出现的 null 值改成空字符串 ““。我们可以使用拦截器功能仅用下面一行代码就可以实现

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operations';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(value => value === null ? '' : value));
    }
}
```

### 异常映射

```
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(catchError(err => throwError(new BadGatewayException())))
    }
}
```

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(5000))
  }
}
```