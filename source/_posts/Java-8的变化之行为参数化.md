---
title: Java 8的变化之行为参数化——Lambda表达式
abbrlink: 6340
date: 2019-12-07 14:34:26
tags:
 - Java
 - 编程
---

## 什么是行为参数化

假设现在有两个需求，分别是打印如下所示的加法表和乘法表：

``` bash
1 + 1 = 2
1 + 2 = 3	2 + 2 = 4
1 + 3 = 4	2 + 3 = 5	3 + 3 = 6
1 + 4 = 5	2 + 4 = 6	3 + 4 = 7	4 + 4 = 8
......

----------------------------

1 * 1 = 1
1 * 2 = 2	2 * 2 = 4
1 * 3 = 3	2 * 3 = 6	3 * 3 = 9
1 * 4 = 4	2 * 4 = 8	3 * 4 = 12	4 * 4 = 16
......

```

在这两个运算表中，需要展示的格式是一样的，不同的地方有两点：

- 运算符
- 运算逻辑

如果只使用一个方法来生成这样两个运算表格，则需要将运算符和运算逻辑都作为参数传递这个方法。其中运算符可以视为一个字符串，是一种几乎所有编程语言都内置原生支持的一种类型。但是运算逻辑则不同，只有将函数视为头等公民的编程语言才能将行为即函数作为实参进行传递。

#### 函数作为头等公民

在一些程序语言中，函数视为头等公民，这意味着，函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储在数据结构中。使用函数作为实参和返回值的函数被称为高阶函数。更多可以信息可以参考[头等函数-维基百科](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)。

JavaScript是一种内置将函数视为头等公民的语言，如果用JavaScript来实现上述打印加法表和乘法表的需求，只需要将乘法与加法定义为变量再作为实参传递给生成表的函数就行了，完整代码如下所示：

``` javascript
const multiplication = (a, b) => a * b;
const addition = (a, b) => a + b;

const generateOperationTable = (limit, operationSymbol, operation) => {
    let result = '';
    for (let i = 1; i <= limit; i++) {
        let lineResult = '';
        for (let j = 1; j <= i; j++) {
            lineResult += `${j} ${operationSymbol} ${i} = ${operation(i, j)}\t`;
        }
        result += lineResult + '\n';
    }
    return result;
}

const multiplicationTable = generateOperationTable(9, '*', multiplication);
const additionTable = generateOperationTable(9, '+', addition);

console.log(multiplicationTable);
console.log(additionTable);

```

行为参数化，就是一个方法接受多个不同的行为作为参数，并且在内部使用它们，完成不同的行为。

## 为什么要进行行为参数化

从上面的例子中可以看出，将行为即函数视为一个普通变量后，可以提高抽象能力，
减少重复代码，使代码的表达能力更强，也更易于理解。

以下对比将展现更多行为参数在Java中体现出来的好处。

## Java 8中如何实现行为参数化

### Java 8之前的Java如何将行为传递给方法

Java是一门**面向对象**的、**静态类型**语言，所以在将行为传递给一个方法前，这个行为必定有着特定的类型，而且为一个实例。于是有以下不同的方式来实现效果。

#### 通过实现不同的接口

在生成运算表的方法中，可以同时传入加法与乘法两种运算操作，所以这两种操作必须为同一类型。于是有了`Arithmetic`接口：

```java
public interface Arithmetic {
    public int calculate(int a, int b);
}

```

通过对`Arithmetic`接口的不同实现，可以将加法与乘法两种行为包裹在不同的类中：

```java
public class Addition implements Arithmetic {
    @Override
    public int calculate(int a, int b) {
        return a + b;
    }
}

```

```java
public class Multiplication implements Arithmetic {
    @Override
    public int calculate(int a, int b) {
        return a * b;
    }
}

```

在生成操作表的方法中，即可以传入不同`Arithmetic`类型的实例来实现将行为传递进方法内部。

```java
private static void printOperationTableByImplInterface() {
    String additionTable = genOperationTable(9, "+", new Addition());
    String multiplicationTable = genOperationTable(9, "+", new Multiplication());

    System.out.print(additionTable);
    System.out.print(multiplicationTable);
}

```

这是生成运算表的方法本身：

```java
private static String genOperationTable(
            int limit, String operationSymbol, Arithmetic operation) {
    StringBuilder result = new StringBuilder();
    for (int i = 1; i <= limit; i++) {
        String rowResult = "";
        for (int j = 1; j <= i; j++) {
            int answer = operation.calculate(i, j);
            rowResult += String.format("%d %s %d = %d\t", j, operationSymbol, i, answer);
        }
        result.append(rowResult).append("\n");
    }
    return result.toString();
}

```

