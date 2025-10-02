import{_ as s,o as n,c as e,a as t}from"./app-146e4e89.js";const o={};function p(r,a){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h2 id="解压安装hadoop" tabindex="-1"><a class="header-anchor" href="#解压安装hadoop" aria-hidden="true">#</a> 解压安装Hadoop</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> hadoop-2.6.0.tar.gz <span class="token parameter variable">-C</span> /opt/hadoop/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改hadoop-env-sh配置文件" tabindex="-1"><a class="header-anchor" href="#修改hadoop-env-sh配置文件" aria-hidden="true">#</a> 修改hadoop-env.sh配置文件</h3><p>添加JAVA_HOME</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/hadoop/hadoop-2.6.0/etc
<span class="token function">vim</span> /opt/hadoop/hadoop-2.6.0/etc/hadoop-env.sh

<span class="token comment">#JAVA_HOME</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>export <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/local/src/jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改core-site-xml配置文件" tabindex="-1"><a class="header-anchor" href="#修改core-site-xml配置文件" aria-hidden="true">#</a> 修改core-site.xml配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> core-site.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>core-site.xml文件主要配置Hadoop的公有属性，具体需要配置的每个属性的注释如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>configuration<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>fs.dcfaultFS<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>hdfs://mycluster<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/propcrty<span class="token operator">&gt;</span>
	＜这里的值指的是默认的HDFS路径，取名为clusterl＞
	

	<span class="token operator">&lt;</span>propcrty<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>hadoop.tmp.dir<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>/opt/data/tmp<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
	＜hadoop的临时目录，如果需要配置多个目录，需要逗号隔开，data目录需要用户自己创建＞

	<span class="token operator">&lt;</span>propcrty<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>ha.zookeeper.quorum<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>master1-1:2181,slave1-1:2181,slave1-2:218<span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/propcrty<span class="token operator">&gt;</span>
	＜配置 Zookeeper 管理 HDFS＞
<span class="token operator">&lt;</span>/configuration<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改hdfs-site-xml配置文件" tabindex="-1"><a class="header-anchor" href="#修改hdfs-site-xml配置文件" aria-hidden="true">#</a> 修改hdfs-site.xml配置文件</h3><p>hdfs-site.xml文件主要配置和HDFS相关的属性，具体需要配置的 每个属性的注释如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>configuration<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>propcrty<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.replication<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>valuc<span class="token operator">&gt;</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
	＜数据块副本数为3＞

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.permissions<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>false<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.permissions.cnabled<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>false<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/propcrty<span class="token operator">&gt;</span>
	＜权限默认配置为false＞

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.nameservices<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>mycluster<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
	＜命名空间，它的值与fs.defaultFS的值要对应，NameNodc高可用之后有两个 NameNode， mycluste是对外提供的统一入口＞

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.ha.namenodes.mycluster<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>nnl,nn<span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
	＜指定 NameService 是mycluster 时的 NameNode 有哪些，这里的值也是逻辑名称，名字任意起，相互不重复即可＞

	＜master1-1 HTTP 地址＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.namenode.rpc-address.mycluster.nnl<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>master1-1:900<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/propcrty<span class="token operator">&gt;</span>

	＜master1-1 RPC 地址＞
	<span class="token operator">&lt;</span>propcrty<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.namenode.http-address.mycluster.nnl<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>master1-1:5007<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜slave1-1 HTTP 地址＞
	<span class="token operator">&lt;</span>propcrty<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dis.namenode.rpe-address.mycluster.nn<span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span>name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>slave1-1:900<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜slave1-1 RPC 地址＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.namenode.http-address.mycluster.nn<span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>slave1-1:5007<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜slavel-2 HTTP 地址＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.ha.automatic-failover.enabled<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>true<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜启动故障自动恢复＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.namenode.shared.edits.dir<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>qjournal://master1-1:8485<span class="token punctuation">;</span>slave1-1:8485<span class="token punctuation">;</span>slave1-2:8485/mycluster<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜指定Joumal＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.client.failover.proxy.provider.mycluster<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜指定mycluster出故障时，哪个实现类负责执行故障切换＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.journalnode.edits.dir<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>/opt/data/journaldata/jn<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	＜指定JoumnalNode集群在对NameNode的目录进行共享时，自己存储数据的磁盘路径＞
	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.ha.fencing.methods<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>shell<span class="token punctuation">(</span>/bin/true<span class="token punctuation">)</span><span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.ha.fencing.ssh.private-key-files<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>/root/.ssh/id_rsa<span class="token operator">&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.ha.fencing.ssh.connect-timeout<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span><span class="token number">1000</span><span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>

	<span class="token operator">&lt;</span>property<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>dfs.namenode.handler.count<span class="token operator">&lt;</span>/name<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span>value<span class="token operator">&gt;</span><span class="token number">10</span><span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>/value<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>/property<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/configuration<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置slaves文件" tabindex="-1"><a class="header-anchor" href="#配置slaves文件" aria-hidden="true">#</a> 配置slaves文件</h3><pre><code>    slaves文件主要根据集群规划配置DataNode节点所在的主机名，
</code></pre><p>具体操作如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> slaves

master1-1
slave1-1
slave1-2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分发hadoop" tabindex="-1"><a class="header-anchor" href="#分发hadoop" aria-hidden="true">#</a> 分发Hadoop</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>	<span class="token function">scp</span> <span class="token parameter variable">-r</span> /opt/hadoop root@slave1-1:/opt/hadoop
	<span class="token function">scp</span> <span class="token parameter variable">-r</span> /opt/hadoop root@slave1-2:/opt/hadoop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="格式化hadoop" tabindex="-1"><a class="header-anchor" href="#格式化hadoop" aria-hidden="true">#</a> 格式化Hadoop</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/opt/hadoop/hadoop-2.6.0/bin/hdfs namenode <span class="token parameter variable">-format</span> //Namenode格式化
/opt/hadoop/hadoop-2.6.0/bin/hdfs zkfc <span class="token parameter variable">-formatZK</span> //格式化高可用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将hadoop加入环境变量" tabindex="-1"><a class="header-anchor" href="#将hadoop加入环境变量" aria-hidden="true">#</a> 将Hadoop加入环境变量</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /root/.bashrc

<span class="token comment">#HADOOP_HOME</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HADOOP_HOME</span><span class="token operator">=</span>/opt/hadoop/hadoop-2.6.0/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一键启动hdfs或-一键启动hadoop集群" tabindex="-1"><a class="header-anchor" href="#一键启动hdfs或-一键启动hadoop集群" aria-hidden="true">#</a> 一键启动HDFS或，一键启动Hadoop集群</h2><p>启动HDFS</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>start-dfs.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动Hadoop</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>start-all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,27)])])}const i=s(o,[["render",p],["__file","Hadoop.html.vue"]]);export{i as default};
