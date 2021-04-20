/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {

  const nonZeroElements = [];
  //将nums中所有非零元素放入nonZeroElements中
  nums.forEach((item)=>{
      if(item!==0){
          nonZeroElements.push(item);
      }
  })
  //将nonZeroElements中所有元素一次放入到nums开始的位置
  var nonZeroLength = nonZeroElements.length;
  for(let i=0;i<nonZeroLength;i++){
      nums[i] = nonZeroElements[i];
  }
  //将nums剩余位置放0
  for(let i=nonZeroLength;i<nums.length;i++){
      nums[i] = 0;
  }

  return nums;
};