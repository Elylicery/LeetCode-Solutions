/**
 * Definition for singly-linked list.
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 使用虚拟头节点
  let dummyHead = new ListNode(-1);
  dummyHead.next = head;

  let cur = dummyHead;
  while (cur.next !== null) {
    if (cur.next.val === val) {
      // 删除cur->next
      let delNode = cur.next;
      cur.next = delNode.next;
    } else {
      cur = cur.next;
    }
  }
  return dummyHead.next;
};

// 时间复杂度: O(1)
// 空间复杂度: O(1)
