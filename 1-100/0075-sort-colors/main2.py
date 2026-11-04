class Solution:
    def sortColors(self, nums: list[int]) -> None:
        zero = -1   # nums[0...zero] == 0
        two = len(nums)  # nums[two...n-1] == 2
        i = 0

        while i < two:
            if nums[i] == 1:
                i += 1
            elif nums[i] == 2:
                nums[i], nums[two - 1] = nums[two - 1], nums[i]
                two -= 1
            else:
                nums[i], nums[zero + 1] = nums[zero + 1], nums[i]
                zero += 1
                i += 1
