/**
 * var a = [1,2,3,4,5,6,7,8,9]
 * var group = [[], [], [], []]
 * 将a随机放入group中，且 group 中每项的长度尽量相等
 * 结果示例：
 * group=[[3,5], [1,4], [2, 9], [6,7,8]]
 */

var a = [1,2,3,4,5,6,7,8,9]
var group = [[], [], [], []]

var split = (arr) => {
  let n = Math.floor(arr.length / group.length) >= 1 ? 
    Math.floor(arr.length / group.length) :
    1
  
  let result = [], t = []

  while(arr.length) {
    if (result.length + 1 == group.length) {
      result.push(arr)
      break
    }

    const ri = Math.floor(Math.random() * arr.length)
    t.push(arr[ri])
    arr.splice(ri, 1)
    
    if (t.length == n) {
      result.push(t)
      t = []
    }
  }

  return result
  
}

console.log(split(a))
