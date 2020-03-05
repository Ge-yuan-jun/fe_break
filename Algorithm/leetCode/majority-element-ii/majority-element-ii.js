/**
 * @param {number[]} nums
 * @return {number[]}
 */
const majorityElement = function(nums) {
  let res = []
  if (nums === null || nums.length === 0) {
    return res
  }

  // 初始化候选人
  let cand1 = nums[0]
  let count1 = 0

  let cand2 = nums[0]
  let count2 = 0

  let len = nums.length
  let i = 0, j = 0
  // 摩尔算法，匹配阶段
  for (; i < len; i++) {
    if (cand1 === nums[i]) {
      count1++
      continue
    }

    if (cand2 === nums[i]) {
      count2++
      continue
    }

    // 计数归零，需要换一个数字
    if (count1 === 0) {
      cand1 = nums[i]
      count1++
      continue
    }
    if (count2 === 0) {
      cand2 = nums[i]
      count2++
      continue
    }

    count1--
    count2--
  }

  // 计数阶段
  count1 = 0
  count2 = 0
  for (; j < len; j++) {
    if (cand1 === nums[j]) {
      count1++
    } else if (cand2 === nums[j]) {
      count2++
    }
  }

  if (count1 > len/3) {
    res.push(cand1)
  }
  if (count2 > len/3) {
    res.push(cand2)
  }

  return res
}