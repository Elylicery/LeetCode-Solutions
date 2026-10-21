class Solution:
    def threeSumClosest(self, nums: list[int], target: int) -> int:
        arr = sorted(nums)

        res = nums[0] + nums[1] + nums[2]
        for i, num in enumerate(arr):
            l = i + 1
            r = len(arr) - 1
            while l < r:
                # 固定一个数 + 双指针
                cur = num + arr[l] + arr[r]
                if cur == target:
                    return target
                else:
                    if abs(cur - target) < abs(res - target):
                        res = cur
                    if cur <= target:
                        l += 1
                    else:
                        r -= 1

        return res
