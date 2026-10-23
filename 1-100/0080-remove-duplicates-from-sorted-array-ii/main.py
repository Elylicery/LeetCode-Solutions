class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:

        # 找到不与nums[index]相等的第一个位置
        def nextIndex(nums:list[int],index:int):
            for i in range(index, len(nums)):
                if nums[i] != nums[index]: return i
            return len(nums)

        i,j = 0, 0
        k = 0
        while j < len(nums):
            k = nextIndex(nums,j)
            cnt = min(2,k-j)
            for ii in range(cnt):
                nums[i+ii] = nums[j]
            i += cnt
            j = k
        return i
