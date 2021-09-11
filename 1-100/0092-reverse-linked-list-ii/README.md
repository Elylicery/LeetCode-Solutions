# Leetcode：92 反转链表||
算法步骤：

* 第 1 步：先将待反转的区域反转；
* 第 2 步：把 pre 的 next 指针指向反转以后的链表头节点，把反转以后的链表的尾节点的 next 指针指向 succ。

一些技巧:

* 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论 `const dummyNode = new ListNode(-1);dummyNode.next = head;`
  
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
```

# 附：链表测试程序
编写链表测试程序

包括构建链表与打印链表
```js
// 定义单链表
function ListNode(val){
  this.val = val;
  this.next = null;
}

// 通过一个长度为n的数组创建链表
var createLinkedList = function(arr,n){
  if(n===0){
    return null;
  }
  
  let head = new ListNode(arr[0]);

  let curNode = head;
  for(let i=1;i<n;i++){
    curNode.next = new ListNode(arr[i]);
    curNode = curNode.next;
  }

  return head;
}

// 打印链表
var printLinkedList = function(head){
  let curNode = head;
  let printList = '';
  while(curNode !== null){
    printList += `${curNode.val}->`;
    curNode = curNode.next;
  }
  printList += `NULL`;
  console.log(printList);
  return;
}

// test 
let arr = [5,2,9,0,3];
let n = arr.length;

let head = createLinkedList(arr,n);
printLinkedList(head);

```