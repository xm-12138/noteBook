import{_ as o,o as n,c as r,b as e,d as l}from"./app-b74f6a6e.js";const d={};function s(p,t){return n(),r("div",null,t[0]||(t[0]=[e("p",null,"一次意外断电，导致OpenWrt变成了只读系统。使用e2fsck指令可以自动修复，最后需重启。",-1),e("h1",{id:"root-openwrt-in-18-12-12",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#root-openwrt-in-18-12-12","aria-hidden":"true"},"#"),l(" root @ OpenWrt in ~ [18:12:12]")],-1),e("p",null,"$ df -h Filesystem Size Used Available Use% Mounted on /dev/root 57.5G 21.6G 36.0G 37% / tmpfs 1.9G 18.2M 1.8G 1% /tmp /dev/mmcblk0p1 63.9M 16.4M 47.4M 26% /boot tmpfs 512.0K 0 512.0K 0% /dev /dev/root 57.5G 21.6G 36.0G 37% /opt/docker 查看df -h输出的信息，显然/dev/root远还没有满，排除空间不足的原因。后来想到似乎有一次意外断电，在操作插排时拔错了线。",-1),e("p",null,"修复方案： 、、 e2fsck /dev/mmcblk0p2 然后一路点y就好了。",-1),e("p",null,"重启。",-1),e("p",null,"Fin.",-1)]))}const c=o(d,[["render",s],["__file","openwrt.html.vue"]]);export{c as default};