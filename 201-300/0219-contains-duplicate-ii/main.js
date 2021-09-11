/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {

  if(nums.length<=1) return false;
  if(k<=0) return false;

  let set = new Set();
  for(let i=0;i<nums.length;i++){
    if(set.has(nums[i])){
      return true;
    }

    set.add(nums[i]);
    
    // 保持set中最多有K个元素
    // 因为在下一次循环中会添加一个新元素，使得总共考虑k+1个元素
    if(set.size === k+1){
      set.delete(nums[i-k]);
    }
  }
  return false;

};

// 时间复杂度: O(n)
// 空间复杂度: O(k)