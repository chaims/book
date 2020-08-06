# 守卫

守卫（Guards）是一个使用 @Injectable() 装饰的类，它必须实现 CanActivate 接口。

```
Client Side -> http request -> Guard -> Route Handler @RequestMapping
```
守卫只有一个职责，就是决定请求是否需要被控制器处理。一般用在权限、角色的场景中。

守卫和中间件的区别在于：中间件很简单，next 方法调用后中间的任务就完成了。但是守卫需要关心上下游，它需要鉴别请求与控制器之间的关系。

> 守卫会在中间件逻辑之后、拦截器/管道之前执行。

## 授权守卫

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}
```

canActivate 返回 true，控制器正常执行，false 请求会被 deny

## 执行上下文
```
export interface ExecutionContext extends ArgumentsHost {
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

## 基于角色的认证
```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ):boolean | Promise<boolean> | Observable<boolean> {
        return true;
    }
}
```

## 绑定守卫

守卫可以是控制器作用域的，也可以是方法作用域或者全局作用域。
我们使用 @UseGuards 来引用一个控制器作用域的守卫。

```
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

引用到全局作用域可以调用 useGlobalGuards 方法。

```
const app = await NestFactory.create(ApplicationModule);
app.useGlobalGuards(new RolesGuard());
```

根模块外层引用了全局守卫，这时守卫无法注入依赖。所以我们还需要在要模块上引入。
```
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ]
})
export class ApplicationModule {}
```

## 反射

通常使用 @SetMetadata() 装饰器对控制器（或方法）添加一些元数据，用来标记这个控制器的权限类型

```
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto){
    this.catsService.create(createCatDto);
}
```

自定义

```
import { SetMetaData } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

```
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
}
```

## 联合使用

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        return user && user.roles && hasRole();
    }
}
```

> 手动抛出权限 throw new UnauthorizedException();