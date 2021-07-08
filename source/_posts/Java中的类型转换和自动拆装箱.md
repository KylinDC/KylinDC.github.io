---
title: Java中的类型转换和自动拆装箱
abbrlink: 46251
date: 2019-02-16 20:48:06
tags:
---

## 基本类型的自动类型转换和强制类型转换

### 自动类型转换

#### 赋值和方法调用中的类型转换

转换原则：

- 从低位类型到高位类型自动转换。类型排序：byte < short < int < long < float < double
- boolean 类型不与其它类型的值发生转换。

#### 运算中的类型转换

- 基本就是先转换为高位数据类型，再参加运算
- byte short char 运算会转换为 int
- 使用赋值运算符时，系统会自动强制将运算结果转换为目标变量的类型
- 运算符为自动递增运算符（++）或自动递减运算符（--）时，如果操作数为 byte，short 或 char 类型不发生改变；

### 强制类型转换

使用`(int) 变量`的类型将变量强制转换类型，高位向低位强制转换时会有精度损失。

## 引用类型的类型转换

假设有一个 Animal 的类，有一个 Dog 类继承于 Animal 类，语句

```java
Animal animal = new Dog();
```

变量 animal 已经被自动**向上造型**成了 Animal 类型的变量，但是实际上 animal 在内存中的本质还是 Dog 类型，可以通过语句

```java
Dog dog = (Dog)animal;
```

强制转换成 Dog 类型，这就是**向下造型**。

**向下造型**也会有失败的时候，例如：

```java
Animal animal = new Animal();
Dog dog = (Dog)animal;
```

这个系统会抛出 ClassCastException 异常信息，这是因为 animal 的真实身份是 Animal 类型，也就是 Dog 的父类，而不是 Dog 类型，这时的强制转换就会出现错误。

## Java 中的自动拆装箱

Java 中原始类型 byte, short, char, int, long, float, double 和 boolean 对应的封装类为 Byte, Short, Character, Integer, Long, Float, Double 以及 Boolean。

- 自动装箱：将原始类型转换成对应的封装类型
- 自动拆箱：将封装类型转换成对应的原始类型

自动装箱主要发生在两种情况，一种是赋值时，另一种是在方法调用的时候。

注意事项：

- 方法重载时，不会发生自动拆装箱
- 使用`==`对两个对象进行比较时，不会发生自动拆装箱
- 将一个没有初始化的对象拆箱时，会出现`NullPointerException`异常