#### 通过匿名内部类

上述方式中，需要实现声明一个类，然后再实例化。但是在Java中，可以通过匿名内部类来同时声明和实例化一个类，可以稍微简化一下代码：

```java
private static void printOperationTableByInnerClass() {
    String additionTable =
            genOperationTable(
                    9,
                    "+",
                    new Arithmetic() {
                        @Override
                        public int calculate(int a, int b) {
                            return a + b;
                        }
                    });

    String multiplicationTable =
            genOperationTable(
                    9,
                    "+",
                    new Arithmetic() {
                        @Override
                        public int calculate(int a, int b) {
                            return a * b;
                        }
                    });

    System.out.print(additionTable);
    System.out.print(multiplicationTable);
}

```

### Java 8的实现方式

Java 8中引入Lambda表达式（匿名函数），其可以看作是单纯的一个行为，只需将其传递给方法体，则可直接实现行为参数化。相比于Java 8之前的Java版本，使用Lambda表达式可以极大程度地精简代码。

```java
private static void printOperationTableByLambda() {
    String additionTable = genOperationTable(9, "+", (a, b) -> a + b);
    String multiplicationTable = genOperationTable(9, "+", (a, b) -> a * b);

    System.out.print(additionTable);
    System.out.print(multiplicationTable);
}
```

## 什么是Lambda表达式

Lambda表达式是匿名函数的一种表现形式，具有以下几个特点：

- 匿名：可以不像普通方法一样具有一个明确的名称
- 函数：不像普通方法一样属于某个特定的类，但是和方法类似，其也具有参数列表、函数主体、返回类型，还有可能抛出特定的异常。
- 传递：可以像参数一样传递给方法或者是储存在变量中

#### Lambda表达式的语法

一个普通的Lambda表达式应当包括：

- 参数列表：
    * 用`()`包裹起来
    * 可以不显示指定参数的类型
    * 只有一个参数时可以省略`()`
- 箭头：`->`，将参数列表和函数主体相分割开来
- 函数主体：
    * 函数主体只有一句时可以省略显式的`return`语句，默认将会运算后的值作为返回值
    * 函数主体有多句时，需要使用`{}`将函数主体包裹起来，且显式的指定`return`语句

Lambda表达式并没有破坏Java原有设计，Java 8同样还是一门**面向对象**的、**静态类型**语言。实际上，Lambda表达式以内联的形式为一种称为**函数式接口**的特殊接口中的**抽象方法**提供了实现，并且将整个表达式作为该函数式接口的一个**具体实现**的**实例**。

Lambda表达式可以被赋给一个变量，或者传递给一个接受函数式接口作为参数的方法中，当然Lambda表达式的签名需要和函数式接口的抽象方法一样。

## 函数式接口

函数式接口是一种只定义了**一个抽象方法**的特殊接口。像上述的`Arithmetic`接口，就是一个函数式接口。

在函数式接口上可以使用`@FunctionalInterface`注解来显式表明此接口为一个函数式接口，如果加了注解但却不满足函数式接口的定义，编译器将会返回一个错误。

值得注意的是，在Java 8中，接口可以拥有默认方法，即实现类没有实现该方法时，将会有默认的实现。即在Java 8中，接口可以有完整的方法体。即便接口有多个默认方法，只要其只有一个抽象方法，其仍然为函数式接口。

### 常见的内置函数式接口

以下表格总结了常见的Java 8中内置的函数式接口：

| 函数式接口            | 函数描述符         | 抽象方法名称   |
|---------------------|-------------------|--------------|
| Predicate<T>        | T -> boolean      | test         |
| Consumer<T>         | T -> void         | accept       |
| Supplier<T>         | () -> T           | get          |
| Function<T, R>      | T -> R            | apply        |
| UnaryOperator<T>    | T -> T            | apply        |
| BinaryOperator<T>   | (T,T) -> T        | apply        |
| BiPredicate<L, R>   | (L, R) -> boolean | test         |
| BiConsumer<T, U>    | () -> void        | accept       |
| BiFunction<T, U, R> | (T,U) -> R        | apply        |

函数描述符描述了这些函数式接口实例的签名，使用这些函数式接口的实例需要使用其对应的抽象方法。

例如：

- `Predicate<String> isLongThanFive = s -> s.length() > 5;`
- `isLongerThanFice.test(sampleString)`
- `Consumer<String> print = (String s) -> System.out.println(s);`
- `print.accept(sampleString)`
- `BiFunction<Integer, Integer, Integer> sum = (Integer a, Integer b) -> a + b;`
- `sum.apply(a, b)`

