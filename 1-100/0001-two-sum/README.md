# Leetcode 1.两数之和

**思路1**

排序后，使用双索引对撞
时间：O(nlogn)+O(n) = O(nlogn)

```js
var twoSum = function(nums, target) {
  //拷贝nums的一个副本
  var oNums = nums.concat();
  //排序
  nums = nums.sort((a,b)=>{return a-b});
  
  //对撞指针
  let l = 0,r = nums.length-1;
  var res = [];
  while(l<r){
    if(nums[l]+nums[r] === target){
      res[0] = oNums.indexOf(nums[l]);
      res[1] = oNums.lastIndexOf(nums[r]);//防止nums[l]和nums[r]相等的情况
      return res;
    }else if(nums[l]+nums[r]<target){
      l++;
    }else{
      r--;
    }
  }
}
```

**思路2**

使用查找表。
将所有元素放入查找表，之后对于每一个元素a，查找target-a是否存在。
```js
 var twoSum = function(nums, target) {
   const map = new Map();
   for(let i=0;i<nums.length;i++){
     const n = nums[i];
     const n2 = target-n;
     if(map.has(n2)){
       return [map.get(n2),i];
     }else{
       map.set(n,i)
     }
   }
}
```
时间:O(n)，空间:O(n)
