# Leetcode 451 根据字符出现频率排序

**常规思路:**

记录字符出现的词频排序后按序输出

```js
 var frequencySort = function(s) {
   var chars = s.split("");
   const map = new Map();
   chars.forEach(c=>{
     map.set(c,map.has(c)? map.get(c)+1:1);
   });
   const list = Array.from(map).sort((a,b)=>{return b[1]-a[1]});
   return list.map(n=>n[0].repeat(n[1])).join("");
};
```
注意：

* 对于map:map[0]是key，map[1]是value
* 让map按照value的值升序排序:先转成array再排序 ` const list = Array.from(map).sort((a,b)=>{return b[1]-a[1]});`,例如上文中排序后的list为`[ [ 'e', 2 ], [ 't', 1 ], [ 'r', 1 ] ]`
* 对list做一个map得到结果字符串
  
