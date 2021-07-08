---
title: Java中的序列化使用总结
abbrlink: 38899
date: 2019-02-25 11:28:48
tags:
---

## Serializable 序列化总结

### Serializable 序列化特点

`private static final long serialVersionUID = 1L`：用来保证能够相互序列化与反序列化

静态变量不会被序列化，因为序列化保存的是**对象的状态**，而静态变量属于类的状态，因此**序列化并不保存静态变量**。

### 父类的序列化

一个子类实现了 Serializable 接口，它的父类都没有实现 Serializable 接口，序列化该子类对象，然后反序列化后输出父类定义的某变量的数值，该变量数值与序列化时的数值不同。要想将父类对象也序列化，就需要让父类也实现 Serializable 接口。

### Transient 关键字

Transient 关键字的作用是控制变量的序列化，在变量声明前加上该关键字，可以阻止该变量被序列化到文件中，在被反序列化后，transient 变量的值被设为初始值，如 int 型的是 0，对象型的是 null。

### 自定义序列化

在序列化过程中，虚拟机会试图调用对象类里的 writeObject() 和 readObject() 方法，进行用户自定义的序列化和反序列化，如果没有这样的方法，则默认调用是 ObjectOutputStream 的 defaultWriteObject 方法以及 ObjectInputStream 的 defaultReadObject 方法。用户自定义的 writeObject 和 readObject 方法可以允许用户控制序列化的过程，比如可以在序列化的过程中动态改变序列化的数值。

### 同一对象多次序列化

第一次序列化写入对象以后，第二次再试图写的时候，虚拟机根据引用关系知道已经有一个相同对象已经写入文件，因此只保存第二次写的引用，所以读取时，都是第一次保存的对象。

## Externalizable 序列化

### Externalizable 序列化源码

```java
package java.io;

import java.io.ObjectOutput;
import java.io.ObjectInput;


public interface Externalizable extends java.io.Serializable {
    void writeExternal(ObjectOutput out) throws IOException;
    void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
}
```

### Externalizable 序列化特点

Externalizable，使用该接口之后，之前基于 Serializable 接口的序列化机制就将失效。Externalizable 的序列化机制优先级要高于 Serializable 。

实现 Externalizable 接口后，序列化的细节即
`writeExternal()`和`readExternal()`需要由开发人员自己实现。

实现 Externalizable 接口后，属性字段使用 transient 和不使用没有任何区别。

使用 Externalizable 进行序列化时，必须要有默认的构造方法，通过反射先创建出该类的实例，然后再把解析后的属性值，通过反射赋值

### Externalizable 举例

```java
package Test;

import java.io.*;

class Person implements Serializable, Externalizable {
    public static final long serialVersionUID = 1l;
    private String name;
    private int age;

    public Person() {}

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeObject(this.name);
        out.writeObject(this.age);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        this.name = (String) in.readObject();
        this.age = (Integer) in.readObject();
    }
}

public class Test {
    public static void main(String[] args) {
        Person person = new Person();
        person.setName("li");
        person.setAge(19);
        try {
            ObjectOutputStream objectOutputStream =
                    new ObjectOutputStream(new FileOutputStream(new File("./li.txt")));
            objectOutputStream.writeObject(person);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            ObjectInputStream objectInputStream =
                    new ObjectInputStream(new FileInputStream(new File("./li.txt")));
            Person person1 = (Person) objectInputStream.readObject();
            System.out.println(person1.getAge());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

```

## Serializable 和 Externalizable 序列化的不同

- Serializable 是标识接口，实现该接口，无需重写任何方法；Externalizable 接口继承于 Serializable，实现该接口，需要重写 readExternal 和 writeExternal 方法
- Serializable 提供了两种方式进行对象的序列化
  - 采用默认序列化方式，将非 transatient 和非 static 的属性进行序列化
  - 自定义编写 readObject() 和 writeObject() 完成部分属性的序列化
- Externalizable 接口的实现方式一定要有**默认的无参构造函数**，而 Serializable 接口实现，其采用反射机制完成内容恢复，没有一定要有无参构造函数的限制
- 采用 Externalizable 无需产生序列化 ID（serialVersionUID），而 Serializable 接口则需要

## 参考

[Java 序列化的高级认识](https://www.ibm.com/developerworks/cn/java/j-lo-serial/index.html)
[Java 对象的序列化和反序列化源码阅读](https://www.cnblogs.com/woshimrf/p/java-serialize.html)
[Java 序列化之 Externalizable](https://www.jianshu.com/p/411e18ceaa55)
[JAVA 对象序列化（一）——Serializable](https://www.cnblogs.com/chenfei0801/archive/2013/04/05/3001149.html)
[JAVA 对象序列化（二）——Externalizable](https://www.cnblogs.com/chenfei0801/archive/2013/04/06/3002146.html)
[Serializable 和 Externalizable 浅析](https://my.oschina.net/wangmengjun/blog/1588096)
