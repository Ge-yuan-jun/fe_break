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

console.log(solution([3, 1]))