// Sliding Window
// Time Complexity: O(n)
// Space Complexity: O(1)
function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0,
    r = -1; //初始化空窗口
  let sum = 0;
  let res = nums.length + 1; //初始化结果为不可能的最大值

  while (l < nums.length) {
    if (r + 1 < nums.length && sum < target) {
      //扩大窗口
      r++;
      sum += nums[r];
    } else {
      // 缩小窗口
      sum -= nums[l];
      l++;
    }

    // 每次循环中当满足sum>=target就获得一个新的窗口
    if (sum >= target) {
      res = Math.min(res, r - l + 1);
    }
  }
  return res == nums.length + 1 ? 0 : res; //如果有可能遍历了一遍数组都没有解，就return 0
}
