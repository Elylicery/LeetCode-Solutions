class Solution:
    def areSentencesSimilar(self, sentence1: str, sentence2: str) -> bool:
        a, b = sentence1.split(), sentence2.split()
        if len(a) > len(b):
            a, b = b, a
        while a and a[0] == b[0]:
            _, *a = a
            _, *b = b
        while a and a[-1] == b[-1]:
            *a, _ = a
            *b, _ = b
        return not a

    def areSentencesSimilar2(self, sentence1: str, sentence2: str) -> bool:
        a, b = sentence1.split(), sentence2.split()
        if len(a) > len(b):
            a, b = b, a
        n, m = len(a), len(b)
        i = 0
        while i < n and a[i] == b[i]:
            i += 1
        j = 0
        while j < n - i and a[n - 1 - j] == b[m - 1 - j]:
            j += 1
        return i + j == n
