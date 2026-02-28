function partition(nums: number[], l: number, r: number): number {
  let p = l + Math.floor(Math.random() * (r - l + 1)); // 随机选择一个基准

  [nums[l], nums[p]] = [nums[p], nums[l]]; // 将基准交换到开头

  let lt = l + 1; //[l+1,lt) >p, [lt,i) <p
  for (let i = l + 1; i <= r; i++) {
    if (nums[i] > nums[l]) {
      [nums[i], nums[lt]] = [nums[lt], nums[i]]; // 将大于基准的元素交换到 lt 位置
      lt++;
    }
  }
  [nums[l], nums[lt - 1]] = [nums[lt - 1], nums[l]]; // 将基准放到正确位置
  return lt - 1;
}

function findKthLargestHelper(
  nums: number[],
  l: number,
  r: number,
  k: number,
): number {
  if (l === r) return nums[l]; //特殊情况，只有一个元素

  let p = partition(nums, l, r); // 获取基准位置

  if (k === p) {
    return nums[p];
  } else if (k < p) {
    return findKthLargestHelper(nums, l, p - 1, k); // 在左侧继续查找
  } else {
    return findKthLargestHelper(nums, p + 1, r, k); // 在右侧继续查找
  }
}

// partition 版本
function findKthLargest(nums: number[], k: number): number {
  return findKthLargestHelper(nums, 0, nums.length - 1, k - 1); // k-1 因为索引从 0 开始
}

// 三路分区优化版
function findKthLargestHelperQuick3Way(
  nums: number[],
  l: number,
  r: number,
  k: number,
): number {
  if (l >= r) return nums[l]

  // 三路分区：[l+1, lt) > pivot, [lt, gt) == pivot, [gt, r] < pivot
  const rand = l + Math.floor(Math.random() * (r - l + 1));
  [nums[l], nums[rand]] = [nums[rand], nums[l]];

  const pivot = nums[l];
  let lt = l + 1; // 大于 pivot 的右边界
  let gt = r; // 小于 pivot 的左边界

  let i = l + 1;
  while (i <= gt) {
    if (nums[i] > pivot) {
      [nums[i], nums[lt]] = [nums[lt], nums[i]];
      lt++;
      i++;
    }else if (nums[i] < pivot) {
      [nums[i], nums[gt]] = [nums[gt], nums[i]];
      gt--;
      // i不变，因为交换过来的元素还未检查
    }else{
      i++; //等于pivot，跳过
    }
  }
  
  // 将pivot放到中间正确位置
  [nums[l], nums[lt - 1]] = [nums[lt - 1], nums[l]];
  const pivotLeft = lt - 1; // pivot的区间左边界
  const pivotRight = gt; // pivot的区间右边界
  
  // 三路决策
  if(k<pivotLeft){
    return findKthLargestHelperQuick3Way(nums, l, pivotLeft - 1, k);
  }else if(k>pivotRight){
    return findKthLargestHelperQuick3Way(nums, pivotRight + 1, r, k);
  }else{
    return nums[k]; // k在pivot区间内，直接返回
  }
}

function findKthLargest1(nums: number[], k: number): number {
  return findKthLargestHelperQuick3Way(nums, 0, nums.length - 1, k - 1); 
}

class MyMinHeap {
  private heap: number[] = [];

  constructor() {
    this.heap = [];
  }

  // 返回堆顶元素但不移除它
  peek(): number {
    return this.heap[0];
  }

  // 插入新元素
  insert(value: number): void {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  // 移除并返回堆顶元素
  extractMin(): number {
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.shiftDown(0);
    }
    return min;
  }

  // 上浮：从索引 k 向上调整
  private shiftUp(k: number): void {
    while (k > 0) {
      const parent = Math.floor((k - 1) / 2);
      if (this.heap[parent] <= this.heap[k]) break;
      [this.heap[parent], this.heap[k]] = [this.heap[k], this.heap[parent]];
      k = parent;
    }
  }

  // 下沉：从索引 k 向下调整
  private shiftDown(k: number): void {
    while (2 * k + 1 < this.heap.length) {
      let j = 2 * k + 1; // 左子节点索引
      if (j + 1 < this.heap.length && this.heap[j + 1] < this.heap[j]) {
        j++; // 右子节点更小
      }
      if (this.heap[k] <= this.heap[j]) break;
      [this.heap[k], this.heap[j]] = [this.heap[j], this.heap[k]];
      k = j;
    }
  }
}

// 最小堆版本
function findKthLargest3(nums: number[], k: number): number {
  const minHeap = new MyMinHeap();
  for (const num of nums) {
    minHeap.insert(num);
  }
  for (let i = 0; i < nums.length - k; i++) {
    minHeap.extractMin();
  }
  return minHeap.peek();
}

// 使用 LeetCode 提供的最小堆 API
// import { MinPriorityQueue } from '@datastructures-js/priority-queue';
// function findKthLargest2(nums: number[], k: number): number {
//   // 创建最小堆（LeetCode 内置）
//   const minHeap = new MinPriorityQueue<number>();

//   for (const num of nums) {
//     minHeap.enqueue(num);           // 插入元素
//     if (minHeap.size() > k) {
//       minHeap.dequeue();            // 弹出最小值，保持堆大小为 k
//     }
//   }

//   // 堆顶即为第 k 大的元素
//   return minHeap.front();
// }

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
