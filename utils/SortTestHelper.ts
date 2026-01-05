// 1. 判断数组是否已排序（升序）
function isSorted<T>(arr: T[], compareFn?: (a: T, b: T) => boolean): boolean {
  const less = compareFn ?? ((a: T, b: T) => a < b);
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    // 如果 arr[i] > arr[i+1]，即 !(arr[i] <= arr[i+1])，等价于 less(arr[i+1], arr[i])
    if (less(arr[i + 1], arr[i])) {
      return false;
    }
  }
  return true;
}

// 2. 测试排序函数的正确性和性能
function testSort<T>(
  sortName: string,
  sortFn: (arr: T[], compareFn?: (a: T, b: T) => boolean) => void,
  arr: T[],
  compareFn?: (a: T, b: T) => boolean
): void {
  // 深拷贝数组（避免原数组被修改）
  const arrCopy = [...arr];

  const startTime = performance.now();
  sortFn(arrCopy, compareFn);
  const endTime = performance.now();

  // 断言：检查是否排序成功
  if (!isSorted(arrCopy, compareFn)) {
    throw new Error(`${sortName} failed: array is not sorted!`);
  }

  const duration = (endTime - startTime) / 1000; // 转为秒
  console.log(`${sortName}: ${duration.toFixed(4)} s`);
}

/**
 * 生成一个包含 n 个元素的随机整数数组
 * 每个元素的取值范围为 [rangeL, rangeR]（闭区间）
 */
function generateRandomArray(n: number, rangeL: number, rangeR: number): number[] {
  // 断言：确保 rangeL <= rangeR
  if (rangeL > rangeR) {
    throw new Error(`Invalid range: rangeL (${rangeL}) must be <= rangeR (${rangeR})`);
  }

  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    // 生成 [rangeL, rangeR] 之间的随机整数
    const randomNum = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL;
    arr.push(randomNum);
  }
  return arr;
}

const testArray = generateRandomArray(10000,0,10000);


/**
 * 生成一个近乎有序的整数数组（初始为 [0, 1, ..., n-1]），然后随机交换 swapTimes 次
 * @param n 数组长度
 * @param swapTimes 随机交换次数
 * @returns 生成的近乎有序数组
 */
function generateNearlyOrderedArray(n: number, swapTimes: number): number[] {
  // 边界处理
  if (n <= 0) return [];
  if (swapTimes < 0) swapTimes = 0;

  // 1. 初始化有序数组 [0, 1, 2, ..., n-1]
  const arr: number[] = Array.from({ length: n }, (_, i) => i);

  // 2. 执行 swapTimes 次随机交换
  for (let i = 0; i < swapTimes; i++) {
    const posx = Math.floor(Math.random() * n);
    const posy = Math.floor(Math.random() * n);
    
    // 交换 arr[posx] 和 arr[posy]
    [arr[posx], arr[posy]] = [arr[posy], arr[posx]];
  }

  return arr;
}