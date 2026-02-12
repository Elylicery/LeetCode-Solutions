function removeElement(nums: number[], val: number): number {
  let k = 0 ;//nums中,[0...k)的元素均为非val元素

  //遍历到第i个元素后，保证[0...i]中所有非val元素都按照顺序排列在[0...k)中
  //同时，[k...i]为val
  for(let i=0;i<nums.length;i++){
      if(nums[i]!==val){
          nums[k] = nums[i];
          k++;
      }
  }
  return k;
};