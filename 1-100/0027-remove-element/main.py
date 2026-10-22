class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        l, r = 0, 0
        while r < len(nums):
            if nums[r] == val: 
                r += 1
                continue
            nums[l] = nums[r]
            l +=1 
            r +=1
        
        return l
