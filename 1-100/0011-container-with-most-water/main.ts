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
    // 移动较小的指针,
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return maxArea;
}
