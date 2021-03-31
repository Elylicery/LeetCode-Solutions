# 7-6 LeetCode：76. 最小覆盖子串

滑动窗口

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    //初始化双指针，维护滑动窗口
    let l = 0;
    let r = 0;

    //字典： 滑动窗口需要的字符 和 它的个数
    const need = new Map();
    for(let c of t){
        need.set(c,need.has(c)?need.get(c)+1:1)
    }
    //eg 对于"ABC"的输入，need是 Map{'A'=>1,'B'=>1,'C'=>1}
    let needType = need.size;
    let res = '';
    //移动右指针
    while(r<s.length){
        //获取当前字符
        const c = s[r];
        //如果字符在需要的字符列表里
        if(need.has(c)){
            need.set(c,need.get(c)-1);
            if(need.get(c) === 0) needType -=1;
        }
        //如果找到包含t的子串，就移动左指针
        while(needType === 0){
            //找到包含t的子串其中最小的
            const newRes = s.substring(l,r+1);
            if(!res || newRes.length < res.length) res = newRes;
            const c2 = s[l];
            if(need.has(c2)){
                need.set(c2,need.get(c2)+1);
                if(need.get(c2) === 1) needType+=1;
            }
            l+=1;
        }
        r+=1;
    }
    return res;
};
```