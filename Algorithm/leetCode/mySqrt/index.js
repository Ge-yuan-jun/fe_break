/**
 * no.69 easy 
 * 牛顿迭代法（数学专业装逼利器）
 */
const mySqrt = (x) => {
  if (x === 0) {
    return x
  }
  let [C, x0] = [x, x]
  while (true) {
    xi = 0.5 * (x0 + C/x0)
    if (Math.abs(x0 - xi) < 0.000001) {
      break
    }
    x0 = xi
  }
  return Math.floor(x0)
}
