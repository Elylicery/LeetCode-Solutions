/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//使用查找表
//时间:O(n)
//空间:O(n)
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

var res = twoSum([3,2,4],6);
console.log(res);

// var res = twoSum([3,3],6);
// console.log(res);//[0,1]