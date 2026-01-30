// Graph.ts
export interface IGraph {
  adjIterator?: any;
  V(): number; // 顶点数
  adj?(v: number): number[]; // 返回 v 的所有邻接点
}

export class Component {
  private G: IGraph;
  private visited: boolean[];
  private id: number[]; //id[v]表示v所属的联通分量编号
  private ccount: number; // 连通分量个数

  constructor(graph: IGraph) {
    this.G = graph;
    const n = this.G.V();
    this.visited = new Array(n).fill(false);
    this.id = new Array(n).fill(-1);
    this.ccount = 0;

    //对每个未访问的顶点执行一次DFS,得到一个联通分量
    for (let v = 0; v < n; v++) {
      if (!this.visited[v]) {
        this.dfs(v);
        this.ccount++;
      }
    }
  }

  // 深度优先遍历
  private dfs(v: number): void {
    this.visited[v] = true;
    this.id[v] = this.ccount;

    // 遍历v的所有邻接点
    const neighbors = this.G.adj(v);
    for (const w of neighbors) {
      if (!this.visited[w]) {
        this.dfs(w);
      }
    }
  }

  // 返回图的联通分量个数
  public count(): number {
    return this.ccount;
  }

  // 判断顶点 v 和 顶点 w 是否联通
  public isConnected(v: number, w: number): boolean {
    if (v < 0 || v >= this.G.V() || w < 0 || w >= this.G.V()) {
      throw new Error(`Vertex index out of range [0, ${this.G.V() - 1}]`);
    }
    return this.id[v] === this.id[w];
  }
}


export class Edge<T> {
  public readonly v: number; // 起点
  public readonly w: number; // 终点
  public readonly weight: T; // 权重

  constructor(v: number, w: number, weight: T) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  wt(): T {
    return this.weight;
  }

  // 获取另一个顶点（用于遍历）
  other(x: number): number {
    if (x === this.v) return this.w;
    if (x === this.w) return this.v;
    throw new Error('Invalid vertex');
  }
}


export class DenseGraph<T> {
  private n: number;                // 顶点数
  private m: number;                // 边数
  private directed: boolean;         // 是否有向
  private g: (Edge<T> | null)[][];  // 邻接矩阵：g[i][j] 存储边或 null

  constructor(n: number, directed: boolean) {
    this.n = n;
    this.m = 0;
    this.directed = directed;
    // g初始化为n*n的矩阵，每一个g[i][j]指向一个边的信息，初始化为NULL
    this.g = Array.from({ length: n }, () => 
      Array.from({ length: n }, () => null)
    );
  }

  // 获取顶点个数
  V(): number {
    return this.n;
  }

  // 获取边的个数
  E(): number {
    return this.m;
  }

  // 向图中添加一个边，权值为weight
  addEdge(v: number, w: number, weight: T): void {
    if (v < 0 || v >= this.n || w < 0 || w >= this.n) {
      throw new Error(`Vertex index out of range [0, ${this.n - 1}]`);
    }

    //如果从v到w已经有边，删除这条边
    if (this.hasEdge(v, w)) {
      this.g[v][w] = null;
      if (v !== w && !this.directed) {
        this.g[w][v] = null;
      }
      this.m--;
    }

    // 创建新边
    this.g[v][w] = new Edge(v, w, weight);
    if (v !== w && !this.directed) {
      this.g[w][v] = new Edge(w, v, weight);
    }
    this.m++;
  }

  // 判断是否存在从 v 到 w 的边
  hasEdge(v: number, w: number): boolean {
    if (v < 0 || v >= this.n || w < 0 || w >= this.n) {
      return false;
    }
    return this.g[v][w] !== null;
  }

  // 显示图的信息（调试用）
  show(): void {
    for (let i = 0; i < this.n; i++) {
      let row = '';
      for (let j = 0; j < this.n; j++) {
        if (this.g[i][j]) {
          row += `${this.g[i][j]!.wt()}\t`;
        } else {
          row += 'NULL\t';
        }
      }
      console.log(row);
    }
  }

  // 邻边迭代器，传入一个图和一个顶点
  //迭代在这个图中和这个顶点相连的所有边
  adjIterator(v: number): Iterable<Edge<T>> {
    if (v < 0 || v >= this.n) {
      throw new Error(`Vertex ${v} out of range [0, ${this.n - 1}]`);
    }

    // 返回一个可迭代对象
    return {
      [Symbol.iterator]: () => {
        let index = -1;//索引从-1开始，因为每次遍历都需要调用一次next()
        return {
          //返回图G中与顶点v相连接的下一个边
          next: (): IteratorResult<Edge<T>> => {
            // //从当前index开始向后搜索，直到找到一个g[v][index]为true
            index++;
            while (index < this.n) {
              if (this.g[v][index] !== null) {
                return { done: false, value: this.g[v][index]! };
              }
              index++;
            }
             //若没有顶点和v相连接，则返回undefined
            return { done: true, value: undefined as any };
          }
        };
      }
    };
  }
}

// LazyPrimMST.ts
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// 注意：LeetCode 中无需 import，直接使用即可
// 本地测试时需安装：npm install @datastructures-js/priority-queue

export class LazyPrimMST<T> {
  private G: IGraph;                // 图的引用
  private pq: MinPriorityQueue<Edge<T>>; // 最小堆：存储横切边
  private marked: boolean[];            // marked[v] = v 是否已在 MST 中
  private mst: Edge<T>[];              // MST 所包含的所有便
  private mstWeight: number;           // MST 的总权重

  // 使用prime求图的MST
  constructor(graph: IGraph) {
    this.G = graph;
    const n = this.G.V();
    
    // 初始化
    this.marked = new Array(n).fill(false);
    this.mst = [];
    
    // 使用 LeetCode 内置 MinPriorityQueue，注意：必须提供 priority 函数（返回数字）
    this.pq = new MinPriorityQueue<Edge<T>>((edge) => edge.wt() as number);

    // Lazy Prim 核心逻辑
    this.visit(0); // 从顶点 0 开始

    while (!this.pq.isEmpty()) {
      const e = this.pq.dequeue()!; // 取出最小权重边

      // 如果边的两端都在 MST 中，跳过（无效横切边）
      if (this.marked[e.v] === this.marked[e.w]) {
        continue;
      }

      // 否则，这条边属于 MST
      this.mst.push(e);

      // 访问未访问的端点
      if (!this.marked[e.v]) {
        this.visit(e.v);
      } else {
        this.visit(e.w);
      }
    }

    // 计算总权重
    this.mstWeight = this.mst.reduce((sum, edge) => sum + (edge.wt() as number), 0);
  }

  // 访问顶点 v：将所有连接到未访问顶点的边加入堆
  private visit(v: number): void {
    if (this.marked[v]) return;
    this.marked[v] = true;

    // 遍历 v 的所有邻接边
    for (const edge of this.G.adjIterator(v)) {
      const other = edge.other(v);
      if (!this.marked[other]) {
        this.pq.enqueue(edge);
      }
    }
  }

  // 返回 MST 的所有边
  mstEdges(): Edge<T>[] {
    return [...this.mst]; // 返回副本
  }

  // 返回 MST 的总权重
  result(): number {
    return this.mstWeight;
  }
}


const graph = new DenseGraph<Number>(7, false);
graph.addEdge(0, 1, 7);
graph.addEdge(0, 3, 5);
graph.addEdge(1, 2, 8);
graph.addEdge(1, 3, 9);
graph.addEdge(1, 4, 7);
graph.addEdge(2, 4, 5);

const prim = new LazyPrimMST(graph);
console.log(prim.result());



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
