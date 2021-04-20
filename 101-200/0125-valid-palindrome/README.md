# Leetcode 125 验证回文串

**思路：对撞指针**
字符串中的一些问题：

* 空字符串如何看？
* 字符的定义?
* 对于字符串的问题，要不要考虑大小写

```js
var isPalindrome = function(s) {
  let i = 0;
  let j = s.length-1;

  //只是字母和数字字符
  function trueChar(c){
    if(('A'<=c && c<='Z') || 'a'<=c && c<='z' || '0'<=c && c<='9'){
      return true;
    }else{
      return false;
    }
  }
  //开始对撞指针
  while(i<j){
    if(!trueChar(s[i])) {i++;continue}
    if(!trueChar(s[j])) {j--;continue}
    if(s[i] === s[j] || s[i].toLowerCase() === s[j] || s[i].toUpperCase()=== s[j]){
      i++;
      j--;
    }else{
      return false;
    }
  }
  return true;
};
```

### 