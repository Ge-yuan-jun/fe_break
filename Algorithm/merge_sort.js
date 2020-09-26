/**
 * 归并排序
 * 递推公式：
 * merge_sort(p…r) = merge(merge_sort(p…q), merge_sort(q+1…r))
 * 终止条件：
 * p >= r 不用再继续分解
 */
const merge_arr = (left, right) => {
  // 归并排序需要用空间换时间
  const leftLen = left.length
  const rightLen = right.length

  let tempArr = [] // 临时存放数组
  let leftIndex = 0 
  let rightIndex = 0

  // 进行排序处理
  while (leftIndex < leftLen && rightIndex < rightLen) {
    if (left[leftIndex] <= right[rightIndex]) { // 需要 <= 防止排序之后的数组不稳定
      tempArr.push(left[leftIndex])
      leftIndex++
    } else {
      tempArr.push(right[rightIndex])
      rightIndex++
    }
  }

  // 切割之后数组长度不一致的处理，将剩余数组拷贝至临时数组（版本1， 不优雅）
  // let start = leftIndex
  // let end = leftEnd
  // let surplusArr = left
  // if (rightIndex <= rightLen) {
  //   start = rightIndex
  //   end = rightLen
  //   surplusArr = right
  // }

  // while (start <= end) {
  //   tempArr.push(surplusArr[start])
  //   start++
  // }

  // return tempArr

  // 处理切割数组长度不一致的问题（版本2）
  return tempArr.concat(left.slice(leftIndex).concat(right.slice(rightIndex)))
}

const merge_sort = (arr) => {
  const len = arr.length
  if (len <= 1) return arr
  // 分解成两半
  const middle = Math.floor(arr.length / 2)
  // 分割数组
  const leftArr = arr.slice(0, middle)
  const rightArr = arr.slice(middle)

  return merge_arr(merge_sort(leftArr), merge_sort(rightArr))
}

const demo = [1, 5, 6,2, 3, 4]
console.log(merge_sort(demo))