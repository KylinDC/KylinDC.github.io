---
title: Java中的类、抽象类和借口之间的异同
abbrlink: 43519
date: 2019-01-29 19:41:22
tags:
---

## 接口的一些特性

- 接口中不能有构造方法
- 接口中的所有方法都会被自动声明为`public`，且只能为`public`
- 接口中定义的`变量`会自动转换为`public final static`，即为**常量**，必须被显式的初始化
- 接口中的所有方法都是抽象方法，不能包含实现的方法，也不能包含静态方法
- 实现接口的非抽象类必须实现接口的**所有**方法，而抽象类则不需要
- 一个类可以实现多个接口

## 抽象类的一些特性

- 抽象类不能被实例化，但可以有构造函数
- 抽象方法必须由子类进行重写
- 只要包含一个抽象方法的类，就必须定义为抽象类，不管是否还包含其他方法
- 抽象类中可以包含具体的方法，也可以不包含抽象方法
- 抽象类可以包含普通成员变量，其访问类型可以任意
- 抽象类也可以包含静态成员变量，其访问类型可以任意
- 子类中的抽象方法不能与父类的抽象方法同名
- abstract 不能与 private、static、final 或 native 并列修饰同一个方法
- 一个类只能继承一个抽象类

## 接口与抽象类的区别

- 抽象类：被继承体现的是：”is a”的关系。抽象类是对类的抽象，抽象类所体现的是一种继承关系，即父类和派生类在概念本质上应该是相同的。
- 接口：被实现体现的是：”like a”的关系。接口是对动作的抽象，并不要求接口的实现者和接口定义在概念本质上是一致的， 仅仅是实现了接口定义的契约而已。

## 参考资料

- [java 提高篇（四）-----抽象类与接口](https://blog.csdn.net/chenssy/article/details/12858267)
- [抽象类和接口的区别](https://juejin.im/entry/59b0a3556fb9a0248a4023d0)
- [Java 基础篇(一)：接口与抽象类](https://www.jianshu.com/p/2b5a9bdcd25f)
- [Java 抽象类与接口的区别](http://www.importnew.com/12399.html)
- [Java 基础 接口和抽象类](https://www.jianshu.com/p/eb77a2e64fda)
