---
title: SQL中的字符串处理函数和时间处理函数
abbrlink: 54670
date: 2019-05-05 16:55:00
tags:
---

## SQL 中字符串处理函数

### 字符串裁剪

- LEFT(str,len)：返回最左边的 len 个长的字符
- RIGHT(str,len)：返回最左边的 len 个长的字符
- LTRIM(str)：裁剪字符串左边的空格
- RTRIM(str)：裁剪字符串右边的空格
- TRIM(str)：裁剪字符串两边的空格
- SUBSTRING(str,pos,len)/SUBSTR(str,pos,len)/SUBSTRING(str FROM pos FOR len)：在 str 中，从 pos 位置截取出 len 长的字符串

### 字符串拼接

- CONCAT(str1,str2,...)：拼接多个字符串
- CONCAT_WS(separator,str1,str2,...)：用分隔符拼接多个字符串

### 字符串转换

- LOWER(str)：将字符串转换为全小写
- UPPER(str)：将字符串转换为全大写
- REVERSE(str)：将字符串翻转

### 获取字符串属性

- LENGTH(str)：获取字符串长度

## SQL 中时间处理函数

### 获取当前时间

- NOW():获取当前日期和时间
- CURDATE():获取当前日期
- CURTIME():获取当前时间

### 提取时间

- DAY(date)/DAYOFYEAR(date):提取出日期格式的日期数
- DAYNAME(date)：提取出日期格式中的星期几
- DAYOFYEAR(date)：提取出日期格式在一年中的天数
- EXTRACT(unit FROM date)：按照指定格式提取出时间

  ```sql
  mysql> SELECT EXTRACT(YEAR_MONTH FROM '2019-07-02 01:02:03');
        -> 201907
  ```

- HOUR(date): 提取出小时数
- TIME(expr)：提取出时间

### 编辑时间

- DATE_ADD(date,INTERVAL expr unit)：在日期上增加一段时间

```sql
SELECT DATE_SUB('2018-05-01',INTERVAL 1 YEAR)
```

- DATE_SUB(date,INTERVAL expr unit)：在日期上减去一段时间
- DATEDIFF(expr1,expr2)：expr1-expr2 的值，只有日期部分被计算
- TIMEDIFF(expr1,expr2)
