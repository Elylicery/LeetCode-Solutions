interface Merger<E> {
    merge(a: E, b: E): E;
}

// 线段树类（求和场景）
class SegmentTree<E> {
    private tree: (E | null)[];
    private data: E[];
    private merger: Merger<E>;

    constructor(arr: E[], merger: Merger<E>) {
        this.merger = merger;
        this.data = [...arr];
        this.tree = new Array<(E | null)>(4 * arr.length).fill(null);
        this.buildSegmentTree(0, 0, this.data.length - 1);
    }

    // 构建线段树
    private buildSegmentTree(treeIndex: number, l: number, r: number): void {
        if (l === r) {
            this.tree[treeIndex] = this.data[l];
            return;
        }
        const mid = l + Math.floor((r - l) / 2);
        const leftTreeIndex = this.leftChild(treeIndex);
        const rightTreeIndex = this.rightChild(treeIndex);
        this.buildSegmentTree(leftTreeIndex, l, mid);
        this.buildSegmentTree(rightTreeIndex, mid + 1, r);
        this.tree[treeIndex] = this.merger.merge(
            this.tree[leftTreeIndex]!,
            this.tree[rightTreeIndex]!
        );
    }

    // 区间查询
    query(queryL: number, queryR: number): E {
        if (
            queryL < 0 || queryL >= this.data.length ||
            queryR < 0 || queryR >= this.data.length ||
            queryL > queryR
        ) {
            throw new Error("Index is illegal");
        }
        return this._query(0, 0, this.data.length - 1, queryL, queryR);
    }

    private _query(treeIndex: number, l: number, r: number, queryL: number, queryR: number): E {
        if (l === queryL && r === queryR) {
            return this.tree[treeIndex]!;
        }
        const mid = l + Math.floor((r - l) / 2);
        const leftTreeIndex = this.leftChild(treeIndex);
        const rightTreeIndex = this.rightChild(treeIndex);
        if (queryL >= mid + 1) {
            return this._query(rightTreeIndex, mid + 1, r, queryL, queryR);
        } else if (queryR <= mid) {
            return this._query(leftTreeIndex, l, mid, queryL, queryR);
        } else {
            const leftRes = this._query(leftTreeIndex, l, mid, queryL, mid);
            const rightRes = this._query(rightTreeIndex, mid + 1, r, mid + 1, queryR);
            return this.merger.merge(leftRes, rightRes);
        }
    }

    // 更新指定索引的值
    update(index: number, val: E): void {
        if (index < 0 || index >= this.data.length) {
            throw new Error("Index is illegal");
        }
        this.data[index] = val;
        this._update(0, 0, this.data.length - 1, index, val);
    }

    private _update(treeIndex: number, l: number, r: number, index: number, val: E): void {
        if (l === r) {
            this.tree[treeIndex] = val;
            return;
        }
        const mid = l + Math.floor((r - l) / 2);
        const leftTreeIndex = this.leftChild(treeIndex);
        const rightTreeIndex = this.rightChild(treeIndex);
        if (index >= mid + 1) {
            this._update(rightTreeIndex, mid + 1, r, index, val);
        } else {
            this._update(leftTreeIndex, l, mid, index, val);
        }
        // 更新当前节点（合并左右子树的新结果）
        this.tree[treeIndex] = this.merger.merge(
            this.tree[leftTreeIndex]!,
            this.tree[rightTreeIndex]!
        );
    }

    // 辅助方法
    private leftChild(index: number): number {
        return 2 * index + 1;
    }

    private rightChild(index: number): number {
        return 2 * index + 2;
    }
}

// 3. 实现 LeetCode 307 题的 NumArray 类（基于线段树）
class NumArray {
    private segmentTree: SegmentTree<number>;

    constructor(nums: number[]) {
        // 构建求和线段树（Merger 实现两数相加）
        const sumMerger: Merger<number> = {
            merge(a, b) {
                return a + b;
            }
        };
        this.segmentTree = new SegmentTree(nums, sumMerger);
    }

    // 更新指定索引的值（O(log n)）
    update(index: number, val: number): void {
        this.segmentTree.update(index, val);
    }

    // 计算区间 [left, right] 的和（O(log n)）
    sumRange(left: number, right: number): number {
        return this.segmentTree.query(left, right);
    }
}

// 测试用例（完全匹配 LeetCode 示例）
// const numArray = new NumArray([1, 3, 5]);
// console.log(numArray.sumRange(0, 2)); // 输出：9（1+3+5）
// numArray.update(1, 2); // 更新索引1为2，数组变为 [1,2,5]
// console.log(numArray.sumRange(0, 2)); // 输出：8（1+2+5）