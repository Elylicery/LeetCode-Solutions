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

function widthOfBinaryTree(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  // 用BigInt存储最大宽度（避免超深树计算时溢出）
  let maxWidth = 0n;
  // 队列：存储[节点, 索引]，索引用BigInt（彻底解决超深树索引溢出问题）
  const queue: Array<[TreeNode, bigint]> = [[root, 0n]];

  while (queue.length > 0) {
    const levelSize = queue.length;
    // 取当前层首尾节点的索引（队列非空，必然存在）
    const firstIndex = queue[0][1];
    const lastIndex = queue[levelSize - 1][1];

    // 计算当前层宽度（BigInt运算，确保无溢出）
    const currentWidth = lastIndex - firstIndex + 1n;
    if (currentWidth > maxWidth) {
      maxWidth = currentWidth;
    }

    // 处理当前层节点
    for (let i = 0; i < levelSize; i++) {
      const [node, currentIdx] = queue.shift() as [TreeNode, bigint];

      // 计算子节点索引（BigInt乘法，避免溢出）
      const leftIdx = currentIdx * 2n;
      const rightIdx = currentIdx * 2n + 1n;

      // 只入队有效节点（非null），避免队列混入null
      if (node.left !== null) {
        queue.push([node.left, leftIdx]);
      }
      if (node.right !== null) {
        queue.push([node.right, rightIdx]);
      }
    }
  }
  return Number(maxWidth);
}

const testTree = buildTreeFromLevelOrder();
console.log(testTree);

const res = widthOfBinaryTree(testTree);
console.log("res", res);
