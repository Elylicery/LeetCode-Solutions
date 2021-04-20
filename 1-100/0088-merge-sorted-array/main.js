var merge = function(nums1, m, nums2, n) {
  if(n<=0) return; 

  let point1 = m-1;
  let point2 = n-1;
  for(let i=m+n-1;i>=0;i--){
    //当point1和point2都大于0时
    if(point1>=0 && point2>=0){
      //将较大的元素放在nums1[i]的位置
      if(nums1[point1] > nums2[point2]){
        nums1[i] = nums1[point1];
        point1--;
      }else{
        nums1[i] = nums2[point2];
        point2--;
      }
    //当nums1或nums2还有剩余元素时
    }else if(point2 >=0){
      nums1[i] = nums2[point2];
      point2--;
    }else{
      nums1[i] = nums1[point1];
      point1--;
    }
  }
};