# Leetcode 205 同构字符串

> 判断两个字符串是否**同构**？
> 
> 如果能找到一个字符集到字符集的映射，使得通过这个字符串的映射，s可以转变为t，则称s和t同构

需要考虑的特殊情况：
- 字符串
- 空串
- 是否可以一个字母映射到自己？

**思路1 map映射**

字符集大小为256
https://www.jb51.net/tools/ASCII.htm

```js

/// Mapping
/// Time Complexity: O(len(s))
/// Space Complexity: O(len of charset)
 var isIsomorphic = function(s, t) {
   //判断长度
   if(s.length !== t.length) return false;

   //两个映射表
   var map = new Array(256).fill(-1);
   var mapped = new Array(256).fill(false);

   //遍历
   for(let i=0;i<s.length;i++){
     if(map[s[i].charCodeAt()] === -1){
       if(mapped[t[i].charCodeAt()]){
         return false;
       }
       map[s[i].charCodeAt()] = t[i];
       mapped[t[i].charCodeAt()] = true;
     }
     else if(map[s[i].charCodeAt()] != t[i]){
       return false;
     }
   }

   return true;
};
```


备注：跟290 字符匹配非常像，都是要建立一个双射。
290使用了map
本题直接用数组建立映射（数组下标为其ASCII码值）

注意语言上的区别
js中要使用charCodeAt将其转换为ASCII值。
在c++中直接存储就可以
举一个例子
```c++
#include <iostream>
#include<string.h>
using namespace std;

int main()
{
	int map[256];
    memset(map,-1, sizeof(map));
	map['c']= 'a';
	cout<<map[99]<<endl;//直接输出97
   return 0;
}
```


