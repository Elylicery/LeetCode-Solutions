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

/// Using HashTable
/// Time Complexity: O(logn)
/// Space Complexity: O(logn)
function isHappy(n: number): boolean {
  const set = new Set<number>();
  set.add(n);

  while (n !== 1) {
    n = getNext(n);
    if (set.has(n)) {
      return false; // 如果出现重复的数字，说明进入了循环，不是快乐数
    }else{
      set.add(n);
    }
  }
  return true; // 如果最终结果是1，说明是快乐数
}

/// Using Fast and Slow Pointers
/// Time Complexity: O(logn)
/// Space Complexity: O(1)

function isHappy2(n: number): boolean {
  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1; 
}
