# LeetCode-Solutions 维护规则

本题库存放 LeetCode 题解代码与思路笔记，语言为 JS / TS / Python / Java。
维护动作只有两类：**放题解文件、更新两个索引**。

## 1. 不需要验证题解（重要）

用户给出的解法**一律视为已在 LeetCode AC**。

- 不要用 Bash 跑 `python3` / `node` / `npx tsc` 去验证正确性，也不要写对拍、单测、临时脚本。
- 直接把文件放进仓库、更新索引即可。
- 本地环境是 Python 3.6.8，`def f(nums: list[int]) -> bool` 这类内置泛型注解在定义时会被求值并抛
  `TypeError: 'type' object is not subscriptable`。这是**本机解释器太老**，不是代码问题：LeetCode 官方环境是 3.10+，
  `list[int]` / `dict[str, int]` 写法正确且与库存风格一致，**不要因此改动题解**。

## 2. 不要动解题笔记 README.md

题解目录里的 `README.md` 是用户本人的思路笔记，**默认完全不碰**，除非用户明确说「帮我更新 README / 笔记」。

- 新增一种语言或一个新版本解法时：只放 `main*.py` / `main*.ts` / `main*.js` 代码文件 + 更新两个索引，
  不要往 README 追加代码块、不要补说明文字、不要调复杂度注释。
- 索引的「解题笔记」列永远指向该目录的 `README.md`，即使它还没收录新解法也照原样链接。
- 允许在回复里告诉用户「README 里还没有这份解法的笔记，需要我加吗」，但在得到明确要求前不要改文件。

## 3. 目录与文件命名

```
<分数区间>/<4位零填充ID>-<题目kebab slug>/
├── README.md      # 用户的解题笔记（见第 2 条）
└── main.<ext>     # 题解代码
```

- 区间目录沿用现有名字：`1-100`、`101-200`、`201-300`、`301-400`、`401-500`、`501-600`、
  `600-700`、`800-900`、`901-1000`、`1500-1600`、`3400-3500`、`LCR`。
  注意 `600-700` 是仓库既有目录名（里面放 0622~0700），不要顺手改名。
- 剑指 Offer / LCR 题目放 `LCR/`，slug 用拼音（如 `LCR/0170-shu-zu-zhong-de-ni-xu-dui-lcof`）。
- 同一题目录内多种实现：默认 `main.ts` / `main.js` / `main.py` / `main.java`。
- **同一语言、同一思路的变体解法：合进同一个 `main.<ext>`，用方法名区分**（如 350 的
  `intersect` / `intersect2`），不要为此新建 `main2.py`。
- **只有需要按分类分别挂链接时**才拆成 `main1.py`、`main2.py`（如 75 题：`计数` 分类链 `main1.py`、
  `partition` 分类链 `main2.py`）；JS 同理 `main2.js`。
- 代码只写 LeetCode 判题入口的形态（`class Solution` + 方法，或 `var fn = function () {}` / `function fn() {}`），
  不要引入仓库其他文件。根目录的 `test.ts`、`test2.ts`、`types.ts`、`utils/SortTestHelper.ts`
  是本地试验/性能对比脚本，**不要**出现在题解或索引链接里。

## 4. 两个索引，改一处必须改两处

| 文件 | 组织方式 |
| --- | --- |
| `by-id.md` | 按序号，小节是区间（`### Problems 1-100` … `### Problems 3400-3500`、`### LCR`），区间内按 ID 升序 |
| `by-category.md` | 按解法分类，`### <分类>` 小节（数组、对撞指针、查找表、双指针、滑动窗口、分桶、计数、集合、排序、partition、链表、栈、堆、快速选择、字典、BFS、DFS…），`## 树` 之后是树/图类分类 |

两个表列完全相同，新增或修改行时严格沿用：

```markdown
| ID | Problem | 中文地址 | JS/TS | Python | 解题笔记 | 核心思想 | 难度 |
| --- | --- | --- | :-: | :-: | :-: | --- | --- |
```

