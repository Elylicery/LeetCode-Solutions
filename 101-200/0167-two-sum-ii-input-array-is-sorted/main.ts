// 二分搜索优化
function twoSum(numbers: number[], target: number): number[] {
  function binarySearch(
    nums: number[],
    l: number,
    r: number,
    target: number,
  ): number {
    // 二分搜索
    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);
      if (nums[mid] === target) return mid;
      else if (nums[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return -1;
  }

  let res: number[] = [];
  for (let i = 0; i < numbers.length; i++) {
    let j = binarySearch(
      numbers,
      i + 1,
      numbers.length - 1,
      target - numbers[i],
    );
    if (j !== -1) {
      res = [i + 1, j + 1];
    }
  }
  return res;
}


function twoSum2(numbers: number[], target: number): number[] {
  let l = 0, r = numbers.length - 1;

  let res: number[] = [];

  while(l<r){
    if(numbers[l] + numbers[r] === target){
      res = [l+1, r+1];
      return res;
    }else if(numbers[l] + numbers[r] < target){
      l++;
    }else{
      r--;
    }
  }
}