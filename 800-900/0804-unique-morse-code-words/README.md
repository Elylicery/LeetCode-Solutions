# LeetCode 804. 唯一摩尔斯密码词

思路：遍历字符串数组，对单个字母逐个进行翻译，翻译结果存在Set中，返回set.size，即为不同单词翻译的数量

```typescript
function uniqueMorseRepresentations(words: string[]): number {
  const morseCodeMap: string[] = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];

  const transformations: Set<string> = new Set();

  for (const word of words) {
    let morseTransformation: string = "";
    for (const char of word) {
      const index: number = char.charCodeAt(0) - 'a'.charCodeAt(0);
      morseTransformation += morseCodeMap[index];
    }
    transformations.add(morseTransformation);
  }

  return transformations.size;
}

```