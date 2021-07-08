---
title: ' Hexo 折腾手记其二：编辑器增强及推荐插件'
tags: Hexo
abbrlink: 31930
date: 2017-08-12 18:05:21
---
## 编辑器增强

### Pull Quote 引用

``` html
{% pullquote [class] %}
content
{% endpullquote %}
```

class 可为 right 或 left。记得去掉中括号。

效果：


{% pullquote right %}
张岱（1597年－1679年），明末清初散文家，字宗子(呼应其岱，泰山，五岳之宗)，又字石公，号陶庵，别号蝶庵居士，山阴（今浙江绍兴）人。
{% endpullquote %}

崇祯五年十二月，余住西湖。大雪三日，湖中人鸟声俱绝。

是日，更定矣，余拏一小舟，拥毳衣、炉火，独往湖心亭看雪。雾凇沆砀，天与云、与山、与水，上下一白。湖上影子，惟长堤一痕、湖心亭一点，与余舟一芥，舟中人两三粒而已。

到亭上，有两人铺毡对坐，一童子烧酒，炉正沸。见余大喜，曰：“湖中焉得更有此人！”拉余同饮，余强饮三大白而别。问其姓氏，是金陵人，客此。

及下船，舟子喃喃曰：“莫说相公痴，更有痴似相公者。


### 多形式引用

更多形式的引用参看官网文档，[Hexo - 标签插件](https://hexo.io/zh-cn/docs/tag-plugins.html#Pull-Quote)。

也可看此处的[效果示范](https://probberechts.github.io/cactus-dark/2013/12/25/tag-plugins/)。


### 显示拼音或日文假名

按照这样的模版配置就好。

``` html
<span lang='ja'><ruby>作画<rp>（</rp><rt>さくが</rt><rp>）</rp></ruby></sapn>
```

显示效果：<span lang='ja'><ruby><rb>作画</rb><rp>（</rp><rt>さくが</rt><rp>）</rp></ruby>

段落显示效果如下：

> <span lang='ja'><ruby>暦<rp>（</rp><rt>こよみ</rt><rp>）</rp></ruby>の上に春は立ちながら厳しい寒さが続いておりますがいかがお過ごしですか？風邪などひいていませんか？<ruby>霜焼<rp>（</rp><rt>しもや</rt><rp>）</rp></ruby>けなどしていませんか？突然の手紙ごめんなさい。まだまだ寒く長い夜のついでに目を通していただければ<ruby>幸<rp>（</rp><rt>さいわ</rt><rp>）</rp></ruby>いです。</span>[^1]


### 插入尾注

安装[Hexo-Reference](https://github.com/quentin-chen/hexo-reference)插件，

使用方式：

![](1.jpg)

使用效果可见上一段的尾注效果。

值得注意的是，在尾注里可以使用很多其他 Markdown 的效果，包括超链接，加粗等等。

还有一点就是这个尾注不能加在小标题上，不然渲染时会报错。

## 推荐插件

这些插件都可以自行选择采用：

博客加密：[hexo-blog-encrypt](https://github.com/MikeCoder/hexo-blog-encrypt)

自动生成RSS：[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

网页插入PDF：[hexo-pdf](https://github.com/superalsrk/hexo-pdf)

自动生成站点地图：[hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)

THML, CSS, JS, 图片优化：[hexo-all-minifier](https://github.com/chenzhutian/hexo-all-minifier)

为文章生成唯一的链接，方便搜索引擎抓取：[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)。不过在使用这个插件时，千万不要在`hexo server`下直接更改 Markdown 文件名，不然会导致文件空白。


[^1]: [最完美的离婚——光生给结夏的信](https://www.bilibili.com/video/av2209482/)