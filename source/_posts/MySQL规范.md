---
title: MySQL规范
abbrlink: 37646
date: 2019-05-11 21:02:24
tags:
---

## 通用规范

- 灵活使用缩进和空格增强可读性
- 尽量使用标准的 SQL 函数而不是特定的实现以增强可移植性
- 必要时加入注释，行注释以`--`开头，块注释以`/*·····*/`标记
- 尽量使用 BETWEEN 而不是多个 AND 语句
- 尽量使用 IN()而不是多个 OR 语句

## 命名规范

- SQL 大小写不敏感
- 关键词推荐大写
- 库、表、字段名称推荐全小写，用下划线即`_`分隔开
- 列名尽量为单数
- 表主键统一命名为 id，类型统一为 char(32)
- 表外键建议命名为`主表名_字段名`
- 布尔型字段命名加前缀`is`
- 表示日期时间的字段，都要有后缀，如果只精确到天则以`date`为后缀，如果要精确到时分秒那就用`time`作后缀
- 表应当尽量与列避免同名
- 使用有意义的后缀名，比如：\_id、\_status、\_total、\_num、\_name、\_seq、\_date、\_tally、\_size、\_addr

## 参考：

[数据库设计中的命名规范](https://www.jianshu.com/p/7e60dbd59138)
[SQL 样式指南 · SQL Style Guide](https://www.sqlstyle.guide/zh/)
