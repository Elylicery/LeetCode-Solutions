// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  const queue: TreeNode[] = [];
  queue.push(root);

  let isLeftToRight = true; // 标记当前层是否从左到右遍历（初始第一层为true）

  while (queue.length) {
    // 记录当前层的节点数
    let levelSize = queue.length;
    // 处理当前层的所有节点
    let levelValues = [];
    for (let i = 0; i < levelSize; i++) {
      const n = queue.shift();
      if (n) {
        levelValues.push(n.val);

        // 将当前节点的左右子节点加入队列（下一层待处理）
        if (n?.left) queue.push(n.left);
        if (n?.right) queue.push(n.right);
      }
    }

    // 关键：偶数层（从0开始）保持从左到右，奇数层反转（从右到左）
    if (!isLeftToRight) {
      levelValues.reverse();
    }
    res.push(levelValues);

    // 切换下一层的遍历方向
    isLeftToRight = !isLeftToRight;
  }
  return res;
}

function zigzagLevelOrder2(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  // 队列存储 [节点, 层级]，初始存入根节点和第0层
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const n = queue.shift();
    if (n) {
      const [node, level] = n;
      // 放入相同层级的数据
      if (!res[level]) {
        res.push([node.val]);
      } else {
        // 关键逻辑：根据层级奇偶性，决定节点值的插入位置
        if (level % 2 === 0) {
          // 偶数层（0、2、4...）：从左到右，尾部插入
          res[level].push(node.val);
        } else {
          // 奇数层（1、3、5...）：从右到左，头部插入（直接生成反向序列）
          res[level].unshift(node.val);
        }
      }
      if (node.left) queue.push([node.left, level + 1]);
      if (node.right) queue.push([node.right, level + 1]);
    }
  }
  return res;
}
