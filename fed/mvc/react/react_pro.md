# 项目实战

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

