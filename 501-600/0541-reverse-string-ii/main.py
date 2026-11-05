class Solution:
    def reverseStr(self, s: str, k: int) -> str:
        pieces = []
        for i in range(0,len(s),2*k):
            block = s[i:i+k][::-1] + s[i+k:i+2*k]
            pieces.append(block)
        return ''.join(pieces)
