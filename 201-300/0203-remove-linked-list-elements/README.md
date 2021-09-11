# Leetcode：203 移除链表元素

例如：删除 3 

<img src="README.assets/image-20210911212631068.png" alt="image-20210911212631068" style="zoom:67%;" />

<img src="README.assets/image-20210911212707488.png" alt="image-20210911212707488" style="zoom: 67%;" />

<img src="README.assets/image-20210911212733148.png" alt="image-20210911212733148" style="zoom:67%;" />

所以要设置虚拟头节点：

![image-20210911214025642](README.assets/image-20210911214025642.png)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  
  // 使用虚拟头节点
  let dummyHead = new ListNode(-1);
  dummyHead.next = head;

  let cur = dummyHead;
  while(cur.next !== null){
    if(cur.next.val === val){
      // 删除cur->next
      let delNode = cur.next;
      cur.next = delNode.next;
    }else{
      cur = cur.next;
    }
  }
  return dummyHead.next;
};

// 时间复杂度: O(1)
// 空间复杂度: O(1)
```