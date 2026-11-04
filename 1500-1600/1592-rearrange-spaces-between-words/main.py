class Solution:
    def reorderSpaces(self, text: str) -> str:
        words = text.split()
        n_spaces = text.count(" ")
        m = len(words) - 1

        if m == 0:
            return words[0]+" "* n_spaces

        per = n_spaces // m
        end = n_spaces % m

        return (" "*per).join(words) + (" "* end)
