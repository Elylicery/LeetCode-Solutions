from collections import Counter

class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        shortNums,longNumber = (nums1, nums2) if len(nums1) < len(nums2) else (nums2,nums1)
        countArr = [0] * 1001
        res = []

        for num in shortNums:
            countArr[num] += 1

        for num in longNumber:
            if countArr[num] > 0:
                res.append(num)
                countArr[num] -= 1

        return res
