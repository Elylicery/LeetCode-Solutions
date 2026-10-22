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

function removeElement2(nums: number[], val: number): number {

  let newl = nums.length;
  let i = 0;
  while(i<newl){
      if(nums[i] === val){
          newl--;
          nums[i] = nums[newl];
      }else{
          i++;
      }
  }
  return newl;
};

console.log(removeElement([3,2,2,3], 3));
console.log(removeElement2([3,2,2,3], 3));
