---
title: JavaScript对象基础总结
abbrlink: 63313
date: 2018-12-03 09:30:32
tags: JavaScript
---

## 对象的组成

一个对象由许多的成员组成，每一个成员都拥有一个名字和一个值。每一个名字/值（name/value）对被逗号分隔开，并且名字和值之间由冒号（:）分隔。

对象成员的值可以是任意的，在我们的person对象里有字符串(string)，数字(number)，两个数组(array)，两个函数(function)。前4个成员是资料项目，被称为对象的属性(property)，后两个成员是函数，允许对象对资料做一些操作，被称为对象的方法(method)。

```js
var person = {
  name : ['Bob', 'Smith'],
  age : 32,
  gender : 'male',
  interests : ['music', 'skiing'],
  bio : function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

## 对象的表示方法

### 点表示法

可以使用点表示法(dot notation)来访问对象的属性和方法。对象的名字表现为一个命名空间(namespace)，它必须写在第一位——当你想访问对象内部的属性或方法时，然后是一个点(.)，紧接着是你想要访问的项目，标识可以是简单属性的名字(name)，或者是数组属性的一个子元素，又或者是对象的方法调用。

```js
person.age
person.interests[1]
person.bio()
```

### 中括号表示法

```js
person['age']
person['name']['first']
```

使用中括号表示法的优势在于，点表示法只能接受字面量的成员的名字，不接受变量作为名字，同时中括号表示法可以表示属性名中带有空格的属性。

同时使用中括号时属性名也可以通过计算获得。

### 设置对象成员

```js
person.age = 45
person['name']['last'] = 'Cratchit'
```

直接负值，对于已经存在的属性，则会更新值，不存在的属性则会增加属性。

删除属性：

```js
delete person.age
```

## 判断有无

使用`in`可以判断一个对象是否有某个属性


## 遍历

### for…in…

可以使用`for in`在属性内部进行遍历：

```
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for(let key in user) {
  // keys
  console.log( key );  // name, age, isAdmin
  // values for the keys
  console.log( user[key] ); // John, 30, true
}
```

### Object.keys(obj)

使用 Object.keys(obj) 返回一个包含 key 的数组。

```js
var obj = {
  "name": "Poly",
  "career": "it"
}

console.log(Object.keys(obj));  //[ 'name', 'career' ]

for (let i of Object.keys(obj)) {
  console.log(obj[i]);
}    //Poly  it
```


### Object.getOwnPropertyNames(obj)

用于返回对象的自有属性，包括可枚举和不可枚举的。

```js
var obj = {
  "name": "Poly",
  "career": "it"
}

console.log(Object.getOwnPropertyNames(obj));   //[ 'name', 'career' ]
```
