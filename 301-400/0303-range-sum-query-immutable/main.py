class NumArray:

    def __init__(self, nums: list[int]):
        n = len(nums)
        self.sumArr = [0] * (n + 1)
        for i in range(1, n + 1):
            self.sumArr[i] = self.sumArr[i - 1] + nums[i - 1]

    def sumRange(self, left: int, right: int) -> int:
        return self.sumArr[right + 1] - self.sumArr[left]
