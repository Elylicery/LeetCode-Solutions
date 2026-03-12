# LeetCode 349. 两个数组的交集

### 思路：查找问题、利用Set实现

使用set存储第一个数组元素，遍历第二个数组，查找公共元素，利用set自动去重特性

```typescript
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
```

