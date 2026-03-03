
# Leetcode 345 反转字符串中的元音字母

```js
function reverseVowels(s: string): string {

  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  const isAeiou = (c: string) => {
    return vowels.has(c);
  }

  let sArr = s.split("");
  
  // 对撞指针
  let i = 0;
  let j = sArr.length - 1;

  while (i < j) {
    if(!isAeiou(sArr[i])){
      i++;
    }
    if(!isAeiou(sArr[j])){
      j--;
    }
    if(isAeiou(sArr[i]) && isAeiou(sArr[j])){
      [sArr[i], sArr[j]] = [sArr[j], sArr[i]];
      i++;
      j--;
    }
  }
  return sArr.join("");
};

console.log(reverseVowels('leetcode'));
```

这道题其实很简单，但是要注意：如何<font color="blue">交换字符串中两个元素的位置</font>？思路：

* 对于string，直接用replace
* 转成array ，先转成数组然后再交换再拼接
  * 使用slice/splice
  * `[s[i],s[j]] = [s[j],s[i]];//swap(s[i],s[j]);`

**注意：**
```js
var s = "abc";//交换第一个元素和第三个元素的位置
[s[0],s[2]] = [s[2],s[0]];
console.log(s);//abc
```

这样是不行的，**字符串的索引是只读操作**，因为ECMAScirpt中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变，要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量。