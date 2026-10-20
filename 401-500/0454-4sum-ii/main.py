from typing import List


class Solution:
    def fourSumCount(self, nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:
        map = {}

        for c in nums3:
            for d in nums4:
                if c + d in map:
                    map[c + d] += 1
                else:
                    map[c + d] = 1

        ans = 0
        for a in nums1:
            for b in nums2:
                if -(a + b) in map:
                    ans += map[-(a + b)]
        return ans
