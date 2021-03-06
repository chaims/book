## shadowsocks

### 环境

- centos 8
- python3及pip3 （默认已装）
- shadowsocks

### 步骤

1. 安装最新shadowsocks

```
pip3 install https://github.com/shadowsocks/shadowsocks/archive/master.zip

sudo ssserver --version
```

2. 创建配置文件 

```
sudo mkdir /etc/shadowsocks
sudo vim /etc/shadowsocks/config.json

{
    "server":"xxx.xxx.xxx.xxx",
    "server_port":xxx,
    "local_address": "127.0.0.1",
    "local_port":xxx,
    "password":"***",
    "timeout":600,
    "method":"chacha20-ietf-poly1305"
}

```

> 加密方式`chacha20-ietf-poly1305`,需安装`libsodium`

```
yum install epel-release
yum install libsodium
```

3. 启动

```
ssserver -c /etc/shadowsocks/config.json

ssserver -c /etc/shadowsocks/config.json -d start

ssserver -c /etc/shadowsocks/config.json -d stop 
```

4. 查看日志

```
tail -f /var/log/shadowsocks.log
```

5. 配置开机启动

创建
```
sudo vim /etc/systemd/system/shadowsocks-server.service
```
内容
```
[Unit]
Description=Shadowsocks Server
After=network.target

[Service]
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

启动
```
sudo systemctl start shadowsocks-server
sudo systemctl enable shadowsocks-server   // 开机启动

sudo systemctl stop shadowsocks-server   // 停止服务
sudo systemctl kill shadowsocks-server
```

6. 防火墙设置

```
iptables -F  // 清空防火墙  < centos 7

systemctl stop firewalld.service   // --停止firewall
systemctl disable firewalld.service   // --禁止firewall开机启动
systemctl restart firewalld.service   // 重启防火墙
```

### 使用

- 安卓客户端（V4.8.5）
 