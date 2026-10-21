class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        arr = sorted(nums)
        n = len(arr)

        res = []
        for i in range(0, n - 3):
            if i > 0 and arr[i] == arr[i - 1]:
                continue
            numa = arr[i]
            for j in range(i + 1, n - 2):
                if j > i + 1 and arr[j] == arr[j - 1]:
                    continue
                numb = arr[j]

                l, r = j + 1, n - 1

                while l < r:
                    total = numa + numb + arr[l] + arr[r]

                    if total < target:
                        l += 1
                    elif total > target:
                        r -= 1
                    else:
                        res.append([numa, numb, arr[l], arr[r]])
                        l += 1
                        r -= 1
                        while l < r and arr[l] == arr[l - 1]:
                            l += 1
                        while l < r and arr[r] == arr[r + 1]:
                            r -= 1

        return res
