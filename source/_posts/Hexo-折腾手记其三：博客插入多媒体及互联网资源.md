---
title: Hexo 折腾手记其三：多媒体及互联网资源插入博客
tags: Hexo
abbrlink: 53723
date: 2017-08-12 18:08:43
---
## 插入图片

为了方便文章插图管理，首先在 `_config.yml` 中将 `post_asset_folder` 设为 `true` 后，

``` yml
post_asset_folder: true
```

Hexo 会在以后的新建文章时就会自动在与文章同一文件夹下新建与文章同名的文件夹，将文章的所有插图发在此文件夹里，就使用相对路径引用图片资源了。

``` markdown
![](image.jpg)
```

不过这只是Markdown的引用方式，图片只会在文章中显示而不会在首页中显示，若希望图片在文章和首页中都正常显示，需要使用标签语法。

``` html
{% asset_img example.jpg This is an example image %}
```

以上内容参考Hexo官方文档[Hexo 官方文档-资源文件夹](https://hexo.io/zh-cn/docs/asset-folders.html)。

## 插入视频

### 使用 HTML5 video 标签插入

``` html
<video src="example.mp4" height=498 width='100%' controls="controls">
</video>
```

使用效果如下：
<video src="example.mp4" height=498 width='100%' controls="controls">
</video>

更多参数设置请参考[W3school-HTML `<video>` 标签](http://www.w3school.com.cn/tags/tag_video.asp)。

### 使用 HTML5 iframe 标签插入

``` html
<iframe src="example.mp4" height=360 width='100%' controls="controls" allowfullscreen></iframe>
```

效果如下：

<iframe src="example.mp4" height=360 width='100%' frameborder=0 controls="controls" allowfullscreen></iframe>

更多参数设置请参考[W3school-HTML `<iframe>` 标签](http://www.w3school.com.cn/tags/tag_iframe.asp)。

注意以上两个标签都可以通过参数 `height` 和 `width` 来控制大小。

### 通过 hexo-dplayer 插件插入视频

首先安装 [**Dplayer**](https://github.com/NextMoe/hexo-tag-dplayer)插件，通过以下方式使用插件：

``` html
{% mmedia "dplayer" "url=example.mp4" %}
```

效果如下：

{% mmedia "dplayer" "url=example.mp4" %}

这种方式使用起来最快捷、最方便，而且功能也很强大。

### 视频格式注意事项

并非所有的视频格式都被浏览器所支持，以下表格参考[W3cshool](http://www.w3school.com.cn/html5/html_5_video.asp):

| 格式 | IE | Firefox | Opera | Chrome | Safari |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ogg | No | 3.5+ | 10.5+ | 5.0+ | No |
| MPEG-4 | 9.0+ | No | No | 5.0+ | 3.0+ |
| WebM | No | 4.0+ | 10.6+ | 6.0+ | No |

正是由于格式的限制，所以还是推荐用插入视频网站外链的方式来插入视频，具体见后面的文章。

## 插入音频

### 可以通过 HTML5 标签插入

``` html
<audio src="Tune for a Found Harmonium.mp3" controls="controls">
</audio>
```

效果如下
<audio src="Tune for a Found Harmonium.mp3" controls="controls">
</audio>
.

### 通过 hexo-aplayer 插件插入

首先安装 [Aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 

通过以下方式插入音频：

```
{% mmedia "aplayer" title author url %}
```

使用效果如下：

{% mmedia "aplayer" "Tune for a Found Harmonium" "Phil Coulter" "Tune for a Found Harmonium.mp3" %}

### 音频的格式限制

同样，浏览器对音频也有严重的格式限制，具体参考[W3school](http://www.w3school.com.cn/html5/html_5_audio.asp)如下：

| 格式 | IE 9 | Firefox 3.5 | Opera 10.5 | Chrome 3.0 | Safari 3.0 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Ogg Vorbis |  | √ | √ | √ |  |
| MP3 | √ |  |  | √ | √ |
| Wav |  | √ | √ |  | √ |


可见音频插入效果有多糟糕，所以同样还是推荐使用互联网服务吧。

## 插入互联网资源

### 插入B站外链

使用下面的模版

``` html
<iframe src="https://www.bilibili.com/html/html5player.html?aid=6128931&cid=12758570&as_wide=1" width="100%" height="410" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
```

注意事项：
1. 右键你想插入的B站视频页面，选择查看网页源代码，然后`Crtl+F`搜索`cid`，大概在410行左右，就可以找到`aid` 和 `cid` 两个参数，然后替换进上述模版。
2. 参数`&as_wide=1`会使视频自动隐藏侧边栏，但会在移动设备上显示不正常，所以视情况取舍加或不加。

使用效果如下：

<iframe src="https://www.bilibili.com/html/html5player.html?aid=6128931&cid=12758570&as_wide=1" width="600" height="410" frameborder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowfullscreen='true' frameborder="0"></iframe>

### 插入网易云音乐歌曲或歌单外链

找到歌单或歌曲播放页面，点击`生成外链播放器`，选择好尺寸后，再把代码粘贴好就行了。


``` html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=411315632&auto=0&height=66"></iframe>
```

效果如下：

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=411315632&auto=0&height=66"></iframe>

### 插入 YouTube 

视频页面 -> 分享视频 -> 嵌入 -> 选择开始时间（可选） -> 复制 -> 粘贴进文档

复制后的模版如下：

``` html
<iframe width="560" height="315" src="https://www.youtube.com/embed/NasyGUeNMTs" frameborder="0" allowfullscreen></iframe>
```

或者参考 Hexo 官方文档，用如下方式也可以：

```
{% youtube video_id %}
```
`video_id`就是 YouTube 播放页面地址最后一点奇奇怪怪的字母数字组合。

两种方式效果都差不多，可能第二种自适应网页的程度会更高一些，因为不用手动调大小。

效果如下：

{% youtube NasyGUeNMTs %}


### 插入推文

#### 推特提供的方式

要插入的推文 -> 右上角倒三角形 -> 嵌入推文 -> 复制代码 -> 粘贴

``` html
<blockquote class="twitter-tweet" data-lang="zh-cn"><p lang="und" dir="ltr"><a href="https://t.co/C6x4eJxbOM">https://t.co/C6x4eJxbOM</a> <a href="https://t.co/4K0XiH2kX2">pic.twitter.com/4K0XiH2kX2</a></p>&mdash; not Jony Ive (@JonyIveParody) <a href="https://twitter.com/JonyIveParody/status/896027465889587200">2017年8月11日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
```

#### Hexo-Twitter 插件方式

安装插件：[Hexo-Twitter](https://github.com/tea3/hexo-tag-twitter)
按如下方式应用推文

```
{% twitter tweet-url %}
```

两种方式使用效果一致:
```
{% twitter https://twitter.com/JonyIveParody/status/896027465889587200 %}
```

### 插入 Instagram

#### 使用 Instagram 提供的内嵌

要分享的帖子的页面 -> 右下角更多 -> 内嵌 -> 复制嵌入码 -> 粘贴嵌入码

#### 使用 Hexo-Instagram 插件

安装 [Hexo-Instagram 插件](https://github.com/tea3/hexo-tag-instagram)

再使用以下方式插入：

``` html
{% instagram post-url %}
```

除了使用要插入的页面的 URL 作为`post-url`之外，还可以使用 URL 中独特的那几个奇奇特特的代码作为`post-url`。

两种方式效果都一样，如下：

```
{% instagram 3LcFY5Niia %}
```

## 总结及注意事项

总结起来基本就是有两种方法，

1. 使用网站提供的内嵌方式，一般社交网站都会提供内嵌的的代码
2. 使用 Hexo 插件

一般来说使用插件会更加简单直观，在插入之前不妨搜一搜是否有对应的插件，要是没有再考虑社交网站提供的方式。

比如 Vimeo, SoundCloud 等都是可以引用的。

还有一个注意事项就是，要是你的博客开启了`Https`，而你要插入的内容却不是`Https`的，这样情况下，Chrome 会为了安全考虑而不会显示你插入的内容。
