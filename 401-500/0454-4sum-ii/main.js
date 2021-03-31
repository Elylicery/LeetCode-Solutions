/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */

//时间 O(n^2)
//空间 O(n^2)
var fourSumCount = function(A, B, C, D) {
  //查找表
  const map = new Map();
  //双重循环将C+D的每一种可能放入查找表
  for(let i=0;i<C.length;i++){
    for(let j=0;j<D.length;j++){
      map.set(C[i]+D[j],map.has(C[i]+D[j])? map.get(C[i]+D[j])+1:1);
    }
  }

  //结果计数
  let res = 0;
  //对A和B中的数做一个双重循环
  for(let i=0;i<A.length;i++){
    for(let j=0;j<B.length;j++){
      if(map.has(0-A[i]-B[j])){
        res += map.get(0-A[i]-B[j]);
      }
    }
  }
  return res;
};


//测试
// const A = [ 1, 2],
// B = [-2,-1],
// C = [-1, 2],
// D = [ 0, 2];

const A = [-1,-1],
B = [-1,1],
C = [-1,1],
D = [1,-1];
var res = fourSumCount(A,B,C,D);
console.log(res);