由于Lambda表达式还是遵循了Java原有的设计思想，所以内置的函数式接口还是有一些局限性，比如无法使用两个以上的参数作为Lambda表达式的入参，此时可以使用自定义函数式接口，或者使用第三方的包。

#### 原始类型特化

内置函数式接口中的泛型只能绑定到引用类型上，但是在使用时经常会使用基本类型，此时Java内部会自动进行装箱和拆箱操作，将基本类型与对应的引用类型进行相互转换。但拆装箱操作也会带来额外的性能消耗，所以Java 8还内置了一些原始类型特化的函数式接口来在输入与输出的时候避免拆装箱操作。

一般来说，针对输入类型为基本类型的函数式接口的名称前都要加上对应的基本类型前缀，如`IntPredicate`、`DoubleConsumer`、`Function`接口还有针对输出参数类型的变种：`ToIntFunction<T>`、`IntToDoubleFunction`等等。

例如：

- `IntPredicate isLargeThanFive = i -> i > 5;`

## Lambda表达式的类型

### Lambda表达式的类型检查

Lambda表达式的**实际类型**是从使用Lambda表达式的上下文中所推断出来的。上下文（比如，接受它传递的方法的参数，或接受它的值的全局变量）中Lambda表达式需要的类型被称为**目标类型**。

可以从赋值的上下文、方法调用的上下文（参数和返回值）以及类型转换的上下文中获得Lambda表达式的目标类型。

只要Lambda表达式的参数类型能够符合目标类型中抽象方法的参数定义，也就是方法签名能够兼容，那么此类型检查就能通过，该Lambda表达式也就能应用于此上下文中。

有了目标类型的概念，同一个Lambda表达式就可以与不同的函数式接口相联系起来，同一个Lambda表达式可以用于多个不同的函数式接口中的上下文中，即使这些函数式接口并没有`is`或`like`等关系。

所以上例中加法和乘法的Lambda表达式既可以是一个`Arithmetic`类型，也可以是一个`BiFunction`类型，实际类型需要根据上下文而定。

#### 特殊的`void`兼容规则

如果Lambda表达式的主体是一个语句，在参数列表兼容的前提下，即便其有特定的返回值，其也和返回`void`的函数描述符兼容。

例如，List添加元素后会返回一个布尔值，但是其也可以被`Consumer`类型的函数式接口所接受。

```java
List<String> strings = new ArrayList<>();
Predicate<String> adder = s -> strings.add(s);
Consumer<String> anotherAdder = s -> strings.add(s);

```

### 推断Lambda表达式参数的类型

Java编译器能够从上下文（目标类型）中推断出用什么函数式接口来配合Lambda表达式，所以其也能推断出Lambda表达式的参数类型，可以在Lambda表达式语法中省略参数类型标注。

### Lambda表达式使用局部变量

Lambda表达式可以在主体中使用类中的静态变量和实例变量，但是使用方法内的局部变量时，该局部变量必须显示的声明为`final`类型，或者事实上为`final`类型（声明后没有被重新赋值）。

## 组合Lambda表达式

可以将多个简单的Lambda表达式组合成复杂的表达式，比如可以将多个`Predicate`的结果进行布尔运算，组合成一个更大的`Predicate`。

函数式接口中的默认方法为这种组合提供了实现。

### `Comparator`组合Lambda表达式

- `.reversed()`：逆序
- `.thenComparing()`：第一个比较参数相同时，继续进行比较

### `Predicate`组合Lambda表达式

- `.negate()`：非
- `.and()`：与
- `.or()`：或

### `Function`组合Lambda表达式

- `.andThen()`：返回一个函数，先执行一个函数，再将结果应用另一个函数
- `.compose()`：返回一个函数，先执行另一个函数，再将结果应用此函数

例如:`h = f.andThen(g)` == `g(f(x))`，而`h = f.compose(g)` == `f(g(x))`

## 方法引用

使用方法引用可以将现有方法像Lambda表达式一样进行传递，使得代码更自然和易读。

### 方法引用的语法

目标引用放在`::`之前，方法的名称放在后面。例如`Integer::sum`，就是调用了`Integer`类中的静态方法`sum`。

### 方法引用类型

- 静态方法引用：例如`Integer::parseInt`、`Consumer<String> print = System.out::println;`
- 使用类型实例本身的实例方法引用：例如获得某个`String`类型实例的长度，`String::length`
- 使用其他类型实例的实例方法引用：例如调用一个已经存在的外部对象中的方法，`expr::instanceMethod`
- 构造函数引用：与静态方法引用类似，使用`ClassName::new`来使用构造函数引用，如果构造函数参数个数超过两个，可以使用指定义的函数式接口来作为构造函数引用的类型
