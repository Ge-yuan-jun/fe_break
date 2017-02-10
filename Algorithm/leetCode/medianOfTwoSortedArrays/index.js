/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = nums1.concat(nums2), res = 0;
    arr = quick_sort(arr);
    
    let len = arr.length, floor2 = Math.floor(arr.length/2);

    if (len % 2 === 1) {
      res = arr[floor2];
    } else {
      res = (arr[floor2 - 1] + arr[floor2]) / 2
    }

    return res
};

var quick_sort = function(arr) {

  let len = arr.length;
  let left = [], right = [];
  let mid = [arr[0]];

  if (len <= 1) {
    return arr;
  } else {
    let  i = 1;
    for (; i< len; i++) {
      if (arr[i] < mid[0]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  }

  return quick_sort(left).concat(mid.concat(quick_sort(right)));
}

findMedianSortedArrays([1,3], [2,4])