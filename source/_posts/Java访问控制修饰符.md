---
title: Java访问控制修饰符
abbrlink: 45281
date: 2019-02-15 15:51:38
tags:
---

Java 访问控制修饰符有`default`、`public`、`private`、`protected`四种。

## `default`

有些地方称`friendly`，是缺省默认的修饰符，可以修饰类、接口、变量及方法，在同一包内均被可见。

## `public`

对所有类均可见，可以用来修饰类、接口、变量及方法。

## `private`

- 用来修饰变量和方法：只在同一类内可见，一般建议成员变量均被控制为`private`，而通过`public`的 get 和 set 方法来修改和访问。`private`修饰方法时，子类也不能使用此方法。
- 类和接口一般不能用`private`修饰(内部类除外)。

例如：

```java
public class Animal {
    private int age;
    private int weight;
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }

    public int getWeight() {
        return this.weight;
    }
```

## `protected`

- 用来修饰变量和方法：

1. 不同包，非子类不可见
2. 同一包内其他类及子类可见
3. 子类与父类不在同一包中，那么在子类中，子类实例可以访问其从父类继承而来的 `protected` 方法，而不能访问父类实例的 `protected` 方法

```java
package p2;
class MyObject2 {
    protected Object clone() throws CloneNotSupportedException{
       return super.clone();
    }
}

package p22;
public class Test2 extends MyObject2 {
    public static void main(String args[]) {
       MyObject2 obj = new MyObject2();
       obj.clone(); // Compile Error         ----（1）

       Test2 obj2 = new Test2();
       obj2.clone(); // Compile OK         ----（2）
    }
}
```

- 一般不能用`protected`来修饰类和接口(内部类除外)。

## 参考资料

- [JAVA 修饰符类型(public,protected,private,friendly)](https://blog.csdn.net/johnstrive/article/details/5880357)
- [Java protected 关键字详解](http://www.runoob.com/w3cnote/java-protected-keyword-detailed-explanation.html)
