```markdown

```

# **在伪分布的基础上进行集群部署**

## **克隆虚拟机**

![屏幕截图 2024-10-19 102447.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/116845fd-dadb-4c94-bbb4-dc17845389ad/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102447.png)

![屏幕截图 2024-10-19 102506.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/370cbe01-3be1-42e8-87d9-181aaa77688f/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102506.png)

![屏幕截图 2024-10-19 102516.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/51b86bb6-7a33-4672-a4c5-1a2cd4e87dab/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102516.png)

这里的目录选择自己的储存位置

![屏幕截图 2024-10-19 102627.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/0bdead7e-b588-442a-a4d5-e56c84e82257/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102627.png)

## 更新网卡信息

![屏幕截图 2024-10-19 102747.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/d8fe3d4a-4dff-4276-a4e4-1afbe5a40752/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102747.png)

点击高级

![屏幕截图 2024-10-19 102757.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/62b9f0c3-d321-4005-aef4-99bd50306af5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102757.png)

点击生成

## 修改VM ware  DHCP设置

![屏幕截图 2024-10-19 102953.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/b8f1532e-9c99-4ed7-85ff-6478a82d6e68/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_102953.png)

点击虚拟网络编辑器

![屏幕截图 2024-10-19 103010.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/732903c5-7dab-458b-9600-870d989a30f0/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_103010.png)

点击右下角更改设置后才能点击  DHCP设置

![屏幕截图 2024-10-19 103053.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/270c3e9c-2990-4ec2-961b-81aa802a38b5/219bbf57-1b5c-4c0a-a058-552f2ba00f3e/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2024-10-19_103053.png)

改成这个样子（注意左下角的子网IP也需要更改）

## 修改hdfs-site.xml文件

在hadoop02机器中   将其中的 value 行中的文件地址修改为（hadoop03同理改为data3）

/usr/local/hadoop/tmp/dfs/data2

```bash

  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:/usr/local/hadoop/tmp/dfs/data</value>
  </property>

```

## 分发ssh密钥

（三台机器都输一遍以下命令）

```bash
ssh-copy-id hadoop@hadoop01
ssh-copy-id hadoop@hadoop02
ssh-copy-id hadoop@hadoop03
```

## 删除tmp临时目录

（三台机器都需要删除）

```bash
rm -rf /usr/local/hadoop/tmp
```

## 重新格式化namenode

在hadoop01中输入

```bash
hdfs namenode -format
```

## 启动hadoop集群

在hadoop01中启动