# 410wifi棒子折腾日记

# 刷机为debian系统

网上全是教程直接搜索就好参考以下链接

https://blog.csdn.net/qq_44774198/article/details/129812022

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

http://data:image/png;base64,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cftRbP+VTtd359L07TV8YUclye0w8cAvccxahc8xn8YX5g86LfX9H2I7djsj6duOgMh2BBdrh2k/tObOIGBnwcZXWDDgvVDAQ03llmH3GBqKfcEW3AM6DHkO8P3KEd77a9zLlko728pymVe6mZLmcvY2QtXBOvLLcrG6CinbVkhZ7IU5XNk7TXSoEf9iF3ZbPht25rOhr0kwCJbB4enkvlr88wrJWjsPG36q98U+Ptd5cAt7ciOLuC2uQsoqBlzb4wFg355qcjcvxmVfQFnFgkH1Ve+5QaCMGq+IiMTPuJ1x4o9v4ny/kald4aHTY/tRbD97lxm+AH3zOKZwF1PPHSH7J5EwdEN/rsL+vo8kk4OmfyilMwX4yzlSduzGda6NKeHRHEgDZy90A90j2o7gUOVh/L0/h0KxG0marS4K12+mJGPwebckFMB/wk3FltFZ5NxZU8G2Ax5CZheLN2+lJDNybNP2ahpaozd4C9LaUM32DeXs7ctrzZXs3FOHP3i9jb/OTUVFLUP+1TZXctoPNpsNPHUMlftqKsp4zX0CfyD68wsR8J/Avacq8rJxL1sq3JzwR90Sja7vJvuC9o1XRETiZ0JPT09PPC7s9XpZsmRJPC4tgzzC+u3l5Kf4qa54hcroL6NNeYT1W8rJtzF4l+2buOHO3DImjbWdw10zx9Z31Gjn8Ju7cKEt3iXE6LraFe8S5B42fmecJEouGTYAM8m22GmlzNx8IktxWmm+vbuAIiIi94xxu8ZJojXSGgCX1UZ+2Rbyywa3CNYf5I2BX9Y2IiVsdS/G2LyChwPF5WjiSkRE4k0zTgJ8wOubtlPd0EpwwPfkhgJ+6g5sZ+2WkT1dJyIici/QGicR0RqnYWiN081pjZOMJ5pxEhERETFIwUlERETEIAUnEREREYMUnEREREQMUnASERERMUjBSURERMQgBScRERERgxScRERERAxScBIRERExSMFJRERExCAFJxERERGDTPEuQETir7u7O94lxBhr3w031nzi9cW7BJFxa+wHp6x/4evf+SrTkuDqp3/g3Z/+W7wrEhERkXFqjN+q+waP94YmgKTpj1O86eXrb2e9zDM/rmJhQXyqExERkfFlbAenv3kCRxJ0nHwD96v/yoefhmDK37LixRcBmPKIiyRCBC/FuU4REREZF8Z2cJpqwUyQT//4Owgf5+zO/6DhCpinf43iH1ex9MtT4epZ/vB/8S5URERExoMJPT09PfG4sNfrZcmSJbd+YuI3yF27ijnTLXDVR/1b5dQ1dI5+gSIiIiID3H3BSURERCROxvatOhEREZExRMFJRERExCAFJxERERGDFJxEREREDFJwEhERETFIwUlERETEIAUnEREREYMUnEREREQMUnASERERMUjBSURERMQgBScRERERg/4fuKLcSKADkL0AAAAASUVORK5CYII=

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