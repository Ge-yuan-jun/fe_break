/**
 * @desc: https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * @solution: 解题方案2种
 * 1. 递归处理（从链表尾部开始反转）
 * 2. 临时变量处理（从链表头部开始反转）
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * @desc 临时变量处理
 */
const reverseList = (head) => {
  if (head === null || head.next === null) {
    return head
  }

  let p = head, q = head.next
  while (q) {
    head.next = q.next
    q.next = p
    p = q
    q = head.next
  }
  return p
}