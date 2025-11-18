function intersection(nums1: number[], nums2: number[]): number[] {
  const set1: Set<number> = new Set(nums1);
  const resultSet: Set<number> = new Set();

  for (const num of nums2) {
    if (set1.has(num)) {
      resultSet.add(num);
    }
  }
  return Array.from(resultSet);
}