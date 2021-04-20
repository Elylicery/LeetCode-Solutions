# Leetcode 88 合并两个有序数组
**思路1：合并后排序**

将两个数组合并后再排序，时间复杂度较差，为O((n+m)log(n+m))，但*这种方法并没有利用到两个数组本身已经有序这一点*

**思路1：双指针/从前往后**

开辟一个新的数组res，长度为m+n，将nums1和nums2归并到res中，然后将res拷贝回给nums1

时间：O(n) 空间O(n)

==**思路2：双指针/从后往前**==

```js
var merge = function(nums1, m, nums2, n) {
  if(n<=0) return; 

  let point1 = m-1;
  let point2 = n-1;
  for(let i=m+n-1;i>=0;i--){
    //当point1和point2都大于0时
    if(point1>=0 && point2>=0){
      //将较大的元素放在nums1[i]的位置
      if(nums1[point1] > nums2[point2]){
        nums1[i] = nums1[point1];
        point1--;
      }else{
        nums1[i] = nums2[point2];
        point2--;
      }
    //当nums1或nums2还有剩余元素时
    }else if(point2 >=0){
      nums1[i] = nums2[point2];
      point2--;
    }else{
      nums1[i] = nums1[point1];
      point1--;
    }
  }
};
```

时间：O(n) 空间:O(1)