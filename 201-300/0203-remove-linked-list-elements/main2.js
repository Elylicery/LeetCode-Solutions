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
  
  // 删除的节点是头节点的情况
  while(head!== null && head.val === val){
    let delNode = head;
    head = delNode.next;
  }

  if(head === null){
    return null;
  }

  // 删除的节点不是头节点的情况
  let cur = head;
  while(cur.next !== null){
    if(cur.next.val === val){
      // 删除cur->next
      let delNode = cur.next;
      cur.next = delNode.next;
    }else{
      cur = cur.next;
    }
  }
  return head;
};

// 时间复杂度: O(1)
// 空间复杂度: O(1)