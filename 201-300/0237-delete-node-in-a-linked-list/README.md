# LeetCode：237.删除链表中的节点 

**思路：**

* 无法直接获取被删除节点的上个节点
* 就将被删除节点转移到下个节点

**解题步骤**

* 将被删节点的值改为下个节点的值
* 删除下个节点

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
```

