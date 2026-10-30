from collections import Counter


# 解法一：排序 + 双指针（提交用这个，时间 O(n^2)、除结果外额外空间 O(1)）
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        arr = sorted(nums)
        res = []
        n = len(arr)
        for i in range(0, n - 2):
            # 跳过重复
            if i > 0 and arr[i] == arr[i-1]:
                continue
            # 剪枝
            if arr[i] + arr[i+1] + arr[i+2] > 0:
                break
            if arr[i] + arr[n-2] + arr[n-1] < 0:
                continue
            l, r = i + 1, n - 1
            while l < r:
                target = 0 - arr[i]
                if arr[l] + arr[r] < target:
                    l += 1
                elif arr[l] + arr[r] > target:
                    r -= 1
                else:
                    res.append([arr[i], arr[l], arr[r]])
                    l += 1
                    r -= 1
                    while l < r and arr[l] == arr[l-1]:
                        l += 1
                    while l < r and arr[r] == arr[r+1]:
                        r -= 1
        return res


# 解法二：Counter 频次表 + 去重后双重循环，对应 README 的思路一，时间 O(n^2)、空间 O(n)
class Solution2:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        freqMap = Counter(nums)  # 频次表
        res = []
        if 0 in freqMap and freqMap[0] >= 3:
            res.append([0, 0, 0])

        arr = sorted(set(nums))
        n = len(arr)
        for i in range(0, n - 1):
            for j in range(i + 1, n):
                # a+a+b=0
                if arr[i] * 2 + arr[j] == 0 and freqMap[arr[i]] >= 2:
                    res.append([arr[i], arr[i], arr[j]])
                # a+b+b=0
                elif arr[i] + arr[j] * 2 == 0 and freqMap[arr[j]] >= 2:
                    res.append([arr[i], arr[j], arr[j]])
                # a+b+c=0，限定 c > b 以避免重复计数
                else:
                    c = 0 - arr[i] - arr[j]
                    if c > arr[j] and freqMap[c] > 0:
                        res.append([arr[i], arr[j], c])
        return res
