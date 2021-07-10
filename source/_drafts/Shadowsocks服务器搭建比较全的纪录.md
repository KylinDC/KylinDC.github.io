---
title: Shadowsocks 服务器搭建比较全的纪录 tags: 杂 abbrlink: 63883 date: 2017-05-11 16:19:31
---
文章较长，先理理思路。 首先介绍一下Shadowsocks是什么，然后讲一讲服务器段Shadowsocks的**搭建**以及**优化**
，优化分为BBR加速和锐速加速两种方案，根据不同的加速方案选择不同的服务器端操作系统。最后讲一下Shadowsocks客户端的配置。

## Shadowsocks是什么？

首先来弄清楚一下Shadowsocks和VPN的区别。在很久以前VPN（Virtual private
network，虚拟专有网络）是用来翻墙的主要方式，但是随着GFW的不断升级，这种方式很容易被封，所以后来基本上没有人用这种技术方式来翻墙的了，但是'VPN'
这个词就慢慢被指代为所有的翻墙方式。翻墙方式用很多种，不单单只有VPN一种，所以'VPN'这个词在不同的含义下有不同的意思。
Shadowsocks是[clowwindy](https://github.com/clowwindy)开发的一个开源代理加密协议，有很多用途，当然最常见的还是拿来翻墙。事实上现在所有的商业的翻墙代理（云梯，多态等）底层都是Shadowsocks技术。
如果想要知道Shadowsocks的具体技术细节可参考[写给非专业人士看的 Shadowsocks 简介](https://vc2tea.com/whats-shadowsocks/)。
> ![Shadowsocks组件](1.jpg)

根据上图我们可以明白使用Shadowsocks来翻墙至少需要

1. 运行在远程服务器的**「服务器端」**。
2. 运行在手机、PC等上的**「客户端」**。

首先让我们开始Shadowsocks服务器端的搭建。

## Shadowsocks服务器端搭建篇

服务器端的Shadowsocks运行在位于墙外的远程主机上，远程主机可以简单理解为一台远程的电脑，这台电脑上的操作系统一般都是没有图形界面的Linux，然而真正的远程主机比较贵，所以一般我们都会选择使用一个虚拟专有服务器（Virtual
private server，VPS），我们将在VPS上面搭建好Shadowsocks的服务器端。 VPS肯定都是要钱的，这也是搭建翻墙服务中唯一要花钱的地方。

### 选择VPS提供商

常见的VPS提供商有Linode、Vultr、DigitalOcean、BandwagonHOST（俗称「搬瓦工」）。根据[小众软件网站翻译的测评][1]
，在前三家提供商里的月付＄5最基本档里，Linode是最佳选择，Vultr与DigitalOcean不相伯仲，不过在2017年3月1号后，Vultr提供了月付＄2.5的基本档，这一价格更具吸引力。个人不是很推荐搬瓦工，虽然最便宜，但搬瓦工由于虚拟主机采用的架构原因，并不支持常见的Shadowsocks加速方案，导致最终的加速效果一般。

其中Linode虽支持PayPal（国外支付宝，可绑定国内信用卡）支付但仅支持双币信用卡注册，所以没有双币信用卡、需要翻墙的设备教少且对速度要求不是很高时不妨试试Vultr的月付＄2.5基本档。

可使用[Linode注册链接](https://www.linode.com/?r=2e3c6f6ce913e37f3167953581f6facaa93a729f)注册，注册Linode的时候不妨使用优惠码：`DOCS10`可获得$10的优惠券。
Linode在用邮箱注册好后会发一封确认邮件到邮箱，在点击确认链接后会要补充一些账单信息和信用卡信息，填好信息后会要一段时间进行审核，请耐心等待，之后会在信用卡里扣除＄5。

可使用[Vultr注册链接](http://www.vultr.com/?ref=7124118)来注册Vultr，注册前记得注册好PayPal用以支付。

2018/3/22 update: 现在已经不推荐 Linode 了，因为最具有优势的的日本节点已经被封的差不多了，剩下的优势不大。

### 搭建Shadowsocks服务器端

在注册好VPS之后，就需要在VPS上搭建一个系统。 因为我用的Linode的主机，所以以下就是以Linode的界面为主，其他主机商的配置界面大同小异，触类旁通。

#### Linode主机设置

在开始新建系统之前，Linode的后台对新手不是很友好，建议看看[Linode官方开始教程][2]视频的前半部分。

* 选择套餐 建议选择日本的机房，延迟会低一些，
  ![](2.jpg)
  选择好套餐后，你就可以看到你的主机IP（图示箭头处），记住这个IP地址，后面会要用
  ![](3.jpg)
* 选择`Delay an Image`
  ![](4.jpg)
* 选择`Ubuntu 16.04 LTS`作为操作系统
* `Swap Disk`项选择512MB
* `Root Password`填好你自己的想对主机设置的密码，后面要用
* 之后`Deploy`即可，记得配置好后要`Boot`

### Vultr主机设置

相比Linode而言，Vultr设置就要直观美观的多。 选择日本机房，月付$2.5的套餐，选择`Ubuntu 16.04 LTS`作为系统，开启IPv6即可。
![](5.jpg)

2018/3/22 update: 现在月付$2.5的套餐长期缺货，只能选择$5的了，而且节点也建议选择硅谷节点，其他的几个热门都被封的差不多了。

### Shadowsocks服务器端搭建

在将主机设置好后，我们就可以开始着手服务器的搭建了。 首先我们要使用一个软件——PuTTY，[点击即可下载
(64位)](https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe)，在下图红线处填入你主机的IP，端口保持默认即可，之后点击`Open`即可。
![](6.jpg)
之后就是黑乎乎的一片，不过不用担心，后面只要做一些简单的复制粘贴即可配置好了。 注意事项：

* 使用PuTTY时一定要确保自己的输入法是在英文状态
* 之后复制粘贴命令时确保一行一行复制粘贴，不建议多行复制

默认的用户名是`root`，密码即是之前配置主机时设置的密码。 登陆成功后应该是这样
![](7.jpg)
（可能你的看起来跟我的看起来不一样，那是因为我已经修改了主题了，界面显示的文字是一样的）

接下来就基本上是复制粘贴了，在PuTTY中右键即可粘贴，记得一行一行复制粘贴，有请求确认的一律输入`y`进行确认。

```bash
apt-get update
apt-get install python-gevent python-pip python-m2crypto python-wheel python-setuptools
pip install shadowsocks
```

等指令运行完之后，Shadowsocks就已经装好了,就是如此之快。 安装完之后，还要做一些自定义的设置。 首先要准备一个多用户配置文件，建议事先准备好，类似模版如下：

```js
{
  "server"
:
  "0.0.0.0",
    "local_address"
:
  "127.0.0.1",
    "local_port"
:
  1080,
    "port_password"
:
  {
    "6677"
  :
    "password0",    /* 你的Shadowsocks端口(1024~65536)和密码*/
      "7788"
  :
    "password1",
      "8899"
  :
    "password2"     /* 不够可以继续添加，注意行尾逗号*/
  }
,
  "timeout"
:
  600,
    "method"
:
  "aes-256-cfb"    /* 你的Shadowsocks加密协议，*/
}
```

实际使用时记得把上述模版中的`/* */`部分删掉。

执行命令
`apt-get install vim`
安装Vim编辑器，执行命令
`vi /etc/shadowsocks.json`
进入Vim编辑器，按`i`进入编辑模式，此时注意 PuTTY 串口的左下角会出现 `-- INSERT --` 字样，用退格键将原有文字全部删除，然后再右键粘贴上述Shadowsocks全部配置文档。之后按`Esc`
进入命令模式，此时`-- INSERT --` 字样会消失，输入`:wq` 然后回车即可保存文档并退出Vim编辑器。更多Vim的操作可以查看[此博客][4]。

注：如果你要使用`chacha20`作为加密方式，记得要安装 libsodium

```bash
apt-get update
apt-get install libsodium-dev
```

参看：[ShadowsocksR 安装libsodium 以支持 Chacha20/Chacha20-ietf 加密方式](https://doub.io/ss-jc51/)

### 配置 Shadowsocks 开机自启动

执行命令
`vi /etc/rc.local`

然后将
`ssserver -c /etc/shadowsocks.json -d start`插入到注释后，`exit 0`之前。

随后按`Esc`进入命令模式，此时`-- INSERT --` 字样会消失，输入`:wq` 然后回车即可保存文档并退出Vim编辑器。

重启 VPS。

测试一下 Shadowsocks 是否已经成功开启。

至此Shadowsocks的服务器端配置就全部完成了。

### 安装 ShadowsocksR(SSR)

#### 安装 SSR

> 完整参考[ShadowsocksR 单用户版服务端安装教程](https://doub.io/ss-jc11/)

```bash
apt-get update
apt-get install git vim -y
git clone -b manyuser https://github.com/ToyoDAdoubi/shadowsocksr.git
```

#### 配置SSR

```bash
cd shadowsocksr
bash initcfg.sh
vi user-config.json
```

## Shadowsocks优化篇

### 直接使用优化脚本

> 完整方法请参考[BBR+BBR魔改+Lotsever(锐速)一键脚本 for Centos/Debian/Ubuntu](https://www.moerats.com/archives/387/)

```bash
wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
```

选择好加速方案后重启生效。

### 手动优化

Shadowsocks加速优化流行的有很多方式，我进行尝试和比较之后，推荐大家使用BBR（一种TCP拥塞控制算法）来加速。 使用BBR加速需要服务器端主机完整的内核版本为4.9+的支持，下面一Linode主机为例进行设置。
首先Linode主机提供的内核版本虽然大于4.9，但是[内核却不完整][5]，并不包含BBR组件，无法直接开启。 所以我们要先安装完整内核（64位），32位可以参考[这篇博客][6]。

```bash
wget -O linux-image-4.9.2-amd64.deb http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.9.2/linux-image-4.9.2-040902-generic_4.9.2-040902.201701090331_amd64.deb
```

然后安装内核

```bash
dpkg -i linux-image-4.9.2-amd64.deb
```

Shut down关机
![](8.jpg)
然后编辑主机
![](9.jpg)
此处内核选择GRUB 2
![](10.jpg)
保存后启动主机。 再用PuTTY登陆到VPS，执行`uname -r`看内核是否是4.9+ 执行

```bash
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
sysctl -p
```

执行

```bash
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control
```

如果结果中都有`bbr`字样即显示，你已成功开启BBR。 执行

```bash
lsmod | grep bbr
```

如果结果中有`tcp_bbr`即说明BBR已成功启动运行。 最后重启 VPS

BBR魔改版：[Debian/Ubuntu TCP BBR 改进版/增强版](https://moeclub.org/2017/06/24/278/)

魔改版还是建议试一下，速度能提升不少。

最后的最后已经没有最后了，至此完完全全的大功告成了，起飞~，我这60M联通看YouTube 1080P还是完全没有问题的。 我的测试对比显示开启BBR能提示30%到50%的速度，这个加速还是很有必要的。

## Shadowsocks使用篇

### PC桌面端

PC客户端可到[shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases)下载，安装好填好你的服务器信息即可。

### Android客户端

Android客户端可到[shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)安装下载。

### iOS客户端

iOS上可供选择的客户端比较多，免费的有Wingy(免费版，有推广信息），6元的有Wingy,18元的有Shadowrocket(功能比Wingy多），更贵的有Potatso 2以及著名的Surge。
安装好应用好后配置好就可以用了，建议加入到Widget,非常方便。 配置时可以扫电脑客户端生成的二维码。

### 使用小技巧

### 手机，电脑等客户端配置

记得把电脑上各种浏览器跟代理相关的插件禁用，要是你IE能翻而Chrome或者Firefox翻不了，十有八九是你的扩展或者代理设置出了问题，改过host的记得还原。手机的话不妨重启试试？iOS平台代理应用的话，免费的有Wingy和6块钱的Wingy还有18块的Shadowrockwt可以用。
代理的模式一般分为两种，一种是全局代理，一种是跟据配置文件来代理，虽然叫法上不同，PC上叫「pac代理」，iOS上叫「配置代理」，Android上有点不同，称为「绕过局域网及中国大陆地址」。
所以，可能你开了代理，有些网站但是还是打不开，不妨试试开全局代理，全局代理有效的话，可以把该域名加入到你的配置文件，以后该域名就会走代理。

## 不常见的问题（主要是关于上面一些技术的选择，跳过完全没有问题）

1. 服务器地址的选择？ 一般来说日本的机房延迟(Ping)低，速度快，但是有些情况会遇到版权问题，比如说 YouTube 视频锁区了，就没法看了。 美国的机房相对于日本机房会比较慢一些。 如果你的 VPS
   提供商有新加坡或者香港的机房可选择，不妨试试，说不定翻墙效果比日本的机房还要好。

2. 关于 Shadowsocks 服务器端的选择？ Shadowsocks 服务器端一般有 Python, libev, Go, Nodejs 等版本。Python 版最成熟，文档最多，但是也是很久没更新了。其他版本各有优点，可自行选择。
   还有一个根据 Shadowsocks 原版协议修改而来的 ShadowsocksR， 但是这个需要专用的客户端，以及有些第三方应用有些支持其特有的特性，有些不支持，所以就不采用这个了。

3. 关于加速方案的选择？ 对于加速方案的选择处于这样的几个要求：
    * 不需要使用专有的客户端
    * 免费或者价格较低
    * 加速效果优秀
      基于这样的考虑，可供选择的方案就剩下BBR加速，锐速、Flash-TCP加速及finalspeed。其中Flash-TCP加速方案，配置起来比较麻烦，参考官网的教程有很多个步骤，加速原理与锐速类似，但效果似乎稍逊一些，所以也就舍弃了。

如果你在自己搭建的过程中遇到什么问题也可以来联系我。

## SSR客户端配置

最近抓翻墙抓的比较严，有一些关于SS被嗅探到的传闻，不管是真是假，SS的隐蔽性已经受到了质疑，提高翻墙的安全性还是有必要的。SSR相比SS有更好的隐蔽性，更加不容易被识别和察觉到。所以客户端也要进行相应的调整和升级。

不过 SSR 作者已经弃坑了，SSR现在处于无人维护的状态，所以其实也不是很建议。

相比SS，SSR除了IP、密码、加密方式选项外，还增加了「协议」和「混淆」两个选项，「协议参数」及「混淆参数」都不用填。

### 客户端选择

Windows：SSR-cshape版，[下载地址](https://github.com/shadowsocksr/shadowsocksr-csharp/releases)
Android：SSR Android版，[下载地址](https://github.com/shadowsocksr/shadowsocksr-android/releases)
iOS：Shadowrocket，Potatso, Potatso Lite OS
X：ShadowsocksX-NG，[下载地址](https://github.com/shadowsocksr/ShadowsocksX-NG/releases)

### 安全建议

安全起见，为了更隐蔽的翻翻翻，有两个建议：

1. 不用国产的安全卫士等软件，有人猜测安全卫士会扫描电脑文件，而IP地址，密码等信息都是明文储存在SS的目录下的。清理电脑垃圾可以用CCleaner，杀毒Win10自带的也足够好用了，不放心还有NOD32，卡巴斯基等国外软件。
2. 要是有不熟悉的人问你SS账号是哪里来的，就说是热心网友分享的。

## TODO

1. 多账户配置
2. Web网页配置

## 感谢及版权声明

反正我对的技术的了解也几乎小白，都是拿Google搜出来的别人的博客，一个一个试，试过有很多不同的方案，各种主机系统，各种加速方案，对比斟酌出这样一个最好最快的解决方案。感谢各位博主给出的方案和操作步骤，对我参考比较大的都又在文章里附了链接。

不接受：不署名、不带原始链接、修改原文以及全文转载的形式转载。

## PS

2017.10.9 GFW 开始大规模封禁 VPS IP，如果你的 SS 突然不可用了，可以到[多个地点 ping - 网络测速 - 站长工具](http://ping.chinaz.com/)去测试你一下你的 VPS IP 还是否能够
ping 的通，如果大面积都 ping 不通了，则表明你的 IP 肯定是被 GFW 认证了，你可以到你的 VPS 提供商那里去申请换一个 还没被 block 的 IP。

[1]:http://www.appinn.com/compare-linode-vs-digitalocean-vs-lightsail-vs-vultr/  "四大 VPS 对比评测：Linode vs. DigitalOcean vs. Lightsail vs. Vultr"

[2]:https://www.linode.com/docs/getting-started/ "Getting Started with Linode"

[3]:https://github.com/shadowsocks/shadowsocks/wiki/%E5%9C%A8-Linode-%E4%B8%8A%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA-Shadowsocks "在 Linode 上快速搭建 Shadowsocks"

[4]:http://pizn.github.io/2012/03/03/vim-commonly-used-command.html "Vim 常用命令总结"

[5]:https://www.mxgw.info/t/linux-kernel-4-9-bbr.html "Linux Kernel 4.9 & BBR"

[6]:https://doub.io/wlzy-15/ "比锐速还强的 TCP拥塞控制技术 —— TCP-BBR 测试及开启教程"
