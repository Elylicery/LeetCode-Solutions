// 所有依赖代码 + 测试逻辑整合（无需额外文件）
interface Set<E> {
  add(e: E): void;
  remove(e: E): void;
  getSize(): number;
  contains(e: E): boolean;
  isEmpty(): boolean;
}

class Node<E> {
  public e: E;
  public left: Node<E> | null;
  public right: Node<E> | null;
  constructor(e: E) {
    this.e = e;
    this.left = null;
    this.right = null;
  }
}

class LinkedNode<E> {
  public e: E;
  public next: LinkedNode<E> | null;
  constructor(e: E, next: LinkedNode<E> | null = null) {
    this.e = e;
    this.next = next;
  }
}

// BST 核心类
class BST<E extends { compareTo(other: E): number }> {
  private root: Node<E> | null;
  private size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  getSize(): number {
    return this.size;
  }
  add(e: E): void {
    this.root = this.addRecursive(this.root, e);
  }
  private addRecursive(node: Node<E> | null, e: E): Node<E> {
    if (!node) {
      this.size++;
      return new Node(e);
    }
    if (e.compareTo(node.e) < 0) node.left = this.addRecursive(node.left, e);
    else if (e.compareTo(node.e) > 0)
      node.right = this.addRecursive(node.right, e);
    return node;
  }
  contains(e: E): boolean {
    return this.containsRecursive(this.root, e);
  }
  private containsRecursive(node: Node<E> | null, e: E): boolean {
    if (!node) return false;
    if (e.compareTo(node.e) === 0) return true;
    return e.compareTo(node.e) < 0
      ? this.containsRecursive(node.left, e)
      : this.containsRecursive(node.right, e);
  }
  remove(e: E): void {
    this.root = this.removeNode(this.root, e);
  }
  private removeNode(node: Node<E> | null, e: E): Node<E> | null {
    if (!node) return null;
    if (e.compareTo(node.e) < 0) {
      node.left = this.removeNode(node.left, e);
      return node;
    } else if (e.compareTo(node.e) > 0) {
      node.right = this.removeNode(node.right, e);
      return node;
    } else {
      if (!node.left) {
        const right = node.right;
        node.right = null;
        this.size--;
        return right;
      }
      if (!node.right) {
        const left = node.left;
        node.left = null;
        this.size--;
        return left;
      }
      const successor = this.minNode(node.right);
      successor.right = this.removeMin(node.right);
      successor.left = node.left;
      node.left = node.right = null;
      return successor;
    }
  }
  private minNode(node: Node<E>): Node<E> {
    return node.left ? this.minNode(node.left) : node;
  }
  private removeMin(node: Node<E>): Node<E> | null {
    if (!node.left) {
      const right = node.right;
      node.right = null;
      this.size--;
      return right;
    }
    node.left = this.removeMin(node.left);
    return node;
  }
}

// BSTSet 实现
class BSTSet<E extends { compareTo(other: E): number }> implements Set<E> {
  private bst: BST<E>;
  constructor() {
    this.bst = new BST<E>();
  }
  getSize(): number {
    return this.bst.getSize();
  }
  add(e: E): void {
    this.bst.add(e);
  }
  remove(e: E): void {
    this.bst.remove(e);
  }
  contains(e: E): boolean {
    return this.bst.contains(e);
  }
  isEmpty(): boolean {
    return this.bst.isEmpty();
  }
}

// LinkedListSet 实现
class LinkedListSet<E> implements Set<E> {
  private head: LinkedNode<E> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  getSize(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  contains(e: E): boolean {
    let cur = this.head;
    while (cur) {
      if (cur.e === e) return true;
      cur = cur.next;
    }
    return false;
  }
  add(e: E): void {
    if (!this.contains(e)) {
      this.head = new LinkedNode(e, this.head);
      this.size++;
    }
  }
  remove(e: E): void {
    if (!this.head) return;
    if (this.head.e === e) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let prev = this.head;
    while (prev.next && prev.next.e !== e) {
      prev = prev.next;
    }
    if (prev.next) {
      prev.next = prev.next.next;
      this.size--;
    }
  }
}

// 扩展 String.compareTo
declare global {
  interface String {
    compareTo(other: string): number;
  }
}
String.prototype.compareTo = function (other: string): number {
  const minLen = Math.min(this.length, other.length);
  for (let i = 0; i < minLen; i++) {
    const diff = this.charCodeAt(i) - other.charCodeAt(i);
    if (diff !== 0) return diff;
  }
  return this.length - other.length;
};

// -------------- 测试逻辑 --------------
import fs from "fs";
import https from "https";

// 自动下载《傲慢与偏见》文本文件
const FILE_URL = "https://www.gutenberg.org/files/1342/1342-0.txt"; // 古腾堡计划免费资源
const FILE_NAME = "pride-and-prejudice.txt";

function downloadFile(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filename)) {
      console.log(`✅ 已存在测试文件：${filename}，跳过下载`);
      resolve();
      return;
    }
    console.log(`📥 正在下载测试文件：${url}`);
    const file = fs.createWriteStream(filename);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`✅ 下载完成：${filename}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filename, () => {}); // 下载失败删除文件
        reject(`❌ 下载失败：${err.message}`);
      });
  });
}

// 读取文件并提取单词
function readFile(filename: string): string[] {
  try {
    const content = fs.readFileSync(filename, "utf-8").toLowerCase();
    const words = content.match(/[a-z]+/g) || [];
    return words;
  } catch (err) {
    console.error(`❌ 读取文件失败：${(err as Error).message}`);
    return [];
  }
}

// 测试 Set 性能
function testSet(set: Set<string>, filename: string): number {
  const startTime = process.hrtime.bigint();
  console.log(`\n📊 开始测试 ${set.constructor.name}`);
  const words = readFile(filename);
  console.log(`总单词数：${words.length}`);
  for (const word of words) set.add(word);
  console.log(`不同单词数：${set.getSize()}`);
  const endTime = process.hrtime.bigint();
  const time = Number(endTime - startTime) / 1e9;
  console.log(`耗时：${time.toFixed(3)} 秒`);
  return time;
}

// 主流程
async function main() {
  try {
    // 1. 下载测试文件
    await downloadFile(FILE_URL, FILE_NAME);

    // 2. 测试两种 Set
    const bstSet = new BSTSet<string>();
    const bstTime = testSet(bstSet, FILE_NAME);

    const linkedListSet = new LinkedListSet<string>();
    const linkedListTime = testSet(linkedListSet, FILE_NAME);

    // 3. 输出对比结果
    console.log(`\n🏆 性能对比`);
    console.log(`BST Set：${bstTime.toFixed(3)} 秒`);
    console.log(`Linked List Set：${linkedListTime.toFixed(3)} 秒`);
    console.log(
      `BST Set 比 LinkedList Set 快约 ${(linkedListTime / bstTime).toFixed(
        1
      )} 倍`
    );
  } catch (err) {
    console.error(`❌ 测试失败：${(err as Error).message}`);
    process.exit(1);
  }
}

// 执行主流程
main();
