/**
 * @param {string} s
 * @return {string}
 */
//双指针法
var arr = ['a','e','i','o','u','A','E','I','O','U']

var IsAeiou = function(c){
  if(arr.indexOf(c)!==-1){
    return true;
  }
  return false;
}

var reverseVowels = function(str) {
  var s = str.split("");
  let i=0;
  let j=s.length-1;
  while(i<j){
    if(IsAeiou(s[i]) && IsAeiou(s[j])){
      var tmp = s[j];
      s[j] = s[i];
      i++;
      j--;
    }else if(IsAeiou(s[i])){
      j--;
    }else if(IsAeiou(s[j])){
      i++;
    }else if(!IsAeiou(s[j]) && !IsAeiou(s[i])){
      i++;
      j--;
    }
  }
  return s.join("");
};