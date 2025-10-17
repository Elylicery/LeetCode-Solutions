function convertToBase7(num: number): string {
  if (num === 0) {
    return "0";
  }

  const stack: number[] = [];
  const base = 7;

  const isNative = num < 0;

  let current = Math.abs(num);

  while (current !== 0) {
    const mod = current % base;
    stack.push(mod);
    current = Math.floor(current / base);
  }

  const base7str = stack.reverse().join("");

  return isNative ? `-${base7str}` : base7str;
}