# es5

## JSON.stringify()
- 对于 undefined、任意的函数以及 symbol 
  - 作为对象属性值时，JSON.stringify() 跳过（忽略）对它们进行序列化
  - 作为数组元素，序列化为 null
  - 作为单独的值，返回 undefined
- 转换值中有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值
- NaN 和 Infinity 格式的数值及 null 都会被当做 null。
- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
- JSON.parse(JSON.stringify())
  - 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- replacer为stringify的第二个参数 
  - 函数时，两个参数，键（key）和值（value）
    - 第一次遍历，参数不是对象的第一个键值对，而是空字符串作为 key 值，value 值是整个对象的键值对
  - 作为数组时，只保留将被序列化成 JSON 字符串的属性名。
- 第三个参数，常用来格式化


## 继承

- 原型链继承
  - 优点：方法复用
  - 缺点：父类中的引用类型（array、object）的属性被子类共享；构建不能往父类传参
- 构造函数继承
  - 优点：可传参；
  - 缺点：父类的方法不能复用，每次都是创建 
- 组合继承
  - 原型+构造
  - 缺点：调用了两次构造函数，对属性进行了两次的覆盖操作，浪费性能
- 原型式继承
  - Object.create的模拟实现
  - 优缺点同原型链
- 寄生组合式继承
  - 优点同组合继承，原型链保持不变，正常使用instanceof 和 isPrototypeOf
  
```
// 原型链
Child.prototype = new Parent()
Child.prototype.constructor = Child

// 构造函数
Parent.call(this, options)

// 原型式
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

// 寄生组合式
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
prototype(Child, Parent)
```