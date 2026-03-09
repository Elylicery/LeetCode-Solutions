function lengthOfLongestSubstring(s: string): number {
  let l = 0;
  let res = 0;

  // 记录窗口内字符出现的位置
  const map = new Map<string, number>();

  // 滑动窗口，右指针不断向右移动
  for (let r = 0; r < s.length; r++) {
    //当前字符如果是重复字符 并且重复元素在滑动窗口内
    if (map.has(s[r]) && map.get(s[r])! >= l) {
      // 左指针移动
      l = map.get(s[r])! + 1;
    }
    // 窗口长度的较大值
    res = Math.max(res, r - l + 1);
    //将当前字符的字符和下标放入字典
    map.set(s[r], r);
  }
  return res;
}

function lengthOfLongestSubstring2(s: string): number {
  let l = 0;
  let res = 0;

  const freq = new Uint8Array(256);

  // 滑动窗口，右指针不断向右移动
  for (let r = 0; r < s.length; r++) {
    const charCode = s.charCodeAt(r);

    if (freq[charCode] > 0) {
      // 一次性收缩到重复字符之后
      while (freq[charCode] > 0) { // 确保目标字母被完全移除
        freq[s.charCodeAt(l)]--;
        l++;
      }
    }
    res = Math.max(res, r - l + 1);
    freq[charCode]++; //更新频率
  }
  return res;
}
