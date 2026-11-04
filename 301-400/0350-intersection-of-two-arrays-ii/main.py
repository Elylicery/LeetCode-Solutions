from collections import Counter

class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        freq1 = Counter(nums1)
        freq2 = Counter(nums2)
        commonFreq = freq1 & freq2
        return list(commonFreq.elements())

    def intersect2(self, nums1: list[int], nums2: list[int]) -> list[int]:
        shortNums, longNums = (nums1, nums2) if len(nums1) <= len(nums2) else (nums2, nums1)

        freq = Counter(shortNums)
        res = []
        for num in longNums:
            if num in freq:
                res.append(num)
                count = freq[num] - 1
                if count == 0:
                    del freq[num]
                else:
                    freq[num] = count
        return res
