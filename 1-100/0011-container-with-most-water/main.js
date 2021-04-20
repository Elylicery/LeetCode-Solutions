/// Brute Force
/// Time Complexity: O(n^2)
/// Space Complexity: O(1)
var maxArea = function(height) {
  if(height.length <2) return;

  var area = 0;
  for(let i=0;i<height.length;i++){
    for(let j=i+1;j<height.length;j++){
      area = Math.max(area,Math.min(height[i],height[j])*(j-i));
    }
  }
  return area;
};