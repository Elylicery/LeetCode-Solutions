from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)
        need_type = len(need)

        n = len(s)
        l = r = 0
        start = 0
        min_len = n + 1

        while r < n:
            c = s[r]
            if c in need:
                need[c] -= 1
                if need[c] == 0:
                    need_type -= 1
            # 当前窗口满足条件
            while need_type == 0:
                if r - l + 1 < min_len:
                    start, min_len = l, r - l + 1
                # 移动左指针
                left_char = s[l]
                if left_char in need:
                    need[left_char] += 1
                    if need[left_char] > 0:
                        need_type += 1
                l += 1
            r += 1

        if min_len <= n:
            return s[start:start + min_len]
        else:
            return ""
