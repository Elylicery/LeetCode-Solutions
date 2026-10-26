from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)
        needType = len(need)

        n = len(s)
        l = r = 0
        start = 0
        minLen = n + 1

        while r < n:
            c = s[r]
            if c in need:
                need[c] -= 1
                if need[c] == 0:
                    needType -= 1
            # 当前窗口满足条件
            while needType == 0:
                if r - l + 1 < minLen:
                    start, minLen = l, r - l + 1
                # 移动左指针
                leftChar = s[l]
                if leftChar in need:
                    need[leftChar] += 1
                    if need[leftChar] > 0:
                        needType += 1
                l += 1
            r += 1

        if minLen <= n:
            return s[start:start + minLen]
        else:
            return ""
