## 解压安装zookeeper

```bash
	tar -zxvf zookeeper-3.4.5.tar.gz -C /opt/zookceper/
```

## 配置zoo.cfg文件

将模板文件重命名为zoo.cfg

```bash
cd /opt/zookceper/zookeeper-3.4.5/conf/
cp zoo_sample.cfg zoo.cfg
```

创建数据目录和日志目录（三台都需要创建）

```bash
mkdir -p /opt/zookeeper/zkdata
mkdir -p /opt/zookeeper/zkdatalog
```

打开配置文件并修改

```bash
#这个时间是作为Zookeeper服务器之间或客户瑞与服务器之间维持心跳的时间间隔
tick Time=2000

#配置 Zookeeper 接受客户端初始化连接时最长能忍受名少个心跳时间问隔数:
initLimit=10

#Leader j Follower 之间发送消息,请求和应答时间长度
syncLimit=5

数据目录需婴提前创建
dataDir=/opt/zookeeper/zkdata
#日志日录需要提前创建
dataLogDir=/opt/zookeeper/zkdatalog

#访问瑞口号
clientPort=2181
#server,每个节点服务编号-服务器IP地址:集群通信端口,选举编口
server.1=master1-1:2888:3888
server.2=slave1-1:2888:3888
server.3=slave1-2:2888:3888
```

## 分发zookeeper文件夹

```bash
scp -r /opt/zookeeper slave1-1:/opt/zookeeper
scp -r /opt/zookeeper slave1-2:/opt/zookeeper
```

## 启动zookeeper

```bash
/opt/zookeeper/bin/zxServer.sh start
```

## 查看zookeeper进程

```bash
jps
```