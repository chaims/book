# other

## amd/cmd/commonjs/es6

- amd 异步模块加载机制， 代表require.js，依赖前置，提前执行。
- cmd 代表sea.js，是依赖就近，延迟执行，只有require时，才执行。
- commonjs 弥补js在服务器端缺少模块化机制，nodejs\webpack都是基于它实现
  - 模块作用域
  - 同步加载的，即只有加载完成，才能执行后面的操作；
  - 首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
  - CommonJS输出是值的拷贝
- es6
  - ES6 Module是编译时输出接口
  - 单独加载其中的某个接口
  - ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变；


