/// Sorting
/// Time Complexity: O(nlogn)
/// Space Complexity: O(1)
function isAnagram(s: string, t: string): boolean {
  if(s.length !== t.length) return false;

  const arr_s = s.split('').sort();
  const arr_t = t.split('').sort();

  for(let i = 0; i < arr_s.length; i++){
    if(arr_s[i] !== arr_t[i]) return false;
  }
  return true;
};

/// Using Hashtable
/// Time Complexity: O(n)
/// Space Complexity: O(26)
function isAnagram2(s: string, t: string): boolean {
  if(s.length !== t.length) return false;

  const len = s.length;
  const freq = new Array(26).fill(0); //记录s中每个字母的频率

  for(let i = 0; i < len; i++){
    freq[s.charCodeAt(i) - 'a'.charCodeAt(0)]++; 
  }

  for(let i = 0; i < len; i++){
    freq[t.charCodeAt(i) - 'a'.charCodeAt(0)]--; 
    if(freq[t.charCodeAt(i) - 'a'.charCodeAt(0)] < 0) return false; //如果频率小于0，说明t中有s中没有的字符
  }
  return true;
};