// IndexMinHeap.ts
class IndexMinHeap<T> {
  private data: T[]; // data[i] = i 号元素的值（1-based）
  private indexes: number[]; // indexes[k] = 堆中第 k 个位置存储的元素索引
  private reverse: number[]; // reverse[i] = 元素 i 在堆中的位置（0 表示不在堆中）
  private count: number;
  private capacity: number;

  constructor(capacity: number) {
    this.data = new Array(capacity + 1);
    this.indexes = new Array(capacity + 1);
    this.reverse = new Array(capacity + 1).fill(0);
    this.count = 0;
    this.capacity = capacity;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  contains(i: number): boolean {
    return this.reverse[i + 1] !== 0;
  }

  // 插入：将索引 i 的值设为 item
  insert(i: number, item: T): void {
    if (this.contains(i)) {
      throw new Error(`Index ${i} already in heap`);
    }
    const internalIndex = i + 1;
    this.data[internalIndex] = item;
    this.count++;
    this.indexes[this.count] = internalIndex;
    this.reverse[internalIndex] = this.count;
    this.shiftUp(this.count);
  }

  // 修改索引 i 的值
  change(i: number, newItem: T): void {
    if (!this.contains(i)) {
      throw new Error(`Index ${i} not in heap`);
    }
    const internalIndex = i + 1;
    this.data[internalIndex] = newItem;
    const heapPos = this.reverse[internalIndex];
    this.shiftUp(heapPos);
    this.shiftDown(heapPos);
  }

  // 弹出最小值对应的索引（用户视角 0-based）
  extractMinIndex(): number {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }
    const minInternalIndex = this.indexes[1];
    const userIndex = minInternalIndex - 1;

    // 将堆尾移到堆顶
    this.indexes[1] = this.indexes[this.count];
    this.reverse[this.indexes[1]] = 1;
    this.reverse[minInternalIndex] = 0;
    this.count--;

    if (this.count > 0) {
      this.shiftDown(1);
    }

    return userIndex;
  }

  private shiftUp(k: number): void {
    while (k > 1) {
      const parent = Math.floor(k / 2);
      if (this.data[this.indexes[parent]] <= this.data[this.indexes[k]]) break;
      this.swapIndexes(parent, k);
      k = parent;
    }
  }

  private shiftDown(k: number): void {
    while (2 * k <= this.count) {
      let j = 2 * k;
      if (
        j + 1 <= this.count &&
        this.data[this.indexes[j + 1]] < this.data[this.indexes[j]]
      ) {
        j++;
      }
      if (this.data[this.indexes[k]] <= this.data[this.indexes[j]]) break;
      this.swapIndexes(k, j);
      k = j;
    }
  }

  private swapIndexes(i: number, j: number): void {
    [this.indexes[i], this.indexes[j]] = [this.indexes[j], this.indexes[i]];
    this.reverse[this.indexes[i]] = i;
    this.reverse[this.indexes[j]] = j;
  }
}

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
    throw new Error("Invalid vertex");
  }
}

export class DenseGraph<T> {
  private n: number; // 顶点数
  private m: number; // 边数
  private directed: boolean; // 是否有向
  private g: (Edge<T> | null)[][]; // 邻接矩阵：g[i][j] 存储边或 null

  constructor(n: number, directed: boolean) {
    this.n = n;
    this.m = 0;
    this.directed = directed;
    // g初始化为n*n的矩阵，每一个g[i][j]指向一个边的信息，初始化为NULL
    this.g = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => null),
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
      let row = "";
      for (let j = 0; j < this.n; j++) {
        if (this.g[i][j]) {
          row += `${this.g[i][j]!.wt()}\t`;
        } else {
          row += "NULL\t";
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
        let index = -1; //索引从-1开始，因为每次遍历都需要调用一次next()
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
          },
        };
      },
    };
  }
}

// LazyPrimMST.ts
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// 注意：LeetCode 中无需 import，直接使用即可
// 本地测试时需安装：npm install @datastructures-js/priority-queue

