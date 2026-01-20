class MyMinHeap {
  private heap: number[] = [];

  constructor() {
    this.heap = [];
  }

  // 返回堆顶元素但不移除它
  peek(): number  {
    return this.heap[0];
  }

  // 插入新元素
  insert(value: number): void {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  // 移除并返回堆顶元素
  extractMin(): number{
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

function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MyMinHeap();
  for (const num of nums) {
    minHeap.insert(num); 
  }
  for (let i = 0; i < nums.length - k; i++) {
    minHeap.extractMin();
  }
  return minHeap.peek();
};

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

console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5