# 管道

## 概念

管道（Pipes）是一个用 @Injectable() 装饰过的类，它必须实现 PipeTransform 接口。
- 管道偏向于服务端控制器逻辑，过滤器则更适合用客户端逻辑。
- 过滤器在客户端发送请求后处理，管道则在控制器接收请求前处理。

管道通常有两种作用：
- 转换/变形：转换输入数据为目标格式；
- 验证：对输入数据时行验证，如果合法让数据通过管道，否则抛出异常。

> 管道会在异常范围内执行，这表示异常处理层可以处理管道异常。如果管道发生了异常，控制器的执行将会停止

## 内置管道

Nest 内置了两种管道：ValidationPipe 和 ParseIntPipe。

```
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

```
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      throw new BadRequestException(JSON.stringify(error.details));
    }
    return value;
  }
}
```

## 绑定管道

在控制器方法上绑定

```
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
}
```

使用 @UsePipes 修饰器即可，传入管道的实例，并构造 schema。

```
const createCatSchema = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
}
```

## 类验证器

使用class-validator 库

```
npm i --save class-validator class-transformer
```

```
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
```

不过管道验证器中的代码也需要适配一下：

```
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

参数作用域

```
@Post()
async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

方法作用域

```
@Post()
@UsePipes(new ValidationPipe())
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

由于 ValidationPipe 被尽可能的泛化，所以它可以直接使用在全局作用域上。

```
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```
