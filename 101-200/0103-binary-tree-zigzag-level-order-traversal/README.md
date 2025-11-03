# LeetCode 103：二叉树的锯齿形层序遍历

同题目102 二叉树的层序遍历

思路：
1. **添加方向标记变量**：新增 isLeftToRight: boolean，初始为 true（第一层默认从左到右）。
2. **层结果反转逻辑**：处理完当前层所有节点后，判断 isLeftToRight：
若为 false（表示当前层需从右到左），调用 levelValues.reverse() 反转当前层的节点值数组。
若为 true（从左到右），直接保留原顺序。
3. **切换遍历方向**：每处理完一层后，执行 isLeftToRight = !isLeftToRight，确保下一层方向交替
