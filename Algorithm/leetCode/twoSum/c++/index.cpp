/**
 * not good solution（空间复杂度太高了）
 */

class Solution {
  public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
      vector<int>tmp;
      for(int i = 0; i < nums.size()-1; i++){
        for(int j = i+1; j < nums.size(); j++){
          if(nums[i] + nums[j] == target){
            tmp.push_back(i);
            tmp.push_back(j);
            return tmp;
          }
        }
      }
      return tmp;
    }
};