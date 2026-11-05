class Solution:
    def reverseWords(self, s: str) -> str:
        words = s.split()[::-1]
        return " ".join(words)
