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

// function inorderTraversal(root: TreeNode): number[] {
//   const res:number[] = [];
//   const leftNode = root.left;
//   const rightNode = root.right;

//   if(!root) {
//     return res;
//   }

//   if (leftNode) {
//     res.push(...inorderTraversal(leftNode));
//   }

//   res.push(root.val);
//   if (rightNode) {
//     res.push(...inorderTraversal(rightNode));
//   }
//   return res;
// }

