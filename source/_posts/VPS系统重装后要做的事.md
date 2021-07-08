---
title: VPS系统重装后要做的事
abbrlink: 27311
date: 2019-06-08 13:58:36
tags:
---

## BBR 加速脚本

```bash
wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
```

## 设置 Python3 为默认版本

```bash
update-alternatives --install /usr/bin/python python /usr/bin/python2 1
update-alternatives --install /usr/bin/python python /usr/bin/python3 2
```

## 扩大搬瓦工的 Swap 空间

```bash
## 定位到根目录
cd ~/..

## 删除原有的Swap空间
rm swap
rm swapfile

## 创建并格式化新的Swap空间
dd if=/dev/zero of=/swapfile bs=1M count=1024
mkswap /swapfile

## 启动新的Swap空间
swapon /swapfile
```

## 安装 Pi-hole

```bash
curl -sSL https://install.pi-hole.net | bash
```


## 安装V2Ray一键脚本

bash <(curl -s -L https://raw.githubusercontent.com/233boy/v2ray/master/install.sh)

选择websocket+TSL

要是脚本失效了 github上还有备份（切换分支即可见）


- [如何在 Ubuntu 20.04 上设置或者修改时区](https://zhuanlan.zhihu.com/p/)138831041
- [v2ray-agent](https://github.com/mack-a/v2ray-agent)