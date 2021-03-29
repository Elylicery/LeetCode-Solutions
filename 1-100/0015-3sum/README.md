# Leetcode 15.三数之和

**思路：利用map**

建立 字符=> 频次的map映射表，将nums去重后排序。

遍历nums，考虑三数之和为0的情况 * (注意这是在nums有序的情况下)*：

* `a+a+a=0`:只有a=0一种情况
* `a+a+b=0` map中a对应的频次应>=2
* `a+b+b=0` map中b对应的频次应>=2
* `a+b+c=0` a,b,c各不相等

```js
/// Using Hash Table to store all the numbers
///
/// Time Complexity: O(n^2)
/// Space Complexity: O(n)
var threeSum = function(nums) {
  //处理特殊情况
  if(nums.length<=2) return [];

  //建立频次映射表
  const map = new Map();
  nums.forEach(n=>{
    map.set(n,map.has(n)? map.get(n)+1:1);
  })

  //map转array后去重并排序
  var set = new Set(nums);
  nums = [...set].sort((a,b)=>{return a-b})

  var res = [];//结果数组
  //特殊情况处理 0+0+0=0（只有这一种情况a=b=c)
  if(map.has(Number(0)) && map.get(Number(0))>=3){
    res.push([0,0,0]);
  }

  //双重循环
  for(let i=0;i<nums.length;i++){
    for(let j=i+1;j<nums.length;j++){
      //a+a+b=0的情况
      if(nums[i]*2+nums[j] === 0 && map.get(nums[i])>=2){
        res.push([nums[i],nums[i],nums[j]]);
      }
      //a+b+b=0的情况
      if(nums[i] +nums[j]*2=== 0 && map.get(nums[j])>=2){
        res.push([nums[i],nums[j],nums[j]]);
      }
      //a+b+c=0的情况
      let c = 0-nums[i]-nums[j];
      if(c>nums[j] && map.get(c)>0){
        res.push([nums[i],nums[j],c]);
      }
    }
  }
  return res;  
};
```