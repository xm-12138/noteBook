<style>
.blog-note {
  padding: 10px 14px;
  margin: 12px 0;
  border-left: 4px solid #e6a23c;
  background: #fff7e6;
}
.blog-danger {
  padding: 10px 14px;
  margin: 12px 0;
  border-left: 4px solid #f56c6c;
  background: #fff1f0;
}
.blog-important {
  padding: 10px 14px;
  margin: 12px 0;
  border-left: 4px solid #409eff;
  background: #ecf5ff;
}
.blog-success {
  padding: 10px 14px;
  margin: 12px 0;
  border-left: 4px solid #67c23a;
  background: #f0f9eb;
}
</style>

# 小米 BE3600 2.5G（RD15）1.0.87 开启 SSH 实际操作记录

> 本文严格根据实际刷机操作记录整理，按实际操作顺序记录命令、返回结果、报错以及后续处理。设备为**小米 BE3600 2.5G / RD15 / 固件 1.0.87**，最终成功通过 SSH 进入 `root@XiaoQiang:~#`。

<div class="blog-danger">
**特别注意：设备型号和固件必须对应**<br>
本文记录的设备为 <strong>小米 BE3600 2.5G / RD15 / 1.0.87</strong>。不要直接把本文步骤套用到其他硬件型号或其他固件版本，否则可能变砖。
</div>

---

## 1. 操作前环境

- 电脑与路由器处于**同一个局域网**
- 路由器后台地址：`192.168.31.1`
- 操作环境：Windows，使用 CMD / PowerShell 执行 `curl` 和 `ssh`

---

## 2. 登录路由器后台并获取 stok

浏览器登录路由器后台，登录成功后地址栏 URL 中可以看到：

```text
http://192.168.31.1/cgi-bin/luci/web?stok=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&time=...
```

URL 中 `stok=` 后面那一段就是本次操作要用的 **stok**。

<div class="blog-danger">
**敏感信息不要公开**<br>
`stok` 属于登录会话凭证，发布博客时请统一替换为 `YOUR_STOK`。截图中的 SN、MAC、密码、WAN IP 等信息也需要打码。
</div>

---

## 3. 第一步：执行开启 SSH 参数的命令

<div class="blog-important">
**关键点：`YOUR_STOK` 必须替换成你自己登录会话的 stok**，下同。
</div>

在 Windows CMD 中执行第一条命令（实际核心操作是 `nvram set ssh_en=1`，打开 SSH 开关）：

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(nvram%20set%20ssh_en%3D1)%20%23"
```

**本次实际返回：**

```json
{
  "hw": "RD15",
  "sync": false,
  "code": 0,
  "rtid": "b37bcd66-4b47-c207-12f4-686e5b105701",
  "did": "2118374630"
}
```

`hw = RD15`、`code = 0`，说明执行成功，接口识别到的硬件型号为 `RD15`。

---

## 4. 第二步：提交 NVRAM 配置

继续在同一个 CMD 窗口执行（实际核心操作是 `nvram commit`，保存配置）：

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(nvram%20commit)%20%23"
```

**本次实际返回：** 同样为 `"code": 0`，执行成功。

---

## 5. 第三步：修改 Dropbear SSH 服务配置

继续执行（实际核心操作是把 `/etc/init.d/dropbear` 里的 `channel` 改成 `"debug"`）：

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(sed%20-i%20%27s/channel%3D.*/channel%3D%22debug%22/g%27%20/etc/init.d/dropbear)%20%23"
```

**本次实际返回：** 同样为 `"code": 0`，执行成功。

---

## 6. 第四步：启动 Dropbear SSH 服务

最后执行（实际核心操作是 `/etc/init.d/dropbear start`）：

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(/etc/init.d/dropbear%20start)%20%23"
```

**本次实际返回：** 同样为 `"code": 0`。至此**四条命令全部执行成功，SSH 服务已经启动**。

---

## 7. 获取 SSH 登录密码（算号）

SSH 登录用户名固定为 **`root`**，默认密码**根据路由器 SN（序列号）计算得出**，共 8 位（小写字母 + 数字）。

<div class="blog-note">
**SN 在哪里看？**<br>
路由器底部标签上的一串编码，形如 <code>57941/F4U711396</code>；也可以在管理后台「系统状态」里查看。<strong>SN 区分大小写，且不能带空格</strong>。
</div>

