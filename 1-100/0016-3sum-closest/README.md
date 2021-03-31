# Leetcode 16. 最接近的三数之和

本题与 15. 三数之和 非常类似

**思路:排序+双指针**

要求找到target 最接近的三元组，这里的「最接近」即为差值的绝对值最小。我们可以考虑直接使用三重循环枚举三元组，找出与目标值最接近的作为答案，时间复杂度为 O(N^3)然而本题的 N最大为 1000，会超出时间限制。

本思路：首先考虑枚举第一个元素 a，对于剩下的两个元素 b 和 cc，我们希望它们的和最接近target−a。对于 b 和 c，考虑对整个数组进行升序排序，这样能缩小b和c的枚举范围：
* 假设数组的长度为 n，我们先枚举 a，它在数组中的位置为 i；
* 为了防止重复枚举，我们在位置 [i+1, n)的范围内枚举 b 和 c。

<font color=red>当我们知道了 b 和 c 可以枚举的下标范围，并且知道这一范围对应的数组元素是有序（升序）的，那么我们是否可以对枚举的过程进行优化呢？
</font>

**借助双指针，我们就可以对枚举的过程进行优化**。我们用 pb
和pc分别表示指向 b 和 c 的指针，初始时，pb指向位置 i+1，即左边界；pc指向位置 n-1，即右边界。在每一步枚举的过程中，用 a+b+c来更新答案，并且：
* 若`a+b+c>=target`,则`pc--`
* 若`a+b+c<target`,则`pb--`

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
   nums.sort((a,b)=>a-b);
   const n = nums.length;
   let best = 10000000;

   //枚举a
   for(let i=0;i<n;i++){
     //保证和上一次枚举的元素不相等
     if(i>0 && nums[i] === nums[i-1]){
       continue;
     }
     //使用双指针枚举b和c
     let pb = i+1,pc=n-1;
     while(pb<pc){
       let sum = nums[i]+nums[pb]+nums[pc];
       //如果和为target直接返回答案
       if(sum===target){
         return target;
       }
       //根据差值的绝对值来更新答案
       if(Math.abs(sum-target) < Math.abs(best-target)){
         best = sum;
       }
       if(sum>target){
         // 如果和大于 target，移动 c 对应的指针
         let pc0 = pc-1;
         //移动到下一个不相等的元素
         while(pc<pc0 && nums[pc0]===nums[pc]){
           --pc0;
         }
         pc = pc0;
       }else{
         //如果和小于 target，移动 b 对应的指针
         let pb0 = pb+1;
         while(pb0<pc && nums[pb0]===nums[pb]){
           ++pb0;
         }
         pb = pb0;
       }
     }
   }
   return best;
};
````

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/3sum-closest/solution/zui-jie-jin-de-san-shu-zhi-he-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。