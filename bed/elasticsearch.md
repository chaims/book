# es
## 安装
### 安装ES
#### linux 
```
1. 安装JDK

2. 安装es 
    cd /usr/local/
    mkdir tool
    cd tool
    mkdir elasticsearch
    cd elasticsearch
    curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.2.tar.gz
    tar -xvf elasticsearch-5.4.2.tar.gz
    cd elasticsearch-5.4.2/bin
    ./elasticsearch
    curl -X GET http://localhost:9200

3. 访问
    http://9200.pre_label.caihao.ws2.local.brainpp.cn:9200/
```

问题：
1. 内存分配不够造成
```
vi ../config/jvm.options

修改为：
    -Xms2g
    -Xmx2g
```
2. 不允许使用root用户启动
```
useradd es
passwd es

chown -R es:es /usr/local/tool/elasticsearch/elasticsearch-5.4.2
su es
./elasticsearch

```
3. 服务器ip可访问
```
vi /usr/local/tool/elasticsearch/elasticsearch-5.4.2/config/elasticsearch.yml

修改为：
    network.host: 0.0.0.0
    node.name: "node-1"
    discovery.seed_hosts: ["127.0.0.1", "[::1]"]
    cluster.initial_master_nodes: ["node-1"]

vi /etc/security/limits.conf
修改为： 
    hadoop soft nofile 65536
    hadoop hard nofile 131072
    hadoop soft nproc 2048
    hadoop hard nproc 4096

vim /etc/sysctl.conf
修改为：
    vm.max_map_count = 655360

/sbin/sysctl -p
```

4. 后台启动
```
nohup ./bin/elasticsearch & > log
```

### 安装kibana


### docker下安装es+kibana
```
docker pull nshou/elasticsearch-kibana

docker run -d -p 9200:9200 -p 5601:5601 nshou/elasticsearch-kibana
```

brain++ 安装

```
docker run -d -p 9200:9200 -p 5601:5601 nshou/elasticsearch-kibana

ssh -N -L 5601:localhost:5601 caihao+http@wh-a-internal.brainpp.cn

http://5601.pre_label.caihao.ws2.local.brainpp.cn:5601/
```

## 使用

[官方文档](https://www.elastic.co/guide/cn/elasticsearch/guide/cn/getting-started.html)

```
GET /_count

GET /megacorp/_search
GET /megacorp/_search?q=type:employee
GET /megacorp/_search?q=last_name:Smith

# 精确查询
GET /megacorp/_search
{
  "query": {
    "match": {
      "type": "employee"
    }
  }
}
# 模糊查询
GET /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "about" : "rock climbing"
        }
    }
}
# 匹配查询
GET /megacorp/_search
{
  "query" : {
    "bool": {
      "must": {
          "match" : {
              "last_name" : "smith" 
          }
      },
      "filter": {
          "range" : {
              "age" : { "gt" : 30 } 
          }
      }
    }
  }
}
# 短语搜索
GET /megacorp/_search
{
  "query" : {
    "match_phrase" : {
        "about" : "rock climbing"
    }
  }
}
# 高亮搜索
GET /megacorp/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {
        "fields" : {
            "about" : {}
        }
    }
}
# 分析
GET /megacorp/_search
{
  "aggs": {
    "all_interests": {
      "terms": { "field": "interests" }
    }
  }
}

PUT /megacorp/_doc/1
{
  "type": "employee",
  "first_name" : "John",
  "last_name" :  "Smith",
  "age" :        25,
  "about" :      "I love to go rock climbing",
  "interests": [ "sports", "music" ]
}

PUT /megacorp/_doc/3
{
    "type": "employee",
    "first_name" :  "Douglas",
    "last_name" :   "Fir",
    "age" :         35,
    "about":        "I like to build cabinets",
    "interests":  [ "forestry" ]
}
```
