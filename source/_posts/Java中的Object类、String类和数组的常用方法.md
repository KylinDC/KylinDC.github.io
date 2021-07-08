---
title: Java中的Object类、String类和数组的常用方法
abbrlink: 16025
date: 2019-02-17 16:56:57
tags:
---

## Object 类常用方法

- equals()：返回是否相等，默认比较内存地址是否相等，一般需要根据情况重写，重写时需要满足以下原则：

  - 自反性（reflexive）。对于任意不为 null 的引用值 x，x.equals(x) 一定是 true。
  - 对称性（symmetric）。对于任意不为 null 的引用值 x 和 y ，当且仅当 x.equals(y)是 true 时，y.equals(x)也是 true。
  - 传递性（transitive）。对于任意不为 null 的引用值 x、y 和 z，如果 x.equals(y) 是 true，同时 y.equals(z) 是 true，那么 x.equals(z)一定是 true。
  - 一致性（consistent）。对于任意不为 null 的引用值 x 和 y，如果用于 equals 比较的对象信息没有被修改的话，多次调用时 x.equals(y) 要么一致地返回 true 要么一致地返回 false。

- hashCode()：返回对象的的 hash 值

  - 调用 equals 返回 true 的两个对象必须具有相等的哈希码。
  - 如果两个对象的 hashCode 返回值相同，调用它们 equals 方法不一返回 true 。

- toString()：默认返回的字符串很像是 对象名+@+对象内存地址，需要根据特殊的情况进行重写
- getClass()：返回实例运行时真正所指的对象所属的类的类型类
- clone()：默认调用 clone 方法的是一个对象的引用，而不是深拷贝，需要根据不同的情况进行改写

## String 类常用方法

### 静态方法

- String valueOf(): 将对象或者其他基本类型转换为字符串类型

### 实例方法

- charAt(int index): 根据对应的索引返回对应的字符
- compareTo(String anotherString): 将此字符串与字符串参数进行比较，若完全一致则返回 0，字典序大则返回正数，小则返回负数
- concat(String anotherString): 将两个字符串连接成一个字符串
- contains(CharSequence s): 检查是否包含相应的字符
- endsWith(String suffix)：是否以某字符结尾
- equals(Object anObject)：是否相等
- indexOf(String str)：返回字符或者字符串的位置，未找到则返回`-1`
- length()：获取字符串的长度
- replace(char oldChar, char newChar)：修改替代字符串
- split(String regex)：分隔字符串
- toLowerCase()：转换为小写
- subString(): 截取字符串

## 数组

### 数组的定义

数组变量的声明和创建：

- `dataType[] arrayName = new dataType[arraySize];`
- `dataType[] arrayName = {value0, value1, valuek};`

例如：`double[] myList = new double[size];`

#### 二维数组的定义

- `dataType[][] arrayName = new type[size1][size2];`
- `dataType[][] arrayName = { {value1}, {value2}, {value3} };`

例如： `int[][] myList = { {1,1,1,1,1}, {2,2,2,2,2}, {3,3,3,3,3} };`
注意：定义二维数组必须指定其行数，列数可以指定，可以不指定。

### 数组的遍历

- 利用索引进行循环

```java
public class TestArray {
   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};

      // 打印所有数组元素
      for (int i = 0; i < myList.length; i++) {
         System.out.println(myList[i] + "");
      }
```

- For-Each 循环

```java
public class TestArray {
   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};

      // 打印所有数组元素
      for (double element: myList) {
         System.out.println(element);
      }
   }
}
```

### Arrays 类的静态方法

- 给数组赋值：通过 fill 方法。
- 对数组排序：通过 sort 方法,按升序。
- 比较数组：通过 equals 方法比较数组中元素值是否相等。
- 查找数组元素：通过 binarySearch 方法能对排序好的数组进行二分查找法操作，返回索引值。

## 参考资料

- [Java 数组](http://www.runoob.com/java/java-array.html)
- [java Clone 使用方法详解](http://www.cnblogs.com/felixzh/p/6021886.html)
