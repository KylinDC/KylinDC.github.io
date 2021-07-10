---
title: 求全排列中次大数的算法及 Python 实现 abbrlink: 63795 date: 2017-09-27 12:30:39 tags:

- Python
- 编程

---

本来是 Summer 在群里求助一个关于用 Python 求解一个问题，问题的具体描述如图：![](1.png)

就是求数字排列中刚好比给出的数字大的数字，这个数字我们就称其为次大数好了。

## 用纯算法的方式实现

仔细观察给出的示例，再加上多试几次其实可以发现一个规律，简而言之就是：

> 将最后一个数字依次与从右至左进行比较，如果比它小，就与之交换，剩下交换位右边的数字再依次从小到大排列好，如果最右位已经是最小数字，就拿倒数第二位再进行比较，依次类推

所以用 Python 实现这个想法就是：

``` python 
number = input("Enter your number:")
lst = list(number)

# i循环表示需要拿来比较的数的位置，从末尾开始往前走
# j循环表示与之比较的数的位置
# 从i的前一位依次往前走，不断循环直到找到i位置的数比j位置的数大

def get_number(lst):
    for i in range(-1, -len(lst), -1):
        for j in range(i - 1, -(len(lst) + 1), -1):
            if lst[i] > lst[j]:
                return i, j
    print("这已经是最大的数字了！")
    return i, j

a, b = get_number(lst)

# 交换顺序
lst[b + len(lst)], lst[a] = lst[a], lst[b + len(lst)]

# 将后面剩余数字排序
lst = lst[:b + 1] + sorted(lst[b + 1:])

# 将字符连接为字符串
s = "".join(lst)
print(s)
```

用这样的办法可以求出任意输入不含重复数字的次大数，不管是否完备。用了一个函数，是因为我不知道如何跳出两个循环……

## 用全排列法求

在思考这个问题之初，就有想过既然是求一个排列中的数字嘛，那我把排列全部求出来不就好了吗，但是没有想到一个好办法来生成全部的数字，自己能想到就是用一个 9 层的循环来做，实在是太愚蠢了，觉得这样做的代码会很丑陋，而且耗费的资源也会相当多。

后来自己在搜索的时候发现一个名词`全排列`，发现已经有相当多成熟的算法来解决这样的问题，有用递归和不用递归的，最棒的是 Python 居然有成熟的库来生成全排列，Python 果然是对懒人相当友好的。

实现如下：

``` python
import itertools

number = input("Enter your number:")

# 批量将字符转换为数字
tup = tuple(map(int, number))

# 生成全排列
a = list(itertools.permutations(sorted(tup), len(tup)))

# 找到全排列中的索引位置
p = a.index(tup)

# 判断是否为最大值
if p == len(a) - 1:
    print("这已经是最大的数字了")
# 输出结果
else:
    s = list(map(str, a[p + 1]))
    print("".join(s))
```

精炼下来只用了 10 行有效代码，感觉还是挺满意的，实际测试效果速度还可以接受。这种办法同样可以求出任意输入不含重复数字的次大数，不管是否完备。

有兴趣的还可以继续了解生成全排列的各种算法，这里就不展开了。
