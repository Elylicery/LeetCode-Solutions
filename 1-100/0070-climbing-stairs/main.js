/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  //特殊情况
  if(n<2) { return 1};
  //动态规划
  const dp = [1,1];//dp数组用来记录第n阶有多少种方法
  for(let i=2;i<=n;i++){
      dp[i] = dp[i-1]+dp[i-2];
  }
  //console.log(dp)
  return dp[n];
};