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