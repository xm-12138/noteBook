# 大数据（LoongArch64）

# 开发环境

## 用户权限

### 创建目录并设置权限

```bash
# 创建用户 并指定bash文件 添加至sudo组
sudo useradd -m -d /home/hadoop -s /bin/bash
usermod -a -G sudo hadoop
# 修改用户的密码
passwd hadoop
```

找到 `root    ALL=(ALL)       ALL` 按`yy`复制一行按`p`粘贴  按`i`进入编辑模式修改root为用户名

```bash
## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL

hadoop  ALL=(ALL)       ALL
## Allows members of the 'sys' group to run networking, software,
## service management apps and more.
# %sys ALL = NETWORKING, SOFTWARE, SERVICES, STORAGE, DELEGATING, PROCESSES, LOCATE, DRIVERS

## Allows people in group wheel to run all commands
%wheel  ALL=(ALL)       ALL
```


切换至hadoop用户

```bashrc
su hadoop
```



此后目录默认在 `/usr/local`

## 安装Java

从[https://mirrors.tuna.tsinghua.edu.cn)下载最新版本java8

```bash
cd /usr/local
# 下载
wget https://mirrors.tuna.tsinghua.edu.cn/Adusrium/8/jdk/x64/linux/OpenJDK8U-jdk_x64_linux_hotspot_8u422b05.tar.gz
# 解压
tar -zxvf java的文件名
# 删除压缩包
rm -rf java的文件名
```

编辑 `~/.bashrc` 添加以下内容
vim ~/.bashrc

```bash
# JAVA
export JAVA_HOME=/usr/local/jdk8
export PATH=$PATH:$JAVA_HOME/bin
```

## Hadoop

### 获取安装

```bash
# 下载
cd /usr/local
wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.3.5/hadoop-3.3.5.tar.gz
# 解压
tar -zxvf hadoop-3.3.5.tar.gz

#修改解压后的文件名
mv 原文件名 hadoop

# 删除压缩包
rm -rf hadoop-3.3.5.tar.gz
```

编辑 `~/.bashrc` 添加以下内容

vim ~/.bashrc

```bash
# Hadoop
export HADOOP_HOME=/usr/local/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

```

### 环境变量


### 配置文件

core-site.xml `vim /usr/local/hadoop/etc/hadoop/core-site.xml` 

```xml
<configuration>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>file:/usr/local/hadoop/tmp</value>
        <description>Abase for other temporary directories.</description>
    </property>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hadoop01:9000</value>
    </property>
    <property>
        <name>hadoop.proxyuser.hadoop.hosts</name>
        <value>*</value>
    </property>
    <property>
        <name>hadoop.proxyuser.hadoop.groups</name>
        <value>*</value>
    </property>
</configuration>
```

hdfs-site.xml `vim /usr/local/hadoop/etc/hadoop/hdfs-site.xml`

```xml
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:/usr/local/hadoop/tmp/dfs/name</value>
  </property>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:/usr/local/hadoop/tmp/dfs/data</value>
  </property>
</configuration>
```

在 `vim /usr/local/hadoop/etc/hadoop/workers` 中添加

```bash
hadoop01
hadoop02
hadoop03
```


在 `vim /usr/local/hadoop/etc/hadoop/hadoop-env.sh` 中添加

```bash
# JAVA
export JAVA_HOME=/usr/local/jdk8
```

创建tmp临时目录
```bash
mkdir -p /usr/local/hadoop/tmp
```



格式化NameNode

```bash
hdfs namenode -format
```

### 启停

- 启动`start-all.sh`
- 关闭`stop-all.sh`
