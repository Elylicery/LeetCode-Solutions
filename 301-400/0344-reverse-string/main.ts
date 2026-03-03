/**
 Do not return anything, modify s in-place instead.
 */
//Time：O(n)
//Space:O(1)
function reverseString(s: string[]): void {
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    [s[i], s[j]] = [s[j], s[i]]; // swap(s[i],s[j]);
    i++;
    j--;
  }
};