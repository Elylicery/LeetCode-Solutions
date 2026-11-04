class Solution:
    def uniqueMorseRepresentations(self, words: list[str]) -> int:
        morse_codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]

        res = set()
        for word in words:
            res.add(''.join(morse_codes[ord(c)-ord('a')] for c in word))
        return len(res)
