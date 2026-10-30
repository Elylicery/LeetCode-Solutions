class Solution:
    def containsNearbyAlmostDuplicate(self, nums: list[int], k: int, t: int) -> bool:
        # 桶宽 t+1：同桶元素值差必 <= t，邻桶需再验证；// 向下取整保证负数分桶正确
        w = t + 1
        buckets: dict[int, int] = {}
        for i, v in enumerate(nums):
            bid = v // w
            if bid in buckets:
                return True
            if bid - 1 in buckets and abs(v - buckets[bid - 1]) <= t:
                return True
            if bid + 1 in buckets and abs(v - buckets[bid + 1]) <= t:
                return True
            buckets[bid] = v
            if i >= k:
                del buckets[nums[i - k] // w]
        return False
