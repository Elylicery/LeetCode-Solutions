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
