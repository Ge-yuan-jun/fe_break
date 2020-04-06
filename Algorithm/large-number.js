/*
 * @Author: Ge.Yuanjun 
 * @Date: 2020-04-07 01:21:44 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2020-04-07 01:26:11
 */

// 简洁版
export default function add(a, b) {
  let i = a.length - 1
  let j = b.length -1

  let carry = 0 // 进位
  let ret = ''

  while (i >= 0 || j >= 0) {
    let x = 0 // a 位数上的值
    let y = 0 // b 位数上的值
    let sum

    if (i >= 0) {
      x = a[i] - '0' // 将 string 转换成 number
      i --
    }

    if (j >= 0) {
      y = b[j] - '0'
      j --
    }

    sum = x + y + carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }

    ret = sum + ret // 字符串拼接
  }

  if (carry) {
    ret = carry + ret
  }

  return ret
}

/**
 * 骚操作版本
 * @param {*} a 
 * @param {*} b 
 */
export function largeNumSum (a, b) {
  let c = 0
  let res = ''
  a = a.split()
  b = b.split()
  
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop() // boolean 型变量c会存在类型转换（true -> 1, false -> 0）
    res += c % 10
    c = c > 9 // c 在此处重置未 boolean 型变量 
  }
}