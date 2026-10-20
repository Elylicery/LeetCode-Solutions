class Solution:
    def maxArea(self, height: list[int]) -> int:
        n = len(height)
        l, r = 0 , n -1
        res = 0

        while(l<r):
            cur = (r - l) * min(height[r],height[l])
            res = max(res, cur)
            if height[l] < height[r]:
                l += 1
            else:
                r -=1

        return res
