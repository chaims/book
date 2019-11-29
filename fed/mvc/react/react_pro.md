# 项目实战

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

#### store

#### reducer

#### action


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

