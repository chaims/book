# Rest Api

## 概念
可单独寻址的“资源”（API 中的“名词”）的“集合”。

### 标准方法

包括` List、Get、Create、Update 和 Delete`，对应的HTTP：`GET、GET、POST、PUT | PATCH、DELETE`：

- `List` 适用于来自单个集合的数据，该集合的大小有限且不进行缓存。对于更广泛的情况，应该使用自定义方法 `Search`。
- 

### 资源

资源和集合：

- 一个集合包含相同类型的资源列表。 例如，一个用户拥有一组联系人。
- 资源具有一些状态和零个或多个子资源。 每个子资源可以是一个简单资源或一个集合资源。例如，Gmail API 有一组用户，每个用户都有一组消息、一组线程、一组标签、一个个人资料资源和若干设置资源。

### example

gmail api:
- 用户集合： users/*，每个用户拥有以下资源：
  - 消息集合： users/*/messages/*
  - 标签集合： users/*/labels/*
  - 变更历史记录集合： users/*/history/*
  - 用户个人资料资源： users/*/profile

### 字段

`create_time、update_time、delete_time、expire_time、start_time、end_time、read_time、title、description、filter、query、page_size、total_size`

### 命名规则

- 简单、直观、一致
- 采用正确的美式英语
- 简化命名，可以使用已被广泛接受的简写形式或缩写
- 集合 ID 应采用复数和 lowerCamelCase（小驼峰式命名法）格式
- 方法名称不应包含介词（例如“For”、“With”、“At”、“To”）
- 表示范围： [start_xxx, end_xxx]

## 设计

- API 地址和版本： `/api/v3`
- 以资源为中心的 URL 设计
  - 尽量使用复数来表示资源，单个资源通过添加 id 或者 name 等来表示
  - 一个资源可以有多个不同的 URL
  - 资源可以嵌套，通过类似目录路径的方式来表示，以体现它们之间的关系
- 使用正确的method: HEAD\GET\POST\PATCH\PUT\DELETE；
- 不符合 CRUD 的情况
  - 使用 POST
  - 增加控制参数
  - 把动作转换成资源
- Query 让查询更自由
- 分页 Pagination
- 选择合适的状态码
- 错误处理：给出详细的信息
- 验证和授权
- 限流 rate limit
- Hypermedia API：HATEOAS(hypermedia as the engine of application state) 在返回结果中提供相关资源的链接。

> 更新和创建操作应该返回最新的资源，来通知用户资源的情况；删除资源一般不会返回内容。

```
/users/:username/repos
/users/:org/repos
/repos/:owner/:repo
/repos/:owner/:repo/tags
/repos/:owner/:repo/branches/:branch
```

