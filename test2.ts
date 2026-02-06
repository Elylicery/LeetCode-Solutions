class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}


function swapPairs(head: ListNode | null): ListNode | null {
  // 终止条件：空链表或者只剩单个节点
  if (head === null || head.next === null) {
    return head;
  }

  // 递归步骤
  // 1. 保存第二个节点next
  const next:ListNode = head.next;

  // 2. 递归处理后续节点（next.next）, 完成两两交换（将当前节点的next指向递归结果，将第二个节点的next指向当前节点）
  head.next = swapPairs(next.next);
  next.next = head;

  // 3. 返回新的头节点
  return next;
}


// 辅助函数：从数组创建链表
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// 辅助函数：将链表转换为数组（用于验证结果）
function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// 测试用例
const testCases: number[][] = [
    [1, 2, 3, 4],      // 偶数长度
    [1, 2, 3],         // 奇数长度
    [1],               // 单节点
    [],                // 空链表
    [1, 2]             // 仅两个节点
];

console.log("链表两两交换测试：");
testCases.forEach((arr, index) => {
    const head = createLinkedList(arr);
    const swapped = swapPairs(head);
    console.log(`测试${index + 1}: [${arr.join(', ')}] -> [${linkedListToArray(swapped).join(', ')}]`);
});

// 预期输出：
// 测试1: [1, 2, 3, 4] -> [2, 1, 4, 3]
// 测试2: [1, 2, 3] -> [2, 1, 3]
// 测试3: [1] -> [1]
// 测试4: [] -> []
// 测试5: [1, 2] -> [2, 1]