from bisect import insort, bisect_left


class Solution:
    # 时间复杂度: O(nlogk) —— 每个元素在有序窗口里二分查找前驱/后继 O(logk);
    #              注: insort / remove 底层是 list, 挪动元素为 O(k), 严格上界 O(nk)
    # 空间复杂度: O(k) —— 有序窗口最多容纳 k+1 个元素
    def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
        if k<=0 or len(nums) <= 1: return False
        k = min(k,len(nums)-1)
        window = [] # 进入第i轮是 nums[i-k...i-1]
        for i,num in enumerate(nums):
            if len(window) > k:
                window.remove(nums[i-k-1])
            p = bisect_left(window, num)
            if p < len(window) and window[p] - num <=t: # 查后继
                return True
            if p > 0 and num - window[p-1] <= t: # 查前驱
                return True
            insort(window,num)
        return False
