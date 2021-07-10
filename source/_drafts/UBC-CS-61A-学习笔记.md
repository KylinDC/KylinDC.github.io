---
title: UBC CS 61A 学习笔记 abbrlink: 29821 date: 2018-10-25 19:57:31 tags:
---

## 调用函数表达式来作为判断条件时，所有的子运算符都会被执行

Warning: when call the expression as the judgement, all the subexpression would be executed

see the detail: [if Function VS Statement](https://cs61a.org/hw/sol-hw01/#q4)

## repr() 与 eval()

eval()：将字符串解析为可以运算的表达式并返回计算结果 带来极大的灵活性的同时也带来安全隐患—————注入，需要随时控制好作用域

repr()：eval()的逆操作
