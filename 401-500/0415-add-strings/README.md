# Leetcode 415 字符串相加

**方法：模拟竖式加法**

本题我们只需要对两个大整数模拟「竖式加法」的过程。竖式加法就是我们平常学习生活中常用的对两个整数相加的方法，回想一下我们在纸上对两个整数相加的操作，是不是如下图将相同数位对齐，从低到高逐位相加，如果当前位和超过 1010，则向高位进一位？因此我们只要将这个过程用代码写出来即可。

<img src="https://assets.leetcode-cn.com/solution-static/415/1.png" alt="fig1" style="zoom: 15%;" />

具体实现也不复杂，我们定义两个指针 i 和j分别指向num1和num2的末尾即最低位，同时定义一个变量 `add` 维护当前是否有进位，然后从末尾到开头逐位相加即可。你可能会想两个数字位数不同怎么处理，这里我们统一在指针当前下标处于负数的时候返回 0，等价于对位数较短的数字进行了补零操作，这样就可以除去两个数字位数不同情况的处理，具体可以看下面的代码。

```js
var addStrings = function(num1,num2){
  let i = num1.length-1,
      j = num2.length-1,
      add = 0;

  const ans = [];
  while(i>=0 || j>=0 || add!=0){
    const x = i>=0 ? num1.charAt(i)-'0' : 0;
    const y = j>=0 ? num2.charAt(j)-'0' : 0;
    const result = x+y+add;
    ans.push(result%10);
    add = Math.floor(result/10);
    i-=1;
    j-=1;
  }
  return ans.reverse().join('');
};
```

## 