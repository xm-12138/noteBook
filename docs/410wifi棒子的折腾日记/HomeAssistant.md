# 410wifi棒子折腾日记

# 刷机为debian系统

网上全是教程直接搜索就好参考以下链接

<a url='https://blog.csdn.net/qq_44774198/article/details/129812022' target='_blank'>参考链接</a>

# 安装docker

https://www.runoob.com/docker/debian-docker-install.html

# 安装unzip

```bash
sudo apt install unzip
```

# 从阿里云私有仓库拉取镜像

根据cpu架构不同选择不同的镜像以下是arm架构的链接

https://cr.console.aliyun.com/repository/cn-hangzhou/ximeng-images/aarch64-homeassistant/details

```bash
docker pull homeassistant/home-assistant:stable

```

# 启动命令

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -v /data/homeassistant:/config \
  --network=host \
  homeassistant/home-assistant
```

`-v /data/homeassistant:/config`这一项需要根据自己实际情况修改，即把自己物理机某文件夹挂载到容器内，我是建了个文件夹`/data/homeassistant`来存放HA的文件

# 安装HACS

HACS(Home Assistant Community Store)是HA的第三方应用商店，有很多dalao们写的各种插件，可以连接各大物联网平台（某米某猫等）的设备，是一个必装的集成 前面我也说了，我的HA相关文件都放到了`/data/homeassistant`下，所以下面的命令要根据自己实际情况进行调整

```bash
mkdir /data/homeassistant
mkdir /data/homeassistant/www
mkdir /data/homeassistant/custom_components
mkdir /data/homeassistant/custom_components/hacs

```

说明一下，上面创建的几个文件夹都是为安装HACS而准备的，`/www`是存放未来HACS安装的各种首页磁贴啥的（官方叫Lovelace ），`/custom_components/hacs`是存放等会要安装的HACS文件 接下来就是下载HACS相关文件进行安装了

一般来说，直接从HACS的github下载最新的releases即可，但需要注意的是，HACS对HA的版本有要求，如果你安装的是低版本的HA，是没法装高版本的HACS的，我云服务器装的是2021.12.8 stable版的HA，没法用最新的HACS，所以尝试了几个版本发现1.22.0可用，而树莓派安装的是最新的HA，就安装最新的HACS。所以如果安装失败，可以适当降低版本

```bash
cd hacs
wget https://download.fastgit.org/hacs/integration/releases/download/1.22.0/hacs.zip
unzip hacs.zip

```

## 安装HACS的第二种方法

遇到了Could not authenticate with GitHub, try again later这个问题

就是容器无法访问github导致的

解决方案如下：

1.  去github手动申请一个token， 这一步骤可以参考hacs官方教程

https://beta--hacs.netlify.app/docs/configuration/pat

2. 在homeassistant/configuration.yaml 中手动添加配置token 的字段如下

```bash
# Loads default set of integrations. Do not remove.
default_config:

# Load frontend themes from the themes folder
frontend:
  themes: !include_dir_merge_named themes

# Text-to-speech
tts:
  - platform: google_translate

automation: !include automations.yaml
script: !include scripts.yaml
scene: !include scenes.yaml

# HACS Configuration
hacs:
  token: "your_github_pat_here"  # 替换为你的 GitHub PAT
```

3. 重启服务 应该就能在侧边栏看到hacs服务了

---

# **homeassistant App**

HA官方提供了APP，iOS和Android都有，可自行下载~

```bash
https://www.github.com/home-assistant/iOS
https://github.com/home-assistant/android

```

# 内网穿透

App需要填入自己的HA地址，所以如果服务跑在家里的话，需要内网穿透或者公网才能在外面使用噢~ 如果HA内网穿透，`configuration.yaml`需要加上下面内容，同时内网穿透服务器(如ngrok、frp等)的nginx需要开启`websocket`支持，否则会出现外网无法访问、能访问但是无法登录等问题。 HA配置文件`configuration.yaml`

```yaml
http:
  use_x_forwarded_for: True
  trusted_proxies:
    - 127.0.0.1/24
    - ::1/128
```

nginx配置参考(用frp内网穿透)

```perl
server {
     listen	  80;
     server_name  *.frp.yourdomain.cn frp.yourdomain.cn;
     location / {
             proxy_redirect off;
             proxy_set_header Host $http_host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             # 下面两行提供websocket支持,homeassistant需要
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
             proxy_pass http://127.0.0.1:8080;
     }
}
```

[棒子的刷机](https://www.notion.so/152884978dd88027be45d207651edb46?pvs=21)