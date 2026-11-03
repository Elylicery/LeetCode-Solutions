class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        # {[key] : [list]}
        d = {}

        for s in strs:
            key = "".join(sorted(s))
            d.setdefault(key, []).append(s)

        return list(d.values())

    # 计数数组做 key，省去排序：O(n) 时间，key 为 26 位 tuple
    def groupAnagrams2(self, strs: list[str]) -> list[list[str]]:
        # {[cntArr] : [list]}
        cntMap = {}

        for s in strs:
            cnt = [0] * 26
            for c in s:
                cnt[ord(c) - ord('a')] += 1 
            key = tuple(cnt)
            if key in cntMap:
                cntMap[key].append(s)
            else:
                cntMap[key] = [s]

        return list(cntMap.values())