推荐使用在线算号器计算默认密码：**<https://miwifi.dev/ssh>**

填入 SN 点 **Calc**，即可得到 root 默认密码。

如果你不想把 SN 提交到第三方网站，也可以用**本地离线算号工具**（与在线算号器算法完全一致，浏览器本地计算、不上传）：

> [小米路由器 SSH 密码计算器（离线静态网页）](../html/红米路由器SSH密码计算器.html)

<div class="blog-important">
**算法说明**<br>
密码 = <strong>MD5( SN + 盐值 ) 的前 8 位十六进制</strong>。<br>
SN 含 <code>/</code>（新一代机型）盐值为 <code>6d2df50a-250f-4a30-a5e6-d44fb0960aa0</code>；<br>
SN 不含 <code>/</code>（R1D 等旧款）盐值为 <code>A2E371B0-B34B-48A5-8C40-A7133F3B5D88</code>。
</div>

---

## 8. 第一次尝试 SSH 登录（失败原因）

四条命令执行完成后，在 PowerShell 中尝试：

```powershell
ssh root@192.168.31.1
```

**实际返回：**

```text
Unable to negotiate with 192.168.31.1 port 22:
no matching host key type found.
Their offer: ssh-rsa
```

<div class="blog-danger">
**注意：这不是 SSH 开启失败！**<br>
此时路由器 IP、端口、SSH 服务都正常响应，问题出在 <strong>SSH 主机密钥算法协商</strong>阶段：路由器提供的是 <code>ssh-rsa</code>，而当前 Windows OpenSSH 客户端默认没有接受该算法，因此握手失败。<strong>出现这个报错不要重复执行前面的 curl</strong>，直接按下一步处理。
</div>

---

## 9. 解决 `ssh-rsa` 兼容问题并登录

为 SSH 客户端临时加入 `ssh-rsa` 主机密钥算法支持，重新连接：

```powershell
ssh -oHostKeyAlgorithms=+ssh-rsa root@192.168.31.1
```

出现首次连接提示：

```text
The authenticity of host '192.168.31.1 (192.168.31.1)' can't be established.
RSA key fingerprint is SHA256:CoNbk87Po0Bjpu05Qvh0AOPwwVPR4rbqis5MHJwnApk.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 `yes` 回车，再输入 **root 默认密码（用上一步算出来的 8 位密码）**。

<div class="blog-success">
**成功进入路由器 Root Shell：**<br>
<pre>BusyBox v1.36.1 (2025-03-20 02:49:04 UTC) built-in shell (ash)
-----------------------------------------------------
     Welcome to XiaoQiang!
-----------------------------------------------------
root@XiaoQiang:~#</pre>
出现 <code>root@XiaoQiang:~#</code>，说明 SSH 服务正常工作，已成功取得 root Shell。
</div>

---

## 10. 第一次修改密码：误输入大写 `PASSWD`（失败）

进入 root Shell 后，第一次输入：

```text
PASSWD
```

**实际返回：**

```text
-ash: PASSWD: not found
```

<div class="blog-note">
**注意：Linux 命令区分大小写。**<br>
<code>PASSWD</code> 和 <code>passwd</code> 不是同一个命令，必须使用小写。
</div>

---

## 11. 正确执行 `passwd` 修改密码

输入正确的小写命令：

```bash
passwd
```

按提示输入新密码。第一次输入时可能出现：

```text
Bad password: too weak
```

说明密码强度过低，**请设置足够强的 root 密码**，避免再次出现该提示。最终返回：

```text
passwd: password for root changed by root
```

说明 root 密码修改成功。

---

## 12. 再次设置 SSH NVRAM 参数

密码修改完成后，在 root Shell 中执行：

```bash
nvram set ssh_en=1
nvram commit
```

两条命令均无错误返回，表示设置并保存了 SSH 开关。

---

## 13. 检查 Dropbear 配置是否生效

执行：

```bash
cat /etc/init.d/dropbear | grep channel
```

**实际返回：**

```text
channel="debug"
if [ "$flg_ssh" != "1" -o "$channel" = "release" ]; then
```

其中 `channel="debug"` 说明前面通过 curl 修改的 Dropbear 配置**已经实际生效**。

---

## 14. 完整操作链路

```text
登录 192.168.31.1
        ↓
获取 stok
        ↓
① nvram set ssh_en=1            → code=0
        ↓
② nvram commit                  → code=0
        ↓
