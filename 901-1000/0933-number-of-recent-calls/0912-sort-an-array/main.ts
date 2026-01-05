//递归使用归并排序，对arr[l....r]的范围进行排序
function __mergeSort<T extends number | string>(arr: T[], l: number, r: number): void {
    if (l >= r) return;

    const mid = Math.floor((l + r) / 2);
    __mergeSort(arr, l, mid);
    __mergeSort(arr, mid + 1, r);
    __merge(arr, l, mid, r);
}

//将arr[l...mid]和arr[mid+1...r]两部分进行归并
function __merge<T extends number | string>(arr: T[], l: number, mid: number, r: number): void {
    // 1. 复制到辅助数组 aux（长度 = r - l + 1）
    const aux: T[] = new Array(r - l + 1);
    for (let i = l; i <= r; i++) {
        aux[i - l] = arr[i];
    }

    // 2. 双指针合并回原数组
    let i = l;      // 左半部分指针 [l, mid]
    let j = mid + 1; // 右半部分指针 [mid+1, r]

    for (let k = l; k <= r; k++) {
        if (i > mid) {
            // 左半部分耗尽，取右半部分
            arr[k] = aux[j - l];
            j++;
        } else if (j > r) {
            // 右半部分耗尽，取左半部分
            arr[k] = aux[i - l];
            i++;
        } else if (aux[i - l] < aux[j - l]) {
            // 左 < 右，取左
            arr[k] = aux[i - l];
            i++;
        } else {
            // 左 >= 右，取右（保证稳定性：相等时右后放）
            arr[k] = aux[j - l];
            j++;
        }
    }
}

function sortArray(arr: number[]): number[] {
    const arrCopy = [...arr];
    __mergeSort(arrCopy, 0, arrCopy.length - 1);
    return arrCopy;
};