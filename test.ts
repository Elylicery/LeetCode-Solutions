
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

console.log("123232");



function removeDuplicates2(nums: number[]): number {
    const set = new Set<number>(nums);
    console.log("set",set);
    const arr = Array.from(set);
    console.log("arr",arr);
    return arr.length;
};

console.log(removeDuplicates2([1,1,2]));
