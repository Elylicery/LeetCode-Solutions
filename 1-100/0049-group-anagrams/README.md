# Leetcode 49.字母异位词分组

使用哈希表，键：一组字母异位词的标志，值：一组字母异位词列表。
遍历每个字符串，对于每个字符串，得到该字符串所在的一组字母异位词的标志，将当前字符串加入该组字母异位词的列表中。遍历全部字符串之后，哈希表中的每个键值对即为一组字母异位词。

以下的两种方法分别使用排序和计数作为哈希表的键。


**方法一：排序**

为字母异位词的两个字符串排序后得到的字符一定相同

```js
//排序
var groupAnagrams = function (strs) {
  const map = new Map();
  for(let str of strs){
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key)? map.get(key):new Array();
    list.push(str);
    map.set(key,list);
  }
  return Array.from(map.values());
}
```

复杂度分析

* 时间复杂度：O(nklogk)，其中 n 是 strs 中的字符串的数量，k 是strs 中的字符串的的最大长度。需要遍历 n个字符串，对于每个字符串，需要O(klogk) 的时间进行排序以及 O(1)的时间更新哈希表，因此总时间复杂度是 O(nklogk)。
* 空间复杂度：O(nk)，需要用哈希表存储全部字符串。

**方法二：计数**

由于互为字母异位词的两个字符串包含的字母相同，因此两个字符串中的相同字母出现的次数一定是相同的，故可以将每个字母出现的次数使用字符串表示，作为哈希表的键。

由于字符串只包含小写字母，因此对于每个字符串，可以使用长度为 26 的数组记录每个字母出现的次数。

```js
var groupAnagrams = function (strs) {
  const map = new Object();
  for(let str of strs){
    const count = new Array(26).fill(0);
    for(let c of str){
      count[c.charCodeAt()-'a'.charCodeAt()]++;
    }
    map[count] ? map[count].push(str) : map[count] = [str];
  }
  return Object.values(map);
}
```
复杂度分析：

* 时间/空间：O(n(k+26))


【备注】：

Object和map类似，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。

* map和键可以是任意值，Object的建必须是一个String或Symbol
* 获取map某个键对应的值：`map.get(key)`,获取Object某个键对应的值：`obj[key]`
* 获取map的所有values `Array.from(map.values())`,获取Object的所有values `Object.values(map)`