---
title: JavaScript学习笔记
abbrlink: 20244
date: 2018-11-22 12:40:58
tags:
---

## 坑多水深

### 不可变的原始值与可变的对象引用

[理解 JavaScript：不可变的原始值与可变的对象引用](http://laichuanfeng.com/study/javascript-immutable-primitive-values-and-mutable-object-references/)
[让人犯晕的 JavaScript 变量赋值](http://hellobug.github.io/blog/javascript-variable-assignment/)

### [基本字符串和字符串对象的区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#基本字符串和字符串对象的区别)

字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。JavaScript 会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。

### 浅拷贝

例如 Array 的 concat 方法：
concat 方法不会改变 this 或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

- 对象引用（而不是实际对象）：concat 将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
- 数据类型如字符串，数字和布尔（不是 String，Number 和 Boolean 对象）：concat 将字符串和数字的值复制到新数组中。

## 块级作用域

### 什么是块级作用域

块级作用域即`{}`内的作用域，但是在 for 判断语句中，for 后面的内容也属于块级作用域，块级作用域的声明有 let 和 const 两种。外层作用域无法读取内层作用域的变量。

ES6 中，明确运行在块级作用域中声明函数（例如在 try…catch…中），同时还规定，在块级作用域中，函数声明的行为类似 let, 在块级作用域之外不可引用。ES6 中，函数声明会提升到函数作用域的头部。

### var 声明和 let 声明，const 声明的区别

var 作用于函数作用域，可以重复声明，在作用域运行的初期就会被声明变量，但是不会被赋值，这被称为变量提升，此时内层变量有可能会覆盖外层变量。

let const 作用于块级作用域，在同一作用域内不能重复声明，即内层变量可以声明同名外层变量，声明的变量不会覆盖上级同名的变量。无变量提升，存在临时死区。

const 声明的同时需要赋值，且不能重复赋值，如果声明的是对象的话，可以修改对象或者数组的内容，若需定义的对象或者数组的内容也不变化，可以使用 object.freeze(arr)进行冻结。冻结指的是不能向这个对象或数组添加新的属性，不能修改已有属性的值，不能删除已有属性。

同时注意**不能在函数内部重新声明参数**：

```html
function func(arg) { // 报错 let arg; } function func(arg) { // 不报错 { let
arg; } }
```

### 临时性死区

若块作用域中存在 let 和 const 指令，则它们声明的变量，从一开始就形成了封闭作用域，它所声明的变量就绑定到这个区域，不再受外部的影响。使用 let 命令声明变量之前，该变量都是不可用的（不可获取，不可使用等），这称为“临时性死区”。凡是在声明之前就使用这些变量，就会报错。例如：

```
var i= 6;
if (i > 5) {
    i = 3; // 报错
    let i;
}
```

## 字符串

### indexOf()

str.indexOf(searchValue[, fromIndex])：返回调用 String 对象中第一次出现的指定值的索引，开始在 fromIndex 进行搜索，区分大小写。如果未找到该值，则返回-1。

奇怪的技巧：使用 indexOf()来统计字符串中字母出现的次数。在下例中，设置了 count 来记录字母 e 在字符串 str 中出现的次数：

```javascript
var str = "To be, or not to be, that is the question.";
var count = 0;
var pos = str.indexOf("e");

while (pos !== -1) {
  count++;
  pos = str.indexOf("e", pos + 1);
}

console.log(count); // displays 4
```

### lastIndexOf()

str.lastIndexOf(searchValue[, fromIndex]): 返回指定值在调用该方法的字符串中**最后出现的位置**，如果没找到则返回 -1。从该字符串的**后面向前查找**，从 fromIndex 处开始。

```
"canal".lastIndexOf("a")   // returns 3
"canal".lastIndexOf("a",2) // returns 1
"canal".lastIndexOf("a",0) // returns -1
```

### slice()

str.slice(beginSlice[, endSlice])：方法提取一个字符串的一部分，不修改原字符串，并返回一新的字符串。

slice() 提取的新字符串包括 beginSlice 但**不包括 endSlice**。

若参数中有负值时，会被当做 sourceLength + beginSlice/endSlice 看待，即最后一个字符的索引为`-1`。endSlice 值为空时，默认索引到字符串末尾。

### split()

str.split([separator[, limit]]): 方法使用指定的分隔符字符串将一个 String 对象分割成**字符串数组**，以将字符串分隔为子字符串，以确定每个拆分的位置。separator 将会被删除，limit 表示返回的数量限制。若 separator="", 则返回每一个字符。

### toLowerCase() & toUpperCase()

转换大小写，皆返回新的字符串。

### replace()

str.replace(substr, newSubStr)，注意是返回新的字符串，原字符串不会变化

### substr()

str.substr(start[, length])：在字符串中抽取从 start 下标开始的指定数目的字符。其返回值为一个字符串，包含从 str 的 start（包括 start 所指的字符）处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。另外如果 start 为负数，则表示从字符串尾部开始算起。

### includes()

str.includes(searchString[, position]): 要在此字符串中搜索的字符串。position 可选, 从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 0。如果当前字符串包含被搜寻的字符串，就返回 true；否则返回 false。

### startsWith()

str.startsWith(searchString [, position]): 判断字符串的起始位置是否匹配其他字符串中的字符。
str.endsWith(searchString [, position]):

### trim()

trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。

### valueOf()

valueOf() 方法返回一个 String 对象的原始值（primitive value）。

使用 String() 方法将其它对象转化为字符串可以被认为是一种更加安全的做法，虽然该方法底层使用的也是 toString() 方法，但是针对 null/undefined/symbols，String() 方法会有特殊的处理

### charAt() charCodeAt() str[]

str.charAt(index) 返回 index 位置的字符，str[index] 也可以返回 index 位置的字符。 str.charCodeAt(index) 返回 index 位置字符的 Unicode 编码。

index 均不可以为赋值。

## 数组

[js 数组方法全面总结](https://www.jianshu.com/p/a339893df4aa)

### toString()

arr.toString(): 对于数组对象，toString 方法连接数组并返回一个字符串，其中包含**用逗号分隔**的每个数组元素。当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

### join()

arr.join("separator"): 如果省略()，数组元素用逗号分隔。默认为 ","。如果 separator 是空字符串("")，则所有元素之间都没有任何字符。如果 arr.length 为 0，则返回空字符串。如果元素是 undefined 或者 null， 则会转化成空字符串。

join()方法不会改变原数组。

### push() pop() shift() unshift()

皆为修改原数组，删除元素时，会返回元素。

### slice()

arr.slice([begin], [end])，**不修改元数组**，返回一个浅复制原数组中额元素的一个新数组。原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），例如 Object()对象，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
- 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

### splice()

array.splice(start[, deleteCount[, item1[, item2[, ...]]]]): 从 start 位置开始，删除 deleteCount 个数量的元素，然后将后面的 item\* 填入 start 位置。返回被删除的元素。

注意这个方法**会对原数组进行修改**。

### 数组的访问

虽然数组的元素可以看作是数组对象的属性，但是却不能用 `.` 操作符来访问元素。并不是 JavaScript 数组有什么特殊之处，而是因为在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号。比如，如果一个对象有一个名为 3d 的属性，那么只能用方括号来引用它。下面是具体的例子：

```
var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
console.log(years.0);   // 语法错误
console.log(years[0]);  // √

renderer.3d.setTexture(model, 'character.png');     // 语法错误
renderer['3d'].setTexture(model, 'character.png');  // √
```

### Array 的构建

#### new Array()

构建新的数组对象

#### Array.of() & Array()

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

Array.of() 和 Array() 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为 7 的空数组（注意：这是指一个有 7 个空位的数组，而不是由 7 个 undefined 组成的数组）。

```
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

#### Array.from()

Array.from(arrayLike[, mapFn[, thisArg]])：arrayLike
想要转换成数组的伪数组对象或可迭代对象。mapFn (可选参数)
如果指定了该参数，新数组中的每个元素会执行该回调函数。thisArg (可选参数)可选参数，执行回调函数 mapFn 时 this 对象。

Array.from() 可以通过以下方式来创建数组对象：

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
- 可迭代对象（可以获取对象中的元素,如 Map 和 Set 等）

数组去重合并:

```
function combine(){
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));   //[1, 2, 3]
```

### Array.concat(arr1, arr2, ...)

可以同时连接多个数组，不修改原数组，所以`[].concat(arr1, arr2)`和`arr1.concat(arr2)`的效果是一样的。

只是浅拷贝，会保留元素的引用。

### indexOf() & lastIndexOf()

与 String 的 indexOf() & lastIndexOf()方法一致

### includes()

arr.includes(searchElement, fromIndex)：返回 true of false

### Array.forEach()

[Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
forEach() 方法对数组的每个元素执行一次提供的函数。

```
var array = ["ab", 'cd'];
let firstLetterUpperCase = [];
array.forEach(function(item) {
  firstLetterUpperCase.push(item[0].toUpperCase())
});
console.log(firstLetterUpperCase);
```

### reverse()

arr.reverse() 颠倒数组元素的顺序，修改原数组

颠倒字符串的顺序

```
let str = "abcdefg";
console.log(Array.from(str).reverse().join("")); //gfedcba
// console.log(str.split("").reverse().join("")); //gfedcba   或者可以这样写
```

### sort()

arr.sort([compareFunction]): compareFunction 为可选参数，用来指定按某种顺序进行排列的函数。如果省略，元素按照**转换为的字符串**的各个字符的 Unicode 位点进行排序。返回排序后的数组。请注意，数组已原地排序，并且不进行复制。
比较函数的格式如下：

```
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  else if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```
