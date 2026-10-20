/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 解法一：排序 + 对撞指针
var twoSum = function(nums, target) {
  //拷贝nums的一个副本
  var oNums = nums.concat();
  //排序
  nums = nums.sort((a,b)=>{return a-b});

  //对撞指针
  let l = 0,r = nums.length-1;
  var res = [];
  while(l<r){
    if(nums[l]+nums[r] === target){
      res[0] = oNums.indexOf(nums[l]);
      res[1] = oNums.lastIndexOf(nums[r]);//防止nums[l]和nums[r]相等的情况
      return res;
    }else if(nums[l]+nums[r]<target){
      l++;
    }else{
      r--;
    }
  }
}

// 解法二：使用查找表
// 时间:O(n)
// 空间:O(n)
var twoSum2 = function(nums, target) {
  const map = new Map();
  for(let i=0;i<nums.length;i++){
    const n = nums[i];
    const n2 = target-n;
    if(map.has(n2)){
      return [map.get(n2),i];
    }else{
      map.set(n,i)
    }
  }
}

var res = twoSum([3,2,4],6);
console.log(res);

var res2 = twoSum2([3,2,4],6);
console.log(res2);

// var res = twoSum([3,3],6);
// console.log(res);//[0,1]
