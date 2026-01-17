function reversePairs(record: number[]): number {
  if(record.length <=1) return 0;
  const aux: number[] = new Array(record.length);
  return mergeSortAndCount(record, 0, record.length - 1, aux);
};

function mergeSortAndCount(arr: number[], l: number, r: number, aux: number[]): number {
  if (l >= r) return 0;

  const mid = l + Math.floor((r - l) / 2);
  let count = 0;

  // 统计左右半部分逆序对数
  count += mergeSortAndCount(arr, l, mid, aux);
  count += mergeSortAndCount(arr, mid + 1, r, aux);

  // 合并并统计跨左右的逆序对
  count += mergeAndCount(arr, l, mid, r, aux);
  return count;
}

function mergeAndCount(arr: number[], l: number, mid: number, r: number, aux: number[]): number {
  // 复制到辅助数组 aux
  for (let i = l; i <= r; i++) {
    aux[i] = arr[i];
  }

  let i=l,j=mid+1;
  let count = 0;

  for (let k = l; k <= r; k++) {
    if(i>mid){
      arr[k] = aux[j++];
    }else if(j>r){
      arr[k] = aux[i++];
    }else if(aux[i]<=aux[j]){
      arr[k] = aux[i++];
    }else{
      arr[k]= aux[j++];
      // aux[i] > aux[j]，说明从 aux[i] 到 aux[mid] 的所有元素都大于 aux[j]
      count += (mid - i + 1);
    }
  }
  return count;
}