from collections import Counter

class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        freq1 = Counter(nums1)
        freq2 = Counter(nums2)
        common_freq = freq1 & freq2
        return list(common_freq.elements())

    def intersect2(self, nums1: list[int], nums2: list[int]) -> list[int]:
        short_nums, long_nums = (nums1, nums2) if len(nums1) <= len(nums2) else (nums2, nums1)

        freq = Counter(short_nums)
        res = []
        for num in long_nums:
            if num in freq:
                res.append(num)
                count = freq[num] - 1
                if count == 0:
                    del freq[num]
                else:
                    freq[num] = count
        return res
