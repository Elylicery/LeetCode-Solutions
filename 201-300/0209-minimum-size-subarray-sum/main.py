class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        l = r = 0
        n = len(nums)
        res = n + 1
        total = 0
        while r < n:
            total += nums[r]
            # 当前窗口满足条件，先记录再收缩左边界
            while total >= target:
                res = min(res, r - l + 1)
                total -= nums[l]
                l += 1
            r += 1
        if res == n + 1:
            return 0
        else:
            return res
