class Solution:
    # 解法一：排序 + 对撞指针
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        inputs = sorted(nums)

        left = 0
        right = len(inputs) - 1
        while left < right:
            if inputs[left] + inputs[right] > target:
                right -= 1
            elif inputs[left] + inputs[right] < target:
                left += 1
            else:
                i = nums.index(inputs[left])
                if inputs[left] == inputs[right]:
                    j = nums.index(inputs[right], i + 1)
                else:
                    j = nums.index(inputs[right])
                return [i, j]

    # 解法二：哈希表
    def twoSum2(self, nums: list[int], target: int) -> list[int]:
        newMap = {}

        for i, n in enumerate(nums):
            m = target - n
            if m in newMap:
                return [i, newMap[m]]
            else:
                newMap[n] = i
