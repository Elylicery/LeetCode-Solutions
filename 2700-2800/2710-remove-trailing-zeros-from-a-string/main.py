class Solution:
    def removeTrailingZeros(self, num: str) -> str:
        return num.rstrip("0") or "0"
