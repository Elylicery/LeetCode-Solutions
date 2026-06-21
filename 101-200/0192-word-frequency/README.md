## 192. Word Frequency（统计词频）

### 方法一：Bash 一行命令

LeetCode 上这道题本身是一道 Shell 题，可以用一行 bash 命令解决：

```bash
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -rn | awk '{print $2" "$1}'
```

各命令的作用：

- `tr -s ' ' '\n'`：将空格替换为换行，使每个单词占一行
- `sort`：排序，使相同单词相邻
- `uniq -c`：统计相邻相同行的出现次数
- `sort -rn`：按数字降序排列
- `awk '{print $2" "$1}'`：调换列序，输出 "单词 频率"
