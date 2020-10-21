/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
  if (name === typed) {
      return true
  }
  let namePointer = 0
  let typedPointer = 0
  while(typed[typedPointer]) {
    // 如果当前序列字符相等，则继续比对 typed 的下一个字符 
    if (typed[typedPointer] === name[namePointer]) {
      typedPointer++
    } else {
      namePointer++
    }
  }
  if (namePointer !== name.length -1 && typedPointer !== typedPointer.length -1) {
    return false
  } 
  return true
};

console.log(isLongPressedName('alex', 'aaleex'))
console.log(isLongPressedName('saeed', 'ssaaedd'))
console.log(isLongPressedName('leelee', 'lleeelee'))
console.log(isLongPressedName('laiden', 'laiden'))