③ 修改 dropbear channel="debug" → code=0
        ↓
④ /etc/init.d/dropbear start    → code=0
        ↓
SSH 首次连接：ssh-rsa 协商失败
        ↓
加 -oHostKeyAlgorithms=+ssh-rsa
        ↓
输入 root 默认密码（SN 算号）
        ↓
成功进入 root@XiaoQiang:~#
        ↓
PASSWD（大小写错误，失败）
        ↓
passwd（成功）
        ↓
nvram set ssh_en=1 / nvram commit
        ↓
检查 dropbear：channel="debug"
```

---

## 15. 本次实际执行的命令清单

### Windows CMD / PowerShell

**① 开启 SSH**

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(nvram%20set%20ssh_en%3D1)%20%23"
```

**② 提交配置**

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(nvram%20commit)%20%23"
```

**③ 修改 Dropbear**

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(sed%20-i%20%27s/channel%3D.*/channel%3D%22debug%22/g%27%20/etc/init.d/dropbear)%20%23"
```

**④ 启动 Dropbear**

```cmd
curl -X POST "http://192.168.31.1/cgi-bin/luci/;stok=YOUR_STOK/api/xqsystem/start_binding" -d "uid=1234&key=%27%20%3C(/etc/init.d/dropbear%20start)%20%23"
```

### SSH 连接

最终使用：

```powershell
ssh -oHostKeyAlgorithms=+ssh-rsa root@192.168.31.1
```

### 路由器 Root Shell

```bash
passwd
nvram set ssh_en=1
nvram commit
cat /etc/init.d/dropbear | grep channel
```

---

## 16. 实际结果（已完成项）

- [x] 路由器后台登录、获取 `stok`
- [x] 四条 `curl` 命令全部执行成功，均返回 `code: 0`
- [x] 确认硬件型号 `RD15`
- [x] SSH 服务成功响应
- [x] 解决 `ssh-rsa` 协商错误
- [x] 成功 SSH 登录并进入 `root@XiaoQiang:~#`
- [x] root 密码修改成功
- [x] `nvram set ssh_en=1` / `nvram commit` 无错误
- [x] 确认 `channel="debug"` 生效

---

## 17. 需要特别区分：实际操作 vs. 后续建议

<div class="blog-danger">
**这一节非常重要：不要把未执行的命令写成已经成功。**<br>
下面是网上常见但<strong>本次没有实际终端执行证据</strong>的“彻底固化”建议，本文只作参考，不要误认为已经完成：
</div>

```bash
cp /etc/init.d/dropbear /etc/init.d/dropbear.bak
sed -i 's/flg_ssh=`nvram get ssh_en`/flg_ssh=1/' /etc/init.d/dropbear
date -s "2026-08-29 16:00:00"
ntpd -q -p pool.ntp.org
```

如果以后实际执行了，应当按「执行命令 → 实际返回 → 验证结果」的格式追加记录，而不要把建议直接当成已执行。

---

## 18. 最终实际状态

<div class="blog-success">
<strong>本次实际验证结果：SSH 已成功进入 <code>root@XiaoQiang:~#</code>。</strong>
</div>

| 项目 | 值 |
| --- | --- |
| 设备 | 小米 BE3600 2.5G |
| 硬件 | RD15 |
| 固件 | 1.0.87 |
| 路由器地址 | 192.168.31.1 |
| SSH | 已成功开启 |
| SSH 端口 | 22 |
| SSH 用户 | root |
| SSH 连接方式 | `ssh -oHostKeyAlgorithms=+ssh-rsa root@192.168.31.1` |
| NVRAM | `ssh_en=1` |
| Dropbear | `channel="debug"` |
| Root Shell | `root@XiaoQiang:~#` |

---

## 19. 发布博客前的脱敏清单

<div class="blog-danger">
**发布前务必检查截图和终端日志。**<br>
尤其是 <code>stok</code>，不要直接公开。建议逐项检查：
</div>

```text
[ ] stok
[ ] SN
[ ] MAC 地址
[ ] WAN IP
[ ] Wi-Fi 密码
[ ] 管理后台密码
[ ] root 密码
[ ] SSH 私钥
[ ] 其他公网信息
```

---

> 记录说明：本文只整理实际操作记录。对于原记录中 AI 提出的、但没有实际终端执行证据的命令，均明确标记为「后续建议」，没有混入实际操作结果。
