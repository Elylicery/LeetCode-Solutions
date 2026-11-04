class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        new_map = {}
        res = 0

        n = len(s)
        l, r = 0, 0
        while r < n:
            if s[r] in new_map:
                l = max(l, new_map[s[r]] + 1)
            new_map[s[r]] = r
            res = max(r - l + 1, res)
            r += 1

        return res
