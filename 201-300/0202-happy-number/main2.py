class Solution:
    def getNext(self, n: int) -> int:
        sum = 0
        while n > 0:
            digit = n % 10
            sum += digit * digit
            n //= 10
        return sum

    # 解法：快慢指针判环
    # 时间:O(logn)
    # 空间:O(1)
    def isHappy(self, n: int) -> bool:
        slow = n
        fast = self.getNext(n)

        while fast != 1 and slow != fast:
            slow = self.getNext(slow)
            fast = self.getNext(self.getNext(fast))
        return fast == 1
