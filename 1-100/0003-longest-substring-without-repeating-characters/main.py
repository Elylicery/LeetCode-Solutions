class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        newMap = {}
        res = 0

        n = len(s)
        l, r = 0, 0
        while r < n:
            if s[r] in newMap:
                l = max(l, newMap[s[r]] + 1)
            newMap[s[r]] = r
            res = max(r - l + 1, res)
            r += 1

        return res
