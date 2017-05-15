/**
 * Given an input string, reverse the string word by word.
 * For example,
 * Given s = "the sky is blue",
 * return "blue is sky the". 
 */

/**
 * @param {string} str
 * @returns {string}
 */
var reverseWords = function(str) {
    return str.replace(/\s+/ig,' ').replace(/(^\s*)|(\s*$)/g,"").split(' ').reverse().join(' '); 
};

