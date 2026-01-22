// 高效并查集（带路径压缩+按秩合并）
class MyUnionFind {
  private parent: number[];
  private rank: number[];
  private count: number; // 连通分量数量

  constructor(n:number){
    this.parent = Array.from({length:n},(_,i)=>i);
    this.rank = new Array(n).fill(0);
    this.count = n; // 初始每个节点是一个分量
  }

  find(x:number):number{
    if(this.parent[x] !== x){
      this.parent[x] = this.find(this.parent[x]); // 路径压缩
    }
    return this.parent[x];
  }

  union(x:number,y:number):void{
    const rootX = this.find(x);
    const rootY = this.find(y);

    if(rootX === rootY) return;

    // 按秩合并
    if(this.rank[rootX] < this.rank[rootY]){
      this.parent[rootX] = rootY;
    } else if(this.rank[rootX] > this.rank[rootY]){
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--; // 合并后连通分量数量减少1
  }

  getCount():number{
    return this.count;
  }
}

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const uf = new MyUnionFind(n);

  // 遍历上三角矩阵，合并连通的城市
  for(let i=0;i<n;i++){
    for(let j=i+1;j<n;j++){
      if(isConnected[i][j] === 1){
        uf.union(i,j);
      }
    }
  }

  return uf.getCount();
};

console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); //2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); //3
