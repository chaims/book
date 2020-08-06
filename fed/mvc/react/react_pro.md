# 项目实战
<!-- code_chunk_output -->
- [项目实战](#%e9%a1%b9%e7%9b%ae%e5%ae%9e%e6%88%98)
  - [create-react-app](#create-react-app)
    - [react-router](#react-router)
    - [redux](#redux)
      - [redux 调试插件](#redux-%e8%b0%83%e8%af%95%e6%8f%92%e4%bb%b6)
      - [Redux-thunk中间件](#redux-thunk%e4%b8%ad%e9%97%b4%e4%bb%b6)
      - [Redux-saga](#redux-saga)
      - [React-Redux](#react-redux)
    - [axios EasyMock](#axios-easymock)
    - [react-transition-group](#react-transition-group)
  - [next](#next)
    - [资料](#%e8%b5%84%e6%96%99)
    - [安装](#%e5%ae%89%e8%a3%85)
    - [调整](#%e8%b0%83%e6%95%b4)
    - [路由](#%e8%b7%af%e7%94%b1)
    - [常见问题](#%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98)
      - [跳转及后退](#%e8%b7%b3%e8%bd%ac%e5%8f%8a%e5%90%8e%e9%80%80)

<!-- /code_chunk_output -->

## create-react-app
### react-router
- Router
- Link
  - 路由传参 `to="/list/1"`
- Route
  - 动态传值`path="/list/:id"`
- exact精准匹配的意思
- props.match
  - patch
  - url
  - params
- 重定向
  - 标签式重定向 Redirect
  - 编程式重定向 ` this.props.history.push('/path/');  `
- 嵌套路由

```
 <Router>
    <ul>
        <li> <Link to="/">首页</Link> </li>
        <li><Link to="/list/">列表</Link> </li>
    </ul>
    <Route path="/" exact component={Index} />
    <Route path="/list/" component={List} />
</Router>
```

### redux
- store
- reducer
- action
  
```
store必须是唯一的，多个store是坚决不允许，只能有一个store空间
只有store能改变自己的内容，Reducer不能改变
Reducer必须是纯函数
```

> 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

> Redux中的无状态组件，把UI组件改成无状态组件可以提高程序性能

#### redux 调试插件
[remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)
```
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
const store = createStore(reducer, devToolsEnhancer());

多个中间件

import { composeWithDevTools } from 'remote-redux-devtools';
const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
```

#### Redux-thunk中间件

对Redux中dispatch的加强，在Dispatch一个Action之后，到达reducer之前，进行一些额外的操作，可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由

```
yarn add redux-thunk
```

多个中间件

```
import { composeWithDevTools } from 'remote-redux-devtools';
const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
```

#### Redux-saga
- redux-saga希望你把业务逻辑单独写一个文件
- 比redux-thunk更复杂

#### React-Redux 
- 一个React生态中常用组件，它可以简化Redux流程
- React、Redux、React-redux是三个不同的东西
- React-redux中的`Provider和connect`
  - <Provider>是一个提供器，使用了这个组件，组件里边的其它所有组件都可以使用store了

```
ReactDOM.render((
    <Provider store={store}>
        <TodoListTwo />
    </Provider>), document.getElementById('root'));
```

**connect**
connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，然后通过connect再链接到一起，让代码更加清晰和易于维护。这也是React-Redux最大的有点。

```
let stateToProps = (state) => {
    return {
        input: state.input,
        list: state.list
    }
}
let dispatchToProps = (dispatch) => {
    return {
        clickHandle (e) {
            dispatch(action)
        }
        ....
    }
}
export default connect(stateToProps, dispatchToProps)(TodoList);
```

### axios EasyMock
[EasyMock网站](https://www.easy-mock.com/)

### react-transition-group


## next

### 资料
- [官网](https://nextjs.org)


### 安装
```
 npm install -g create-next-app
 npx create-next-app *****
 yarn dev
```
### 调整

- 让Next支持CSS文件
- 按需加载Ant Design

```
yarn add @zeit/next-css

const withCss = require('@zeit/next-css')
if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}
module.exports = withCss({})

yarn add antd

yarn add babel-plugin-import

```

> 注意： 样式不可用时重启

### 路由
- 编程式导航传参

```
Router.push({
    pathname:'/',
    query:{
    name:'demo',
    id: 1
    }
})
```

- withRouter

```
import { withRouter} from 'next/router'
import Link from 'next/link'
const Demo = ({router})=>{
    return (
        <>
            <div>{router.query.name}</div>
            <Link href="/"><a>返回首页</a></Link>
        </>
    )
}
export default withRouter(Demo)
```

### 常见问题
#### 跳转及后退
Router.push() 跳转后，后退不可用

```
<Link href={{pathname:'/',query:{name:'demo',id:1}}}>
    <a>传参</a>
</Link>
```




