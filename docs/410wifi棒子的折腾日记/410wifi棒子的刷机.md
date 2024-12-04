

一、了解随身WiFi的版本情况
来个全身照【拆机自备螺丝刀】：
这是一个UFI001B版本，有卡槽【有的随身wifi没有卡槽，但是有焊点，动手能力强的兄弟可以自己焊接一个】
这是一个UFI001C版本的板子，有卡槽。
还是个2022年的库存货，上面的屏蔽板打开，我的是kingston（金士顿）的颗粒。
【JAPAN，也不知道是什么颗粒】
二、确定需求剁手
• 如果单纯想插自己的卡，可以买中芯微芯片【轻型linux系统】的随身wifi，推荐理由是稳定，发热量小【相对】，省的折腾。
• 如果想搞机，建议高通骁龙410纸盒系列【安卓系统，类似手机开热点】，推荐理由是可玩性高，可以刷debian、openwrt、软路由、服务器等。
各大网购平台自行进行下单。大于十块钱不推荐入手哦【等活动再入手】。
三、购买闭坑指南
随着时间的流逝，生厂厂家也在更新迭代，数据仅供参考。（没有针对商家【狗头保命】）产品名称理由ZDX中芯微zxic，后台比较强大，破解难度大先机骁龙410，版本103s，群里大佬不推荐……
欢迎大家来补充。
四、安装9008驱动
UFI-Tools【123pan，密码5835】
UFI-Tools【蓝凑网，密码:gao】
按住重启键不放没然后插入电脑U盘接口，电脑打开设备管理器
电脑显示9008端口才是正确的，只有进入9008才能刷机。
如果显示其他的，可以重新插拔重复上述操作。
五、系统备份
软件下载：UFI-Tools
防止刷的过程中会变砖（刷死了，系统出错，不动了），就需要对原来的系统进行备份
1. MiKo备份
最少做一个miko全量备份。
上述操作可以检测芯片信息和内存信息。上述是个4G内存的棒子【有人中奖8G】。QUALCOMM MSM8916：高通410，可玩性最高；
QUALCOMM MSM8909：高通210，玩法仅次于410；检测完成之后对系统进行备份【镜像备份】。
选择备份的地址，然后等待备份完成即可
2. 变砖拯救（利用之前的备份镜像）
如果之后的步骤变砖了，可以看这一步，没变砖请跳过
3. QPT 备份
软件：Qualcomm Premium Tool
这个软件需要注册，注册的时候记得关闭电脑声音。
Qualcomm Premium Tool 备份出来的是所有分区的小镜像，也用于提取部分分区。
备份参考链接：参考
4. QCN（基带）备份
软件：星海SVIIP
备份参考链接：参考
六、刷Debian系统
1.资料下载
资料下载链接【后面用到啥下啥】：
UFI-Tools
酷铵水遍（酷安）
环境包
Debian & OpenWrt 固件下载：
苏苏小亮亮（酷安）
OpenStick-github
按照自己的主板信息下载对应的包并进行解压。
2. fastboot刷机模式
备份完资料之后，重新插拔随身wifi【不需要按住重启键】
进入下载解压好的包里面，在地址栏输入cmd，然后按回车。
在命令行模式下输入以下命令：

adb devices

上图是正确的，如果设备清单中没有adb设备就重新插拔。
Fastboot 模式是 Android 手机常用的刷机模式（线刷）。上述操作没有问题之后执行以下指令操作：

adb reboot bootloader

问题：如果adb显示没有设备，尝试以下方法进行解决：
1. 重新安装驱动，卸载重装2.如果方法一不能奏效，可以尝试利用miko工具进行备份包的还原3.如果没有备份包，方法一不行可以尝试卸载驱动，安装ADBDriver installer或者安装ARDC(B2016)然后打开安装路径找到adb驱动安装
3. 刷机解压文件中找到flash.bat
按任意键继续，多按几次
如果出现这个问题：
方法一：等一会，重新插拔
方法二：卸载掉9008驱动，然后重新插拔
进入这个界面是成功了。到这步已经刷入了Debian系统。
4. 刷官网Debian【自选】
Debian【github】
github加速下载网站
首先打开BootLoader模式

