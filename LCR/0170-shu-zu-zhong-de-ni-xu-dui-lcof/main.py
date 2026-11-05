class Solution:
    def mergeSortAndCount(self, arr, l, r, aux) -> int:
        if l >= r: return 0
        mid = l + (r - l) // 2
        count = 0
        count += self.mergeSortAndCount(arr, l, mid, aux)
        count += self.mergeSortAndCount(arr, mid + 1, r, aux)
        count += self.mergeAndCount(arr, l, mid, r, aux)
        return count

    def mergeAndCount(self, arr, l, mid, r, aux) -> int:
        aux[l:r + 1] = arr[l:r + 1]  # [l, r] 复制进 aux
        i, j = l, mid + 1
        count = 0

        for k in range(l, r + 1):
            if i > mid:
                arr[k] = aux[j]; j += 1
            elif j > r:
                arr[k] = aux[i]; i += 1
            elif aux[i] <= aux[j]:
                arr[k] = aux[i]; i += 1
            else:
                arr[k] = aux[j]; j += 1
                # aux[i] > aux[j]，说明从 aux[i] 到 aux[mid] 的所有元素都大于 aux[j]
                count += (mid - i + 1)
        return count

    def reversePairs(self, record: List[int]) -> int:
        n = len(record)
        if n <= 1: return 0
        aux = [0] * n
        return self.mergeSortAndCount(record, 0, n - 1, aux)
