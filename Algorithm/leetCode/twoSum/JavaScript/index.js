/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function(nums, target) {
  let [map, i, resultArr] = [{}, 0, []];
  const len = nums.length;
  for (; i < len; i++) {
  
    let tmp = target - nums[i];
    
    if (map[tmp] !== undefined) {
      resultArr.push(map[tmp]);
      resultArr.push(i);
      break;
    }
    map[nums[i]] = i;
  }

  return resultArr;
}