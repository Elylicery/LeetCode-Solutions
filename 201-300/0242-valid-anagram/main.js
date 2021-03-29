/// Sorting
/// Time Complexity: O(nlogn)
/// Space Complexity: O(1)
var isAnagram = function(s, t) {
  if(s.length !== t.length){
      return false;
  }
  var arrs = s.split("").sort();
  var arrt = t.split("").sort();
  for(let i=0;i<arrs.length;i++){
    if(arrt[i]!==arrs[i]) return false;
  }
  return true;
};

var res = isAnagram("anagram","nagaram");
console.log(res);