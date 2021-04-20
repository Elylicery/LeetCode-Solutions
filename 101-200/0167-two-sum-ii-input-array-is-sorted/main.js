/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

/**
 * 二分搜索
*/
 function binarySearch(nums,l,r,target){
  //判断不合法情况
  if(l<0 || l>nums.length){
    throw "l is out of bound";
  }
  if(r<0 || r>nums.length){
    throw "r is out of bound";
  }
  //二分搜索
  while(l<=r){
    let mid = Math.floor(l + (r-l)/2);
    if(nums[mid] === target){
      return mid;
    }
    if(target > nums[mid]){
      l = mid+1;
    }else{
      r = mid-1;
    }
  }
  return -1;
}

var twoSum = function(numbers, target) {
  var res = [];
  for(let i=0;i<numbers.length-1;i++){
    let j = binarySearch(numbers,i+1,numbers.length-1,target-numbers[i]);
    if(j!=-1){
      res = [i+1,j+1];
      return res;
    }
  }

  throw "The input has no solution"
};