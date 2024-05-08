import{_ as e,o as a,c as s,a as n}from"./app-840e8edb.js";const i={},r=n(`<h2 id="解压安装zookeeper" tabindex="-1"><a class="header-anchor" href="#解压安装zookeeper" aria-hidden="true">#</a> 解压安装zookeeper</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>	<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> zookeeper-3.4.5.tar.gz <span class="token parameter variable">-C</span> /opt/zookceper/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置zoo-cfg文件" tabindex="-1"><a class="header-anchor" href="#配置zoo-cfg文件" aria-hidden="true">#</a> 配置zoo.cfg文件</h2><p>将模板文件重命名为zoo.cfg</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/zookceper/zookeeper-3.4.5/conf/
<span class="token function">cp</span> zoo_sample.cfg zoo.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建数据目录和日志目录（三台都需要创建）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/zookceper/zkdata
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/zookeeper/zkdatalog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>打开配置文件并修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#这个时间是作为Zookeeper服务器之间或客户瑞与服务器之间维持心跳的时间间隔</span>
tick <span class="token assign-left variable">Time</span><span class="token operator">=</span><span class="token number">2000</span>

<span class="token comment">#配置 Zookeeper 接受客户端初始化连接时最长能忍受名少个心跳时间问隔数:</span>
<span class="token assign-left variable">initLimit</span><span class="token operator">=</span><span class="token number">10</span>

<span class="token comment">#Leader j Follower 之间发送消息,请求和应答时间长度</span>
<span class="token assign-left variable">syncLimit</span><span class="token operator">=</span><span class="token number">5</span>

数据目录需婴提前创建
<span class="token assign-left variable">dataDir</span><span class="token operator">=</span>/opt/zookceper/zkdata
<span class="token comment">#日志日录需要提前创建</span>
<span class="token assign-left variable">dataLogDir</span><span class="token operator">=</span>/opt/zkdatalog

<span class="token comment">#访问瑞口号</span>
<span class="token assign-left variable">clieatPort</span><span class="token operator">=</span><span class="token number">2181</span>
<span class="token comment">#server,每个节点服务编号-服务器IP地址:集群通信端口,选举编口</span>
<span class="token assign-left variable">server.l</span><span class="token operator">=</span>master1-1:2888:3888
<span class="token assign-left variable">server.2</span><span class="token operator">=</span>slave1-1:2888:3888
<span class="token assign-left variable">server.3</span><span class="token operator">=</span>slave1-2:2888:3888
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分发zookeeper文件夹" tabindex="-1"><a class="header-anchor" href="#分发zookeeper文件夹" aria-hidden="true">#</a> 分发zookeeper文件夹</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> <span class="token parameter variable">-r</span> /opt/zookeeper slave1-1:/opt/zookeeper
<span class="token function">scp</span> <span class="token parameter variable">-r</span> /opt/zookeeper slave1-2:/opt/zookeeper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动zookeeper" tabindex="-1"><a class="header-anchor" href="#启动zookeeper" aria-hidden="true">#</a> 启动zookeeper</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/opt/zookeeper/bin/zxServer.sh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看zookeeper进程" tabindex="-1"><a class="header-anchor" href="#查看zookeeper进程" aria-hidden="true">#</a> 查看zookeeper进程</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>jps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),l=[r];function o(d,p){return a(),s("div",null,l)}const t=e(i,[["render",o],["__file","zookeeper.html.vue"]]);export{t as default};
