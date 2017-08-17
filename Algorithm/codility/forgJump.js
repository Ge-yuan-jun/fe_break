/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-08-16 16:30:51 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-08-16 19:31:30
 */

 // https://codility.com/programmers/lessons/3-time_complexity/frog_jmp/
 function solution(X, Y, D) {
   return Math.floor(Number((Y - X + (D -1)) / D))
 }