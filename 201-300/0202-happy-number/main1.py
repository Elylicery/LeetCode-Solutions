class Solution:
    def getNext(self, n: int) -> int:
        sum = 0
        while n > 0:
            digit = n % 10
            sum += digit * digit
            n //= 10
        return sum

    # 解法：查找表 set 判重
    # 时间:O(logn)
    # 空间:O(logn)
    def isHappy(self, n: int) -> bool:
        seen = set()
        seen.add(n)

        while n != 1:
            n = self.getNext(n)
            if n in seen:
                return False
            seen.add(n)
        return True
