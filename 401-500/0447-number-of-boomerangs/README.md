# Leetcode 447 回旋镖的数量
> 思路：观察到 i 是一个“枢纽”，对于每个点i，遍历其余点到 i 的距离 O(n^2)

![image](../../img/image-20210909155622184.png)

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var computeDistance = function(pa,pb){
  return (pa[0]-pb[0])*(pa[0]-pb[0])  + (pa[1]-pb[1]) *(pa[1]-pb[1]) ;
}

var numberOfBoomerangs = function(points) {

  let res = 0;

  for(let i=0;i<points.length;i++){
    // record种存储 点i 到其他所有点的距离出现的频次
    const record = new Map();
    for(let j=0;j<points.length;j++){
      if(j!=i){
        // 计算距离时不进行开根运算，以保证精度
        const dist = computeDistance(points[i],points[j]);
        record.has(dist) ? record.set(dist,record.get(dist)+1) : record.set(dist,1);
      }
    }
    // 对于每个点 i，到它距离相等的点对的个数
    record.forEach((value,key)=>{
      res += value*(value-1);
    })
  }
  return res;
};
```

```py
class Solution:
    def computeDistance(self, pa: list[int], pb: list[int]) -> int:
        return (pa[0]-pb[0])*(pa[0]-pb[0]) + (pa[1]-pb[1])*(pa[1]-pb[1])

    def numberOfBoomerangs(self, points: list[list[int]]) -> int:
        res = 0
        n = len(points)
        # 遍历数组每个点
        for i in range(n):
            # record中存储 点i 到其他所有点的距离出现的频次
            record = {}
            for j in range(n):
                if j != i:
                    # 计算距离时不进行开根运算，以保证精度
                    dist = self.computeDistance(points[i], points[j])
                    record[dist] = record.get(dist, 0) + 1
            # 对于每个点i，计算到其距离相等的点对个数
            for v in record.values():
                res += v * (v-1)
        return res
```