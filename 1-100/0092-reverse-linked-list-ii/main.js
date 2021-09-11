/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let pre = dummyNode;
  // step1：从虚拟头节点走left-1步，找到pre 和left
  for(let i=0;i<left-1;i++){
    pre = pre.next;
  }
  let leftNode = pre.next;

  // step2:从pre再走right-left+1步，找到right和succ
  let rightNode = pre;
  for(let i=0;i<right-left+1;i++){
    rightNode = rightNode.next;
  }
  let succ = rightNode.next;

  // step3：切断子链表的连接
  pre.next = null;
  rightNode.next = null;

  // step4: 反转链表子区间
  reverseLinkedList(leftNode);

  // step5:接回原来的链表中
  pre.next = rightNode;
  leftNode.next = succ;
  return dummyNode.next;
};

const reverseLinkedList = function(head){
  let pre = null;
  let cur = head;
  while(cur){
    const tmp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = tmp;
  }
};