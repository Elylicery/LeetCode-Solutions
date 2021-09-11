# Leetcode：206 反转链表

动画演示：

![image-20210909173020663](README.assets/image-20210909173020663.png)

![image-20210910094316252](README.assets/image-20210910094316252.png)

![image-20210910094323761](README.assets/image-20210910094323761.png)

![image-20210910094448057](README.assets/image-20210910094448057.png)

![image-20210910094516178](README.assets/image-20210910094516178.png)

![image-20210910094829686](README.assets/image-20210910094829686.png)

![image-20210910094907052](README.assets/image-20210910094907052.png)

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
 * @return {ListNode}
 */
var reverseList = function(head) {

  let pre = null;
  let cur = head;
  while(cur){
    const tmp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = tmp;
  }
  return pre;
};

// 时间复杂度: O(n)
// 空间复杂度: O(1)
```