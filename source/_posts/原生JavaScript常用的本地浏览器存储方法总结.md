---
title: 原生JavaScript常用的本地浏览器存储方法总结
abbrlink: 31128
date: 2018-12-06 15:51:24
tags:
---
## localStorge

`Storage` 提供了访问特定域名下的会话存储（session storage）或本地存储（local storage）的功能，例如，可以添加、修改或删除存储的数据项。容量为 5MB。

### 属性

Storage.length: 返回一个 Storage 对象中的数据项数量，整数。

### 方法

- Storage.getItem(): 传入键名作为参数，返回键名对应的值。
- Storage.setItem(): 传入键名与值，将键值对添加到存储中，如果键名存在，则会更新其对应的值。
- Storage.removeItem(): 传入键名，并将该键值对从存储中删除。
- Storage.clear(): 清空存储。
- Storage.key(): 传入数值 n，返回存储中的第 n 个键名。

### 注意事项

1. 除了前面提到的方法，还可以用对象的`[]`和`.`方法来读取或赋值。
2. localStorage 会自动将本事转换为字符串形式，可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串，使用JSON.parse()方法，将JSON字符串转换成为JSON对象


## sessionStorage

属性与方法都与 localStorage 类似，但 sessionStorage 只用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。当用户关闭浏览器窗口后，数据立马会被删除。

localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。第二天、第二周或下一年之后，数据依然可用。

## Cookie

[Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

Cookie 的大小被限制在 4kb，只要有请求涉及 cookie, cookie 就要在服务器和浏览器之间来回传送。

document_.cookie = _newCookie; newCookie是一个键值对形式的字符串。需要注意的是，用这个方法一次只能对一个cookie进行设置或更新。

### document.cookie 属性

- expires 属性：来对 cookie 的有效期进行设置，现在已经被max-age属性所取代，max-age用秒来设置cookie的生存期。
- path 属性：它指定与cookie关联在一起的网页。在默认的情况下cookie会与创建它的网页，该网页处于同一目录下的网页以及与这个网页所在目录下的子目录下的网页关联。
- domain 属性：domain属性可以使多个web服务器共享cookie。
- secure 属性：布尔值，指定在网络上如何传输 cookie,默认为 false。

### 写入 Cookie

```
docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
```

- name: 名字，名字相同的会进行覆盖，字符串
- value：值，字符串
- end: 最大年龄的秒数

## 得到 Cookie
```
docCookies.getItem(name)
```
读取一个cookie。如果cookie不存在返回`null`

## 移除 Cookie

```
docCookies.removeItem(name[, path],domain)
```

## 检测 Cookie
```
docCookies.hasItem(name)
```

## 得到所有 Cookie 的列表

```
docCookies.keys()
```
