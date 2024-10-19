```markdown

```

# **在伪分布的基础上进行集群部署**

## **克隆虚拟机**

<img src="../img/1.png" alt="1" style="zoom:50%;" />


<img src="../img/2.png" alt="2" style="zoom:50%;" />


<img src="../img/3.png" alt="3" style="zoom:50%;" />

这里的目录选择自己的储存位置


<img src="../img/4.png" alt="4" style="zoom:50%;" />

## 更新网卡信息


<img src="../img/5.png" alt="5" style="zoom:50%;" />

点击高级


<img src="../img/6.png" alt="6" style="zoom:50%;" />

点击生成

## 修改VM ware  DHCP设置


<img src="../img/7.png" alt="7" style="zoom:50%;" />
点击虚拟网络编辑器


<img src="../img/8.png" alt="8" style="zoom:50%;" />
点击右下角更改设置后才能点击  DHCP设置


<img src="../img/9.png" alt="9" style="zoom:50%;" />

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