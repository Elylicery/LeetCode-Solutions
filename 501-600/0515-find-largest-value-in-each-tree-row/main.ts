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

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];

  const res: number[] = [];
  const queue: TreeNode[] = [];
  queue.push(root);
  while (queue.length) {
    // 记录当前层的节点数
    let levelSize = queue.length;
    // 处理当前层的所有节点
    let maxValue = queue?.[0]?.val || 0;
    for (let i = 0; i < levelSize; i++) {
      const n = queue.shift();
      if (n) {
        maxValue = Math.max(n.val,maxValue)
        if (n?.left) queue.push(n.left);
        if (n?.right) queue.push(n.right);
      }
    }
    res.push(maxValue);
  }
  return res;
}