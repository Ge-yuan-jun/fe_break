/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-08-16 11:34:55 
 * @Last Modified by:   Ge.Yuanjun 
 * @Last Modified time: 2017-08-16 11:34:55 
 */

// https://codility.com/programmers/lessons/3-time_complexity/

function solution(A) {
  let xor = A.length + 1
  for (let i = 0; i < A.length; i++) {
    xor ^= A[i]
    xor ^= (i + 1)
  }
  return xor
}