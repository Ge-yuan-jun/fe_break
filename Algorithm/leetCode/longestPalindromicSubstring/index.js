/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let maxp_length = 0,
    maxp = '';
  
  for (let i = 0; i < s.length; i++) {
    let subs = s.substr(i, s.length);
    for (let j = subs.length; j >=0; j--) {
      let sub_subs = subs.substr(0, j);
      if (sub_subs.length <= 0) {
        continue;
      }
      if (isPalindrome(sub_subs)) {
        if (sub_subs.length > maxp_length) {
          maxp_length = sub_subs.length;
          maxp = sub_subs;
        }
      }
    }
  }
  console.log(maxp)
  return maxp;
};

var isPalindrome = function(s) {
  let rev = s.split('').reverse().join('');
  return rev === s;
}

longestPalindrome("aaabaaaa")