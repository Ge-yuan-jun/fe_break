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
      namePointer++
    } else if (typedPointer > 0 && typed[typedPointer] === typed[typedPointer-1]){
      typedPointer++
    } else {
      return false
    }
  }

  return namePointer === name.length
};

console.log(isLongPressedName('alex', 'aaleex'))
console.log(isLongPressedName('saeed', 'ssaaedd'))
console.log(isLongPressedName('leelee', 'lleeelee'))
console.log(isLongPressedName('laiden', 'laiden'))
