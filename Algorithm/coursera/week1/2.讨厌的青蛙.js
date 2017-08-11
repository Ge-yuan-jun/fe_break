/**
 * destroyedNum: 被踩踏的稻草的总数
 * row: 稻草的总种植行数
 * column: 稻草的总种植列数
 * maxDestroyedNum: 被破坏最多的稻草数目
 */

let destroyedNum, row, column, maxDestroyedNum

/**
 * 输入的稻草位置进行排序
 */
const dotSort = (plants) => plants.sort((a, b) => {
  if (a.x == b.x) {
    return a.y > b.y
  }
  return a.x > a.y
})

const dotSearch = (plants, plant) => {
  let start = 0,
    end = plants.length

  while (start < end) {
    let middle = Math.floor(end/2)
     
    if (plants['middle']['x'] == plant.x && plants['middle']['y'] == plant.y) {
      return true
    }
    if (plant.x < plants['middle']['x']) {
      end = middle - 1
    } else if (plant.x > plants['middle']['x']) {
      start = middle + 1
    } else {
      if (plant.y < plants['middle']['y']) {
        end = middle - 1      
      } else {
        start = middle + 1
      }
    } 
  }
  return false
}

/**
 * 判断从第二点开始，步长为distanceX,distanceY，那么最多能走几步
 */
const serachPath = (secPlant, distanceX, distanceY) => {
  let steps = 2，
  plant = {
    x,
    y
  }

  plant.x = secPlant.x + distanceX
  plant.y = secPlant.y + distanceY

  while (plant.x <= row && plant.x >= 1 && plant.y <= column && plant.y >= 1) {
    if (!dotSearch(plants, plant)) {
      steps = 0
      break
    }
    plant.x += distanceX
    plant.y += distanceY
    steps++
  }

  return steps
}

/**
 * 找到踩踏稻草最多的路径，返回踩踏次数
 */
const findMax = () => {

  let steps

  for (let i = 0; i < destroyedNum - 2; i++) {
    for (let j = i + 1; j < n; j++) {
      distanceX = plants[j].x - plants[i].x
      distanceY = plants[j].y - plants[j].y
      previousX = plants[i].x - distanceX
      previousY = plants[i].y - distanceY

      /**
       * 第一个点前面一个点在稻田里面
       * 说明本次选的第二点导致的x方向步长不合理（太小）
       * 取下一个点作为第二点 
       */
      if (previousX <= row && previousX >= 1 && previousY <= column && previousY >= 1) {
        continue
      }

      /**
       * x方向过早越界了，说明本次选的第二点不成立
       * 如果换下一个点作为第二点，x方向的步长只会更大，更不成立
       * 所以，应该认为本次选取的第一点必然是不成立的，
       * 那么取下一个点作为第一点再试
       */
      if (plants[i].x + (maxDestroyedNum - 1) * distanceX > r) {
        break
      }

      previousY = plants[i].y + (max - 1) * distanceY
      /**
       * y 方向过早越界了，应换一个点作为第二点再试
       */
      if (previousY > column || previousY < 1) {
        continue
      }

      steps = serachPath(plants[j], distanceX, distanceY)

      if (steps > maxDestroyedNum) {
        maxDestroyedNum = steps
      }

      if (maxDestroyedNum == 2) {
        maxDestroyedNum = 0
      }

      console.log(maxDestroyedNum)
    }
  }
}