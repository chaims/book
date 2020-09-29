# Question

## 问题

### 全局中间件使用

`app.use`方法中，`use`直接注入的是一个方法，正确的写法是：

```
app.use(new xxxMiddleware().use)
```
