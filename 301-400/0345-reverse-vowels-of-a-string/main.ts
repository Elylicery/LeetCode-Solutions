function reverseVowels(s: string): string {

  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  const isAeiou = (c: string) => {
    return vowels.has(c);
  }

  let sArr = s.split("");
  
  // 对撞指针
  let i = 0;
  let j = sArr.length - 1;

  while (i < j) {
    if(!isAeiou(sArr[i])){
      i++;
    }
    if(!isAeiou(sArr[j])){
      j--;
    }
    if(isAeiou(sArr[i]) && isAeiou(sArr[j])){
      [sArr[i], sArr[j]] = [sArr[j], sArr[i]];
      i++;
      j--;
    }
  }
  return sArr.join("");
};

console.log(reverseVowels('leetcode'));
