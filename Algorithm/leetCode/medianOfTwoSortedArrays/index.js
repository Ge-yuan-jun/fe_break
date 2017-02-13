/**
 * 利用快排实现
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


/**
 * 利用ES5的sort方法实现
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2) {
    let arr = nums1.concat(nums2), res = 0;
    arr = arr.sort(function(a, b) {
      return a - b;
    });
    
    let len = arr.length, floor2 = Math.floor(arr.length/2);

    if (len % 2 === 1) {
      res = arr[floor2];
    } else {
      res = (arr[floor2 - 1] + arr[floor2]) / 2
    }
    
    return res
};

/**
 * 利用对比两个数组元素之间的大小直接排序
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2) {
    let [
      n, m, i, size, resultArr
    ] = [
      0, 0, 0, nums1.length + nums2.length, []
    ];
    let medianSize = Math.floor(size / 2);

    for (; i < size; i++) {
      // 不同情况的归属
      if (nums1[m] === undefined && nums2[n] === undefined) {
        break;
      } else if (nums1[m] === undefined) {
        resultArr.push(nums2[n]);
        n ++;
      } else if (nums2[n] === undefined) {
        resultArr.push(nums1[m]);
        m ++;
      } else if (nums1[m] < nums2[n]) {
        resultArr.push(nums1[m]);
        m ++;
      } else {
        resultArr.push(nums2[n]);
        n ++;
      }

      // 优化点：无需排序完所有的元素即可挑出循环
      if (resultArr.length > (medianSize + 1)) {
        break;
      }
    }

    return size % 2 === 1 ? 
          resultArr[medianSize] :
          ((resultArr[medianSize - 1] + resultArr[medianSize]) / 2);
};
