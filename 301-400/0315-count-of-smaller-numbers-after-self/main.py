class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        n = len(nums)
        count = [0] * n
        # 排序 (value, index) 对，index 保留原始位置，计数才能累加到正确下标
        indexed = [[nums[i], i] for i in range(n)]
        self.mergeSort(indexed, count, 0, n - 1)
        return count

    def mergeSort(self, indexed, count, l, r) -> list:
        if l >= r:
            return [indexed[l]] if l == r else []
        mid = l + (r - l) // 2
        left = self.mergeSort(indexed, count, l, mid)
        right = self.mergeSort(indexed, count, mid + 1, r)
        return self.merge(left, right, count)

    def merge(self, left, right, count):
        merged = []
        i, j = 0, 0
        rightCount = 0  # 已并入结果的 right 元素个数，都严格小于当前 left 元素
        while i < len(left) and j < len(right):
            if left[i][0] <= right[j][0]:
                count[left[i][1]] += rightCount
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                rightCount += 1
                j += 1
        while i < len(left):
            count[left[i][1]] += rightCount
            merged.append(left[i])
            i += 1
        while j < len(right):
            merged.append(right[j])
            j += 1
        return merged
