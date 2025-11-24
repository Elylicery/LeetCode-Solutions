# LeetCode 303. 区域和检索 - 数组不可变

思路：想快速查询某个区间的元素和，而且这个区间中的元素不会改变，对于这样的需求可以进行**预处理**

sum[i] 存储前 i 个元素和（sum[0] = 0），sum[i] = nums[0...i-1] 的和

```typescript
class NumArray {
  private sum: number[];
  // sum[i] 存储前 i 个元素和（sum[0] = 0），sum[i] = nums[0...i-1] 的和

  constructor(nums: number[]) {
    const len = nums.length;
    this.sum = new Array(len + 1);
    this.sum[0] = 0; // 初始化前 0 个元素和为 0
    // 计算前缀和：sum[i] = sum[i-1] + nums[i-1]
    for (let i = 1; i < this.sum.length; i++) {
      this.sum[i] = this.sum[i - 1] + nums[i - 1];
    }
  }

  // 计算区间 [i, j] 的和（闭区间），公式：sum[j+1] - sum[i]
  sumRange(i: number, j: number): number {
    return this.sum[j + 1] - this.sum[i];
  }
}

// 测试代码
const nums1 = [-2, 0, 3, -5, 2, -1];
const numArray = new NumArray(nums1);

console.log(numArray.sumRange(0, 2)); // 输出：1（-2 + 0 + 3）
console.log(numArray.sumRange(3, 5)); // 输出：-4（-5 + 2 + (-1)）
```