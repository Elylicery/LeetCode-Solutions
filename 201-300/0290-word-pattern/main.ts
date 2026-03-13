function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(' ');

  if(pattern.length !== words.length) return false;

  const map1 = new Map<string, string>(); //记录pattern中每个字符对应的单词
  const map2 = new Map<string, string>(); //记录单词对应的pattern中每个字符

  // 遍历pattern和words，建立映射关系
  for(let i = 0; i < pattern.length; i++){
    const c = pattern[i];
    const word = words[i];
    // 如果当前字符和单词都没有建立映射关系，建立映射关系；如果已经建立了映射关系，检查是否一致
    if(!map1.has(c) && !map2.has(word)){
      map1.set(c, word);
      map2.set(word, c);
    } else if(map1.get(c) !== word || map2.get(word) !== c){
      return false;
    }
  }

  return true;
};