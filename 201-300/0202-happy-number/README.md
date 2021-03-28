# Leetcode 202 快乐数

**思路：使用哈希表**

```js
/// Using HashTable
/// Time Complexity: O(logn)
/// Space Complexity: O(logn)
var op = function(x){
  let res = 0;
  while(x){
    let t = x%10;
    res += t*t;
    x  = Math.floor(x/10);
  }
  return res;
}
var isHappy = function(n) {
  const set = new Set();
  set.add(n);
  while(n!=1){
    n = op(n);
    if(set.has(n)){
      return false;
    }else{
      set.add(n);
    }
  }
  return true;
};
```
备注：注意看下这里循环中止的条件

**思路2：快慢指针法**