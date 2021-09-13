# Leetcode 257  二叉树的所有路径

动画演示：
```js
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
 * @return {string[]}
 */
 var binaryTreePaths = function(root) {
   if(!root){
     return [];
   }

   let res = [];
   
   if(root.left == null && root.right == null){
     res.push(root.val.toString());
     return res;
   }

   let leftPaths = binaryTreePaths(root.left);
   for(let i=0;i<leftPaths.length;i++){
     res.push(root.val +"->"+leftPaths[i]);
   }
   let rightPaths = binaryTreePaths(root.right);
   for(let i=0;i<rightPaths.length;i++){
     res.push(root.val+"->"+rightPaths[i]);
   }
   return res;
};

/// 时间复杂度: O(n), n为树中的节点个数
/// 空间复杂度: O(h), h为树的高度
```

![image-20210913184208759](README.assets/image-20210913184208759.png)

![image-20210913184216099](README.assets/image-20210913184216099.png)

![image-20210913184232665](README.assets/image-20210913184232665.png)

![image-20210913184256758](README.assets/image-20210913184256758.png)

![image-20210913184258132](README.assets/image-20210913184258132.png)

![image-20210913184259483](README.assets/image-20210913184259483.png)

![image-20210913184309489](README.assets/image-20210913184309489.png)

![image-20210913184318857](README.assets/image-20210913184318857.png)

![image-20210913184328387](README.assets/image-20210913184328387.png)

![image-20210913184350045](README.assets/image-20210913184350045.png)

![image-20210913184357547](README.assets/image-20210913184357547.png)

![image-20210913184404266](README.assets/image-20210913184404266.png)

![image-20210913184412728](README.assets/image-20210913184412728.png)

