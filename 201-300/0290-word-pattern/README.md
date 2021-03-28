# Leetcode 290 单词规律

**思路1：哈希表**

使用map做pattern和words的**一一映射。**
即任意一个字符都对应着唯一的字符串，任意一个字符串也只被唯一的一个字符对应。在集合论中，这种关系被称为「双射」。

对于这种**双射** ：用map1记录每一个字符对应的字符串，用map2每一个字符串对应的字符。然后我们枚举每一对字符与字符串的配对过程，不断更新哈希表，如果发生了冲突，则说明给定的输入不满足双射关系。

因为满足条件的pattern和word是的长度必须一致，遍历pattern中的每一个字符，确定其对应的字符串，在这个遍历的过程中检查冲突。

直到遍历结束，符合条件的则返回true。


```js
/// HashMap
/// TimeComplexity: O(n)
/// Space Complexity: O(n)
 var wordPattern = function(pattern, s) {
  var words = s.split(" ");
  
  //pattern的个数和s的单词个数不相同一定不符合
  if(pattern.length != words.length){
    return false;
  }

  //使用两个map保证pattern和words中一一对应
  const map1 = new Map();//pattern[i] => words[i]
  const map2 = new Map();//words[i] => pattern[i]
  //遍历pattern
  for(let i=0;i<pattern.length;i++){
    if(!map1.has(pattern[i])){
      if(map2.has(words[i])){
        return false;
      }
      map1.set(pattern[i],words[i]);
      map2.set(words[i],pattern[i]);
    }else{
      let s = map1.get(pattern[i]);
      if(s!=words[i]){
        return false;
      }
    }
  } 
  return true;
};


var res = wordPattern("abba", "dog dog dog dog");
console.log(res);
```