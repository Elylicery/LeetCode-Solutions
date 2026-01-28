function maxAreaOfIsland(grid: number[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;

  let maxArea = 0;

  // DFS 函数，计算以 (i, j) 为起点的岛屿面积
  function dfs(i: number, j: number): number {
    // 边界检查和水域检查
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0;
    }

    // 淹没当前陆地（避免重复访问）
    grid[i][j] = 0;

    // 计算当前陆地面积，并递归计算四个方向的面积
    let area = 1;
    area += dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1);
    return area;
  }

  // 遍历整个网格
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        const area = dfs(i, j);
        maxArea = Math.max(maxArea, area);
      }
    }
  }
  return maxArea;
}

const grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
console.log(maxAreaOfIsland(grid));