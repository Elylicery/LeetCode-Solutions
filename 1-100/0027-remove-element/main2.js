var removeElement = function(nums, val) {

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