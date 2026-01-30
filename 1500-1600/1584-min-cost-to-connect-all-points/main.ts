
function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  
  // 距离
  const dist = (i: number, j: number): number => {
    return Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
  }

  const minDist = new Array(n).fill(Infinity);
  const inMST = new Array(n).fill(false);
  minDist[0] = 0;
  let mstWeight = 0;

  for (let i = 0; i < n; i++) {
    // 找到未加入MST的点中距离MST最近的点
    let u = -1;
    for (let j = 0; j < n; j++) {
      if(!inMST[j] && (u === -1 || minDist[j] < minDist[u])) {
        u = j;
      }
    }
    // 将该点加入MST
    inMST[u] = true;
    mstWeight += minDist[u];

    // 更新未加入MST的点到MST的距离
    for (let v = 0; v < n; v++) {
      if(!inMST[v]) {
        minDist[v] = Math.min(minDist[v], dist(u, v));
      }
    }
  }

  return mstWeight;

};

const res = minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]);
console.log("res",res);
