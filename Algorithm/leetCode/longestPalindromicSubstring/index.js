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

  return maxp;
};

var isPalindrome = function(s) {
  let rev = s.split('').reverse().join('');
  return rev === s;
}

/**
 * 第二种解法：Manacher's ALGORITHM: O(n)时间求字符串的最长回文子串
 * article: https://www.felix021.com/blog/read.php?2040
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let str = '*#' // 经过处理之后的字符串
    , dp = [] // P[i] 来记录以字符S[i]为中心的最长回文子串向左/右扩张的长度
    , maxn = 0 // 回文字串的右边界
    , idx = 0; // 对称中心

  // 增加标识符
  for (let i = 0, len = s.length; i < len; i++) {
    str += `${s[i]}#`;
  }

  for (let i = 0, len = str.length; i < len; i++) {
    // 记 j = 2 * idx - 1, 也就是说 j 是 i 关于 id 的对称点(j = id - (i - id))
    if (maxn > i) dp[i] = Math.min(dp[2 * idx - i], maxn - i);
    else dp[i] = 1;

    while (str[i - dp[i]] === str[i + dp[i]]) dp[i]++;

    if (dp[i] + i > maxn) {
      maxn = dp[i] + i;
      idx = i;
    }
  }
  console.log(dp)
  let ans = 0
    , pos;
  
  for (let i = 1; i < str.length; i++) {
    if (dp[i] > ans) {
      ans = dp[i], pos = i;
    }
  }

  let f = str[pos] === '#'
    , tmp = f ? '' : str[pos]
    , startPos = f ? pos + 1 : pos + 2
    , endPos = f ? dp[pos] - 3 + startPos : dp[pos] - 4 + startPos;

  for (let i = startPos; i <= endPos; i+= 2) {
    tmp = str[i] + tmp + str[i];
  }
  console.log(tmp)
  return tmp;
}
 

longestPalindrome("aaabaaaa")