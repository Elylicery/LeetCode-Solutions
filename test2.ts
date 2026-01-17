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


function mergeSort<T extends number | string>(arr: T[]): void {
  if (arr.length <= 1) return;
  __mergeSort(arr, 0, arr.length - 1);
}

//递归使用归并排序，对arr[l....r]的范围进行排序
function __mergeSort<T extends number | string>(arr: T[], l: number, r: number): void {
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);
  __mergeSort(arr, l, mid);
  __mergeSort(arr, mid + 1, r);
  __merge(arr, l, mid, r);
}

//将arr[l...mid]和arr[mid+1...r]两部分进行归并
function __merge<T extends number | string>(arr: T[], l: number, mid: number, r: number): void {
  // 1. 复制到辅助数组 aux（长度 = r - l + 1）
  const aux: T[] = new Array(r - l + 1);
  for (let i = l; i <= r; i++) {
    aux[i - l] = arr[i];
  }

  // 2. 双指针合并回原数组
  let i = l;      // 左半部分指针 [l, mid]
  let j = mid + 1; // 右半部分指针 [mid+1, r]

  for (let k = l; k <= r; k++) {
    if (i > mid) {
      // 左半部分耗尽，取右半部分
      arr[k] = aux[j - l];
      j++;
    } else if (j > r) {
      // 右半部分耗尽，取左半部分
      arr[k] = aux[i - l];
      i++;
    } else if (aux[i - l] < aux[j - l]) {
      // 左 < 右，取左
      arr[k] = aux[i - l];
      i++;
    } else {
      // 左 >= 右，取右（保证稳定性：相等时右后放）
      arr[k] = aux[j - l];
      j++;
    }
  }
}

function insertionSort<T extends number | string>(arr: T[]): void {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const e = arr[i]; // 当前要插入的元素
    let j = i;
    // 向后移动所有大于 e 的元素（升序）
    while (j > 0 && arr[j - 1] > e) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = e; // 插入到正确位置
  }
}


// 对arr[l....r]部分进行partition操作
// 返回p，使得 arr[l...p-1] < arr[p] < arr[p+1...r]
function __partition(arr: number[], l: number, r: number): number {
  const pivot = arr[l];

  let j = l;

  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < pivot) {
      j++;
      [arr[j], arr[i]] = [arr[i], arr[j]]; 
    }
  }

  [arr[l], arr[j]] = [arr[j], arr[l]];
  return j;
}

// 递归快排：对 arr[l...r] 排序
function __quickSort(arr: number[], l: number, r: number): void {
  if (l >= r) return; //递归到底的情况

  const p = __partition(arr, l, r); // 分区，返回 pivot 最终位置
  __quickSort(arr, l, p - 1);       // 递归排序左半部分
  __quickSort(arr, p + 1, r);       // 递归排序右半部分
}

function quickSort(arr: number[]): void {
  if (arr.length <= 1) return;
  __quickSort(arr, 0, arr.length - 1);
}

// 主入口
function quickSort2(arr: number[]): void {
  if (arr.length <= 1) return;
  __quickSort2(arr, 0, arr.length - 1);
}

// 递归快排 + 小数组优化
function __quickSort2(arr: number[], l: number, r: number): void {
  if (r - l <= 15) {
    insertionSortInRange(arr, l, r); //当子数组足够小时，使用插入排序
    return;
  }

  const p = __partition2(arr, l, r);
  __quickSort2(arr, l, p - 1);
  __quickSort2(arr, p + 1, r);
}

// 双指针分区
function __partition2(arr: number[], l: number, r: number): number {
  const randomIndex = Math.floor(Math.random() * (r - l + 1)) + l;
  [arr[l], arr[randomIndex]] = [arr[randomIndex], arr[l]];

  // ✅ 优化部分：arr[l+1....i)<=v;arr[j....r]>=v
  const pivot = arr[l];
  let i = l + 1; // 左指针：寻找 >= pivot 的元素
  let j = r;     // 右指针：寻找 <= pivot 的元素

  while (true) {
    // 向右找到第一个 >= pivot 的元素
    while (i <= r && arr[i] < pivot) i++;
    // 向左找到第一个 <= pivot 的元素
    while (j >= l + 1 && arr[j] > pivot) j--;

    if (i > j) break;

    // 交换逆序对
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }

  // 将 pivot 放到正确位置
  [arr[l], arr[j]] = [arr[j], arr[l]];
  return j;
}

// 插入排序（指定范围 [l, r]）
function insertionSortInRange(arr: number[], l: number, r: number): void {
  for (let i = l + 1; i <= r; i++) {
    const e = arr[i];
    let j = i;
    while (j > l && arr[j - 1] > e) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = e;
  }
}


// 主入口：三路快排
function quickSort3Ways(arr: number[]): void {
  if (arr.length <= 1) return;
  __quickSort3Ways(arr, 0, arr.length - 1);
}

// 三路快排核心：对 arr[l...r] 排序
// 将arr[l...r]分为<v;==v;>v三部分,之后递归对<v;>v两部分继续进行三路快速排序
function __quickSort3Ways(arr: number[], l: number, r: number): void {
  if (r - l <= 15) {
    insertionSortInRange(arr, l, r);
    return;
  }

  const randomIndex = Math.floor(Math.random() * (r - l + 1)) + l;
  [arr[l], arr[randomIndex]] = [arr[randomIndex], arr[l]];
  const pivot = arr[l];

  // 三路划分指针
  let lt = l;      // arr[l+1 ... lt] < pivot
  let gt = r + 1;  // arr[gt ... r] > pivot
  let i = l + 1;   //arr[lt+1....i)==v i是下个循环正在考察的元素

  // 划分过程：[l+1, i) 是 == pivot 的区域
  while (i < gt) {
    if (arr[i] < pivot) {
      // 放入 < 区：与 lt+1 交换
      [arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]];
      lt++;
      i++;
    } else if (arr[i] > pivot) {
      // 放入 > 区：与 gt-1 交换（注意：i 不自增，因为新换来的元素未检查）
      [arr[i], arr[gt - 1]] = [arr[gt - 1], arr[i]];
      gt--;
    } else {
      // == pivot，直接扩展中间区
      i++;
    }
  }

  // 将 pivot (arr[l]) 与 lt 位置交换，使 arr[lt] == pivot
  [arr[l], arr[lt]] = [arr[lt], arr[l]];

  __quickSort3Ways(arr, l, lt - 1);   // < pivot
  __quickSort3Ways(arr, gt, r);       // > pivot
}

// console.log("----Test for Random Array-----")
// const radomArray = generateRandomArray(10000,0,10000);
// testSort("mergeSort", mergeSort, radomArray);
// testSort("insertSort",insertionSort,radomArray);
// testSort("quickSort",quickSort,radomArray);

console.log("----Test for Random Nearly Ordered Array-----")

const nearlyOrderedArray = generateNearlyOrderedArray(10000,10);
testSort("mergeSort", mergeSort, nearlyOrderedArray);
testSort("insertSort",insertionSort,nearlyOrderedArray);

console.log("----Test for Random Array,size=10000,random range[0,10]-----")
const radomArray = generateRandomArray(10000,0,3);
// const radomArray = new Array(1000).fill(5);
testSort("quickSort",quickSort,radomArray);
testSort("quickSort2",quickSort2,radomArray);
testSort("quickSort3Ways",quickSort3Ways,radomArray);
