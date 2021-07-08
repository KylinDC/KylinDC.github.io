---
title: SQL索引介绍
abbrlink: 10973
date: 2019-05-09 22:48:30
tags:
---

索引（Index）是一种帮助 MySQL 高效获取数据的数据结构。

## 索引类型

- 普通索引：最基本的索引类型，没有唯一性的限制
- UNIQUE 索引：唯一索引，被索引的字段不能出现重复
- PRIMARY KEY 索引：主键索引，是唯一索引的一种，但每张表中只能出现一个主键索引

## 编辑索引

### 创建索引

1. 创建表时创建索引：

   - INDEX [index_name](<column_name(length)>)
   - UNIQUE [index_name](<column_name(length)>)
   - PRIMARY KEY (column_name(length))

2. ALTER TABLE 修改表来创建索引：

   - ALTER TABLE table_name ADD INDEX index_name (column_list)
   - ALTER TABLE table_name ADD UNIQUE (column_list)
   - ALTER TABLE table_name ADD PRIMARY KEY (column_list)

3. 直接创建索引，此方法不可创建主键索引
   - CREATE INDEX index_name ON table_name (column_list)
   - CREATE UNIQUE INDEX index_name ON table_name (column_list)

### 删除索引

可利用 ALTER TABLE 或 DROP INDEX 语句来删除索引

- DROP INDEX index_name ON talbe_name
- ALTER TABLE table_name DROP INDEX index_name
- ALTER TABLE table_name DROP PRIMARY KEY

### 查看索引

- SHOW INDEX FROM table_names
- SHOW KEYS FROM table_name

## 选择索引时注意事项

1. 较频繁的作为查询条件的字段应该创建索引以增加查询性能
2. 唯一性太差的字段不适合单独创建索引，即使频繁作为查询条件
   > 唯一性指不重复的索引值与表记录数的比值，唯一性差则选择的效率低
3. 更新非常频繁的字段不适合创建索引
   > 更新字段时同时还会更新索引，如果字段更新过于频繁，将会带来过多的额外性能和空间消耗
4. 不会出现在 WHERE 子句中的字段不该创建索引

## 参考

- [MYSQL-索引](https://segmentfault.com/a/1190000003072424)
- [索引的利弊与如何判定，是否需要索引](http://book.51cto.com/art/200906/132452.htm)
