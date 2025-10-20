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

/*
栈应用--括号匹配

描述：任意输入一组括号，可以判断括号是否匹配

字符串示例：[( )]  [( )( )]  [( )[( )]]  [[( )]

目的：通过实例灵活掌握栈机制的使用技巧
*/

function isBracketMatched(str: string): boolean {
  const needChar: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack = new Array<string>(); // 存储左括号
  const needStack = new Array<string>(); // 存储需要匹配的右括号

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      needStack.push(needChar[char]!);
    } else if (char === ")" || char === "]" || char === "}") {
      // 右括号无需入栈，只需判断 + 弹出左括号
      if (needStack.length === 0 || char !== needStack.pop()) {
        return false;
      }
      stack.pop(); // 弹出左括号
    } else {
      return false; // 遇到非括号字符，直接返回false
    }
  }

  // 最终需同时满足：左括号栈空 + 右括号需求栈空
  return stack.length === 0 && needStack.length === 0;
}

// // 测试括号匹配函数
// const testStrings = ["[( )]", "[( )( )]", "[( )[( )]]", "[[( )]"];

// for (const str of testStrings) {
//   console.log(`Testing string: ${str} => Matched: ${isBracketMatched(str)}`);
// }

function isBracketMatched2(str: string): boolean {
  const needChar: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack = new Array<string>();

  const needStack = new Array<string>();

  // 记录当前需要的字符
  let currentNeed = "";

  // 扫描str字符串
  for (let i = 0; i < str.length; i++) {
    // 与当前需要的字符对比
    // 不匹配的情况
    if (str[i] !== currentNeed) {
      stack.push(str[i]);

      // 更新当前需要的字符串
      if (str[i] === "(" || str[i] === "[" || str[i] === "{") {
        currentNeed = needChar[str[i]]!;
        needStack.push(currentNeed);
      } else {
        // 遇到不匹配的括号
        return false;
      }
    } else {
      // 匹配的情况
      stack.push(str[i]);
      needStack.pop();
      currentNeed = needStack.length > 0 ? needStack[needStack.length - 1] : "";
    }
  }

  if (needStack.length > 0) {
    return false;
  } else {
    return true;
  }
}

// 测试括号匹配函数
const testStrings = ["[( )]", "[( )( )]", "[( )[( )]]", "[[( )]"];

for (const str of testStrings) {
  console.log(`Testing string: ${str} => Matched: ${isBracketMatched2(str)}`);
}
