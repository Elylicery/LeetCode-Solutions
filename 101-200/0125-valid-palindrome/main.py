class Solution:
    @staticmethod
    def isValidChar(c: str) -> bool:
        if 'A' <= c <= 'Z' or 'a' <= c <= 'z' or '0' <= c <= '9':  # isalnum()
            return True
        else:
            return False

    def isPalindrome(self, s: str) -> bool:
        l = 0
        r = len(s) - 1
        while l < r:
            if not self.isValidChar(s[l]):
                l += 1
            elif not self.isValidChar(s[r]):
                r -= 1
            elif s[l].lower() == s[r].lower():
                l += 1
                r -= 1
            else:
                return False

        return True
