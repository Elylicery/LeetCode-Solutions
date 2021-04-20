/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
/**
 * 对撞指针
 */
 var twoSum = function(numbers, target) {
  var l = 0,r=numbers.length-1;
  
  var res = [];
  while(l<r){
    if(numbers[l]+numbers[r] === target){
      res = [l+1,r+1];
      return res;
    }
    else if(numbers[l]+numbers[r]<target){
      l++;
    }else{ //numbers[l]+number[r]>target
      r--;
    }
  }
};