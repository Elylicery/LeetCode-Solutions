/**
 * @param {number[]} nums
 * @return {number[][]}
 */

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

// var res = threeSum([-1,0,1,2,-1,-4]);
// console.log(res);

var res = threeSum([0,0,0]);
console.log(res);