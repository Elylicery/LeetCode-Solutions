/**
 * 迭代
 * 时间复杂度为 O(n2),空间复杂度为 O(n)
 */
function hasSameDigits2(s: string): boolean {
  let newStr = s;
  while (newStr.length > 2) {
    let res = "";
    for (let i = 0; i + 1 < newStr.length; i++) {
      res += ((Number(newStr[i]) + Number(newStr[i + 1])) % 10).toString();
    }
    newStr = res;
  }
  return newStr[0] === newStr[1];
}

/**
 * 压缩模拟
 * 时间复杂度为 O(n2),空间复杂度为 O(1)
 */
function hasSameDigits(s: string): boolean {
  let n = s.length;
  let arr: string[] = s.split("");

  for (let i = 1; i <= n - 2; i++) {
    for (let j = 0; j <= n - 1 - i; j++) {
      arr[j] = String((parseInt(arr[j]) + parseInt(arr[j + 1])) % 10);
    }
  }
  return arr[0] === arr[1];
}

console.log(hasSameDigits("3902"));
console.log(hasSameDigits("34789"));
