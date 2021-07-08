---
title: Java泛型总结
abbrlink: 60082
date: 2019-02-23 18:47:15
tags:
---

## 泛型的作用

Java 本身是强类型语言，每次操作都需要指定类型，但是有时候一系列操作（例如集合操作）可以使用于多种类型，为了节省代码，可以将类型参数化，这就是泛型。

## 泛型的三种使用方式

### 泛型类

泛型类型用于类的定义中，被称为泛型类。通过泛型可以完成对一组类的操作对外开放相同的接口。最典型的就是各种容器类，如：List、Set、Map。

例如：

```java
public class Generic<T> {
    private T key;

    public Generic(T key) {
        this.key = key;
    }

    public T getKey() {
        return key;
    }
}

Generic generic = new Generic("li");
```

其中`<T>`就代表泛型，意为`<T>`可以代表任意类型。注意的是泛型的类型只能是引用类型，而不能是基本类型。因为默认是`<? extends Object>`。

### 泛型接口

泛型接口与泛型类的定义与使用基本相似。

泛型接口定义：

```java
public interface Generator<T> {
    public T next();
}

```

当类实现了泛型接口却未传入泛型实参时：

```java
// 未传入泛型实参时，与泛型类的定义相同，在声明类的时候，需将泛型的声明也一起加到类中
class FruitGenerator<T> implements Generator<T>{
    @Override
    public T next() {
        return null;
    }
}
```

当类实现了泛型接口并传入泛型实参时：

```java
/**
 * 传入泛型实参时：
 * 定义一个生产器实现这个接口,虽然我们只创建了一个泛型接口Generator<T>
 * 但是我们可以为T传入无数个实参，形成无数种类型的Generator接口。
 * 在实现类实现泛型接口时，如已将泛型类型传入实参类型，则所有使用泛型的地方都要替换成传入的实参类型
 * 即：Generator<T>，public T next();中的的T都要替换成传入的String类型。
 */
public class FruitGenerator implements Generator<String> {

    private String[] fruits = new String[]{"Apple", "Banana", "Pear"};

    @Override
    public String next() {
        Random rand = new Random();
        return fruits[rand.nextInt(3)];
    }
}
```

### 泛型方法

泛型类，是在实例化类的时候指明泛型的具体类型；泛型方法，是在调用方法的时候指明泛型的具体类型 。

举例：

```java
/**
 * 泛型方法的基本介绍
 * @param tClass 传入的泛型实参
 * @return T 返回值为T类型
 * 说明：
 *     1）public 与 返回值中间<T>非常重要，可以理解为声明此方法为泛型方法。
 *     2）只有声明了<T>的方法才是泛型方法，泛型类中的使用了泛型的成员方法并不是泛型方法。
 *     3）<T>表明该方法将使用泛型类型T，此时才可以在方法中使用泛型类型T。
 *     4）与泛型类的定义一样，此处T可以随便写为任意标识，常见的如T、E、K、V等形式的参数常用于表示泛型。
 */
public <T> T genericMethod(Class<T> tClass)throws InstantiationException ,
  IllegalAccessException{
        T instance = tClass.newInstance();
        return instance;
}
```

### 在泛型类里使用泛型方法

泛型方法里声明了泛型<E>，即使泛型类中并未声明该泛型<E>，该泛型方法也可以使用泛型<E>，泛型方法也可声明泛型类中声明过的同名的泛型<T>，此时泛型<T>会是一个全新的类型。可以与泛型类中的泛型<T>不是同一类型。

### 静态泛型方法

静态方法无法访问类上定义的泛型；如果静态方法操作的引用数据类型不确定的时候，必须要将泛型定义在方法上，即：如果静态方法要使用泛型的话，必须将静态方法也定义成泛型方法。

### 泛型方法的使用

```java
//静态方法
StaticFans.StaticMethod("adfdsa");//使用方法一
StaticFans.<String>StaticMethod("adfdsa");//使用方法二

//常规方法
StaticFans staticFans = new StaticFans();
staticFans.OtherMethod(new Integer(123));//使用方法一
staticFans.<Integer>OtherMethod(new Integer(123));//使用方法二
```

建议使用方法二，直接规定类型

### 泛型约定标记符

E - Element (在集合中使用，因为集合中存放的是元素)
T - Type（Java 类）
K - Key（键）
V - Value（值）
N - Number（数值类型）
？ - 表示不确定的 java 类型
S、U、V - 2nd、3rd、4th types

## 参考资料

[java 泛型详解](https://blog.csdn.net/s10461/article/details/53941091)
[泛型：工作原理及其重要性](https://www.oracle.com/technetwork/cn/articles/java/juneau-generics-2255374-zhs.html)
[Java 泛型详解：和 Class 的使用](https://blog.csdn.net/qq_27093465/article/details/73229016)
[Java 泛型详解](http://www.importnew.com/24029.html)
