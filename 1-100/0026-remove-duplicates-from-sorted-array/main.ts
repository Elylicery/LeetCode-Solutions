
function removeDuplicates(nums: number[]): number {
  if(nums == null || nums.length == 0 ) return 0;
  let p = 0;
  let q = 1;
  while(q<nums.length){
      if(nums[p]!== nums[q]){
          nums[p+1] = nums[q];
          p++;
      }
      q++;
  }
  return p+1;
};

console.log(removeDuplicates([1,1,2]));
