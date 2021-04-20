# LeetCode：417. 太平洋大西洋水流问题

思路解析：

1. 新建两个矩阵 flow1：能流到太平洋的坐标(能流到为true 不能为false) flow2：能流到大西洋的坐标
   * 新建一个m*n的填充值为false的数组 `const flow1 = Array.from({length:m},()=> new Array(n).fill(false)`
2. 沿海岸线DFS遍历图，填充矩阵
   * 太平洋海岸线：matrix(0,0) ~ marrix(0,m)  和 matirx(0,0) ~matirx(n-1,0) 大西洋海岸线 matrix(m-1,0) ~ marrix(m-1,n) 和 matrix(0,n-1) ~ marrix(m-1,n)
   * 遍历的时候某一点[r,c]的相邻节点有四个方向
3. 遍历两个矩阵，收集结果

时间：O(m*n)

空间：O(m*n)

```js
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
    //排除意外情况(矩阵为空 or 不是二维矩阵)))
    if(!matrix || !matrix[0]) { return [];}
    //1.新建两个矩阵
    const m = matrix.length;
    const n = matrix[0].length;
    const flow1 = Array.from({length:m},() => new Array(n).fill(false));//二维矩阵
    const flow2 = Array.from({length:m},() => new Array(n).fill(false));
    //2. DFS
    const dfs = (r,c,flow) =>{
        flow[r][c] = true;
        [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([nr,nc])=>{
            if(
                //保证下一个节点在矩阵中
                nr >=0 && nr < m &&
                nc >=0 && nc < n &&
                //防止死循环
                !flow[nr][nc] &&
                //保证逆流而上
                matrix[nr][nc] >= matrix[r][c]
            ){
                dfs(nr,nc,flow);
            }
        });
    };
    //沿着海岸线逆流而上
    for(let r=0;r<m;r+=1){
        dfs(r,0,flow1);
        dfs(r,n-1,flow2);
    }
    for(let c=0;c<n;c+=1){
        dfs(0,c,flow1);
        dfs(m-1,c,flow2);
    }
    //3.收集能流到两个大洋的坐标
    const res = [];
    for(let r =0;r<m;r+=1){
        for(let c= 0;c<n;c+=1){
            if(flow1[r][c] && flow2[r][c]){
                res.push([r,c]);
            }
        }
    }
    return res;
};
```