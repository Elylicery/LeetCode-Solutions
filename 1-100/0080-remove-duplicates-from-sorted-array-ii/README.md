# Leetcode80 删除数组中的重复项 ||

**双指针思路**，因为每个元素最多出现两次。

指针i指向新数组的位置，j指向下一个不重复的元素的位置，

len是nums[i]元素重复的次数（小于等于2）

然后将nums[i]~nums[i[+len-1]位置的元素都置为nums[i];

nums[i+len]即为下一个不重复元素写入原数组的起始位置，k为下一个元素在数组中的位置。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

var removeDuplicates = function(nums) {
    
    //找到之后不与nums[index]相等的第一个位置
    function nextIndex(nums,index){  
        for(let i=index;i<nums.length;i++){ 
            if(nums[i]!=nums[index]){
                return i;
            }
        }
        return nums.length;
    }

    var i = 0;
    var j = 0;
    while(j<nums.length){
        //k为下一个与num[j]元素不相同的元素的位置
        let k = nextIndex(nums,j);
        //因为元素最多出现两次，所以len标识元素出现的重复次数
        let len = Math.min(2,k-j);
        for(let ii=0;ii<len;ii++){
            nums[i+ii] = nums[j];//从nums[i]到nums[i+len-1]的元素都置为nums[i](一共len个元素)
        }
        i += len;//nums[len]开始为下一个不重复元置于数组中的位置
        j = k;//下一个不重复元素的起始位置
    }

    return i;
};
```

## 