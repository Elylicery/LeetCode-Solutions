class Solution:
    def mergeSortAndCount(self, arr, l, r, aux) -> int:
        if l >= r: return 0
        mid = l + (r - l) // 2
        count = 0
        count += self.mergeSortAndCount(arr, l, mid, aux)
        count += self.mergeSortAndCount(arr, mid + 1, r, aux)
        count += self.countReversePairs(arr, l, mid, r)  # 先数
        self.merge(arr, l, mid, r, aux)                  # 后合并
        return count

    def countReversePairs(self, arr, l, mid, r) -> int:
        count = 0
        j = mid + 1
        for i in range(l, mid + 1):
            while j <= r and arr[i] > 2 * arr[j]:
                j += 1
            count += j - (mid + 1)
        return count

    def merge(self, arr, l, mid, r, aux) -> None:
        aux[l:r + 1] = arr[l:r + 1]
        i, j = l, mid + 1
        for k in range(l, r + 1):
            if i > mid:
                arr[k] = aux[j]; j += 1
            elif j > r:
                arr[k] = aux[i]; i += 1
            elif aux[i] <= aux[j]:
                arr[k] = aux[i]; i += 1
            else:
                arr[k] = aux[j]; j += 1

    def reversePairs(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1: return 0
        aux = [0] * n
        return self.mergeSortAndCount(nums, 0, n - 1, aux)
