---
title: Java中的异常与错误
abbrlink: 57291
date: 2019-01-24 18:53:45
tags:
---

## 异常（Exception）与错误（Error）的区别与联系

- Error 类与 Exception 类都是继承于 Throwable 类。
- Error 类一般是指与虚拟机相关的问题，如系统崩溃，虚拟机错误，内存空间不足，方法调用栈溢出等等。对于这类错误，Java 编译器不去检查他们，对于这类错误导致的程序中断，仅靠程序本身无法恢复和预防。
- Exception 类表示程序可以处理的异常，可以捕获且可能恢复。遇到这类异常，应该尽可能去处理异常，使程序恢复运行，而不应该随意终止异常。

## 运行时异常（RuntimeException）与受检查型异常（Checked Exception）

- 运行时异常：其特点是 Java 编译器不去检查它，当程序中可能出现这类异常时，即使没有用 try……catch 捕获，也没有用 throws 抛出，还是会编译通过，但运行时会就终止，如除数为零的 ArithmeticException、错误的类型转换、数组越界访问和试图访问空指针等。处理 RuntimeException 的原则是：如果出现 RuntimeException，那么一定是程序的逻辑出了问题，应该及时修改程序。

- 受检查型异常：这类异常如果没有 try……catch 也没有 throws 抛出，编译是通不过的。这类异常一般是外部错误，例如文件找不到、试图从文件尾后读取数据等，这并不是程序本身的错误，而是在应用环境中出现的外部错误。

## 异常处理方式

- 使用 try..catch..finally 语句进行捕获处理
- 在产生异常的方法声明后面写上 throws 某一个 Exception 类型

### try-catch-finally-return 执行顺序

- 不管是否有异常产生，finally 块中代码都会执行
- 当 try 和 catch 中有 return 语句时，finally 块仍然会执行
- finally 是在 return 后面的表达式运算后执行的，所以函数返回值是在 finally 执行前确定的。无论 finally 中的代码怎么样，返回的值都不会改变，仍然是之前 return 语句中保存的值
- finally 中最好不要包含 return，否则程序会提前退出，返回值不是 try 或 catch 中保存的返回值

## 常见异常种类

### 运行时异常

- `java.lang.ArithmeticException`：算术条件异常。譬如：整数除零
- `java.lang.ArrayStoreException`：将错误的类型储存到对象数组里，例如：

```java
Object x[] = new String[3];
x[0] = new Integer(0);
```

- `java.lang.ClassCastException`：强制类型转换异常，例如：

```java
Object x = new Integer(0);
System.out.println((String)x);
```

- `java.lang.IndexOutOfBoundsException`：索引越界
- `java.lang.NullPointerException`：空指针异常，常见对象没有实例化便引用

### 受检查型异常

- `java.lang.ClassNotFoundException`：无法找到对应的类
- `java.lang.NoSuchMetodException`：无法找到对应的方法
- `java.io.IOException`：输入输出异常

## 参考资料

[谈一谈 Java 中的 Error 和 Exception](https://blog.csdn.net/goodlixueyong/article/details/47122487)
