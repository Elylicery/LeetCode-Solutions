/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
  //左指针起始位置
  let l =0;
  let res = 0;
  //利用map字典查看子串是否包含重复子串
  const map = new Map();
  //滑动窗口（右指针不断右移）
  for(let r =0;r<s.length;r++){
      //当前字符如果是重复字符 并且重复元素在滑动窗口内 
      if(map.has(s[r]) && map.get(s[r])>=l){
          //左指针移动
          l = map.get(s[r])+1;
      }
      //窗口长度的较大值
      res = Math.max(res,r-l+1);
      //将当前字符的字符和下标放入字典
      map.set(s[r],r);
  }
  return res;
};
