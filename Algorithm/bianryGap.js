/**
  task description
  A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

  For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps.

  Write a function:

  function solution(N);
  that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

  For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5.

  Assume that:

  N is an integer within the range [1..2,147,483,647].
  Complexity:

  expected worst-case time complexity is O(log(N));
  expected worst-case space complexity is O(1).
  Copyright 2009–2017 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
 */


/**
 * first try : wrong answer
 * score: 40%
 * 1. n=328 101001000_2 （get 1）
 * 2. n=1162 10010001010_2 (get 2)
 * ...
 */
function solution(N) {
  let x = N.toString(2);
  let indexNum = 0;
  let max = 0;

  while (x.indexOf('1', indexNum + 1) > -1) {
    let rightIndex = x.indexOf('1', indexNum + 1);
    let gap = rightIndex - indexNum - 1;
    gap > max ? max = gap : undefined;
    indexNum = rightIndex + 1;
  }

  return max;
}

/**
 * second try
 * score: 80%
 * 未考虑最后一位不是 1 的情况
 */
function solution(N) {
  let x = N.toString(2);

  let arr = x.split('1');
  let max = 0;

  arr.forEach((item) => {
    if (item.length > max) {
      max = item.length;
    }
  })

  return max;
}

/**
 * third try
 * score: 100%
 * 但算法复杂度仍然存在一些问题
 */
function solution(N) {
  let x = N.toString(2);
  let arr = x.split(1);
  let max = 0;

  // 去掉数组最后一位（最后一位为‘’不影响，为多个0也不影响）
  arr.pop();

  arr.forEach((item) => {
    if (item.length > max) {
      max = item.length;
    }
  })

  return max;
}
