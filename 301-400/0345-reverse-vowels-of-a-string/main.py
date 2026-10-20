class Solution:
    def isYuanChar(self, c: str) -> bool:
        return c.lower() in ('a', 'e', 'i', 'o', 'u')

    def reverseVowels(self, s: str) -> str:
        chars = list(s)
        left, right = 0, len(chars) - 1
        while left < right:
            if not self.isYuanChar(chars[left]):
                left += 1
            elif not self.isYuanChar(chars[right]):
                right -= 1
            else:
                chars[left], chars[right] = chars[right], chars[left]
                left += 1
                right -= 1
        return ''.join(chars)
