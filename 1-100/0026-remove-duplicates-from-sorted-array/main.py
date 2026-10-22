class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        l, r = 0 , 0

        while r < len(nums):
            if r > 0 and nums[r] == nums[r-1]: 
                r += 1
                continue
            else:
                nums[l] = nums[r]
                l += 1
                r += 1
        
        return l
