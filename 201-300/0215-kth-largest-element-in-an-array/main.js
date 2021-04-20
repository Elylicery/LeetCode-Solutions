/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

function findKthLargestHelper(nums,l,r,k){
  if(l === r) return nums[l];//特殊情况，只有一个元素

  let p = partition(nums,l,r);//找到一个privot
  
  if(p === k){
    return nums[p];
  }else if(k<p){
    return findKthLargestHelper(nums,l,p-1,k);
  }else{//k>p
    return findKthLargestHelper(nums,p+1,r,k);
  }
}

function partition(nums,l,r){
  let p = Math.floor(Math.random()*(r-l+1) +l);//随机选择
  [nums[l],nums[p]] = [nums[p],nums[l]];//swap(nums[l],nums[p]);//nums[l]=p;

  let lt = l + 1;//[l+1....lt)>p; [lt...i)<p
  for(let i=l+1;i<=r;i++){
    if(nums[i]>nums[l]){
      [nums[i],nums[lt]] = [nums[lt],nums[i]];//swap(nums[i],nums[lt++]);
      lt++; 
    }
  }
  [nums[l],nums[lt-1]] = [nums[lt-1],nums[l]];//swap(nums[l],nums[lt-1]);
  return lt-1;
}

var findKthLargest = function(nums, k) {
  return findKthLargestHelper(nums,0,nums.length-1,k-1);
};