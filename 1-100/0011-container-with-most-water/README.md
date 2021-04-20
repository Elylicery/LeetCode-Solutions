# Leetcode 11 乘最多水的容器


**思路1：暴力法**

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

**思路2：双指针**

> **双指针：**
> - 关键字：左右两边
> - 模式识别：需要移动左右两头的问题可以考虑双指针
> - 难点：如何移动指针
>   - 相同情况下两边距离越远越好
>   - 区域受限于较短边

```js
/// Two Pointers
/// Time Complexity: O(n)
/// Space Complexity: O(1)
var maxArea = function(height) {
  if(height.length<2) return;

  let l =0,r = height.length-1;
  var area = 0;
  while(l<r){
    area = Math.max(area,Math.min(height[l],height[r])*(r-l));
    if(height[l]<height[r]){
      l++;
    }else{
      r--;
    }
  }
  return area;
};
```

