/**
 * https://codility.com/programmers/lessons/4-counting_elements/missing_integer/
 */

// 第一种
function solution1(A) {
  A = [...new Set(A)].sort((a, b) => a - b)
  let i = 0,
    len = A.length

  if (A[i] > 1) {
    return 1
  }
    
  while (i < len) {
    if (A[i] <= 0) {
      i++
      continue
    }
    if (A[i] + 1 != A[i + 1]) {
      return (A[i] + 1) > 1000000 ? 1 : (A[i] + 1)
    }
    i++
  }
  return 1
}

// 第二种
function solution(A) {
  const valueMap = {}
  const len = A.length
  let max

  for (let v of A) {
    valueMap[v] = true
    if (v > 0 && (max === undefined || v > max)) {
      max = v
    }
  }

  if (max === undefined || max <= 0) {
    return 1
  }

  for (let i = 1; i <= max; i++) {
    if (valueMap[i] !== true) {
      return i
    }
  }

  return max + 1
}

// 第三种
function solution() {
  let candVals = new Set();
  for( let i = 1; i <= A.length+1; ++i ) {
        candVals.add(i);
    }
    
    for( val of A ) {
        if(val > 0 && candVals.has(val) ) {
            candVals.delete(val);
        }
    }
    
    let arr = Array.from(candVals);
    
    return Math.min(...arr);
}

console.log(solution1([2]))