export class LazyPrimMST<T> {
  private G: IGraph; // 图的引用
  private pq: MinPriorityQueue<Edge<T>>; // 最小堆：存储横切边
  private marked: boolean[]; // marked[v] = v 是否已在 MST 中
  private mst: Edge<T>[]; // MST 所包含的所有便
  private mstWeight: number; // MST 的总权重

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
    this.mstWeight = this.mst.reduce(
      (sum, edge) => sum + (edge.wt() as number),
      0,
    );
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

export class PrimeMST<T> {
  private G: IGraph; // 图的引用
  private ipq: IndexMinHeap<T>; // 最小索引堆存储每个顶点的最小边权重
  private edgeTo: (Edge<T> | null)[]; // edgeTo[v]存储连接v和MST的最小边
  private marked: boolean[]; // marked[v] = v 是否已在 MST 中
  private mst: Edge<T>[]; // MST 所包含的所有便
  private mstWeight: number; // MST 的总权重

  // 访问结点v
  private visit(v: number): void {
    if (this.marked[v]) return;
    this.marked[v] = true;

    // 将和节点v相连的未放问的另一端点，和与之相连接的边，放入最小堆中
    for (const edge of this.G.adjIterator(v)) {
      const w = edge.other(v);
      // 如果w未被访问
      if (!this.marked[w]) {
        //如果从没有考虑过这个端点，直接将这个端点和与之相连接的边加入索引堆
        if (this.edgeTo[w] === null) {
          this.edgeTo[w] = edge;
          this.ipq.insert(w, edge.wt());
        }
        //如果考虑过这个端点，但现在的边比之前考虑的边更短，则进行替换
        else if (edge.wt() < this.edgeTo[w]!.wt()) {
          //更新最小边
          this.edgeTo[w] = edge;
          //更新索引堆中的权值
          this.ipq.change(w, edge.wt());
        }
      }
    }
  }

