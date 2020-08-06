# Mongodb

## 安装

见官网

## 启动

### Linux

```
systemctl start mongod.service  # 开启MongoDB
sudo service mongod start  # 开启MongoDB
sudo chkconfig mongod on  或 systemctl ennable mongod # 加入开机启动
sudo service mongod restart # 重启MongoDB

sudo service mongod stop  或者 systemctl stop mongod  # 关闭

service mongod restart 或者 systemctl restart mongod # 重启 
 
sudo service mongod stop  # 关闭
sudo yum erase $(rpm -qa | grep mongodb-org)  # 卸载MongoDB
sudo rm -r /var/log/mongodb  # 删除日志文件
sudo rm -r /var/lib/mongo    # 删除数据文件



mongo

netstat -natp | grep 27017

ps -aux | grep mongod    # 查看数据库的进程是否存在
```

### 远程连接Mongodb
```
vi /etc/mongod.conf

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.

```

### 开放端口
```
systemctl status firewalld  # 查看防火墙状态
firewall-cmd --zone=public --add-port=27017/tcp --permanent # mongodb默认端口号
firewall-cmd --reload  # 重新加载防火墙

firewall-cmd --zone=public --query-port=27017/tcp # 查看端口号是否开放成功

```

## 操作

