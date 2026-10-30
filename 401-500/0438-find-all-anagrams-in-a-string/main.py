class Solution:
    def same(self, arr1: list[int], arr2: list[int]) -> bool:
        for i in range(26):
            if arr1[i] != arr2[i]: return False
        return True

    def findAnagrams(self, s: str, p: str) -> list[int]:
        res = []
        if len(s) < len(p): return res
        freq_p = [0] * 26
        freq_s = [0] * 26
        for c in p:
            freq_p[ord(c)-ord('a')] += 1

        l = r = 0
        s_n = len(s)
        p_n = len(p)

        while r < s_n:
            freq_s[ord(s[r]) - ord('a')] += 1
            if r - l + 1 > p_n:
                freq_s[ord(s[l])-ord('a')] -= 1
                l += 1
            if r - l + 1 == p_n and self.same(freq_p,freq_s):
                res.append(l)
            r += 1
        return res
