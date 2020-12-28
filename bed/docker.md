# Docker

## Docker 安装

下载安装（见官网）

## Docker 使用

### Docker 常见命令

- 通过 ARG 指令定义了一个变量，用户可以在构建时通过使用 --build-arg = 标志的 docker build 命令将其传递给构建器 ARG node_env
- 在 Dockerfile 中使用 ENV 引用这个变量 ENV NODE_ENV=$node_env
- 这一步就是使用了 CMD npm run ${NODE_ENV}

```
// 生成镜像
docker image build --build-arg node_env=dev -t docker-node:1.0.0 .
// 启动docker rm结束后自动删除 本地端口:docker端口 镜像名称:镜像tag 当前目录
docker run --rm -d -p 30010:30010 docker-node:1.0.0  

docker logs -f 2bc6e62cd0e8   // 查看容器的运行日志

docker images     // 显示所有可用的镜像
docker ps -a      // 显示所有在运行的docker
docker rmi xxx    // 删除images
docker rm xxx     // 删除docker

docker version

docker save       // 将指定镜像保存成 tar 归档文件
docker save -o xxx.tar xxx:xx

docker load       // 加载指定的镜像
docker load -i xxx.tar



docker import     // 从归档文件中创建镜像。
docker import xxx.tar xxx:xxx  // 导入镜像


docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-  // 用于容器与主机之间的数据拷贝
docker cp /root/test.txt ecef8319d2c8:/root/        // 将主机/www/runoob目录拷贝到容器96f7f14e99ab的/root目录下



```

### 构建私有NPM包


## 常见问题

### ERROR:Docker Got permission denied
```
sudo groupadd docker
sudo usermod -aG docker $USER

newgrp docker 
docker run hello-world
```

## 参考资料

