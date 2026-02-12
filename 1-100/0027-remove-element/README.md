# Leetcode 27.移除元素
**思路1：双指针**

设置指针k，原地移动不等于val的元素

时间：O(n) 空间：O(1)

```js
function removeElement(nums: number[], val: number): number {
  let k = 0 ;//nums中,[0...k)的元素均为非val元素

  //遍历到第i个元素后，保证[0...i]中所有非val元素都按照顺序排列在[0...k)中
  //同时，[k...i]为val
  for(let i=0;i<nums.length;i++){
      if(nums[i]!==val){
          nums[k] = nums[i];
          k++;
      }
  }
  return k;
};
```

**思路2：双指针—— 当要删除的元素很少时**

现在考虑数组包含很少的要删除的元素的情况。例如，`num=[1，2，3，5，4]，Val=4`之前的算法会对前四个元素做不必要的复制操作。另一个例子是 `num=[4，1，2，3，5]，Val=4`似乎没有必要将 `[1，2，3，5]` 这几个元素左移一步，因为问题描述中提到元素的顺序可以更改。

时间：O(n) 空间：O（1）

```js
function removeElement(nums: number[], val: number): number {

  let newl = nums.length;
  let i = 0;
  while(i<newl){
      if(nums[i] === val){
          newl--;
          nums[i] = nums[newl];
      }else{
          i++;
      }
  }
  return newl;
};
```

