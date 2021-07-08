---
title: JavaScript基本数据类型
abbrlink: 438
date: 2018-11-20 19:54:52
tags:
---

## Number

### 常规类型

JS 中不区分`int`和`float`，无论是整数还是小数，其类型均为`Number`，在程序内部，`Number`类型的实质是一个 64 位的浮点数，因此 JavaScript 所能表示的数值范围为`±1.7976931348623157e+308`，其最小所能表示的小数为`±5e-324`，这两个边界值可以分别通过访问 Number 对象的 MAX_VALUE 属性和 MIN_VALUE 属性来获取。

参考：[JavaScript 实验：数值范围](http://blog.shaochuancs.com/javascript-number-range/)

### 特殊类型

- `Infinity`：正无穷
- `-Infinity`：负无穷
- `NaN`：非数值

## 字符串类型

字符串类型用来表示文本数据，使用单引号或双引号来包裹起来表明此为字符串。

字符串一旦创建就不能再次修改，但是可以基于对原始字符串的操作来创建新的字符串。

## 布尔类型

布尔类型的值只有两种：`true`和`false`。

null、undefined 在条件判断是都为`false`，其他值都为`true`，包括 0、-0、false、NaN、、或者空字符串（""）。

### 布尔类型比较

## Null 类型

`null`是缺少的标识，指示变量未指向任何对象，可以将`null`理解为尚未创建的对象。注意使用`typeof null`时会返回`object`，这属于历时遗留因素。

## Undefined 类型

一个没有被赋值的变量的类型是 undefined。如果方法或者是语句中操作的变量没有被赋值，则会返回 undefined。
