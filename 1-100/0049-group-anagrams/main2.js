//计数
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

var res = groupAnagrams( ["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log(res);