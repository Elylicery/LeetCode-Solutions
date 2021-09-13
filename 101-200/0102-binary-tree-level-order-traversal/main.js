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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  //广度优先遍历记录层级
  if(!root) return [];

  const q = [[root,0]];
  const res = [];
  while(q.length){
    const [node,level] = q.shift();
    // 放入相同层级的数据
    if(!res[level]){
      res.push([node.val]);
    }else{
      res[level].push(node.val);
    }
    if(node.left) q.push([node.left,level+1]);
    if(node.right) q.push([node.right,level+1]);
  }
  return res;
};

/// 二叉树的层序遍历
/// 时间复杂度: O(n), n为树的节点个数
/// 空间复杂度: O(n)