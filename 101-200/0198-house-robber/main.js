/**
 * @param {number[]} nums
 * @return {number}
 */
 var rob = function(nums) {
  //边界条件
  if(nums.length === 0) { return 0; }
  //动态规划
  const dp = [0,nums[0]];//dp[n]表示过去n个房屋能打劫到的最大金额
  for(let i=2;i<=nums.length;i++){
      dp[i] = Math.max(dp[i-2]+nums[i-1],dp[i-1]);//注意这里nums的数组下标从0开始，nums[1]对应的是第2个房间
  }
  //console.log(dp);
  return dp[dp.length-1];
  //return dp[nums.length];
};