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
