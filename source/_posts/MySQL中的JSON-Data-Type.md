---
title: MySQL中的JSON Data Type
abbrlink: 48363
date: 2019-05-05 14:50:00
tags:
---

## CHAR 与 VARCHAR 的区别

### 长度上

- CHAR 类型使用固定长度进行存储，范围为 0~255，多余长度空间会被以空格补齐，检索是尾部空格会被去除
- VARCHAR 类型保存可变的长度字符串，范围为 0~65535，除了实际的长度外，还有一个或两个额外的字节来标识字符串长度，

### 应用上

- CHAR 经常用于保存长度相对固定的值，比如 IP 地址或者 MD5 之类的数据。
- VARCHAR 用来保存保存长短不一的列

### 参考

[MySQL 字符数据类型 char 与 varchar 的区别](http://seanlook.com/2016/04/28/mysql-char-varchar-set/)
[MySQL 深入剖析 char varchar 类型，有了 VARCHAR，为什么还要有 CHAR？](https://www.jianshu.com/p/85ada7b1dbab)

## MySQL 中的 JSON Data Type

### 能够储存为的 JSON 值的格式

- JSON 数组：被 `[]` 框住，由逗号分隔的值的列表；
- JSON 对象：被`{}`框住，由逗号分隔的键值对的列表，键的类型必须为字符串。

能够储存的类型包括字符串，数字，时间，布尔值。同时，两种类型的还可以嵌套，比如：

```json
[99, {"id": "HK500", "cost": 75.99}, ["hot", "cold"]]
{"k1": "value", "k2": [10, 20]}
```

可以使用 JSON_OBJECT，JSON_ARRAY 来生成 JSON 格式的数据。

## JSON 值的查询

使用`JSON_EXTRACT`函数来查询 JSON，第一个参数为要查询的值，第二个参数中使用前导\$字符代替要查询的值。JSON_EXTRACT 函数还有别名 ->。

```sql
SELECT JSON_EXTRACT('{"id": 14, "name": "Aztalan"}', '$.name');
```

## JSON 值的索引

- JSON 数组：使用`[]`与序号下标的组合，`last`代表最后一个值的索引位置
- JSON 对象：使用`.`操作符

## JSON 值的修改

- JSON_INSERT 函数只会把属性添加到对象中，前提是需要添加的属性在对象中还不存在。
- JSON_REPLACE 函数只会更新对象中已经存在的属性。
- JSON_SET 函数在属性存在时对属性进行更新，否则就将属性添加到对象中。

## JSON 值的删除

JSON_REMOVE 函数指定在输出某个 JSON 属性
