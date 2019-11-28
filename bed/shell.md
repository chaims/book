1. find

- type - 指定要搜索的文件类型，在上面的情况下，f 表示查找所有常规文件。
- print - 打印文件绝对路径。

```
find . -name "*.json" -exec rm {} \;   // 查找并删除

find . -type f -print | wc -l  // 查询文件数         

```


2. 上传
   
```
scp Downloads/images\ 2.zip pre_label.caihao.ws2@wh-a-internal.brainpp.cn:/home/caihao/slabel/pack/data
```
3. 下载
   
```
scp pre_label.caihao.ws2@wh-a-internal.brainpp.cn:/home/caihao/slabel/pack/output.tar.gz Downloads 
```

4. 解压
   
```
unzip 文件名
```

5. 压缩


6. 移动并重全名
把a移动到b并重命名为c
```
mv /a /b/c
```

7. 查看磁盘空间

```
df -h 查看磁盘空间
du -sh * 查看当前目录文件及文件夹的空间
```

8. vim
**查找**
- 按下`/`即可进入查找模式；
- 按下`n`查找下一个，按下`N`查找上一个；
- 加入`\c`表示大小写不敏感查找，`\C`表示大小写敏感查找;
- `:s`查找和替换字符串
```
/foo\c     //会查找所有的"foo","FOO","Foo"等字符串 
:{作用范围}s/{目标}/{替换}/{替换标志}
:%s/foo/bar/g   // 全局范围(%)查找foo并替换为bar
```

9. 查看日志
    
```
tail -f test.log

cat test.log | tail -n +3000 | head -n 1000   //从第3000行开始，显示1000行。即显示3000~3999行

cat filename                // 显示文件
cat > filename              // 创建一个文件
cat file1 file2 > file      // 合并为一个文件
```

10. systemctl

```
systemctl list-units
systemctl list-units --failed

sudo systemctl start apache.service   // 启动
sudo systemctl stop apache.service    // 停止
sudo systemctl restart apache.service // 重启
sudo systemctl kill apache.service
```

11. 