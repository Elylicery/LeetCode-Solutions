function countSmaller(nums: number[]): number[] {
  if (nums.length === 1) return [0];
  const count: number[] = new Array(nums.length).fill(0);
  //创建(value,originalIndex)对的数组
  const indexed: Array<{ value: number; index: number }> = nums.map(
    (value, index) => ({ value, index })
  );

  mergeSort(indexed, count, 0, nums.length - 1);
  return count;
}

function mergeSort(
  indexed: Array<{ value: number; index: number }>,
  count: number[],
  l: number,
  r: number
): Array<{ value: number; index: number }> {
  if (l === r) return [indexed[l]];

  const mid = Math.floor((l + r) / 2);
  const left = mergeSort(indexed, count, l, mid);
  const right = mergeSort(indexed, count, mid + 1, r);
  return merge(left, right, count);
}

function merge(
  left: Array<{ value: number; index: number }>,
  right: Array<{ value: number; index: number }>,
  count: number[]
): Array<{ value: number; index: number }> {
  const merged: Array<{ value: number; index: number }> = [];

  let i = 0; // left 指针
  let j = 0; // right 指针
  let rightCount = 0; // 右侧已经放入 merged 的元素数量

  while (i < left.length && j < right.length) {
    if (left[i].value <= right[j].value) {
      // 左<=右，关键：left[i] > 所有已合并的 right 元素（共 rightCount 个）
      count[left[i].index] += rightCount;
      merged.push(left[i]);
      i++;
    } else {
      // right[j] 更小，先放入结果
      merged.push(right[j]);
      rightCount++;// 记录有一个right元素被处理了
      j++;
    }
  }

  // 处理剩余元素
  while (i < left.length) {
    count[left[i].index] += rightCount;
    merged.push(left[i]);
    i++;
  }
  while (j < right.length) {
    merged.push(right[j]);
    j++;
  }

  return merged;
}

console.log(countSmaller([5, 2, 6, 1])); // [2, 1, 1, 0]
console.log(countSmaller([1, 2, 3, 4])); // [0, 0, 0, 0]
console.log(countSmaller([4, 3, 2, 1])); // [3, 2, 1, 0]
