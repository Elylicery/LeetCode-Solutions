function removeDuplicates(nums: number[]): number {
  //找到之后不与nums[index]相等的第一个位置
  function nextIndex(nums: number[], index: number): number {
    for (let i = index; i < nums.length; i++) {
      if (nums[i] != nums[index]) {
        return i;
      }
    }
    return nums.length;
  }

  let i = 0; //nums[0...i)为处理过的元素，nums[i]为下一个要处理的元素
  let j = 0; //nums[j...]为未处理的元素，nums[j]为当前正在处理的元素 
  while (j < nums.length) {
    //k为下一个与num[j]元素不相同的元素的位置
    let k = nextIndex(nums, j);
    //因为元素最多出现两次，所以len标识元素出现的重复次数
    let len = Math.min(2, k - j);
    for (let ii = 0; ii < len; ii++) {
      nums[i + ii] = nums[j]; //从nums[i]到nums[i+len-1]的元素都置为nums[i](一共len个元素)
    }
    i += len; //nums[len]开始为下一个不重复元置于数组中的位置
    j = k; //下一个不重复元素的起始位置
  }

  return i;
}
