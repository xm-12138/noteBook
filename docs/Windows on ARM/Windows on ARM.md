# Windows on ARM

# 2025/7/27 小米8刷win11教程

## 声明

本篇文章原作者： B站up:[心诩](https://space.bilibili.com/2294650)

本项目的刷机方式以及所有文件并非本人研发或制作，自己仅做到了资源整合以及使用Ubuntu提取最新的UEFI和驱动，其他的文件都是网络获取，都已经上传到了我的百度网盘，只可学习交流，切勿做商业交易，由此产生的经济纠纷、法律责任均与本人无关。

以及解锁手机所带来的风险望各位周知，因此解锁手机的方式我不会教，自行百度或者小米社区咨询，此为教程，若解锁刷机过后出现的软硬件损坏等一切后果均与本人无关，建议请勿使用主力机尝试！观看视频或者下载我的百度网盘文件的人默认同意此声明。

## 零、对应视频链接

### 本视频链接：[BV1pU4y1A7QV](https://www.bilibili.com/video/BV1pU4y1A7QV/)

## 一、软硬件环境

硬件：电脑、type-cOTG线、USB扩展坞、键盘、鼠标、16gU盘、小米8普通版（教程为64g）

软件：百度网盘内（视频评论区或者简介获取）、MIUI12.5

## 二、前期准备工作

下载网盘内所有文件（视情况自行下载，毕竟百度限速）

将网盘内的所有文件夹解压，如视频所示将下列文件放进U盘：

```
1、6.SDM845驱动/WOA-Drivers-main
2、Dism++释放镜像工具/Dism  10.1.1002.1
3、win11镜像/22000xxxxx_ZH-CN.ISO
4、PE指令.txt
5、win11镜像/HEU_KMS_Activator_v23.1.0.exe #(演示视频忘记放进去了)
```

## 三、给小米8刷入PE

### 1、解锁手机（不教，自行百度以及了解解锁手机带来的风险）

申请解锁网址:[https://www.miui.com/unlock/index.html](https://www.miui.com/unlock/index.html)

### 2、刷recovery+复制分区文件(parted)

①、手机解锁后进去兔子模式（**fastboot模式**）并连接电脑（关机后按关机键和音量-）

②、打开`recovery-twrp一键刷入工具.bat`（**wzsx150制作**)，按提示操作，手机会重启几次进入TWRP

③、进入TWRP后，`高级`–`签名boot` （防止重启掉rec）

④、打开我的电脑，将`parted`文件复制到手机内部存储

### 3、给电脑配置adb环境（若有可以跳过）

①、右键此电脑-属性-高级系统设置-高级-环境变量

②、在下方的系统变量处，找到在名为`Path`的变量，双击

③、`新建`-将解压的`"文件地址"`（建议解压到无中文的地方）复制到这里来，接着点三个确定退出

### 4、给手机分区（确保此时你的手机电量大于80%）

①、以管理员身份运行命令提示符，确保此时手机在TWRP并连着电脑

②、在命令行输入`adb shell`，将下面内容逐行复制到命令行窗口并回车

```powershell
cp /sdcard/parted /sbin/ && chmod 755 /sbin/parted
umount /data && umount /sdcard
parted /dev/block/sda
p #输入一个p显示你的手机分区信息
rm 21 #21是userdata分区号
mkpart esp fat32 1611MB 2100MB
mkpart pe fat32 2100MB 5100MB
mkpart win ntfs 5100MB 58GB
mkpart userdata ext4 58GB 59GB
set 21 esp on
```

ps：这样设置win11装完会剩大概23g

### 5、格式化分区

①、手机重启至TWRP

②、在命令行再次输入`adb shell`，将下面内容逐行复制到命令行窗口并回车。

```powershell
# 1. 格式化 esp 分区 (sda21)
mkfs.fat -F32 -s1 /dev/block/sda21

# 2. 格式化 pe 分区 (sda22)
mkfs.fat -F32 -s1 /dev/block/sda22

# 3. 格式化 win 分区 (sda23)
mkfs.ntfs -f -L "Windows" /dev/block/sda23

# 4. 格式化 userdata 分区 (sda24)
mke2fs -t ext4 -b 4096 -O ^metadata_csum /dev/block/sda24
```

### **格式化结果总结：**

| **分区** | **设备节点** | **文件系统** | **状态** | **关键输出** |
| --- | --- | --- | --- | --- |
| **esp** | /dev/block/sda21 | FAT32 | ✅ 成功 | **`mkfs.fat 正常退出`** |
| **pe** | /dev/block/sda22 | FAT32 | ✅ 成功 | **`mkfs.fat 正常退出`** |
| **win** | /dev/block/sda23 | NTFS | ✅ 成功 | **`mkntfs completed successfully`** |
| **userdata** | /dev/block/sda24 | ext4 | ✅ 成功 | **`mke2fs 完成文件系统创建`** |

```
#作者原命令

mkfs.fat -F32 -s1 /dev/block/by-name/pe
mkfs.fat -F32 -s1 /dev/block/by-name/esp
mkfs.ntfs -f /dev/block/by-name/win
mke2fs -t ext4 /dev/block/by-name/userdata
```

### 6、将PE镜像、UEFI文件复制到手机内部存储，并挂载PE分区到 /mnt

此时因为格式化了分区，需要重启一次TWRP

①、手机重启至TWRP

②、将第5、7个文件夹中的`5.UEFI/boot-dipper.img`，`7.PE镜像/20h2pe_new`复制进手机内部存储

③、在命令行再次输入adb shell挂载PE分区到`/mnt`

```
#两条命令二选一
mount /dev/block/by-name/pe /mnt

mount /dev/block/sda22 /mnt
```

```
cp -r /sdcard/20h2pe_new/* /mnt
```

### 7、安装image镜像

①、重启进入TWRP，`备份`–`分区`–`boot` （防止后面回不到安卓）

②、`安装`–`刷入image镜像`–`boot–dipper.img`–`boot分区`–重启手机

此时如果成功，将会出现加载界面并进入pe。如 果失败（跑一堆英文），则跳回第6步③重来

## 四、安装win11

### 1、将你的键鼠、U盘通过USB扩展坞、OTG线连接至你的手机（确保此时你的手机电量大于80%）

### 2、为efi系统分区设定盘符

进去后的命令行窗口全程无需关闭

①、打开U盘内的`txt`文件：此电脑-你的U盘-`PE指令.txt`

②、复制`txt`文件中的上半段指令

```powershell
diskpart  #回车之后稍等一小会
select disk 0
list part
select part 21 #21为你的esp分区号
assign letter=Y
exit
```

①、打开文件夹`Dism 10.1.1002.1`，双击`Dism++ARM64.exe`，进入软件后点击接受

②、点击左上角`文件`-`释放镜像`

③、选择放在U盘里的win11的`ISO`镜像，释放位置选择最大的一个盘（视频中最大的盘是PE系统中的D盘），记得勾选上`添加引导`

④、让手机飞一会，安装完毕点击`确定`

⑤、点击`打开会话`，选择左边的`驱动管理`，再点击右下角蓝色的`添加驱动`

⑥、打开U盘里的`WOA-Drivers-main`，选中`output`，点击`选择文件夹`，让手机飞一会

⑦、点击确定后关闭软件`Dism++ARM64.exe`

### 4、关闭关闭驱动签名

①、回到`命令窗口`和`PE指令.txt`

②、复制下面内容到`命令窗口`

```powershell
bcdedit /store Y:\efi\microsoft\boot\bcd /set {Default} testsigning on
```

```powershell
bcdedit /store Y:\efi\microsoft\boot\bcd /set {Default} nointegritychecks on
```

### 5、重启、进入到win11系统

①、复制下面内容到`命令窗口`使手机关机

```powershell
shutdown -s -t 0
```

②、进入系统的设置状态后断开网络，不要连接网络，不要设置密码

③、打开U盘中的`HEU_KMS_Activator_v23.1.0.exe`软件，点击开始

## 五、总结

①、这个文档和视频主要面向偏小白的，如果有错误希望大佬b站评论区或者私信我指正

②、过后可能会出一个如何提取驱动和UEFI的视频、制作双系统。不过目前来说这个懒人版就不需要这么麻烦直接百度网盘下载我提取出来的文件就行了。看情况吧，最近工作挺忙的。

③、B站的视频我是没有激励收入的，只有一个打卡投稿瓜分奖金，但也希望帮助到你能给我一个一键三连，这是对我最大的支持。

④、本教程视频所得仅会补贴网盘会员费用（传这个win11镜像花了我18元，因为非会员不给上传超过4g的文件）

## 六、参考资料

①、本篇文章原作者： B站up:[心诩](https://space.bilibili.com/2294650)

> SDM845 EDK2 + Windows Drivers项目:
> 
> 
> [项目状态(9.10已经更新至1.0.3)](https://github.com/edk2-porting/edk2-sdm845/releases/tag/v1.0.3)
> 
> [驱动](https://github.com/edk2-porting/WOA-Drivers)
> 
> [设备支持状态](https://renegade-project.org/#/zh/windows/state-frame.html)
> 
> **刷机教程参考:**
> 
> [给手机装Windows11！还能玩大型游戏？！](【给手机装Windows11！还能玩大型游戏？！】 https://www.bilibili.com/video/BV1MU4y137Yi/?share_source=copy_web&vd_source=72b6bc2b37c12325f1e337f35ba934e2) BY B站up: [极客湾Geekerwan](https://space.bilibili.com/25876945)
> 
> [小米Mix2s刷WIN11+安卓双系统保姆级教程，已支持GPU，神器845！](https://www.bilibili.com/video/BV13L411b7oY) BY B站up: [左右先生-](https://space.bilibili.com/19323427)
> 
> [神机小米8安装win11！ 安装教程 三分半快速教程](https://www.bilibili.com/video/BV1LP4y1t7uL) BY B站up: [VR小杰](https://space.bilibili.com/11526854)
> 
> [2021-07-24-小米8刷入Win11](https://wjj0227.github.io/post/%E5%B0%8F%E7%B1%B38%E5%88%B7%E5%85%A5Win11) BY B站up: [VR小杰](https://space.bilibili.com/11526854)
>