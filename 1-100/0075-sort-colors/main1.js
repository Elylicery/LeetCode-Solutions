/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//计数排序的思路，对整个数组遍历了两遍
//时间O(n) 空间O(k) k为元素的取值范围
var sortColors = function(nums) {

  var count = [0,0,0];//存放0，1，2三个元素的频率
  for(let i=0;i<nums.length;i++){
      count[nums[i]]++;
  }

  let index = 0;
  for(let i=0;i<count[0];i++){
      nums[index++]=0;
  }
  for(let i=0;i<count[1];i++){
      nums[index++]=1;
  }
  for(let i=0;i<count[2];i++){
      nums[index++]=2;
  }

  return nums;
};