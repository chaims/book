# react
<!-- code_chunk_output -->
- [react](#react)
  - [简介](#%e7%ae%80%e4%bb%8b)
  - [核心概念](#%e6%a0%b8%e5%bf%83%e6%a6%82%e5%bf%b5)
    - [jsx](#jsx)
    - [元素渲染](#%e5%85%83%e7%b4%a0%e6%b8%b2%e6%9f%93)
    - [组件](#%e7%bb%84%e4%bb%b6)
    - [State和生命周期](#state%e5%92%8c%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)
    - [事件处理](#%e4%ba%8b%e4%bb%b6%e5%a4%84%e7%90%86)
    - [条件渲染](#%e6%9d%a1%e4%bb%b6%e6%b8%b2%e6%9f%93)
    - [列表和Key](#%e5%88%97%e8%a1%a8%e5%92%8ckey)
    - [表单](#%e8%a1%a8%e5%8d%95)
    - [状态提升](#%e7%8a%b6%e6%80%81%e6%8f%90%e5%8d%87)
    - [组合和继承](#%e7%bb%84%e5%90%88%e5%92%8c%e7%bb%a7%e6%89%bf)
    - [哲学](#%e5%93%b2%e5%ad%a6)
  - [高级概念](#%e9%ab%98%e7%ba%a7%e6%a6%82%e5%bf%b5)
    - [语义化的 HTML](#%e8%af%ad%e4%b9%89%e5%8c%96%e7%9a%84-html)
    - [代码分割](#%e4%bb%a3%e7%a0%81%e5%88%86%e5%89%b2)
    - [Context](#context)
    - [PropTypes校验传递值](#proptypes%e6%a0%a1%e9%aa%8c%e4%bc%a0%e9%80%92%e5%80%bc)
    - [Ref的使用](#ref%e7%9a%84%e4%bd%bf%e7%94%a8)
    - [Hook](#hook)
      - [useState](#usestate)
      - [useEffect](#useeffect)
  - [参考资料](#%e5%8f%82%e8%80%83%e8%b5%84%e6%96%99)

<!-- /code_chunk_output -->
## 简介

三大体系：
- React.js 用于web开发和组件的编写
- ReactNative 用于移动端开发
- ReactVR用于虚拟现实技术的开发
  
## 核心概念
### jsx
- JSX 是一个表达式
- 在 JSX 语法中，可以在大括号内放置任何有效的 JavaScript 表达式。
- JSX 特定属性
  - 用引号，来将属性值指定为字符串字面量;
  - 使用大括号，来在属性值中插入一个 JavaScript 表达式;
  - 应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。
  -  使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定
- JSX 标签里能够包含很多子元素
- 可以使用 /> 来闭合无内容的标签
- JSX 防止注入攻击，默认会进行转义
- JSX 表示对象，Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用

```
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;

const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
等价于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
### 元素渲染
- 元素是构成 React 应用的最小砖块
- 将一个元素渲染为 DOM
- 更新已渲染的元素，更新`UI`唯一的方式是创建一个全新的元素，并将其传入`ReactDOM.render()`
- 只更新它需要更新的部分

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);
```

> 在实践中，大多数 React 应用只会调用一次 ReactDOM.render()

### 组件
- 将`UI`拆分为独立可复用的代码片段，并对每个片段进行独立构思
- 函数组件与 class 组件
- 组件名称必须以大写字母开头，以小写字母开头的组件视为原生 DOM 标签
- 组合组件和提取组件（将组件拆分为更小的组件）
- Props 的只读性，组件决不能修改自身的 props
- 父组件向子组件传递内容，靠属性的形式传递
- 子组件时不能操作父组件里的数据的，所以需要借助一个父组件的方法，来修改父组件的内容。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### State和生命周期
- 将函数组件转换成 class 组件
  - 创建一个同名的 ES6 class，并且继承于 React.Component
  - 添加一个空的 render() 方法
  - 将函数体移动到 render() 方法之中
  - 在 render() 方法中使用 this.props 替换 props
  - 删除剩余的空函数声明
- 向 class 组件中添加局部的 state
  - 把 render() 方法中的 this.props.date 替换成 this.state.date
  - 添加一个 class 构造函数，然后在该函数中为 this.state 赋初值
  - 通过以下方式将 props 传递到父类的构造函数中
  - 移除 <Clock /> 元素中的 date 属性
- 将生命周期方法添加到 Class 中
  - “挂载（mount）”: `componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行
  - “卸载（unmount）”: `componentWillUnmount()` 
- 正确地使用 State
  - 不要直接修改 State，应该使用`setState()`
  - State 的更新可能是异步的，所以不要依赖他们的值来更新下一个状态
  - State 的更新会被合并，当你调用`setState()`的时候，React会把你提供的对象合并到当前的`state`
- 数据是向下流动的
- 生命周期
  - Initialization 初始化阶段
  - Mounting 挂载阶段
    - componentWillMount （执行一次）
    - render
    - componentDidMount  （执行一次）
  - Updation 更新阶段
    - props
      - componentWillReceiveProps
    - state
      - shouldComponentUpdate (return true | false)
      - componentWillUpdate
      - render
      - componentDidUpdate
  - Unmounting 销毁阶段
    - componentWillUnmount

> 利用shouldComponentUpdate(nextProps, nextState) 两个参数的判断是否变化来决定是否更新

```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

改为 class

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

props改为state

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

改生命周期

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);


setState回调

this.setState({

}, () => {

})
```



### 事件处理
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- 必须显式的使用`preventDefault`阻止默认行为
- class 的方法默认不会绑定 this

```
<button onClick={activateLasers}>
  Activate Lasers
</button>


class LoggingButton extends React.Component {
  constructor(props) {
      super(props)
      // 此语法确保 `handleClick` 内的 `this` 已被绑定。
      this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
或
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。 性能可能会有问题
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
或
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

> 通常建议在构造器中绑定或使用 class fields 语法来避免性能问题

### 条件渲染
- if
- 与运算符 &&
- 三目运算符
- 阻止组件渲染，`render`方法直接返回`null`，而不进行任何渲染。

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

```

### 列表和Key
- 渲染多个组件，使用`{}`在JSX内构建一个元素集合
- 基础列表组件
- key
  - key 只是在兄弟节点之间必须唯一
  - 用 key 提取组件, 元素的 key 只有放在就近的数组上下文中才有意义，一个好的经验法：在 map() 方法中的元素需要设置 key 属性
  - key 会传递信息给 React ，但不会传递给你的组件
- 在 JSX 中嵌入 map()
  
```
unction ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => <ListItem key={number.toString()} value={number} />)}
    </ul>
  );
}
```

> 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串

### 表单
- 受控组件
  - input
  - textarea 标签，在React中，`<textarea>`使用`value`属性代替
  - select 标签，React并不会使用 selected 属性，而是在根 select 标签上使用 value 属性
  - 处理多个输入，通过name区分
  - 受控输入空值
- 非受控组件  
  - `<input type=“file”>`
- 成熟解决方案  Formik

```
<textarea value={this.state.value} onChange={this.handleChange} />

<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">葡萄柚</option>
    <option value="lime">酸橙</option>
    <option value="coconut">椰子</option>
    <option value="mango">芒果</option>
</select>

<select multiple={true} value={['B', 'C']}>
```

### 状态提升
将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，用props传递父组件方法到子组件，便可实现共享 state。这就是所谓的“状态提升”

```
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    ...
  }
  ...
  render() {
    return (
      <div>
        <TemperatureInput onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

### 组合和继承
- 包含关系
  - 有些组件无法提前知晓它们子组件的具体内容，建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中
  - {props.children}
- 特例关系
  
> 组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

```
function FancyBorder(props) {
  return (<div className={'FancyBorder FancyBorder-' + props.color}>{props.children}</div>);
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
    </FancyBorder>
  );
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

### 哲学
- 将设计好的 UI 划分为组件层级
- 用 React 创建一个静态版本
- 确定 UI state 的最小（且完整）表示
  - 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
  - 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
  - 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state
- 确定 state 放置的位置
- 添加反向数据流 
  - 处于较低层级的表单组件更新较高层级的中的 state

## 高级概念
### 语义化的 HTML
- 使用 React Fragments 来组合各个组件
- 当你不需要在 fragment 标签中添加任何 prop 且你的工具支持的时候，你可以使用 短语法：

```
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

- dangerouslySetInnerHTML 
- label `htmlFor`

### 代码分割
- 打包
  - 使用 `Webpack 或 Browserify` 这类的构建工具来打包文件。
- 代码分割
  - 由诸如 `Webpack（代码分割）和 Browserify（factor-bundle）`这类打包器支持的一项技术，能够创建多个包并在运行时`动态加载`。
  - 尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在`初始加载的时候减少所需加载的代码量`。
- 加载处理
  - React.lazy
    - 像渲染常规组件一样处理动态引入（的组件）
  - Suspense
    - 如果在 MyComponent 渲染完成后，包含 OtherComponent 的模块还没有被加载完成，我们可以使用加载指示器为此组件做优雅降级。
  - 异常捕获边界
    - 如果模块加载失败（如网络问题），它会触发一个错误。
- 基于路由的代码分割
- 命名导出
  
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);

// 基于路由的代码分割
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);

// 重命名
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

### Context
- 典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。
- Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。
- 使用 Context 之前的考虑，会使得组件的复用性变差。

```
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
const ThemeContext = React.createContext('light'); // 为当前的 theme 创建一个 context（“light”为默认值）。
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

### PropTypes校验传递值

```
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( this.props.content );
    }
}
 
Test.propTypes = {
  content: PropTypes.string
}
Test.defaultProps = {
  ...
}

export default Test;
```

### Ref的使用

```
changeHandle () {
  this.setState({
    inputVal: this.input.value
  })
}
...
<input ref={(input)=>{this.input=input}} />
```
### Hook
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数

- 不编写 class 的情况下使用 state 以及其他的 React 特性
- 完全可选的，100% 向后兼容的
- Hook 不会影响你对 React 概念的理解

试图解决：
- 在组件之间复用状态逻辑很难（Hook 使你在无需修改组件结构的情况下复用状态逻辑）
- 复杂组件变得难以理解（Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据））
- 难以理解的 class（class 不能很好的压缩，并且会使热重载出现不稳定的情况）
- Hook 使你在非 class 的情况下可以使用更多的 React 特性（React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。）

> 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
> 只能在 React 的函数组件中调用 Hook。

#### useState
- useState 唯一的参数就是初始 state。
- 声明多个 state 变量，多次调用 useState 的时候，保证每次渲染时它们的调用顺序是不变的
- 
```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
#### useEffect
- useEffect 就是一个 Effect Hook，跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
- 调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。
- 由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。
- 跟 useState 一样，你可以在组件中多次使用 useEffect 
- 使用 Hook，你可以把组件内相关的副作用组织在一起
- 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同
 
```
    ...
    // 相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        document.title = `Clicked ${count}`
    })
    ...
```


## 参考资料

- [React参考资料](http://www.imooc.com/article/274378)