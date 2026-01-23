class IslandsUnionFind {
  private parent: number[];
  private rank: number[];
  private count: number; 

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n; 
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); 
    }
    return this.parent[x];
  }

  // 返回是否成功合并（即是否原本不在同一集合）
  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;
    
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }

}

function numIslands(grid: string[][]): number {
  const n = grid[0].length;
  const m = grid.length;

  const uf = new IslandsUnionFind(m * n);

  let landCount = 0; // 记录陆地格子数量

  // 第一次遍历：统计陆地数量，并初始化并查集
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        landCount++;
      }
    }
  }

  // 第二次遍历：合并相邻陆地格子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        const currentIndex = i * n + j;

        // 检查右邻居
        if(j+1<n && grid[i][j + 1] === "1"){
          const rightIndex = i * n + (j + 1);
          if(uf.union(currentIndex, rightIndex)){
            landCount--; // 合并成功，陆地格子数量减1
          }
        }

        // 检查下邻居
        if(i+1<m && grid[i + 1][j] === "1"){
          const downIndex = (i + 1) * n + j;
          if(uf.union(currentIndex, downIndex)){
            landCount--; // 合并成功，陆地格子数量减1
          }
        }
      }
    }
  }

  return landCount;
}

const grid1 = [
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0']
]

const grid2 =  [
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
]

console.log(numIslands(grid1)); // 1
console.log(numIslands(grid2)); // 3


