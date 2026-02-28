function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if(n === 0) return;

  let point1 = m-1;
  let point2 = n-1;

  for(let i = m+n-1; i >= 0; i--){
    // point1 和 point2 都有效，比较 nums1[point1] 和 nums2[point2]
    // 将较大的元素放在nums1[i]的位置
    if(point1 >=0 && point2 >= 0){
      if(nums1[point1] > nums2[point2]){
        nums1[i] = nums1[point1];
        point1--;
      }else{
        nums1[i] = nums2[point2];
        point2--;
      }
    }
    // 当nums1或nums2还有剩余元素时
    else if(point1 >= 0){
      nums1[i] = nums1[point1];
      point1--;
    }else{
      nums1[i] = nums2[point2];
      point2--;
    }
  }
};