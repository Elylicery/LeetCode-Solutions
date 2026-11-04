class Solution:
    def sortColors(self, nums: list[int]) -> None:
        count = [0,0,0]
        for num in nums:
            count[num] +=1

        n0,n1,n2 = count
        nums[:] = [0]*n0 + [1]*n1 + [2]*n2
