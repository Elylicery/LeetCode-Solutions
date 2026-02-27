function sortColors(nums: number[]): void {
  const count = [0, 0, 0]; // count[0]、count[1]、count[2]分别记录0、1、2的数量

  for (let i = 0; i < nums.length; i++) {
    count[nums[i]]++;
  }

  let index = 0;

  for(let i=0;i<count[0];i++){
      nums[index] = 0;
      index++;
  }
  for(let i=0;i<count[1];i++){
      nums[index] = 1;
      index++;
  }
  for(let i=0;i<count[2];i++){
      nums[index] = 2;
      index++;
  }
}


function sortColors1(nums: number[]): void {

  // 交换元素的函数
  function swap(nums: number[], i: number, j: number): void {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  // 三路快排思路
  let zero = -1; // nums[0...zero] == 0
  let two = nums.length; // nums[two...n-1] == 2

  for (let i = 0; i < two; ) {
    if(nums[i] === 1) {
      i++;
    }else if(nums[i] === 2) {
      swap(nums, i, two - 1);
      two --;
    }else{
      // nums[i] === 0
      swap(nums, i, zero + 1);
      zero++;
      i++;
    }
  }
}
