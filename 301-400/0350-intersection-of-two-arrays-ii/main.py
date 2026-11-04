from collections import Counter

class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        freq1 = Counter(nums1)
        freq2 = Counter(nums2)
        commonFreq = freq1 & freq2
        return list(commonFreq.elements())
