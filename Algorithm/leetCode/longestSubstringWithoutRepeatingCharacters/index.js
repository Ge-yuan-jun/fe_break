var lengthOfLongestSubstring = function(s) {
    
    let i = 0, len = s.length, tmpStr = '', max = 0;
    for (; i< len; i++) {
        let indexOfStr = tmpStr.indexOf(s[i]); 
        if (indexOfStr > -1) {
            tmpStr = tmpStr.substring(indexOfStr + 1);
        }
        tmpStr += s[i];
        if (max < tmpStr.length) {
            max = tmpStr.length;
        }
    }

    return max;
};

lengthOfLongestSubstring('pwwkew')

