/**
 * 求取数组中最大连续子序列和
 * 例如给定数组为A={1， 3， -2， 4， -5}， 则最大连续子序列和为6，即1+3+（-2）+ 4 = 6
 */
function solution(A) {
  let len = A.length, maxSum, maxHere

  maxSum = maxHere = A[0]

  for (let i = 0; i < len; i++) {
    if (maxHere <= 0) {
      maxHere = A[i]
    } else {
      maxHere += A[i]
    }

    if (maxHere > maxSum) {
      maxSum = maxHere
    }
  }

  return maxSum
}