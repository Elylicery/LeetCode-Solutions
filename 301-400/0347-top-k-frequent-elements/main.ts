function topKFrequent(nums: number[], k: number): number[] {
  const frequencyMap: Map<number, number> = new Map();

  // 统计每个元素的频次
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }
  // 将频次数据转换为数组形式，便于排序
  const data = [...frequencyMap.entries()];
  // 按频次从高到低排序
  data.sort((a, b) => b[1] - a[1]);
  // 提取前 k 个高频元素
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    result.push(data[i][0]);
  }
  return result;
}

function topKFrequent2(nums: number[], k: number): number[] {
  function topKFrequentMinHeap(nums: number[], k: number): number[] {
    const frequencyMap: Map<number, number> = new Map();

    // 步骤1：统计每个元素的频次（与原逻辑一致）
    for (const num of nums) {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // 最小堆类：核心是「堆顶为当前堆中频次最小的元素」
    class MyMinHeap<E extends number> {
      public data: E[];

      constructor() {
        this.data = []; // 初始为空堆，后续手动添加前k个元素
      }

      // 父节点索引（与最大堆一致）
      private parent(index: number): number {
        if (index === 0) {
          return -1;
        }
        return Math.floor((index - 1) / 2);
      }

      // 左孩子索引（与最大堆一致）
      private leftChild(index: number): number {
        return index * 2 + 1;
      }

      // 右孩子索引（与最大堆一致）
      private rightChild(index: number): number {
        return index * 2 + 2;
      }

      // 上浮调整：最小堆特性（当前节点 < 父节点时，交换上浮）
      private siftUp(k: number): void {
        // 循环条件：非根节点 + 当前节点频次 < 父节点频次
        while (
          k > 0 &&
          frequencyMap.get(this.data[k])! <
            frequencyMap.get(this.data[this.parent(k)])!
        ) {
          const parentIdx = this.parent(k);
          [this.data[k], this.data[parentIdx]] = [
            this.data[parentIdx],
            this.data[k],
          ];
          k = parentIdx;
        }
      }

      // 下沉调整：最小堆特性（当前节点 > 子节点最小值时，交换下沉）
      private siftDown(k: number): void {
        const size = this.data.length;
        while (this.leftChild(k) < size) {
          let j = this.leftChild(k); // 初始指向左孩子
          // 右孩子存在且频次 < 左孩子，j指向右孩子（找子节点中频次最小的）
          if (
            j + 1 < size &&
            frequencyMap.get(this.data[j + 1])! <
              frequencyMap.get(this.data[j])!
          ) {
            j++;
          }
          // 当前节点频次 <= 子节点最小值，无需继续下沉（满足最小堆）
          if (
            frequencyMap.get(this.data[k])! <= frequencyMap.get(this.data[j])!
          ) {
            break;
          }
          // 交换当前节点与子节点最小值
          [this.data[k], this.data[j]] = [this.data[j], this.data[k]];
          k = j;
        }
      }

      // 添加元素到堆（尾部添加 + 上浮调整）
      public add(e: E): void {
        this.data.push(e);
        this.siftUp(this.data.length - 1);
      }

      // 提取堆顶元素（频次最小的元素）
      public extractMin(): E {
        const min = this.data[0];
        // 交换堆顶与尾部元素，删除尾部（堆顶）
        [this.data[0], this.data[this.data.length - 1]] = [
          this.data[this.data.length - 1],
          this.data[0],
        ];
        this.data.pop();
        this.siftDown(0);
        return min;
      }

      // 获取堆顶元素（不删除）
      public getMin(): E {
        return this.data[0];
      }

      // 获取堆大小
      public size(): number {
        return this.data.length;
      }
    }

    // 步骤2：构建最小堆（核心逻辑调整）
    const minHeap = new MyMinHeap<number>();
    const uniqueNums = [...frequencyMap.keys()]; // 所有不同元素

    // 2.1 先添加前k个元素到堆
    for (let i = 0; i < k; i++) {
      minHeap.add(uniqueNums[i]);
    }

    // 2.2 遍历剩余元素：若元素频次 > 堆顶频次（当前堆中最小频次），则替换堆顶
    for (let i = k; i < uniqueNums.length; i++) {
      const currentNum = uniqueNums[i];
      // 当前元素频次 > 堆顶元素频次，说明堆顶不属于Top k，替换并调整
      if (frequencyMap.get(currentNum)! > frequencyMap.get(minHeap.getMin())!) {
        minHeap.extractMin(); // 删除堆顶（最小频次元素）
        minHeap.add(currentNum); // 添加当前元素
      }
    }

    // 步骤3：堆中剩余的k个元素就是Top k高频元素（堆内无序，需返回数组）
    return minHeap.data;
  }
}

const res = topKFrequent2([1, 1, 1, 2, 2, 3], 2);
console.log(res);

const res2 = topKFrequent2([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2);
console.log(res2);

const res3 = topKFrequent2([3, 0, 1, 0], 1);
console.log(res3);
