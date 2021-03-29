/**
 * @param {string} 
 * @return {string}
 */

//记录词频后排序
 var frequencySort = function(s) {
   var chars = s.split("");
   const map = new Map();
   chars.forEach(c=>{
     map.set(c,map.has(c)? map.get(c)+1:1);
   });
   const list = Array.from(map).sort((a,b)=>{return b[1]-a[1]});
   //console.log(list);
   return list.map(n=>n[0].repeat(n[1])).join("");
};

var res = frequencySort("tree");
console.log(res);