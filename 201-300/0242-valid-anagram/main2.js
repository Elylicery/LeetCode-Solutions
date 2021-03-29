/// Using Hashtable
/// Time Complexity: O(n)
/// Space Complexity: O(26)
var isAnagram = function(s, t) {
  if(s.length !== t.length){
      return false;
  }
  var len = s.length;
  var freq = new Array(26).fill(0);
  for(let i=0;i<len;i++){
    freq[s[i].charCodeAt()-'a'.charCodeAt()]++;
  }
  for(let i=0;i<len;i++){
    freq[t[i].charCodeAt()-'a'.charCodeAt()]--;
    if(freq[t[i].charCodeAt()-'a'.charCodeAt()]<0){
      return false;
    }
  }
  return true;
};

var res = isAnagram("anagram","nagaram");
console.log(res);