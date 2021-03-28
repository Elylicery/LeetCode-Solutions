/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
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