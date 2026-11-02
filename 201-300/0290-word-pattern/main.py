class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()

        if len(pattern) != len(words): return False

        map1 = {} # pattern里字符映射
        map2 = {} # word里单词映射

        n = len(pattern)
        for i in range(n):
            c = pattern[i]
            word = words[i]
            if (c not in map1) and (word not in map2):
                map1[c] = word
                map2[word] = c
            else:
                if c in map1:
                    if map1[c] != word: return False
                if word in map2:
                    if map2[word] != c: return False
        return True
