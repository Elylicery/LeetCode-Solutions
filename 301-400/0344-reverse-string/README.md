# Leetcode 344 逆转字符串

**思路：对撞指针**

```js
//Time：O(n)
//Space:O(1)
var reverseString = function(s) {
  let i=0,j=s.length-1;
  while(i<j){
    [s[i],s[j]] = [s[j],s[i]];//swap(s[i],s[j]);
    i++;
    j--;
  }
  return s;
};
```