# 浏览器

## 浏览器加载/渲染机制

## 浏览器缓存机制

## 浏览器进程和事件循环机制

## HTTP2 VS HTTP1

HTTP协议建立在TCP协议之上，HTTP协议的瓶颈及其优化技巧都是基于TCP协议本身的特性，比如TCP的三次握手和四次挥手以及每次建立连接带来的RTT延迟时间，影响一个HTTP网络请求的因素主要有两个：带宽和延迟

- http1.1是纯文本，序列和阻塞机制
- http2.0使用流的方式来传输，可以多工复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了"队头堵塞"
- HTTP/2协议只在HTTPS环境下才有效，升级到HTTP/2，必须先启用HTTPS，二进制分帧、多路复用、数据流、首部压缩、服务端推送；信息加密传输、校验机制、身份证书
- HTTP默认使用80端口，HTTPS默认使用443端口

http1.1 vs http1.0:
- 缓存： http1.0 (no-cache、last-modified、if-modified-since)，http1.1（cache-control、etag、if-none-match）
- 错误状态：新增24个错误状态响应吗
- 范围请求
- host头
- 持久链接 connection: keep-alive
- 管道机制
- 队头阻塞
  
> 针对队头阻塞的优化：一是减少请求数，二是同时多开持久连接。这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。

延迟：
1. 浏览器阻塞（head of line blocking）：浏览器会因为一些原因阻塞请求。浏览器对于同一个域名，同时只能有 6个连接（这个根据浏览器内核不同可能会有所差异），超过浏览器最大连接数限制，后续请求就会被阻塞。这也是为何一些站点会有多个静态资源 CDN 域名的原因之一。
2. DNS查询（DNS Lookup）：将域名解析为IP就是DNS查询，一般使用DNS缓存来减少这个时间。
3. 建立链接，3次握手4次

## 内存机制

内存回收：
```
对象回收: obj = null

for (let key in obj) {
    if (obj.hasOwnProperty('key')) {
        delete obj[key]
    }
}

数组的置空： arr.length = 0;

数组 slice 或  String slice 回返回新的数组；

频繁使用的方法放入全局对象中存储
```


## 跨域

## 安全
