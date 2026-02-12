function moveZeroes(nums: number[]): void {

  const nonZeroElements:number[] = [];
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
};

function moveZeroes2(nums: number[]): void {

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
};

var swap = function(nums:number[],i:number,j:number){
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function moveZeroes3(nums: number[]): void {

  let k = 0 ;//nums中,[0...k)的元素均为非零元素

  //遍历到第i个元素后，保证[0...i]中所有非0元素都按照顺序排列在[0...k)中
  //同时，[k...i]为0
  for(let i=0;i<nums.length;i++){
      if(nums[i]!=0){
          swap(nums,k,i);
          k++;
      }
  }
};