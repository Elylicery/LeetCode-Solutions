/// Two Pointers
/// Time Complexity: O(n)
/// Space Complexity: O(1)
var maxArea = function(height) {
  if(height.length<2) return;

  let l =0,r = height.length-1;
  var area = 0;
  while(l<r){
    area = Math.max(area,Math.min(height[l],height[r])*(r-l));
    if(height[l]<height[r]){
      l++;
    }else{
      r--;
    }
  }
  return area;
};