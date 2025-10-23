class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;

  if (root === null) {
    return res;
  }

  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop()!; 
    res.push(n.val);
    p = n.right;
  }
  return res;
};

function inorderTraversal2(root: TreeNode): number[] {
  const res: number[] = [];
  const leftNode = root.left;
  const rightNode = root.right;

  if (!root) {
    return res;
  }

  if (leftNode) {
    res.push(...inorderTraversal(leftNode));
  }

  res.push(root.val);
  if (rightNode) {
    res.push(...inorderTraversal(rightNode));
  }
  return res;
}
