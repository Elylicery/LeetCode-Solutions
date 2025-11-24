// // 定义 Merger
// interface Merger<E> {
//   merge(a: E, b: E): E;
// }

// class SegmentTree<E> {
//   private tree: (E | null)[];
//   private data: E[];
//   private merger: Merger<E>;

//   constructor(arr: E[], merger: Merger<E>) {
//     this.merger = merger;
//     this.data = [...arr]; // 深拷贝输入数组
//     this.tree = new Array<E | null>(4 * arr.length).fill(null); // 初始化4n空间
//     this.buildSegmentTree(0, 0, this.data.length - 1);
//   }

//   // 构建线段树的递归方法
//   //在treeIndex的位置创建表示区间[1....r]的线段树
//   private buildSegmentTree(treeIndex: number, l: number, r: number): void {
//     if (l === r) {
//       this.tree[treeIndex] = this.data[l];
//       return;
//     }

//     const leftTreeIndex = this.leftChild(treeIndex);
//     const rightTreeIndex = this.rightChild(treeIndex);

//     //int mid = (l+r)/2 为避免l和r都特别大的时候使得l+r产生整形溢出的情况
//     const mid = l + Math.floor((r - l) / 2);
//     this.buildSegmentTree(leftTreeIndex, l, mid);
//     this.buildSegmentTree(rightTreeIndex, mid + 1, r);

//     this.tree[treeIndex] = this.merger.merge(
//       this.tree[leftTreeIndex]!,
//       this.tree[rightTreeIndex]!
//     );
//   }

//   getSize(): number {
//     return this.data.length;
//   }

//   get(index: number): E {
//     if (index < 0 || index >= this.data.length) {
//       throw new Error("Index is illegal.");
//     }
//     return this.data[index];
//   }

//   private leftChild(index: number): number {
//     return 2 * index + 1;
//   }

//   private rightChild(index: number): number {
//     return 2 * index + 2;
//   }

//   //区间查询方法,返回区间[queryL,queryR]的值
//   query(queryL: number, queryR: number): E {
//     if (
//       queryL < 0 ||
//       queryL >= this.data.length ||
//       queryR < 0 ||
//       queryR >= this.data.length ||
//       queryL > queryR
//     ) {
//       throw new Error("Index is illegal");
//     }
//     return this._query(0, 0, this.data.length - 1, queryL, queryR);
//   }

//   // 在以treeIndex为根的线段树中[l,,,,r]的范围里，搜索区间[queryL....qeuryR]的值
//   private _query(
//     treeIndex: number,
//     l: number,
//     r: number,
//     queryL: number,
//     queryR: number
//   ): E {
//     if (l === queryL && r === queryR) {
//       return this.tree[treeIndex]!;
//     }

//     const mid = l + Math.floor((r - l) / 2);
//     const leftTreeIndex = this.leftChild(treeIndex);
//     const rightTreeIndex = this.rightChild(treeIndex);

//     if (queryL >= mid + 1) {
//       return this._query(rightTreeIndex, mid + 1, r, queryL, queryR);
//     } else if (queryR <= mid) {
//       return this._query(leftTreeIndex, l, mid, queryL, queryR);
//     }

//     const leftResult = this._query(leftTreeIndex, l, mid, queryL, mid);
//     const rightResult = this._query(
//       rightTreeIndex,
//       mid + 1,
//       r,
//       mid + 1,
//       queryR
//     );
//     return this.merger.merge(leftResult, rightResult);
//   }

//   printSegementTree(): string {
//     const res: (E | "null")[] = [];
//     for (const node of this.tree) {
//       res.push(node === null ? "null" : node);
//     }
//     return `[${res.join(", ")}]`;
//   }
// }

// // 测试代码
// const nums = [-2, 0, 3, -5, 2, -1];
// const sumMerger: Merger<number> = {
//   merge(a, b) {
//     return a + b;
//   },
// };
// const segTree = new SegmentTree(nums, sumMerger);
// console.log(segTree.printSegementTree());

// // 3. 测试区间查询（新增，验证功能正确性）
// console.log("\n区间查询测试：");
// console.log("区间 [0, 2] 的和：", segTree.query(0, 2)); // 预期：-2 + 0 + 3 = 1
// console.log("区间 [3, 5] 的和：", segTree.query(3, 5)); // 预期：-5 + 2 + (-1) = -4
// console.log("区间 [1, 4] 的和：", segTree.query(1, 4)); // 预期：0 + 3 + (-5) + 2 = 0
// console.log("整个数组的和：", segTree.query(0, 5)); // 预期：-2 + 0 + 3 + (-5) + 2 + (-1) = -3

// class NumArray {
//   private sum: number[];
//   // sum[i] 存储前 i 个元素和（sum[0] = 0），sum[i] = nums[0...i-1] 的和

//   constructor(nums: number[]) {
//     const len = nums.length;
//     this.sum = new Array(len + 1);
//     this.sum[0] = 0; // 初始化前 0 个元素和为 0
//     // 计算前缀和：sum[i] = sum[i-1] + nums[i-1]
//     for (let i = 1; i < this.sum.length; i++) {
//       this.sum[i] = this.sum[i - 1] + nums[i - 1];
//     }
//   }

//   // 计算区间 [i, j] 的和（闭区间），公式：sum[j+1] - sum[i]
//   sumRange(i: number, j: number): number {
//     return this.sum[j + 1] - this.sum[i];
//   }
// }

// const nums1 = [-2, 0, 3, -5, 2, -1];
// const numArray = new NumArray(nums1);

// console.log(numArray.sumRange(0, 2)); // 输出：1（-2 + 0 + 3）
// console.log(numArray.sumRange(3, 5)); // 输出：-4（-5 + 2 + (-1)）
// console.log(numArray.sumRange(0, 5)); // 输出：-3（整个数组和）
