function quick_sort(arr) {
  const len = arr.length;
  let [left, right, i] = [[], [], 1];
  const mid = [arr[0]];
  if (len <= 1) { // 必须设置为 <= 1，否则会内存越界
    return arr
  } else {
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