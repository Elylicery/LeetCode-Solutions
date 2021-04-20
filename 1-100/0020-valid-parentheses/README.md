# Leetcode:20. 有效的括号

**思路：栈的典型应用**

**解题思路：**
* 对于没有闭合的左括号而言，越靠后的左括号，对应的右括号越靠前
* 满足后进先出，考虑用栈

**解题步骤：**
* 新建一个栈
* 扫描字符串，遇左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定不合法
* 最后栈空了就合法，否则不合法。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if(s.length%2===1){
        return false;
    }
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(' || c === '[' || c === '{') {
            stack.push(c);
        } else {
            const t = stack[stack.length - 1];
            if (
                (t === '(' && c === ')') ||
                (t === '[' && c === ']') ||
                (t === '{' && c === '}')
            ) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};
```