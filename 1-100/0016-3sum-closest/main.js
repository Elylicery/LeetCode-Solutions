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

// var res = threeSumClosest([-1,2,1,-4],1);
var res = threeSumClosest([1,1,1,1],0);
console.log(res);