/*
 * @Author: Ge.Yuanjun 
 * @Date: 2018-05-10 19:03:18 
 * @Last Modified by:   Ge.Yuanjun 
 * @Last Modified time: 2018-05-10 19:03:18 
 * @Decs: 冒泡排序
 */

function bubbleSort (arr, n) {
  for (let sorted = false; sorted = !sorted; n--) {
    for (let i = 1; i < n; i++) {
      if (arr[i-1] > arr[i]) {
        let temp = arr[i-1]
        arr[i-1] =∏ arr[i]
        arr[i] = temp
        sorted = false
      }
    }
  }
  return arr
}