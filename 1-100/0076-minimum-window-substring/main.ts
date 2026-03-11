function minWindow(s: string, t: string): string {
  // 初始化双指针，维护滑动窗口
  let l = 0;
  let r = -1;

  // 记录t中每个字符的频率
  const need = new Map<string, number>();
  for (let c of t) {
    need.set(c, (need.get(c) || 0) + 1);
  }

  let needType = need.size; // 需要满足的字符种类数

  let res = "";

  while (r+1 < s.length) {
    r++;
    // 获取当前字符
    const c = s[r];
    // 如果当前字符在需要的字符列表里
    if (need.has(c)) {
      // 更新频率
      need.set(c, need.get(c)! - 1);
      // 如果当前字符的频率满足要求，减少需要满足的字符种类数
      if (need.get(c) === 0) {
        needType--;
      }
      // 当所有需要满足的字符种类数为0时，说明当前窗口满足条件
      while (needType === 0) {
        const newRes = s.substring(l, r + 1);
        // 更新结果
        if (!res || newRes.length < res.length) {
          res = newRes;
        }
        // 移动左指针
        const leftChar = s[l];
        if(need.has(leftChar)){
          // 更新频率
          need.set(leftChar, need.get(leftChar)! + 1);
          // 如果当前字符的频率不满足要求，增加需要满足的字符种类数
          if (need.get(leftChar)! > 0) {
            needType++;
          }
        }
        l++;
      }
    }
  }
  return res;
};