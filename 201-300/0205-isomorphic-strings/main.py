class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t): return False

        rule_map = [-1] * 256 # 字符映射规则
        mapped = [False] * 256 # 某字符是否已经映射

        n = len(s)
        for i in range(n):
            if rule_map[ord(s[i])] == -1:
                if mapped[ord(t[i])]: return False
                rule_map[ord(s[i])] = t[i]
                mapped[ord(t[i])] = True
            elif rule_map[ord(s[i])] != t[i]:
                return False
        return True
