import{_ as e,r as i,o as t,c as o,a as d,b as n,d as l,e as r}from"./app-146e4e89.js";const c={},p={href:"https://www.notion.so/152884978dd88027be45d207651edb46?pvs=21",target:"_blank",rel:"noopener noreferrer"};function u(m,a){const s=i("ExternalLinkIcon");return t(),o("div",null,[a[1]||(a[1]=d(`<h1 id="_410wifi棒子折腾日记" tabindex="-1"><a class="header-anchor" href="#_410wifi棒子折腾日记" aria-hidden="true">#</a> 410wifi棒子折腾日记</h1><h1 id="刷机为debian系统" tabindex="-1"><a class="header-anchor" href="#刷机为debian系统" aria-hidden="true">#</a> 刷机为debian系统</h1><p>网上全是教程直接搜索就好参考以下链接</p><p><a href="https://blog.csdn.net/qq_44774198/article/details/129812022" target="_blank">参考链接</a></p><h1 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h1><p><a href="https://www.runoob.com/docker/debian-docker-install.html" target="_blank">安装docker</a></p><h1 id="安装unzip" tabindex="-1"><a class="header-anchor" href="#安装unzip" aria-hidden="true">#</a> 安装unzip</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">unzip</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="从阿里云私有仓库拉取镜像" tabindex="-1"><a class="header-anchor" href="#从阿里云私有仓库拉取镜像" aria-hidden="true">#</a> 从阿里云私有仓库拉取镜像</h1><p>根据cpu架构不同选择不同的镜像以下是arm架构的链接</p><h2 id="拉取镜像时注意版本" tabindex="-1"><a class="header-anchor" href="#拉取镜像时注意版本" aria-hidden="true">#</a> （拉取镜像时注意版本）</h2><p>https://cr.console.aliyun.com/repository/cn-hangzhou/ximeng-images/aarch64-homeassistant/details</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull homeassistant/home-assistant:stable

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="启动命令" tabindex="-1"><a class="header-anchor" href="#启动命令" aria-hidden="true">#</a> 启动命令</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> homeassistant <span class="token punctuation">\\</span>
  <span class="token parameter variable">--privileged</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--restart</span><span class="token operator">=</span>unless-stopped <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">TZ</span><span class="token operator">=</span>Asia/Shanghai <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /data/homeassistant:/config <span class="token punctuation">\\</span>
  <span class="token parameter variable">--network</span><span class="token operator">=</span>host <span class="token punctuation">\\</span>
  homeassistant/home-assistant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-v /data/homeassistant:/config</code>这一项需要根据自己实际情况修改，即把自己物理机某文件夹挂载到容器内（将物理机的<code>/data/homeassistant</code>挂载到容器的<code>/config</code>目录下），我是建了个文件夹<code>/data/homeassistant</code>来存放HA的文件</p><h1 id="安装hacs" tabindex="-1"><a class="header-anchor" href="#安装hacs" aria-hidden="true">#</a> 安装HACS</h1><p>HACS(Home Assistant Community Store)是HA的第三方应用商店，有很多dalao们写的各种插件，可以连接各大物联网平台（某米某猫等）的设备，是一个必装的集成 前面我也说了，我的HA相关文件都放到了<code>/data/homeassistant</code>下，所以下面的命令要根据自己实际情况进行调整</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /data/homeassistant
<span class="token function">mkdir</span> /data/homeassistant/www
<span class="token function">mkdir</span> /data/homeassistant/custom_components
<span class="token function">mkdir</span> /data/homeassistant/custom_components/hacs

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明一下，上面创建的几个文件夹都是为安装HACS而准备的，<code>/www</code>是存放未来HACS安装的各种首页磁贴啥的（官方叫Lovelace ），<code>/custom_components/hacs</code>是存放等会要安装的HACS文件 接下来就是下载HACS相关文件进行安装了</p><p>一般来说，直接从HACS的github下载最新的releases即可，但需要注意的是，HACS对HA的版本有要求，如果你安装的是低版本的HA，是没法装高版本的HACS的，我云服务器装的是2021.12.8 stable版的HA，没法用最新的HACS，所以尝试了几个版本发现1.22.0可用，而树莓派安装的是最新的HA，就安装最新的HACS。所以如果安装失败，可以适当降低版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> hacs
<span class="token function">wget</span> https://download.fastgit.org/hacs/integration/releases/download/1.22.0/hacs.zip
<span class="token function">unzip</span> hacs.zip

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装hacs的第二种方法" tabindex="-1"><a class="header-anchor" href="#安装hacs的第二种方法" aria-hidden="true">#</a> 安装HACS的第二种方法</h2><p>遇到了Could not authenticate with GitHub, try again later这个问题</p><p>就是容器无法访问github导致的</p><p>解决方案如下：</p><p>1.  去github手动申请一个token， 这一步骤可以参考hacs官方教程</p><p>https://beta--hacs.netlify.app/docs/configuration/pat</p><ol start="2"><li>在homeassistant/configuration.yaml 中手动添加配置token 的字段如下</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Loads default set of integrations. Do not remove.</span>
default_config:

<span class="token comment"># Load frontend themes from the themes folder</span>
frontend:
  themes: <span class="token operator">!</span>include_dir_merge_named themes

<span class="token comment"># Text-to-speech</span>
tts:
  - platform: google_translate

automation: <span class="token operator">!</span>include automations.yaml
script: <span class="token operator">!</span>include scripts.yaml
scene: <span class="token operator">!</span>include scenes.yaml

<span class="token comment"># HACS Configuration</span>
hacs:
  token: <span class="token string">&quot;your_github_pat_here&quot;</span>  <span class="token comment"># 替换为你的 GitHub PAT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>重启服务 应该就能在侧边栏看到hacs服务了</li></ol><hr><h1 id="homeassistant-app" tabindex="-1"><a class="header-anchor" href="#homeassistant-app" aria-hidden="true">#</a> <strong>homeassistant App</strong></h1><p>HA官方提供了APP，iOS和Android都有，可自行下载~</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>https://www.github.com/home-assistant/iOS
https://github.com/home-assistant/android

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="内网穿透" tabindex="-1"><a class="header-anchor" href="#内网穿透" aria-hidden="true">#</a> 内网穿透</h1><p>App需要填入自己的HA地址，所以如果服务跑在家里的话，需要内网穿透或者公网才能在外面使用噢~ 如果HA内网穿透，<code>configuration.yaml</code>需要加上下面内容，同时内网穿透服务器(如ngrok、frp等)的nginx需要开启<code>websocket</code>支持，否则会出现外网无法访问、能访问但是无法登录等问题。 HA配置文件<code>configuration.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">http</span><span class="token punctuation">:</span>
  <span class="token key atrule">use_x_forwarded_for</span><span class="token punctuation">:</span> <span class="token boolean important">True</span>
  <span class="token key atrule">trusted_proxies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 127.0.0.1/24
    <span class="token punctuation">-</span> <span class="token punctuation">:</span><span class="token punctuation">:</span>1/128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx配置参考(用frp内网穿透)</p><div class="language-perl line-numbers-mode" data-ext="perl"><pre class="language-perl"><code>server <span class="token punctuation">{</span>
     listen	  <span class="token number">80</span><span class="token punctuation">;</span>
     server_name  <span class="token operator">*</span><span class="token operator">.</span>frp<span class="token operator">.</span>yourdomain<span class="token operator">.</span>cn frp<span class="token operator">.</span>yourdomain<span class="token operator">.</span>cn<span class="token punctuation">;</span>
     location <span class="token operator">/</span> <span class="token punctuation">{</span>
             proxy_redirect off<span class="token punctuation">;</span>
             proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span>
             proxy_set_header X<span class="token operator">-</span>Real<span class="token operator">-</span>IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
             proxy_set_header X<span class="token operator">-</span>Forwarded<span class="token operator">-</span>For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
             <span class="token comment"># 下面两行提供websocket支持,homeassistant需要</span>
             proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
             proxy_set_header Connection <span class="token string">&quot;upgrade&quot;</span><span class="token punctuation">;</span>
             proxy_pass http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token v-string string">127.0.0.1</span><span class="token punctuation">:</span><span class="token number">8080</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40)),n("p",null,[n("a",p,[a[0]||(a[0]=l("棒子的刷机",-1)),r(s)])])])}const h=e(c,[["render",u],["__file","HomeAssistant.html.vue"]]);export{h as default};
