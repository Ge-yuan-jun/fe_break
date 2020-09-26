// 该排序算法的空间复杂度不是 O(1)，有待优化，但该方法属于函数式调用，UT简单
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

/**
 * 空间复杂度为 O(1) 的写法，该写法可以保证算法是稳定的，但是非函数式，客户端代码我可能不会这样写
 */
const swap = (arrToSort, low, high) => {
  const lowValue = arrToSort[low]
  arrToSort[low] = arrToSort[high]
  arrToSort[high] = lowValue
}

// 分区进行相关操作
const partition = (arrToSort, low, high) => {
  const pivot = arrToSort[Math.floor((low + high)/2)]
  while (low <= high) {
    while (arrToSort[low] < pivot) {
      low++
    }
    while (arrToSort[high] > pivot) {
      high --
    }

    if (low <= high) {
      swap(arrToSort, low, high)
      low++
      high --
    }
  }
  return low
}

const quickSort = (arr = [], left = 0, right = arr.length) => {
  if (left >= right) return arr
  let partitionIndex = partition(arr, left, right)
  if (low < partitionIndex - 1) {
    quickSort(arrToSort, low, partitionIndex - 1)
  }
  if (high > partition) {
    quickSort(arrToSort, partitionIndex, high)
  }
}