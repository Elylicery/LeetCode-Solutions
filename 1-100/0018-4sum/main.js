/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
	const quadruples = [];
	if (nums.length < 4) return quadruples;

	//排序
	nums.sort((x, y) => x - y);
	const n = nums.length; //数组下标范围为0~n-1
	for (let i = 0; i < n - 3; i++) {
		//在确定第一个数后的特殊情况判断
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}
		if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
			break;
		}
		if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) {
			continue;
		}
		for (let j = i + 1; j < n - 2; j++) {
			//在确定前两个数后的特殊情况判断
			if (j > i + 1 && nums[j] === nums[j - 1]) {
				continue;
			}
			if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
				break;
			}
			if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) {
				continue;
			}
			//双指针枚举剩下的两个数
			let left = j + 1,right = n - 1;
			while (left < right) {
				const sum = nums[i] + nums[j] + nums[left] + nums[right];
				if (sum === target) {
					quadruples.push([nums[i], nums[j], nums[left], nums[right]]);
					while (left < right && nums[left] === nums[left + 1]) {
						left++;
					}
					left++;
					while (left < right && nums[right] === nums[right - 1]) {
						right--;
					}
					right--;
				}else if(sum<target){
          left++;
        }else{
          right--;
        }
			}
		}
	}
  return quadruples;
};

var res = fourSum([1, 0, -1, 0, -2, 2], 0);
console.log(res);
