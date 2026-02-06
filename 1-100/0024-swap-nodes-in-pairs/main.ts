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

function swapPairs2(head: ListNode | null): ListNode | null {
    // 终止条件：空链表或只剩单个节点
    if (head === null || head.next === null) {
        return head;
    }
    
    // 保存第二个节点（原Java: ListNode next = head.next）
    const next: ListNode = head.next;
    
    // 递归处理后续节点，并将结果连接到当前节点
    // 原Java: head.next = swapPairs(next.next)
    head.next = swapPairs(next.next);
    
    // 将第二个节点的next指向当前节点（完成两两交换）
    // 原Java: next.next = head
    next.next = head;
    
    // 返回新的头节点（原第二个节点）
    return next;
}

// ============ 使用示例与测试 ============

// // 辅助函数：从数组创建链表
// function createLinkedList(arr: number[]): ListNode | null {
//     if (arr.length === 0) return null;
//     let head = new ListNode(arr[0]);
//     let current = head;
//     for (let i = 1; i < arr.length; i++) {
//         current.next = new ListNode(arr[i]);
//         current = current.next;
//     }
//     return head;
// }

// // 辅助函数：将链表转换为数组（用于验证结果）
// function linkedListToArray(head: ListNode | null): number[] {
//     const result: number[] = [];
//     while (head !== null) {
//         result.push(head.val);
//         head = head.next;
//     }
//     return result;
// }

// // 测试用例
// const testCases: number[][] = [
//     [1, 2, 3, 4],      // 偶数长度
//     [1, 2, 3],         // 奇数长度
//     [1],               // 单节点
//     [],                // 空链表
//     [1, 2]             // 仅两个节点
// ];

// console.log("链表两两交换测试：");
// testCases.forEach((arr, index) => {
//     const head = createLinkedList(arr);
//     const swapped = swapPairs(head);
//     console.log(`测试${index + 1}: [${arr.join(', ')}] -> [${linkedListToArray(swapped).join(', ')}]`);
// });

// 预期输出：
// 测试1: [1, 2, 3, 4] -> [2, 1, 4, 3]
// 测试2: [1, 2, 3] -> [2, 1, 3]
// 测试3: [1] -> [1]
// 测试4: [] -> []
// 测试5: [1, 2] -> [2, 1]