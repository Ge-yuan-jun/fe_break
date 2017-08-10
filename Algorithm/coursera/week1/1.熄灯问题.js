/*
 * @Author: Ge.Yuanjun 
 * @Date: 2017-08-08 10:23:12 
 * @Last Modified by: Ge.Yuanjun
 * @Last Modified time: 2017-08-09 11:55:33
 */

/**
 * 
 * @param {Array} puzzle 5行6列数组 
 * @param {Array} press 6行8列数组
 */

let press = [
    [, , , , , , , ],
    [, , , , , , , ],
    [, , , , , , , ],
    [, , , , , , , ],
    [, , , , , , , ],
    [, , , , , , , ]
  ],
  puzzle = [
    [0, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0]
  ]

// 推测验证过程
const guess = () => {
  let c, r;
  // 根据 press 第一行和puzzle数组，计算press其它行的值
  for (r = 1; r < 5; r++) {
    for (c = 1; c <= 6; c++) {
      press[r + 1][c] = (puzzle[r][c] + press[r][c] + press[r - 1][c] + press[r][c - 1] + press[r][c + 1]) % 2
    }
  }
  // 判断所计算的press数组能否熄灭第五行的所有灯
  for (c = 1; c < 7; c++) {
    if ((press[5][c - 1] + press[5][c] + press[5][c + 1] + press[4][c]) % 2 != puzzle[5][c]) {
      return false
    }
  }
  return true
}

// 枚举过程
const enumerate = () => {
  let c, success
  // 初始化
  for (c = 1; c < 7; c++) {
    press[1][c] = 0
  }
  while (guess(press, puzzle) == false) {
    press[1][1]++
      c = 1
    while (press[1][c] > 1) {
      press[1][c] = 0
      c++
      press[1][c]++
    }
  }
}

const formatPress = (press) => {
  for (let r = 0; r < 6; r++) {
    press[r][0] = 0
    press[r][7] = 0
  }

  for (let c = 1; c < 7; c++) {
    press[0][c] = 0
  }

  return press
}

const formatPuzzle = (puzzle) => {
  for (let r = 0; r < 5; r++) {
    puzzle[r].push(0)
    puzzle[r].unshift(0)
  }

  puzzle.unshift([0, 0, 0, 0, 0, 0, 0, 0])
  return puzzle
}

press = formatPress(press)
puzzle = formatPuzzle(puzzle)

enumerate()
for (let r = 1; r < 6; r++) {
  for (let c = 1; c < 7; c++) {
    console.log(press[r][c])
  }
}