# Leetcode 15.三数之和

## 思路一：利用map

建立 字符=> 频次的map映射表，将nums去重后排序。

遍历nums，考虑三数之和为0的情况 * (注意这是在nums有序的情况下)*：

* `a+a+a=0`:只有a=0一种情况
* `a+a+b=0` map中a对应的频次应>=2
* `a+b+b=0` map中b对应的频次应>=2
* `a+b+c=0` a,b,c各不相等

Python 版见 `main.py` 的解法二（用 `Counter` 建频次表）。

```js
/// Using Hash Table to store all the numbers
///
/// Time Complexity: O(n^2)
/// Space Complexity: O(n)
var threeSum = function(nums) {
  //处理特殊情况
  if(nums.length<=2) return [];

  //建立频次映射表
  const map = new Map();
  nums.forEach(n=>{
    map.set(n,map.has(n)? map.get(n)+1:1);
  })

  //map转array后去重并排序
  var set = new Set(nums);
  nums = [...set].sort((a,b)=>{return a-b})

  var res = [];//结果数组
  //特殊情况处理 0+0+0=0（只有这一种情况a=b=c)
  if(map.has(Number(0)) && map.get(Number(0))>=3){
    res.push([0,0,0]);
  }

  //双重循环
  for(let i=0;i<nums.length;i++){
    for(let j=i+1;j<nums.length;j++){
      //a+a+b=0的情况
      if(nums[i]*2+nums[j] === 0 && map.get(nums[i])>=2){
        res.push([nums[i],nums[i],nums[j]]);
      }
      //a+b+b=0的情况
      if(nums[i] +nums[j]*2=== 0 && map.get(nums[j])>=2){
        res.push([nums[i],nums[j],nums[j]]);
      }
      //a+b+c=0的情况
      let c = 0-nums[i]-nums[j];
      if(c>nums[j] && map.get(c)>0){
        res.push([nums[i],nums[j],c]);
      }
    }
  }
  return res;  
};
```

---

## 思路二：排序 + 双指针

不去重直接三重循环是 O(n³) 且难以避免重复三元组。先排序，把问题变成「枚举最小的数 a，再在其右侧区间里用对撞指针找 b + c = -a」：

* 固定 `a = arr[i]`，左指针 `l = i + 1`、右指针 `r = n - 1`；
* `arr[l] + arr[r] < -a` 时 `l++`（和太小），`> -a` 时 `r--`（和太大），相等则记录答案并同时移动两指针；
* 三处跳过重复保证结果不含重复三元组：`i` 只取同值的第一次出现；命中答案后 `l` 向右跨过相同元素、`r` 向左跨过相同元素（有序数组下同值必相邻）。

两条剪枝（都利用排序后 arr[i] 是三元组中最小值这一性质）：

* `arr[i] + arr[i+1] + arr[i+2] > 0`：连当前能凑出的最小和都大于 0，i 再往后只会更大，直接 `break`；
* `arr[i] + arr[n-2] + arr[n-1] < 0`：配上数组里最大的两个数仍然小于 0，说明这个 `i` 无解，`continue` 到下一个。

时间复杂度 O(n²)，除排序和结果外额外空间 O(1)。

```python
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        arr = sorted(nums)
        res = []
        n = len(arr)
        for i in range(0, n - 2):
            # 跳过重复
            if i > 0 and arr[i] == arr[i-1]:
                continue
            # 剪枝
            if arr[i] + arr[i+1] + arr[i+2] > 0:
                break
            if arr[i] + arr[n-2] + arr[n-1] < 0:
                continue
            l, r = i + 1, n - 1
            while l < r:
                target = 0 - arr[i]
                if arr[l] + arr[r] < target:
                    l += 1
                elif arr[l] + arr[r] > target:
                    r -= 1
                else:
                    res.append([arr[i], arr[l], arr[r]])
                    l += 1
                    r -= 1
                    while l < r and arr[l] == arr[l-1]:
                        l += 1
                    while l < r and arr[r] == arr[r+1]:
                        r -= 1
        return res
```