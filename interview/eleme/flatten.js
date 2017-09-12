/**
 * 将多维数组降维成一维数组
 * 例：
 * var a = [1, [2,3], [3,4,[5,6]], 7,[8,9]]
 * 将多维数组flatten成一维数组
 * 结果为 a = [1,2,3,4,5,6,7,8,9]
 * 
 * reduce api site:
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

var a = [1, [2,3], [3,4,[5,6]], 7,[8,9]]

var flatten = (arr) => {
  return arr.reduce((tmpArr, cur) => tmpArr.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
} 

console.log(flatten(a))