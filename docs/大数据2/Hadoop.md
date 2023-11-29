## 解压安装Hadoop

```bash
tar -zxvf hadoop-2.6.0.tar.gz -C /opt/hadoop/
```

### 修改hadoop-env.sh配置文件

添加JAVA_HOME

```bash
cd /opt/hadoop/hadoop-2.6.0/etc
vim /opt/hadoop/hadoop-2.6.0/etc/hadoop-env.sh

#JAVA_HOME
export JAVA_HOME=export JAVA_HOME=/usr/local/src/jdk8
```

### 修改core-site.xml配置文件

```bash
vim core-site.xml
```

core-site.xml文件主要配置Hadoop的公有属性，具体需要配置的每个属性的注释如下所示。

```bash
<configuration>
	<property>
		<name>fs.dcfaultFS</name>
		<value>hdfs://mycluster</value>
	</propcrty>
	＜这里的值指的是默认的HDFS路径，取名为clusterl＞
	

	<propcrty>
		<name>hadoop.tmp.dir</name>
		<value>/opt/data/tmp</value>
	</property>
	＜hadoop的临时目录，如果需要配置多个目录，需要逗号隔开，data目录需要用户自己创建＞

	<propcrty>
		<name>ha.zookeeper.quorum</name>
		<value>master1-1:2181,slave1-1:2181,slave1-2:2181</value>
	</propcrty>
	＜配置 Zookeeper 管理 HDFS＞
</configuration>
```

### 修改hdfs-site.xml配置文件

hdfs-site.xml文件主要配置和HDFS相关的属性，具体需要配置的
每个属性的注释如下所示。

```bash
<configuration>
	<propcrty>
		<name>dfs.replication</name>
		<valuc>3</value>
	</property>
	＜数据块副本数为3＞

	<property>
		<name>dfs.permissions</name>
		<value>false</value>
	</property>
	<property>
		<name>dfs.permissions.cnabled</name>
		<value>false</value>
	</propcrty>
	＜权限默认配置为false＞

	<property>
		<name>dfs.nameservices</name>
		<value>mycluster</value>
	</property>
	＜命名空间，它的值与fs.defaultFS的值要对应，NameNodc高可用之后有两个 NameNode， mycluste是对外提供的统一入口＞

	<property>
		<name>dfs.ha.namenodes.mycluster</name>
		<value>nnl,nn2</value>
	</property>
	＜指定 NameService 是mycluster 时的 NameNode 有哪些，这里的值也是逻辑名称，名字任意起，相互不重复即可＞

	＜master1-1 HTTP 地址＞
	<property>
		<name>dfs.namenode.rpc-address.mycluster.nnl</name>
		<value>master1-1:9000</value>
	</propcrty>

	＜master1-1 RPC 地址＞
	<propcrty>
		<name>dfs.namenode.http-address.mycluster.nnl</name>
		<value>master1-1:50070</value>
	</property>

	＜slave1-1 HTTP 地址＞
	<propcrty>
		<name>dis.namenode.rpe-address.mycluster.nn2<name>
		<value>slave1-1:9000</value>
	</property>

	＜slave1-1 RPC 地址＞
	<property>
		<name>dfs.namenode.http-address.mycluster.nn2</name>
		<value>slave1-1:50070</value>
	</property>

	＜slavel-2 HTTP 地址＞
	<property>
		<name>dfs.ha.automatic-failover.enabled</name>
		<value>true</value>
	</property>

	＜启动故障自动恢复＞
	<property>
		<name>dfs.namenode.shared.edits.dir</name>
		<value>qjournal://master1-1:8485;slave1-1:8485;slave1-2:8485/mycluster</value>
	</property>

	＜指定Joumal＞
	<property>
		<name>dfs.client.failover.proxy.provider.mycluster</name>
		<value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
	</property>

	＜指定mycluster出故障时，哪个实现类负责执行故障切换＞
	<property>
		<name>dfs.journalnode.edits.dir</name>
		<value>/opt/data/journaldata/jn</value>
	</property>

	＜指定JoumnalNode集群在对NameNode的目录进行共享时，自己存储数据的磁盘路径＞
	<property>
		<name>dfs.ha.fencing.methods</name>
		<value>shell(/bin/true)</value>
	</property>

	<property>
		<name>dfs.ha.fencing.ssh.private-key-files</name>
		<value>/root/.ssh/id_rsa</value>
	</property>

	<property>
		<name>dfs.ha.fencing.ssh.connect-timeout</name>
		<value>10000</value>
	</property>

	<property>
		<name>dfs.namenode.handler.count</name>
		<value>100</value>
	</property>
</configuration>

```

### 配置slaves文件

        slaves文件主要根据集群规划配置DataNode节点所在的主机名，
具体操作如下所示。

```bash
vim slaves

master1-1
slave1-1
slave1-2
```

## 分发Hadoop

```bash
	scp -r /opt/hadoop root@slave1-1:/opt/hadoop
	scp -r /opt/hadoop root@slave1-2:/opt/hadoop
```

## 格式化Hadoop

```bash
/opt/hadoop/hadoop-2.6.0/bin/hdfs namenode -format //Namenode格式化
/opt/hadoop/hadoop-2.6.0/bin/hdfs zkfc -formatZK //格式化高可用
```

## 将Hadoop加入环境变量

```bash
vim /root/.bashrc

#HADOOP_HOME
export HADOOP_HOME=/opt/hadoop/hadoop-2.6.0/bin
```

## 一键启动HDFS或，一键启动Hadoop集群

启动HDFS

```bash
start-dfs.sh
```

启动Hadoop

```bash
start-all.sh
```