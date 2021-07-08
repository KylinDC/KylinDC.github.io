---
title: Hexo 折腾手记其一：使用 Adobe Typekit 云字体 (Web Font)
tags:
  - Hexo
  - 字体
abbrlink: 37189
date: 2017-08-12 18:00:32
---

## 为什么选择使用云字体（Web font）？

使用云字体可以保证博客在任何设备上的显示字体的统一性，缺点就是加载会稍微慢一些。由于 Google Font 在大陆地区访问困难，所以可以选择 Adobe Typekit 云字体。免费的 Adobe Typekit 账户可以添加两个字体，每月页面渲染册数 25,000 次，虽然不多，但作为个人博客用户也足够了。


## 配置方法及步骤

注册 Adobe 账户（如果没有的话） -> 登录 [Adobe Typekit](https://typekit.com) -> 选择右上角 Kits 

![](1.jpg)

 -> 创建新的 Kit -> 填好 Kit 的名字和你的博客域名（建议将`local`也填上） -> 切换到 Adobe Typekit[字体选择页面](https://typekit.com/fonts) -> 分别搜索`Source Han Serif Simplified Chinese`（思源宋简体）和`Source Han Sans Simplified Chinese`（思源黑简体） -> 并将两个都添加至之前所新建的 Kit 当中（确认 Character Set 为 Dynamic Subsetting） -> 在右上角 Kits 中选择你新建的 Kit 进入 Kit 编辑页面 -> 在左侧区域选择字重(建议选择一个字体就行，字重不要超过三个)

![字重选择](2.jpg)

 -> 右下角点`Publish` -> 右上角点`Embed Code` -> 复制出现的代码

![复制框选的代码](3.jpg)

 -> 将其粘贴到`主题文件夹\layout\_partial\head.ejs`文件中，位置见图

![粘贴的位置](4.jpg)

 -> 编辑`主题文件夹\source\css\_variables.styl`文件 -> `source-han-serif-sc`（思源宋）或者`source-han-sans-simplified-c`（思源黑）粘贴在`$font-family-body = `后面（就在第一行附近），也可以更改顺序（如果你知道你在做什么） -> 最后再重新编译发布就好了

## 关于字体和字重的选择

关于字体的选择：Adobe Typekit 中能用的、好用的中文字体也就只有思源黑、思源宋这两个了，建议选择思源黑，因为在大多数 Windows 电脑上，宋体的渲染结果都很辣眼睛。

关于字重的选择：字重选择越多，页面所要加载的文件也就越大，加载速也就越慢，建议不要超过三个，一般包括常规体和粗体就行了。


本文参考了[Hexo Theme - Using Ubuntu Google Fonts](http://jr0cket.co.uk/2014/06/hexo-theme-using-ubuntu-google-fonts.html).