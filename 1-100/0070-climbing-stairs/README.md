# LeetCode：70. 爬楼梯 

**思路：动态规划**

```js
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
```

* 时间：O（n）

* 空间：开辟了一个数组存值，O（n）

优化版本：没必要用数组记录动态规划的历史的值，我们可以使用两个值，这样就将空间复杂度降到O（1）常量级别

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    //特殊情况
    if(n<2) { return 1};
    //动态规划
    //使用两个单独的变量 dp0 和 dp1
    let dp0 = 1;
    let dp1 = 1;
    for(let i=2;i<=n;i++){
        const temp = dp0;
        dp0 = dp1;
        dp1 = dp1 + temp;
    }
    return dp1;
};
```