  constructor(graph: IGraph) {
    this.G = graph;
    const n = this.G.V();

    // 初始化
    this.ipq = new IndexMinHeap<T>(n);
    this.edgeTo = new Array(n).fill(null);
    this.marked = new Array(n).fill(false);
    this.mst = [];

    // Prim 核心逻辑
    this.visit(0);

    while (!this.ipq.isEmpty()) {
      //使用最小索引堆找出已经访问的边中权值最小的边
      //最小索引堆中存储的是点的索引，通过点的索引找到相对应的边
      const v = this.ipq.extractMinIndex();
      this.mst.push(this.edgeTo[v]!);
      //访问这个点
      this.visit(v);
    }

    // 计算总权重
    this.mstWeight = this.mst.reduce(
      (sum, edge) => sum + (edge.wt() as number),
      0,
    );
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

// UnionFind.ts
export class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  isConnected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

export class KruskalMST<T> {
  private mst: Edge<T>[]; // MST 所包含的所有边
  private mstWeight: number; // MST 的总权重

  constructor(graph: IGraph) {
    const n = graph.V();
    if (n === 0) {
      this.mst = [];
      this.mstWeight = 0;
      return;
    }

    // 1.收集图中的所有边（避免重复：只取w>v的边）
    const edges: Edge<T>[] = [];
    for (let v = 0; v < n; v++) {
      for (const e of graph.adjIterator(v)) {
        if (e.other(v) > v) {
          // 无向图去重
          edges.push(e);
        }
      }
    }

    // 2.将边按权重排序
    edges.sort((a, b) => (a.wt() as number) - (b.wt() as number));

    // 3.创建并查集
    const uf = new UnionFind(n); // UniondFind需要自己实现
    this.mst = [];

    // 4.Kruskal核心逻辑
    for (const e of edges) {
      /// 如果 MST 已完成（V-1 条边），提前退出
      if (this.mst.length === n - 1) {
        break;
      }

      //如果该边的两个端点是联通的，说明加入这条边将产生幻环，扔掉这条边
      if (uf.isConnected(e.v, e.w)) {
        continue;
      }

      ///否则，将这条边添加进最小生成树，同时标记边的两个端点联通
      this.mst.push(e);
      uf.union(e.v, e.w);
    }

    // 5.计算总权重
    this.mstWeight = this.mst.reduce(
      (sum, edge) => sum + (edge.wt() as number),
      0,
    );
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

export class Dijkstra<T> {
  private G: IGraph; // 图的引用
  private s: number; // 起始点
  private distTo: (number | null)[]; // distTo[v]存储从起始点s到v的最短路径长度
  private marked: boolean[]; // marked[v]表示顶点v是否被访问过
  private from: (Edge<T> | null)[]; // form[i]记录最短路径中，到达i点的边是哪一条，从而用来恢复整个最短路径

  constructor(graph: IGraph, s: number) {
    if (s < 0 || s >= graph.V()) {
      throw new Error(`Source vertex ${s} out of range [0, ${graph.V() - 1}]`);
    }

    this.G = graph;
    this.s = s;
    const n = this.G.V();

    // 初始化
    this.distTo = new Array(n).fill(Infinity);
    this.marked = new Array(n).fill(false);
    this.from = new Array(n).fill(null);

    // Dijkstra 核心逻辑
    this.distTo[s] = 0;
    this.from[s] = new Edge<T>(s, s, 0 as any); // 虚拟自环边

    // 创建索引最小堆（ 存储顶点索引，按distTo的值排序）
    const ipq = new IndexMinHeap<number>(n);
    ipq.insert(s, this.distTo[s]!);

    // Dijkstra 核心算法
    while (!ipq.isEmpty()) {
      const v = ipq.extractMinIndex(); //取出当前距离的最小的顶点
      this.marked[v] = true;

      // 对v的所有邻接边进行松弛操作
      for (const e of this.G.adjIterator(v)) {
        const w = e.other(v);

        //如果从s点到w点的最短路径还没有找到
        if (!this.marked[w]) {
          //如果w点以前没有访问过
          //或者访问过，但是通过当前的v点到w点距离更短，则进行更新
          const newDist = this.distTo[v]! + (e.wt() as number);
          if (this.from[w] === null || newDist < this.distTo[w]!) {
            this.distTo[w] = newDist;
            this.from[w] = e;

            if (ipq.contains(w)) {
              ipq.change(w, this.distTo[w]!);
            } else {
              ipq.insert(w, this.distTo[w]!);
            }
          }
        }
      }
    }
  }

  // 判断从 s 到 w 是否有路径
  hasPathTo(w: number): boolean {
    if (w < 0 || w >= this.G.V()) return false;
    return this.marked[w];
  }

  // 返回从s点到w点的最短路径长度
  shortestPathTo(w: number): number | null {
    if (w < 0 || w >= this.G.V()) {
      throw new Error(`Vertex ${w} out of range [0, ${this.G.V() - 1}]`);
    }
    if (!this.hasPathTo(w)) {
      throw new Error(`No path from ${this.s} to ${w}`);
    }
    return this.distTo[w];
  }

  // 获取从 s 到 w 的最短路径（边序列）
  shortestPath(w: number): Edge<T>[] {
    if (!this.hasPathTo(w)) {
      return [];
    }

    const path: Edge<T>[] = [];
    let current = w;

    // 从 w 反向回溯到 s
    while (current !== this.s) {
      const edge = this.from[current]!;
      path.unshift(edge); // 插入到开头
      current = edge.other(current);
    }

    return path;
  }

  // 打印路径（格式：s -> ... -> w）
  showPath(w: number): void {
    if (!this.hasPathTo(w)) {
      console.log(`No path from ${this.s} to ${w}`);
      return;
    }

    const path = this.shortestPath(w);
    const vertices: number[] = [this.s];

    for (const edge of path) {
      vertices.push(edge.other(vertices[vertices.length - 1]));
    }

    console.log(vertices.join(" -> "));
  }
}

const graph = new DenseGraph<Number>(7, false);
graph.addEdge(0, 1, 7);
graph.addEdge(0, 3, 5);
graph.addEdge(1, 2, 8);
graph.addEdge(1, 3, 9);
graph.addEdge(1, 4, 7);
graph.addEdge(2, 4, 5);

const kruskal = new KruskalMST(graph);
const distance = new Dijkstra(graph, 0);
console.log(distance.shortestPathTo(4));
distance.showPath(4);
console.log(kruskal.result());
// const prim = new LazyPrimMST(graph);
// const prim = new PrimeMST(graph);
// console.log(prim.result());
