# mysql

## 安装

### centos 7

```
=========下载==========

yum -y install wget

wget https://dev.mysql.com/get/mysqlxx-community-release-elxx.noarch.rpm

=========安装==========
rpm -ivh mysqlxx-community-release-elxx.noarch.rpm

cd /etc/yum.repos.d/

yum -y install mysql-server

=========启动==========

systemctl start mysqld

=========登录及设置==========

grep 'temporary password' /var/log/mysqld.log   // 临时密码

mysql -uroot -p || mysql -uroot -p密码

ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxxx';  // 修改密码

SHOW VARIABLES LIKE 'validate_password%';   // 查看密码复杂度设置

set global validate_password.policy=LOW;    // 调整复杂度

sudo systemctl disable firewalld

use mysql

select Host,User from user;

update user set Host='%' where User='root';  //允许任何地址访问

flush privileges;   // 刷新权限

test1234
```