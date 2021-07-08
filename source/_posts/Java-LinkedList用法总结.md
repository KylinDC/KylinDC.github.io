---
title: Java LinkedList用法总结
abbrlink: 3868
date: 2019-02-21 20:42:51
tags:
---

## LinkedList 构造函数

- 默认构造函数：`LinkedList()`
- 带初始值的构造函数：`LinkedList(Collection<? extends E> collection)`

## LinkedList 常用方法

- add(int index, E element)：根据索引值添加值
- addFirst()：在头部添加值
- get(int index)：根据索引返回值
- getFirst()：返回第一个值，如果为空则抛出异常
- set(int location, E object)：在位置添加值
- indexOf(Object object)：根据值返回索引，找不到则返回`-1`
- clear()：清空 LinkedList
- peek()：返回第一个值，如果为空则返回`null`
- poll()：删除并返回第一个节点
- offer(E e)：将 e 添加双向链表末尾
- pop()：删除并返回第一个节点
- push(E e)：将 e 插入到双向链表开头
- remove(int location)：根据索引删除值
- remove(Object object)：根据内容删除
- size()：返回列表的长度
- toArray()：返回内容数组
- clone()：将全部元素克隆到一个新的 LinkedList 对象中并返回

### LinkedList 修改方法总结

|      | 头部抛出异常  | 头部特殊值    | 尾部抛出异常 | 尾部特殊值   |
| ---- | :------------ | :------------ | :----------- | :----------- |
| 插入 | addFirst(e)   | offerFirst(e) | addLast(e)   | offerLast(e) |
| 移除 | removeFirst() | pollFirst()   | removeLast() | pollLast()   |
| 检查 | getFirst()    | peekFirst()   | getLast()    | peekLast()   |

### LinkedList FIFO(先进先出)的队列方法总结

| 队列方法  | 等效方法      |
| --------- | :------------ |
| add(e)    | addLast(e)    |
| offer(e)  | offerLast(e)  |
| remove()  | removeFirst() |
| poll()    | pollFirst()   |
| element() | getFirst()    |
| peek()    | peekFirst()   |

### LinkedList LIFO(后进先出)的栈方法总结

| 栈方法  | 等效方法      |
| ------- | :------------ |
| push(e) | addFirst(e)   |
| pop()   | removeFirst() |
| peek()  | peekFirst()   |

## LinkedList 遍历方法

### 通过快速随机访问遍历 LinkedList

```java
int size = list.size();
for (int i=0; i<size; i++) {
    list.get(i);
}
```

### 通过另外一种 for 循环来遍历 LinkedList

```java
for (T element:list){
    System.out.println(T);
}
```

### 通过迭代器遍历, 即通过 Iterator 去遍历

```java
for(Iterator iter = list.iterator(); iter.hasNext();){
    iter.next();
}
```

### forEach()方法

```java
list.forEach(item -> System.out.println(item));
```
