# Leetcode 125 验证回文串

**思路一：对撞指针**

字符串中的一些问题：

* 空字符串如何看？
* 字符的定义?
* 对于字符串的问题，要不要考虑大小写

实现：对撞指针，左右指针台跳过非字母数字字符后比较

```js
function isPalindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;

  // 判断是不是字母或数字
  const trueChar = (c: string) => {
    if (
      ("A" <= c && c <= "Z") ||
      ("a" <= c && c <= "z") ||
      ("0" <= c && c <= "9")
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 开始对撞指针
  while (i < j) {
    if (!trueChar(s[i])) {
      i++;
      continue;
    }
    if (!trueChar(s[j])) {
      j--;
      continue;
    }
    if (s[i] === s[j] || s[i].toLowerCase() === s[j].toLowerCase()) {
      i++;
      j--;
    } else {
      return false;
    }
  }

  return true;
}
```

**思路二：列表推导清洗 + 切片反转**（main.py 的 `isPalindrome2`）

先用推导式把字符串清洗成规范化字符列表：`isalnum()` 过滤非字母数字，`lower()` 统一大小写；然后正序列和反转序列（切片 `[::-1]`）逐元素比较。

```python
t = [c.lower() for c in s if c.isalnum()]
return t == t[::-1]
```
