class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function buildTreeFromLevelOrder(): TreeNode | null {
  // 步骤1：处理空输入（本题输入非空，仅作兼容）
  if (![1, 3, 2, 5, 3, null, 9].length) return null;

  // 步骤2：创建根节点（层序第一个元素为根）
  const root = new TreeNode(1);

  // 步骤3：用队列存储“待分配左右子节点的父节点”，按层序顺序处理
  const queue: TreeNode[] = [root];
  // 层序数组的索引：从1开始（0是根，已处理）
  let index = 1;
  // 层序数组：本题输入固定为 [1,3,2,5,3,null,9]
  const levelOrderArr = [1, 3, 2, 5, 3, null, 9];

  // 循环处理队列，为每个父节点分配左右子节点
  while (queue.length && index < levelOrderArr.length) {
    // 取出队首的父节点
    const parent = queue.shift()!;

    // 处理左子节点：当前索引对应的值非null，则创建节点并关联
    const leftVal = levelOrderArr[index];
    if (leftVal !== null && leftVal !== undefined) {
      parent.left = new TreeNode(leftVal);
      queue.push(parent.left); // 将新节点加入队列，后续为它分配子节点
    }
    index++; // 索引后移，准备处理右子节点

    // 处理右子节点：索引未越界时，同理处理
    if (index < levelOrderArr.length) {
      const rightVal = levelOrderArr[index];
      if (rightVal !== null && rightVal !== undefined) {
        parent.right = new TreeNode(rightVal);
        queue.push(parent.right);
      }
      index++; // 索引后移，准备处理下一个父节点
    }
  }

  return root;
}

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];

  const res: number[] = [];
  const queue: TreeNode[] = [];
  queue.push(root);
  while (queue.length) {
    // 记录当前层的节点数
    let levelSize = queue.length;
    // 处理当前层的所有节点
    let maxValue = queue?.[0]?.val || 0;
    for (let i = 0; i < levelSize; i++) {
      const n = queue.shift();
      if (n) {
        maxValue = Math.max(n.val,maxValue)
        if (n?.left) queue.push(n.left);
        if (n?.right) queue.push(n.right);
      }
    }
    res.push(maxValue);
  }
  return res;
}
const testTree = buildTreeFromLevelOrder();
console.log(testTree);

const res = largestValues(testTree);
console.log("res", res);
