# LeetCode 700. 二叉搜索树中的搜索

思路：利用二叉搜索树的特性（每个节点的值大于其左子树的所有节点的值，小于其右子树所有节点的值）递归实现

```typescript
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) {
    return null;
  }

  if (root.val === val) {
    return root;
  }else if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}

```