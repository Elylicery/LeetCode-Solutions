from collections import Counter

class Solution:
    def frequencySort(self, s: str) -> str:
        freqList = Counter(s).most_common()
        res = ""
        for c in freqList:
            res += c[0]*c[1]
        return res
