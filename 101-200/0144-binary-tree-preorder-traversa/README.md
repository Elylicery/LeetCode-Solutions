# LeetCode：144. 二叉树的前序遍历

**思路1：迭代**
```js
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
```