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

### 查询
- 【建议】先做等值查询，再做排序，再做范围查询
- 【建议】查询中的某些 $ 操作符可能会导致性能低下，尽量避免
- 在聚合运算中，$要在match要在$group前面，通过$前置，可以减少match前置，可以减少$ group 操作符要处理的文档数量。
- 禁止一次取出太多的数据进行排序，MongoDB目前支持对32M以内的结果集进行排序。如果需要排序，请尽量限制结果集中的数据量。