/**
 * fibonacci 算法
 */

// 递归
function fib1 (n) {
  return (2 > n) ? n : fib1(n-1) + fib1(n-2)
}

// 迭代
function fib2 (n) {
  let f = 0, g = 1
  while(0 < n--) {
    g += f, f = g - f
  }
  return f
}