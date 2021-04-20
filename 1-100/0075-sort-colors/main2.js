/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//三路快排的思想，对整个数组只遍历了一遍
//时间 O(n) 空间O(1)
var sortColors = function(nums) {

  //定义交换元素的函数
  function swap(nums,i,j){
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
  }

  //三路快排思想
  var zero = -1;           //nums[0....zero]==0
  var two = nums.length;  //nums[two...n-1]==2
  for(let i=0;i<two;){
      if(nums[i]===1){
          i++;
      }else if(nums[i] === 2){
          swap(nums,i,two-1);
          two--;
      }else{
          //nums[i]===0
          swap(nums,i,zero+1);
          zero++;
          i++;
      }
  }
};