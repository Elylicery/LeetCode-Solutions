/// Sliding Window
/// Time Complexity: O(len(p) + len(s))
/// Space Complexity: O(1)
var same = function(freq_s,freq_p){
  for(let i=0;i<26;i++){
    if(freq_p[i]!== freq_s[i])
      return false;
  }
  return true;
}

var findAnagrams = function(s, p) {
  var res = [];
  //特殊情况处理
  if(s.length < p.length) return res;

  var freq_p = new Array(26).fill(0);//记录p中字符和其数量
  var freq_s = new Array(26).fill(0);//记录s中字符和其数量
  //将p中的字符和词频放进去
  for(let c of p){
    freq_p[c.charCodeAt()-'a'.charCodeAt()] +=1;
  }

  let l = 0,r=-1;//滑动窗口s[l...r];
  while(r+1<s.length){
    r++;
    freq_s[(s[r].charCodeAt())-('a'.charCodeAt())]++;
    // console.log("freq_p:",freq_p);
    // console.log("freq_s:",freq_s);
    //如果子串长度大于p，移动左指针
    if(r-l+1 > p.length){
      freq_s[(s[l].charCodeAt())-('a'.charCodeAt())]--;
      l++;
    }
    //如果子串长度等于p的长度，并且两个数组相同的
    if(r-l+1 === p.length && same(freq_s,freq_p)){
      res.push(l);
    }
  }
  return res;
};

// var res1 = findAnagrams("cbaebabac", "abc");
// console.log(res1);