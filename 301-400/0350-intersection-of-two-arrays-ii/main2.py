from collections import Counter

class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        short_nums, long_number = (nums1, nums2) if len(nums1) < len(nums2) else (nums2,nums1)
        count_arr = [0] * 1001
        res = []

        for num in short_nums:
            count_arr[num] += 1

        for num in long_number:
            if count_arr[num] > 0:
                res.append(num)
                count_arr[num] -= 1

        return res
