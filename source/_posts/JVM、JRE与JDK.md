---
title: JVM、JRE与JDK
abbrlink: 36121
date: 2019-01-19 16:09:18
tags:
---

## JVM(Java Virtual Machine)Java 虚拟机

JVM 是整个 java 实现跨平台的最核心的部分，所有的 java 程序会首先被编译为.class 的目标字节码，这种目标字节码文件在虚拟机上执行时，把字节码解释成具体平台上的机器指令执行，因此 Java 可以稳定安全的实现跨平台。

## JRE(Java Runtime Environment) Java 运行环境

JRE 包含了 JVM 与 java 基础类库，是使用 java 语言编写的程序运行所需要的软件环境，提供给想运行 java 程序的用户使用的。

## JDK(Java Development Kit) Java 开发工具包

是提供给开发人员开发 java 程序所需的开发工具包。JDK 包含了 JRE，同时还包含了编译 java 源码的编译器 javac 和打包器等工具，还包含了很多 java 程序调试和分析的工具：jconsole，jvisualvm 等工具软件，以及编写 java 程序所需的文档和 demo 例子程序。

![](java.jpg)

我们开发的实际流程是：我们利用 JDK（调用 JAVA API）开发了属于我们自己的 JAVA 程序后，通过 JDK 中的编译程序（javac）将我们的文本 .java 文件编译成 JAVA 字节码，在 JRE 上运行这些 JAVA 字节码，JVM 解析这些字节码，映射到 CPU 指令集或 OS 的系统调用。
