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
