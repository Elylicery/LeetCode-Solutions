function reversePairs(nums: number[]): number {
  const n = nums.length;
  if (n <= 1) return 0;
  const aux: number[] = new Array(n);
  return mergeSortAndCount(nums, 0, n - 1, aux);
}

function mergeSortAndCount(arr: number[], l: number, r: number, aux: number[]): number {
  if (l >= r) return 0;
  const mid = l + Math.floor((r - l) / 2);
  let count = 0;
  count += mergeSortAndCount(arr, l, mid, aux);
  count += mergeSortAndCount(arr, mid + 1, r, aux);
  count += countReversePairs(arr, l, mid, r); // 先数
  merge(arr, l, mid, r, aux);                 // 后合并
  return count;
}

function countReversePairs(arr: number[], l: number, mid: number, r: number): number {
  let count = 0;
  let j = mid + 1;
  for (let i = l; i <= mid; i++) {
    while (j <= r && arr[i] > 2 * arr[j]) j++;
    count += j - (mid + 1);
  }
  return count;
}

function merge(arr: number[], l: number, mid: number, r: number, aux: number[]): void {
  for (let i = l; i <= r; i++) aux[i] = arr[i];
  let i = l, j = mid + 1;
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = aux[j]; j++;
    } else if (j > r) {
      arr[k] = aux[i]; i++;
    } else if (aux[i] <= aux[j]) {
      arr[k] = aux[i]; i++;
    } else {
      arr[k] = aux[j]; j++;
    }
  }
}
