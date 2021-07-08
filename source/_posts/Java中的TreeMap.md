---
title: Java中的TreeMap
abbrlink: 59929
date: 2019-02-23 09:43:42
tags:
---

TreeMap 是一个通过红黑树实现的**有序**的**key-value**集合。该集合根据其**键的自然顺序**进行排序，或者根据**创建映射时提供的 Comparator **进行排序。

## 构造函数

```java
// 默认构造函数。使用该构造函数，TreeMap中的元素按照自然排序进行排列。
TreeMap()

// 创建的TreeMap包含Map
TreeMap(Map<? extends K, ? extends V> copyFrom)

// 指定Tree的比较器
TreeMap(Comparator<? super K> comparator)
```

## TreeMap 中的获取方法

### TreeMap 的 Entry 相关函数

返回一个 key-value 的映射对。

firstEntry()/lastEntry()：获得第一个/最后一个
lowerEntry()/higherEntry()：获得刚好小于/大于的映射对，不存在则返回`null`
floorEntry()/ceilingEntry()：获得刚好小于等于/大于等于的映射对，不存在则返回`null`
pollFirstEntry()/pollLastEntry()：获得第一个/最后一个，并在元集合中删除这一个

### TreeMap 的 key 相关函数

firstKey()、lastKey()、lowerKey()、higherKey()、floorKey()、ceilingKey()

### TreeMap 的 values()函数

values() 返回“TreeMap 中值的集合”

### TreeMap 的 entrySet()函数

entrySet() 返**TreeMap 的所有键值对组成的集合**，而且它单位是单个**键值对**

## TreeMap 排序相关函数

### 反向 TreeMap

- descendingMap() 的作用是返回一个当前 TreeMap 排序顺序相反的 TreeMap。
- descendingKeySet()的作用是返回一个当前 TreeMap 排序顺序相反的包含 key 的 Set 集合。

## TreeMap 其他相关常用函数

- 清空：clone()
- 根据 key 获取值：get(Object key)
- 判断是否为空：isEmpty()
- 插入：put(K key, V value)
- 根据键来删除：remove(Object key)
- 获得集合大小：size()
- 获得子集合： subMap(K fromInclusive, K toExclusive)

## 遍历方式

### 获取**键值对**、**键**、**值**的集合

- entrySet()
- keySet()
- values()

## 使用迭代器进行遍历

使用遍历键来进行举例

```java
// 假设map是TreeMap对象
// map中的key是String类型，value是Integer类型
String key = null;
Integer value = null;
Iterator iter = map.keySet().iterator();
while (iter.hasNext()) {
        // 获取key
    key = (String)iter.next();
        // 根据key，获取value
    value = (Integer)map.get(key);
}
```

## 使用 for-Each 进行遍历

使用遍历键来进行举例

```java
// 假设map是TreeMap对象
// map中的key是String类型，value是Integer类型
Set<String> keys = map.keySet();
for(String key:keys){
    System.out.println(key);
}
```
