# LeetCode：102. 二叉树的层序遍历 

二叉树的层序遍历
时间复杂度: O(n), n为树的节点个数
空间复杂度: O(n)

## 题解一：
**解题思路：**

* 层序遍历顺序就是广度优先遍历
* 不过在遍历时候需要记录当前节点所处的层级，方便将其添加到不同的数组中

**解题步骤：**

* 广度优先遍历二叉树
* 遍历过程中，记录每个节点的层级，并将其添加到不同的数组中

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  // 记录数据及层级
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length) {
    const n = queue.shift();
    if (n) {
      const [node, level] = n;
      // 放入相同层级的数据
      if (!res[level]) {
        res.push([node.val]);
      } else {
        res[level].push(node.val);
      }
      if(node.left) queue.push([node.left,level+1]);
      if(node.right) queue.push([node.right,level+1]);
    }
  }
  return res;
}
```

## 题解二（更优）：
思路：在处理每一层节点时，通过 levelSize 预先记录当前层的节点数，使用 for 循环来处理当前层的所有节点。

```ts
function levelOrder2(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  const queue: TreeNode[] = [];
  queue.push(root);
  while (queue.length) {
    // 记录当前层的节点数
    let levelSize = queue.length;
    // 处理当前层的所有节点
    let levelValues = [];
    for (let i = 0; i < levelSize; i++) {
      const n = queue.shift();
      if (n) {
        levelValues.push(n.val);
        if (n?.left) queue.push(n.left);
        if (n?.right) queue.push(n.right);
      }
    }
    res.push(levelValues);
  }
  return res;
}
```