# TS

## 基础概念

ts 增加类型校验，必须指定类型

### 基本类型

- boolean
- number
- string
- array
- Tuple 元组
- 枚举，
- Any 允许你在编译时可选择地包含或移除类型检查
- void
- undefined和null
- Never

```
let list: number[] = [1,2,3]
let list: Array<number> = [1,2,3]

let list: [number, string] = [1, 'test']

enum Color {Red, Green, Blue}
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
let cname: string = Color[c]

let num: any = 123;

let u: undefined = undefined
let u: null = null;
let u: number | null | undefined;

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    // throw new Error(message);
    while (true) {

    }
}
```

> 元组中越界的元素，会使用联合类型替代

### 函数
- 返回值类型
- 可选参数，参数名旁使用`?`实现可选参数的功能
- 默认参数
- 剩余参数
- 重载

```
function add(x: number, y: number): number {
    return x + y;
}

function test5(name:string, age?:number):string {
    return `${name}--${age}`
}

function test7(name:string, age = 1):string {
    return `${name}--${age}`
}

function test6(...result:number[]):number {
    return result.reduce((acc,res) => acc+res, 0)
}

let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```

> 可选参数必须跟在必须参数后面
> 带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 `undefined`值来获得默认值

`ts 和 this`

### 类
- 继承
- 修饰符 
  - public(公有)
  - protected  类及子类内部访问，外部不能访问
  - private    类内部访问
- 静态属性
- 静态方法 
  - 静态方法中，不能直接调用类里面的属性
  - 调用静态属性
- 多态
  - 父类定义一个方法不去实现，让继承的子类去实现，每个子类的实现不一样
- 抽象类
  - 其它类继承的基类，不能直接被实例化
  - 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
  - abastract只能出现在抽象类中
  - 抽象类的子类必须实现抽象类的方法

ES5
```
function Person() {
     this.name = 'test';
     this.age = 10;
     this.getName = function () {
         return this.name
     }
 }
 Person.prototype.sex = '男';
 Person.prototype.getAge = function () {
     return this.age;
 }

 // 继承：原型链+对象冒充的组合方式
 
 //对象冒充
 function Man () {
     Person.call(this); // 对象冒充,继承构造函数中的方法，不能继承原型链中的
 }
 var man = new Man();
 man.getName();
 man.getAge(); // ERROR

 //原型链 缺点，没法给父类传参
 function Woman() {}
 Woman.prototype = new Person();

//组合
function Human(name, age) {
    Person.call(this, name, age);
}

Woman.prototype = new Person();
或
Woman.prototype = Person.prototype;
```

TS

```
class Person {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    run (): void{
        console.log(this.name);
    }
    getName (): string{
        return this.name;
    }
    setName (name: string): void{
        this.name = name;
    }
}

let p = new Person('test');
p.run();
p.setName('test1');
console.log(p.getName());
```

TS继承: extends、super
```
class Web extends Person {
    constructor(name: string) {
        super(name);
    }
    work (): void{
        console.log(`${this.name} is working`);
    }
}
```

抽象类

```
abstract class Animal{
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract eat(): any;
}

class Dog extends Animal{
    constructor(name: string) {
        super(name);
    }
    eat () {
        console.log(`${this.name}吃狗粮！`);
    }
}
```

### 接口
- interface
- 属性接口：对批量方法传入参数进行约束
  - 接口里的属性不全都是必需的，在`可选属性`名字定义的后面加一个`?`符号
  - 在属性名前用 `readonly`来指定`只读属性`
- 函数类型接口：对方法传入的参数以及返回值进行约束
  - 函数的参数名不需要与接口里定义的名字相匹配
- 可索引接口：数组、对象的约束
  - 两种索引签名：字符串和数字
- 类类型接口：对类的约束

```
// 属性接口
interface FullName {
    firstName: string;
    secondName: string;
    age?:number;
    readonly type: string;
}
function printName(name: FullName) {
    console.log(`${name.firstName} - ${name.secondName}`)
}
printName({firstName: 'test', secondName: '1', type: 'boy'});

// 函数接口
interface encrypt {
    (key: string, value: string): string;
}
let md5: encrypt = (key: string, value: string): string => key + value;
console.log(md5('name', 'zhangsan'));

// 可索引接口
interface UserArr {
    [index: number]: string
}
let arr: UserArr = ['a', 'b'];
console.log(arr[0])

interface UserObj{
    [index: string]: string
}
let arrObj: UserObj = {name: '张三'}
// 类类型接口
interface Animal {
    name: string;
    eat(str: string): void;
}
class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    eat(){
        console.log('狗')
    }
}
class Cat implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    eat(){
        console.log('猫')
    }
}
```

### 泛型

- 返回值的类型与传入参数的类型是相同的



## 进阶

### interface vs type

- 都可以描述对象或函数
- 都允许拓展，interface use extends，type use &
- type 可以声明基本类型别名，联合类型，元组等类型， interface不可
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值
- interface 能够进行声明的自动合并

> 建议优先 interface > type 

## 参考资料
[TS中文](https://www.tslang.cn/samples/index.html)