function intersect(nums1: number[], nums2: number[]): number[] {
  const [shortNums, longNums] = nums1.length <= nums2.length 
    ? [nums1, nums2] 
    : [nums2, nums1];

  const map = new Map<number, number>();
  const res: number[] = [];

  for (const num of shortNums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (const num of longNums) {
    if (map.has(num)) {
      res.push(num);
      const count = map.get(num) as number - 1;
      count === 0 ? map.delete(num) : map.set(num, count);
    }
  }
  return res;
}

// 若数组元素范围较小（如都是 0-1000 的整数），可改用 数组计数 替代 Map（性能更高，因数组访问是 O (1) 且无泛型 / 哈希开销）
function intersectOptimized(nums1: number[], nums2: number[]): number[] {
  const [shortNums, longNums] = nums1.length <= nums2.length 
    ? [nums1, nums2] 
    : [nums2, nums1];

  const countArr = new Array(1001).fill(0); // 假设元素范围 0-1000
  const res: number[] = [];

  // 统计短数组频次
  for (const num of shortNums) {
    countArr[num]++;
  }

  // 匹配长数组
  for (const num of longNums) {
    if (countArr[num] > 0) {
      res.push(num);
      countArr[num]--;
    }
  }

  return res;
}