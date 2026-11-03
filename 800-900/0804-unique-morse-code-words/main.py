class Solution:
    def uniqueMorseRepresentations(self, words: list[str]) -> int:
        morseCodes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]

        res = set()
        for word in words:
            wordCodeStr = ''
            for c in word:
                wordCodeStr += morseCodes[ord(c)-ord('a')]
            res.add(wordCodeStr)
        return len(res)
