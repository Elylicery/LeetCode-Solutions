# Leetcode 11 乘最多水的容器

### **思路1：暴力法**

双重for循环，找到所有可能的左右区间。每次都计算面积并保存最大值

```js
/// Brute Force
/// Time Complexity: O(n^2)
/// Space Complexity: O(1)
var maxArea = function(height) {
  if(height.length <2) return;

  var area = 0;
  for(let i=0;i<height.length;i++){
    for(let j=i+1;j<height.length;j++){
      area = Math.max(area,Math.min(height[i],height[j])*(j-i));
    }
  }
  return area;
};
```

### **思路2：双指针**

> **双指针：**
>
> - 关键字：左右两边
> - 模式识别：需要移动左右两头的问题可以考虑双指针
> - 难点：如何移动指针
>   - 相同情况下两边距离越远越好
>   - 区域受限于较短边

- 问题转化：求`min(a[l],a[r])∗(r−l)`的最大值
- 对撞指针策略
  - 初始：l=0,r=size−1
  - 移动规则：每次移动高度较小的指针（因为容量受限于较小高度）
- 复杂度：O(n)时间复杂度，O(1)空间复杂度

```js
function maxArea(height: number[]): number {
  let maxArea = 0;

  let l = 0;
  let r = height.length - 1;

  // 对撞指针
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    if (area > maxArea) {
      maxArea = area;
    }
    // 移动较小的指针
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return maxArea;
}

```

