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
// 时间复杂度: O(n)
// 空间复杂度: O(1)
var swapPairs = function(head) {
  let dummyNode = new ListNode(0);
  dummyNode.next = head;

  let p = dummyNode;
  while(p.next && p.next.next){
    let node1 = p.next;
    let node2 = node1.next;
    let next = node2.next;
    node2.next = node1;
    node1.next = next;
    p.next = node2;
    p = node1;
  }

  return dummyNode.next;
};