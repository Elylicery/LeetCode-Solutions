# 504. 七进制数

进制转换的**短除法**

```ts
/*
描述：输入任意的十进制正整数N，分别输出该整数N的二进制、八进制、十六进制的数
公式：N = (N div d) * d + N mod d (div表示整除，mod表示求余)
(1348)(十进制) = (2504)(八进制) = (544)(十六进制) = (10101000100)(二进制)

短除法（八进制转换示例）：
      N      N div 8   N mod 8
    1348       168        4
     168        21        0
      21         2        5
       2         0        2

短除法（十六进制转换示例）：
      N      N div 16  N mod 16
    1348        84        4
      84         5        4
       5         0        5

目的：通过实例灵活掌握栈机制的使用技巧
*/

function convertNumberSystem(N: number, d: number): string {
  const stack = [];

  let num = N;

  while (num !== 0) {
    const mod = num % d;
    stack.push(mod);
    num = Math.floor(num / d);
  }

  let result = "";

  let length = stack.length;
  for (let i = length - 1; i >= 0; i--) {
    result += stack[i].toString();
  }

  return result;
}

// console.log(convertNumberSystem(1348, 8));
// console.log(convertNumberSystem(1348, 16)); // 十六进制
// console.log(convertNumberSystem(1348, 2)); // 二进制
```