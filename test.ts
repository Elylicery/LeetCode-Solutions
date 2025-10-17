/**
 * 定义泛型栈类Stack（支持任意数据类型）
 */
class Stack<T> {
  private stack: T[]; // 栈数组
  private size: number; // 栈容量

  constructor(size: number) {
    this.stack = [];
    this.size = size;
  }

  // 入栈
  push(item: T): boolean {
    if (this.isFull()) {
      return false;
    }
    this.stack.push(item);
    return true;
  }

  // 出栈
  pop(): boolean {
    if (this.isEmpty()) {
      return false;
    }

    this.stack = this.stack.slice(0, this.stack.length - 1);
    return true;
  }

  // 遍历栈元素(参数控制遍历方向，true为从栈底到栈顶，false为从栈顶到栈底)
  stackTraverse(isFromBottom: boolean): void {
    if (this.isEmpty()) {
      console.log("Stack is empty.");
      return;
    }
    if (isFromBottom) {
      for (let i = 0; i < this.stack.length; i++) {
        console.log(this.stack[i]);
      }
    } else {
      for (let i = this.stack.length - 1; i >= 0; i--) {
        console.log(this.stack[i]);
      }
    }
  }

  clearStack(): void {
    this.stack = [];
  }

  stackLength(): number {
    return this.stack.length;
  }

  private isFull(): boolean {
    return this.stack.length >= this.size;
  }

  private isEmpty(): boolean {
    return 0 === this.stack.length;
  }
}

function convertToBase7(num: number): string {
  if (num === 0) {
    return "0";
  }

  const stack: number[] = [];
  const base = 7;

  const isNative = num < 0;

  let current = Math.abs(num);

  while (current !== 0) {
    const mod = current % base;
    stack.push(mod);
    current = Math.floor(current / base);
  }

  const base7str = stack.reverse().join("");

  return isNative ? `-${base7str}` : base7str;
}

console.log(convertToBase7(-7));
console.log(convertToBase7(7));
console.log(convertToBase7(100));