- `ID`：LeetCode 用纯数字（`75`），LCR 用 `LCR 170`。
- `Problem`：题目 slug，与目录名后半段一致。
- 其余单元格是 Markdown 链接，**必须是 GitHub 绝对 blob 地址**，不要用相对路径：
  `[main.py](https://github.com/Elylicery/LeetCode-Solutions/blob/main/<区间>/<目录>/<文件名>)`。
  中文地址列指向 `leetcode-cn.com` / `leetcode.cn` 题目页。
- 没有对应实现时该列留空，写法是两个空格：`|  |`（不要写 `-` 或 `无`）。
- `难度`：`easy` / `medium` / `hard`。
- **`by-id.md` 的 JS/TS 列和 Python 列每列只放一个链接**，默认指向该语言的**主版本**文件
  `main.py` / `main.ts` / `main.js` / `main.java`。同一语言存在多版本（`main1.py`、`main2.py`…）时
  **不要在同一格里堆多个链接**（`[main1.py] [main2.py]` 是错的）；目录里没有 `main.<ext>` 时挂编号最小的
  `main1.<ext>`。多解法的分工链接只在 `by-category.md` 里体现（见第 5 条）。
- 新增一题 = 同时插入 `by-id.md` 与 `by-category.md` 两行；同一分类里只补一种语言 = 填同一行的空列，不要新增行。

## 5. 一题多分类（核心规则）

同一道题可以出现在 `by-category.md` 的多个分类里，此时**每一行都要指向该分类对应的那份实现**：

- 链接指向对应版本文件，不要几个分类复制同一个链接。**多版本分工只发生在 `by-category.md`**，
  `by-id.md` 一题一行、每列单链接（见第 4 条）。示例：75 题（目录里是 `main.ts` + `main1.py` + `main2.py`）
  - `by-id.md` → Python 列只挂主版本 `[main1.py]`
  - `### 计数` → Python 列 `[main1.py]`，核心思想 `计数排序`
  - `### partition` → Python 列 `[main2.py]`，核心思想 `计数排序/三路快排 partition`
- `核心思想` 写**当前分类视角**的思想，不要把全部思想堆进每一行；`by-id.md` 因为一题只有一行，可以写全（如 `对撞指针/查找表`）。
- 新增一题的第二种解法时，先分清它是「变体」还是「新分类」：
  - **变体**（思路仍属同一分类）：直接在该 `main.<ext>` 里加一个方法（`intersect2` 这种命名），
    两个索引都不动，也不要新建 `main2.py`。
  - **新分类**：建 `main2.<ext>` → 在 `by-category.md` 对应分类加一行指向它 → **`by-id.md` 保持不动**
    （那格已指向主版本）。
- 新增分类行时，若该分类对应的实现文件还不存在，先建文件再链接；不要链接到别的分类的文件充数。
- 从某个分类删除该题 = 只删那一行，其他分类的行保持不动。

## 6. Git 约定

- `.gitignore` 里有 `*.js`：仓库中现有 27 个 `main.js` 是历史强制跟踪的。**新增 `.js` 文件必须 `git add -f`**，
  否则会被静默忽略、提交后发现文件没进去。`__pycache__/`、`*.pyc` 已忽略，不要提交。
- 提交信息沿用现有风格，前缀 `feat:` / `fix:`，说明做了什么 + 是否更新索引：
  - `feat: add python solution for <slug>, link in indexes`
  - `feat: add python solutions for <slug> (思路A and 思路B), link in indexes`
  - `fix: remove <slug> from the <分类> category`
- 一个题目/一次分类调整一个提交，题解文件 + 两个索引放在同一个提交里。
- `git add` 用具体文件名而不是 `git add -A`，避免带上 `__pycache__`、`node_modules`、txt 语料等杂物。
- 只在用户明确要求时 `git push`。

## 7. 改动范围

- 最小差异：只动涉及的题解代码文件和索引行，不重排无关表格、不改既有措辞、不做批量格式化。
- 保留中文原文与既有拼写（含历史笔误，如 `0622-deisgn-circular-queue`），只在被明确要求时修正。
- 分类归属由用户决定；对「这道题该放哪个分类」有疑问时，先做完无争议的部分，再提出选项，不要自行大规模调整分类。
