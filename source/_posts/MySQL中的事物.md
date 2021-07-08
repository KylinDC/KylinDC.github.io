---
title: MySQL中的事务
abbrlink: 21282
date: 2019-05-10 10:22:10
tags:
---

## 事务的概念

数据库事务是指单个逻辑工作单元执行的一系列操作，要么完全执行要么完全不执行。

### 事务的 ACID 四个特性

- 原子性：事务包含的操作要么全部成功，要么全部失败，不会存在部分成功。
- 一致性：事务执行前后数据库都会处于一致的状态，即没有破坏数据库的完整性约束。
- 隔离性：数据库进行事务并发操作时，多个事务之间相互隔离，不会有所干扰。
- 持久性：事务一旦被提交之后，将会对数据库中的数据产生永久性的影响，即使数据库出现故障也不会丢失。

## 事务的操作命令

- BEGIN/START TRANSACTION：开启一个事务
- COMMIT/COMMIT WORK：提交事务，使得对数据库的修改成为永久性的
- ROLLBACK/ROLLBACK WORK：恢复到上个 COMMIT 或保存点的状态
- SAVEPOINT savepoint_name：设置保存点，保存点将在事务处理完成（执行一条 ROLLBACK 或 COMMIT）后自动释放
- RELEASE SAVEPOINT savepoint_name：删除特定的保存点
- ROLLBACK TO savepoint_name：回滚到特定的保存点
- SET TRANSACTION：用来设置事务的隔离级别

## 参考

- [理解事务 - MySQL 事务处理机制](https://www.jianshu.com/p/bcc614524024)
- [『浅入深出』MySQL 中事务的实现](https://draveness.me/mysql-transaction)
- [菜鸟学院 - MySQL 事务](https://www.runoob.com/mysql/mysql-transaction.html)
- [极客学院 - SQL 事务](https://wiki.jikexueyuan.com/project/sql/transactions.html)
