# 中间件

## 概念
中间件就是一个函数，在路由处理器之前调用。


Nest 允许你使用函数或者类来实现自己的中间件。如果用类实现，则需要使用 @Injectable() 装饰，并且实现 NestMiddleware 接口。

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function {
        next();
    })
}
```
## 依赖注入

中间件也是支持依赖注入的，就像其它支持方式一样，你可以使用构造函数注入依赖。

## 应用中间件

@Module() 装饰器中并不能指定中间件参数，我们可以在模块类的构 configure() 方法中应用中间件，下面的代码会应用一个 ApplicationModule级别的日志中间件 LoggerMiddleware

```
@Module({
    imports: [CatsModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('cats');
    }
}
```

forRoutes 方法表示只将中间件应用在 cats 路由上，还可以是指定的 HTTP 方法，甚至是路由通配符：

```
.forRoutes({ path: 'cats', method: RequestMethod.GET });
.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

exclude 可以指定不包括某些路由规则，方法不能运用在函数式的中间件上，path 也不支持通配符。

```
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST }
  )
  .forRoutes(CatsController)
```

## 函数式的中间件

```
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

## 多个中间件
apply 方法传入多个中间件参数即可：

```
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

## 全局中间件
在实现了 INestApplication 接口的实例上调用 use() 方法即可：

```
const app = await NestFactory.create(ApplicationModule);
app.use(logger);
await app.listen(3000);
```