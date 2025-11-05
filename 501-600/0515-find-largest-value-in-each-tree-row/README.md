# LeetCode 515. 在每个树行中找最大值

参考题目[LeetCode：102. 二叉树的层序遍历](https://github.com/Elylicery/LeetCode-Solutions/blob/main/101-200/0102-binary-tree-level-order-traversal/README.md)

在处理每一层节点时，通过 levelSize 预先记录当前层的节点数，使用 for 循环来处理当前层的所有节点。

```ts
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
```