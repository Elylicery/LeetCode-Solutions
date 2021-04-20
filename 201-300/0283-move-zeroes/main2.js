var moveZeroes = function(nums) {

  let k = 0 ;//nums中,[0...k)的元素均为非零元素

  //遍历到第i个元素后，保证[0...i]中所有非0元素都按照顺序排列在[0...k)中
  for(let i=0;i<nums.length;i++){
      if(nums[i]!=0){
          nums[k++] = nums[i];
      }
  }
  //将nums剩余的位置放置为0
  for(let i=k;i<nums.length;i++){
      nums[i] = 0;
  }
  return nums;
};