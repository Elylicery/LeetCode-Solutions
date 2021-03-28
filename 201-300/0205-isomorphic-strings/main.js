/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
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

//test 
var s = "egg";
var t = "add";
var res = isIsomorphic(s,t);
console.log(res);