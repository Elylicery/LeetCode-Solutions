class NumArray:

    def __init__(self, nums: list[int]):
        n = len(nums)
        self.sum_arr = [0] * (n + 1)
        for i in range(1, n + 1):
            self.sum_arr[i] = self.sum_arr[i - 1] + nums[i - 1]

    def sumRange(self, left: int, right: int) -> int:
        return self.sum_arr[right + 1] - self.sum_arr[left]
