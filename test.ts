// function topKFrequent(nums: number[], k: number): number[] {
//   const frequencyMap: Map<number, number> = new Map();

//   // 统计每个元素的频次
//   for (const num of nums) {
//     frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
//   }
//   // 将频次数据转换为数组形式，便于排序
//   const data = [...frequencyMap.entries()];
//   // 按频次从高到低排序
//   data.sort((a, b) => b[1] - a[1]);
//   // 提取前 k 个高频元素
//   const result: number[] = [];
//   for (let i = 0; i < k; i++) {
//     result.push(data[i][0]);
//   }
//   return result;
// };

// function topKFrequent2(nums: number[], k: number): number[] {
//   const frequencyMap: Map<number, number> = new Map();

//   // 统计每个元素的频次
//   for (const num of nums) {
//     frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
//   }

//   class MyMaxHeap<E extends number> {
//     public data: E[];

//     constructor(arr: E[]) {
//       this.data = [...arr];
//       for (let i = this.parent(this.data.length - 1); i >= 0; i--) {
//         this.siftDown(i);
//       }
//     }
//     // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
//     private parent(index: number): number {
//       if (index === 0) {
//         return -1;
//       }
//       return Math.floor((index - 1) / 2);
//     }
//     //  返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
//     private leftChild(index: number): number {
//       return index * 2 + 1;
//     }

//     //返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
//     private rightChild(index: number): number {
//       return index * 2 + 2;
//     }
//     // 下沉调整（维持最大堆特性）
//     private siftDown(k: number): void {
//       const size = this.data.length;
//       // 左孩子索引存在时进入循环
//       while (this.leftChild(k) < size) {
//         let j = this.leftChild(k); // 初始指向左孩子
//         // 右孩子存在且大于左孩子，j指向右孩子
//         if (
//           j + 1 < size &&
//           frequencyMap.get(this.data[j + 1])! > frequencyMap.get(this.data[j])!
//         ) {
//           j++;
//         }
//         // 当前节点 >= 子节点最大值，无需继续下沉
//         if (frequencyMap.get(this.data[k])! >= frequencyMap.get(this.data[j])!) {
//           break;
//         }
//         // 交换当前节点与子节点最大值
//         [this.data[k], this.data[j]] = [this.data[j], this.data[k]];
//         k = j; // 更新索引继续下沉
//       }
//     }

//     // 提取堆顶元素（当前最高频），并调整堆
//     public extractMax(): E {
//       const max = this.data[0];
//       [this.data[0], this.data[this.data.length - 1]] = [
//         this.data[this.data.length - 1],
//         this.data[0],
//       ];
//       this.data.pop();
//       // 下沉调整，维持堆特性
//       this.siftDown(0);
//       return max;
//     }
//   }

//   // 建立堆（优先队列）
//   const data = [...frequencyMap.keys()];

//   // heapify从数组构建最大堆
//   const maxHeap = new MyMaxHeap<number>(data);

//   console.log("heap data", maxHeap.data);

//   // 提取前 k 个高频元素
//   const result: number[] = [];
//   for (let i = 0; i < k; i++) {
//     result.push(maxHeap.extractMax());
//   }
//   return result;
// }

// const res = topKFrequent([1, 1, 1, 2, 2, 3], 2);
// console.log(res);

// const res2 = topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2);
// console.log(res2);

// const res3 = topKFrequent([3, 0, 1, 0], 1);
// console.log(res3);
