# Module

## 概念

模块（Module）是一个使用了 @Module() 装饰的类。
@Module() 装饰器提供了一些 Nest 需要使用的元数据，用来组织应用程序的结构。

@Module() 装饰器接收一个参数对象，有以下取值：
- providers	可以被 Nest 的注入器初始化的 providers，至少会在此模块中共享
- controllers	这个模块需要用到的控制器集合
- imports	引入的其它模块集合
- exports	此模块提供的 providers 的子集，其它模块引入此模块时可用

> 可以使用 CLI 来自动生成模块：`$ nest g module cats`


## 共享的模块

在 Nest 中模块默认是单例的，因此你可在不同的模块之间共享任意 Provider 实例。

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService] // 导出
})
export class CatsModule {} 
```

## 模块的重复导出

```
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```
## 依赖注入

模块的构造函数中也可以注入指定的 providers，通常用在一些配置参数场景。

```
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
```

但是模块类本身并不可以装饰成 provider，因为这会造成循环依赖

## 全局模块

当一些模块在你的应用频繁使用时，可以使用全局模块来避免每次都要调用的问题。

如果你想让一个模块随处可见，那就使用 @Global() 装饰器来装饰这个模块。

```
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```
## 动态模块

```
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```