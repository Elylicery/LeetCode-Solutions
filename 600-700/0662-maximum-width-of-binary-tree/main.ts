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

function widthOfBinaryTree(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  // 用BigInt存储最大宽度（避免超深树计算时溢出）
  let maxWidth = 0n;
  // 队列：存储[节点, 索引]，索引用BigInt（彻底解决超深树索引溢出问题）
  const queue: Array<[TreeNode, bigint]> = [[root, 0n]];

  while (queue.length > 0) {
    const levelSize = queue.length;
    // 取当前层首尾节点的索引（队列非空，必然存在）
    const firstIndex = queue[0][1];
    const lastIndex = queue[levelSize - 1][1];

    // 计算当前层宽度（BigInt运算，确保无溢出）
    const currentWidth = lastIndex - firstIndex + 1n;
    if (currentWidth > maxWidth) {
      maxWidth = currentWidth;
    }

    // 处理当前层节点
    for (let i = 0; i < levelSize; i++) {
      const [node, currentIdx] = queue.shift() as [TreeNode, bigint];

      // 计算子节点索引（BigInt乘法，避免溢出）
      const leftIdx = currentIdx * 2n;
      const rightIdx = currentIdx * 2n + 1n;

      // 只入队有效节点（非null），避免队列混入null
      if (node.left !== null) {
        queue.push([node.left, leftIdx]);
      }
      if (node.right !== null) {
        queue.push([node.right, rightIdx]);
      }
    }
  }
  return Number(maxWidth);
}

