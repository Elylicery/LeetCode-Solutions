# Leetcode 242. 有效的字母异位词
**思路1：排序后比较**

```js
/// Sorting
/// Time Complexity: O(nlogn)
/// Space Complexity: O(1)
var isAnagram = function(s, t) {
  if(s.length !== t.length){
      return false;
  }
  var arrs = s.split("").sort();
  var arrt = t.split("").sort();
  for(let i=0;i<arrs.length;i++){
    if(arrt[i]!==arrs[i]) return false;
  }
  return true;
};
```

**思路2：使用哈希表**

```js
/// Using Hashtable
/// Time Complexity: O(n)
/// Space Complexity: O(26)
var isAnagram = function(s, t) {
  if(s.length !== t.length){
      return false;
  }
  var len = s.length;
  var freq = new Array(26).fill(0);
  for(let i=0;i<len;i++){
    freq[s[i].charCodeAt()-'a'.charCodeAt()]++;
  }
  for(let i=0;i<len;i++){
    freq[t[i].charCodeAt()-'a'.charCodeAt()]--;
    if(freq[t[i].charCodeAt()-'a'.charCodeAt()]<0){
      return false;
    }
  }
  return true;
};
```
