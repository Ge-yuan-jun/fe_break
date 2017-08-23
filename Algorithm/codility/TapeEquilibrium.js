/**
 * https://codility.com/programmers/lessons/3-time_complexity/tape_equilibrium/
 */

function solution(A) {
  let data = {}, len = A.length, min = 10000
  
  data[1] = {
    left: A[0],
    right: 0
  }

  for (let i = 1; i < len; i ++) {
    data[1]["right"] += A[i]  
  }

  data[1]["min"] = Math.abs(data[1]["right"] - data[1]["left"])

  for (let j = 2; j < len; j++) {

    data[j] = {
      left: 0,
      right: 0,
      min: 10000
    }

    data[j]["left"] = data[j-1]["left"] + A[j-1]
    data[j]["right"] = data[j-1]["right"] - A[j-1]
    data[j]["min"] = Math.abs(data[j]["left"] - data[j]["right"])
  }

  for (let k = 1; k < len; k++ ) {
    if (min > data[k]["min"]) {
      min = data[k]["min"]
    }
  }

  return min
}
/**
 * 上面是我自己想的解决方法，尽管通过了全部测试，但代码仍存在问题（代码量等等）
 */

function solution(A) {
  let len = A.length
  if (!len) return 0
  
  let minDiff = Number.POSITIVE_INFINITY,
  sumLeft = 0,
  sumRight = A.reduce((x, y) => x+y, 0),
  i = 0

  while (i < len -1) {
    const el = A[i]
    sumLeft += A[i]
    sumRight -= A[i]

    const diff = Math.abs(sumRight - sumLeft)

    if (minDiff > diff) {
      minDiff = diff
    }

    i++
  }
  return minDiff
} 

console.log(solution([3, 1]))