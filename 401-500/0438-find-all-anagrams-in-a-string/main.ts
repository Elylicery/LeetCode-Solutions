/// Sliding Window
/// Time Complexity: O(len(p) + len(s))
/// Space Complexity: O(1)
const same = (arr1: number[], arr2: number[]): boolean => {
  for(let i = 0; i < 26; i++){
    if(arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function findAnagrams(s: string, p: string): number[] {
  
  const res: number[] = [];

  // 特殊情况处理
  if (s.length < p.length)  return res;

  const freq_p = new Array(26).fill(0); //记录p中每个字母的频率
  const freq_s = new Array(26).fill(0); //记录s种每个字母的频率

  // 初始化频率数组，将p中的字符和词频放进去
  for(let c of p){
    freq_p[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  // 滑动窗口，右指针不断向右移动
  let l = 0;
  let r = -1;

  while(r+1 < s.length){
    r++;
    freq_s[s.charCodeAt(r) - 'a'.charCodeAt(0)]++;

    // 如果子串长度大于p，移动左指针
    if(r - l + 1 > p.length){
      freq_s[s.charCodeAt(l) - 'a'.charCodeAt(0)]--;
      l++;
    }
    // 如果子串长度等于p，并且两个数组相等，说明找到了一个异位词
    if(r-l+1 === p.length && same(freq_p, freq_s)){
      res.push(l);
    }
  }

  return res;
};

