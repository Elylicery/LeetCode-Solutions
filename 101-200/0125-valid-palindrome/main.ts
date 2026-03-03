function isPalindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;

  // 判断是不是字母或数字
  const trueChar = (c: string) => {
    if (
      ("A" <= c && c <= "Z") ||
      ("a" <= c && c <= "z") ||
      ("0" <= c && c <= "9")
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 开始对撞指针
  while (i < j) {
    if (!trueChar(s[i])) {
      i++;
      continue;
    }
    if (!trueChar(s[j])) {
      j--;
      continue;
    }
    if (s[i] === s[j] || s[i].toLowerCase() === s[j].toLowerCase()) {
      i++;
      j--;
    } else {
      return false;
    }
  }

  return true;
}