adb reboot bootloader

然后进入base文件夹，cmd下输入flash.bat
之后再进入debian文件夹，cmd输入flash.bat
七、刷OpenWrt系统
1. 下载资源
资源下载看debian的下载。
2. 刷机
方法同上，跟刷Debian系统一样完成标志：
3. 连接
4. 进入系统
网址：192.168.1.1
用户名是root，没有密码，直接点击登录
八、进阶玩法
感谢你们的阅读，当你们读到这里的时候，说明前面已经安装好了对应的系统，接下来开始进入正题，开始真正的搞机！！！
（一）Debian系统
FinalShell的安装和使用
1. 1 FinalShell下载
FinalShell是一体化的的服务器,网络管理软件,不仅是ssh客户端,还是功能强大的开发,运维工具,充分满足开发,运维需求.
FinalShell SSH（官网下载）
之后就可以打开这个软件进行直接连接。
安装过程：略
1.2 使用FinalShell进行连接
在cmd命令下输入adb shell，然后进去之后输入以下命令：

ifconfig

可以查看IP地址，找到wan口的ip信息，方便FinalShell进行连接IP地址：192.168.XX.XX
用户名：root
密码：1
端口：22
之后进行连接：
连接完成效果图：

free -h  # 查看内存信息

修改wifi名称和密码
nmtui命令
命令行输入

export TERM=linux # 只用输入一次，之后不用输入

nmtui

然后删除wifi，下图是已经删掉的
回退，按esc
然后选择第二个wifi，进行自家wifi连接，输入自家wifi的密码，等待连接成功。
更改密码
用户是root，密码默认是1，对密码进行修改

passwd root 

之后重新设置密码。
查看内存寿命
debian/op的终端输入

cat /sys/class/mmc_host/mmc0/mmc0\:0001/life_time

显示结果：0X04 用了40%的寿命
0X08 用了80%的寿命
0X00 看不到寿命
查看Debian版本

cat /etc/issue


cat /etc/debian_version

安装中文环境
第一步，安装locales包

apt-get install locales

第二步，配置包

dpkg-reconfigure locales

之后回车，做选择

挂载U盘或者SD卡
硬件可以自己DIY拓展坞，也可以参考嘉立创开源项目。
Zy143L大佬开源【酷安、嘉立创】
也可以使用现成的工具，USB拓拓展坞。
硬件名单：硬件名称数量USB拓展坞*1USB母对母头*1USB公对公头*1
总成本十元左右
组合方式如下图：
最好挂载U盘之前格式化一下

mkfs.ext4 /dev/sda

第一步查看有没有检测到U盘

lsblk

第二步，切换到usb模式

echo host > /sys/kernel/debug/usb/ci_hdrc.0/role

再次输入lsblk
第三步，进行挂载

vim /usr/sbin/mobian-usb-gadget

在setup{}里面添加语句：
echo host > /sys/kernel/debug/usb/ci_hdrc.0/role
vim命令操作指导：教程
第四步，reboot重启设备，再度输入lsblk是否检测到u盘
挂载语句：mount /dev/sda /mnt
第五步，每次重启都要重启挂载，因此，写一个脚本
可以自定义位置
脚本内容： /www是我新建的文件夹

#!/bin/bash
sleep 3s
mount /dev/sda /www

脚本开机运行：

vim /etc/rc.local

输入上面命令。
第六步，赋予权限：

chmod -x mount.sh

chmod +x /etc/rc.local

第七步，重启
挂载失败
mount: /www: wrong fs type, bad option, bad superblock on /dev/sda, missing codepage or helper program, or other error.
教程
教程
解决问题：/etc/rc.local文件配置的开机启动项不生效
教程
解决：perl: warning: Please check that your locale settings
教程
docker安装
使用root身份登录系统

apt-get update

安装wget和curl工具

apt install curl wget

修改安装docker系统的位置【空间大可以忽略】
教程
教程