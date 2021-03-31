/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
//这是迭代
var preorderTraversal = function(root) {
  const res = [];
  const stack = [];
  if(root) stack.push(root);
  while(stack.length){
      const n = stack.pop();
      res.push(n.val);
      if(n.right) stack.push(n.right);
      if(n.left) stack.push(n.left);
  }
  return res;
};