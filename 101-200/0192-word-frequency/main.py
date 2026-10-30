from collections import Counter


def word_freq(text: str) -> Counter:
    return Counter(text.lower().split())
