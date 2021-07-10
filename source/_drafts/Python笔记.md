---
title: Python 笔记 tags:

- Python
- 编程 abbrlink: 4183 date: 2017-07-15 22:41:33

---

## 文件操作

### 批量操作文件夹内文本文件

今天是像拿实验数据练手，来试一试Python的操作。关于文件处理的主要的一个需求是要批量删除CSV文件中的特定行。

网上搜索了一下，对于我的实验数据这类小文件，大致的一个思路就是将文件读取为list，然后再切片操作，然后再写入新的文件。比如百度知道的这个回答[python怎么删除txt文本里面的第一行？](https://zhidao.baidu.com/question/583049390.html)

``` Python
fin=open('a.txt')
a=fin.readlines()
fout=open('newa.txt','w')
b=''.join(a[1:])
fout.write(b)
fin.close()
fout.close()
```

思路倒也是不复杂，不过可以写得更Pythonic一些。

``` Python
with open(file, 'r+') as fin:
    a = fin.readlines()
    with open(file, 'w') as fout:
        fout.writelines(a[23:])    #这里是删除前23行
```

注意到这种方法并没有像前面用的那样新建一个文件，直接打开写入的还是源文件，我也是偶然发现的，居然这样也行。没出现什么问题我也就没有去深究了。

再在前面加上一些系统目录相关的就能批量操作同Python文件文件夹里所有的文件了。

``` Python 
import os

path = os.getcwd()    # 读取当前目录
files = os.listdir(path)    # 读取当前目录文件夹所有文件
```

TODO: 没有想出一个好办法来判断求出要删除的行

2017/7/15

### 将字典写入CSV文件

在网上搜出来写入CSV文件真的是很麻烦，用引用好多个不同的变量，而且经常出错，在StackOverFlow看到一个清晰易懂的解决办法，特测记录下来

``` Python
with open(Filename, 'w', newline='') as csvFile:
	writer = csv.writer(csvFile)
	for key, value in Data.items():
		writer.writerow([key, value])
```

真是感受到了Python的哲学，简单，可读性高

2017/7/19

## 数据可视化

### 绘图标记点

TODO: 根据CSV文件画出的图，自动在图上标记出最大值点以及最大值。

2017/7/15

### 正常显示 matplotlib 中文

``` Python
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
```

### 使用 matplotlib 经典配色

如果升级了 matplotlib 2.x 版本，想要使用 1.x 时代的经典配色话可以使用

```python
mpl.style.use('classic')
```

果然还是经典配色比较适合在学术使用

参考[matplotlib 2.0 默认样式的变更](http://blog.leanote.com/post/forrid/matplotlib-2.0-%E6%96%B0%E5%A2%9E%E5%8A%9F%E8%83%BD)

### 在 matplotlib 中自定义字体

```python
font = {'family': 'Times New Roman',
        'weight': 'regular',
        'size': 16}
mpl.rc('font', **font)
```

### 带误差棒的图片绘制

``` Python
plt.errorbar(x, y, yerr)
```

### 散点图绘制

``` Python
plt.scatter(c, b[i], label=str(t) + ' N')
```

2017/7/19

## 重命名文件

```python
os.rename(os.path.join(path, file), os.path.join(path, newname))  //重命名文件
```

## Numpy & Pandas

2017/7/19
