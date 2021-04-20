
# Leetcode 345 反转字符串中的元音字母

```js
/**
 * @param {string} s
 * @return {string}
 */
//双指针法
var arr = ['a','e','i','o','u','A','E','I','O','U']

var IsAeiou = function(c){
  if(arr.indexOf(c)!==-1){
    return true;
  }
  return false;
}

var reverseVowels = function(str) {
  var s = str.split("");
  let i=0;
  let j=s.length-1;
  while(i<j){
    if(IsAeiou(s[i]) && IsAeiou(s[j])){
      var tmp = s[j];
      s[j] = s[i];
      i++;
      j--;
    }else if(IsAeiou(s[i])){
      j--;
    }else if(IsAeiou(s[j])){
      i++;
    }else if(!IsAeiou(s[j]) && !IsAeiou(s[i])){
      i++;
      j--;
    }
  }
  return s.join("");
};
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