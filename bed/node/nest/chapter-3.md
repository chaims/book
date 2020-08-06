# Providers

## 概念

控制反转IOC (Inversion of Control) 模式中的依赖注入（Dependency Injection）特性。使用 @Injectable() 装饰的类就是一个 Provider，装饰器方法会优先于类被解析执行。

### 流程
```
Client -> request  -> Controller -> Dependence inject -> Service -> Dao
```


### Services
实现一个名叫 CatsService 的 Service

```
export interface Cat {
    name: string;
    age: number;
    breed: string;
}

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat： Cat) :void {
        this.cats.push(cat);
    }

    findAll () : Cat[] {
        return this.cats;
    }
}

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

> 可以使用 CLI 工具自动生成一个 Service `$ nest g service cats`


Nest 使用了构建函数注入的方式，Controller 和 Service 处于完全解耦的状态：
- Controller 和 Service 的职责边界很清晰
- 各自只关注自身职责涉及的功能，比方说 Service 通常来写业务逻辑，但它也仅仅只与业务相关。

## 依赖注入

```
constructor(private readonly catsService: CatsService) {}
```

得益于 TypeScript 类型，Nest 可以通过 CatsService 类型查找到 catsService，依赖被查找并传入到控制器的构造函数中。

通常我们在没有依赖注入的时候如果 A 依赖于 B，那么在 A 初始化或者执行中的某个过程需要先创建 B，这时我们就认为 A 对 B 的依赖是正向的。但是这样解决依赖的办法会得得 A 与 B 的逻辑耦合在一起，依赖越来越多代码就会变的越来越糟糕。


控制反转（IOC）模式就是要解决这个问题，它会多引入一个容器（Container）的概念，让一个 IOC 容器去管理 A、B 的依赖并初始化。

### 注入作用域
Providers 有一个和应用程序一样的生命周期。当应用启动，每个依赖都必须被获取到。

### 自定义的 Providers
Nest 有一个内置的 IOC 容器，用来解析 Providers 之间的关系。这个功能相对于 DI 来讲更底层，但是功能却异常强大，@Injectable() 只是冰山一角。事实上，你可以使用值，类和同步或者异步的工厂。

### 可选的 Providers
使用 @Optional() 来装饰一个非必选的参数。

```
@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() 
    @Inject('HTTP_OPTIONS') 
    private readonly httpClient: T
  ) {}
}
```

### 基于属性的注入
在属性上使用 @Inject() 装饰器。

```
@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

> 如果你的类并没有继承其它 Provider，那么一定要使用基于构造函数注入方式   ？

### 注册 Provider

```
import { Module } from '@nestjs/common';
import { CatController } from './cats/cats.controller';
import { CatService } from './cats/cats.service';

@Module({
    controllers: [CatController],
    providers: [CatService]
})
export class ApplicationModule {}
```