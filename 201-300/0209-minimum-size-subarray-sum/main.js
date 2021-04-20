// Sliding Window
// Time Complexity: O(n)
// Space Complexity: O(1)
var minSubArrayLen = function(target, nums) {
  
  let l = 0,r = -1;//滑动窗口：nums[l...r]
  let sum = 0;//窗口中元素的和初始化为零
  let res = nums.length + 1;//初始化设置成一个最大值（这是一个不可能取到的值）

  while(l<nums.length){
    if(r+1<nums.length && sum <target){
      r++;
      sum += nums[r];
    }else{ //sum>targt
      sum -= nums[l];
      l++;
    }

    //每次循环中当满足sum>=target就获得一个新的窗口
    if(sum>=target){
      res = Math.min(res,r-l+1);
    }
  }
  return res == nums.length+1 ? 0:res;//如果有可能遍历了一遍数组都没有解，就return 0
};