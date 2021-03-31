# Leetcode 454 4数之和 II

**思路：使用查找表**

* 将D中的元素放入查找表，时间复杂度为`O(n^3)`，`500^3 = 1，2500，0000` 超时
* 将C+D的每一种可能放入查找表，时间复杂度为`O(n^2)`，`500^2 = 25，0000` 数据规模还ok

【备注】：对于这样的查找表，是用set还是map？使用map，因为求合是重复的，例如在c中取2，d中取3和在c中取1，d中取4的和是一样的，要记录和为5的所有可能性，所以要使用map记录每一个和出现了多少次。

```js
//时间 O(n^2)
//空间 O(n^2)
var fourSumCount = function(A, B, C, D) {
  //查找表
  const map = new Map();
  //双重循环将C+D的每一种可能放入查找表
  for(let i=0;i<C.length;i++){
    for(let j=0;j<D.length;j++){
      map.set(C[i]+D[j],map.has(C[i]+D[j])? map.get(C[i]+D[j])+1:1);
    }
  }

  //结果计数
  let res = 0;
  //对A和B中的数做一个双重循环
  for(let i=0;i<A.length;i++){
    for(let j=0;j<B.length;j++){
      if(map.has(0-A[i]-B[j])){
        res += map.get(0-A[i]-B[j]);
      }
    }
  }
  return res;
};
```



