---
title: Git学习笔记
abbrlink: 8520
date: 2018-11-21 22:05:27
tags:
---

## Commit message 格式化

> 参考 [如何写好 git commit message](https://www.cnblogs.com/deng-cc/p/6322122.html)

每次提交，Commit message 都包括两个核心部分：标题 和 内容。

```
<类型>(可选): <主题>
2
// 空一行
3
<内容>
```

其中，标题 是必需的，内容无需过多描述的话，正文内容部分可以省略。

不管是哪一个部分，任何一行都不得超过 72 个字符（或 100 个字符）。这是为了避免自动换行影响美观。

### commit 标题

标题部分只有一行，包括字段：类型 和 主题。

标题限制总字数在 50 个字符以内，以保证容易阅读。

```
feat: init LearnGit.git
I got a wrong-style git commit, so I init a .git for learning
how to write a git commit message in right way.
And the last line just write here for a simple test,
it's useless acturally.
```

#### 标题类型

`类型`用于说明 commit 的类别，只允许使用下面 7 个标识。

- init：项目初始化（用于项目初始化或其他某种行为的开始描述，不影响代码）
- feat：新功能（feature）
- add: 增加
- fix：修补 bug
- docs：文档（documentation）
- opt：优化和改善，比如弹窗进行确认提示等相关的，不会改动逻辑和具体功能等
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- save：单纯地保存记录
- other：用于难以分类的类别（不建议使用，但一些如删除不必要的文件，更新.ignore 之类的可以使用）

（可选）类型后面可以加上括号，括号内填写主要变动的范围，比如按功能模块分，某模块；或按项目三层架构模式分，分数据层、控制层之类的。 #：表示模块

- #student --> 表示 学生模块 （具体的模块开头字母小写，驼峰命名）
- #ALL --> 表示 所有模块 （特殊含义如 ALL 表所有，MOST 表大部分，用大写字母表示）
- #MOST --> 表示 大部分模块

e.g. feat(#student): 新增添加学生的功能 —— 表示 student 模块新增功能，功能是添加学生

#### 标题主题

主题 是 commit 目的的简短描述，不超过 50 个字符。

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### commit 内容

内容部分是对本次 commit 的详细描述，可以分成多行，正文在 72 个字符处换行。

使用正文解释是什么(what)和为什么(why)，而不是如何做，以及与以前行为的对比。

于是可以这样写：
balabala : balabala

what:
balabala

why:
balabala
