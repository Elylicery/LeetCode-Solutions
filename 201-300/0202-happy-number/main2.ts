// 计算下一个数字的函数
const getNext = (num: number): number => {
  let sum = 0;
  while (num > 0) {
    const digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
};

/// Using Fast and Slow Pointers
/// Time Complexity: O(logn)
/// Space Complexity: O(1)
function isHappy(n: number): boolean {
  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1; 
}
