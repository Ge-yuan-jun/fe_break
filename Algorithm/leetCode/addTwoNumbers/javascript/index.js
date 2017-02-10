/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
    let carry = 0;
    let result = new ListNode(-1);
    let resHead =  result;

    // 遍历计算val
    while (l1 !== null || l2 !== null) {
        let sum = 0;
        sum += carry;
        if (l1 !== null) {
            sum += l1.val;
            l1 = l1.next;
        }

        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }

        let node;
        if (sum > 9) {
            node = new ListNode(sum - 10);
            carry = 1;
        } else {
            node = new ListNode(sum);
            carry = 0;
        }

        result.next = node;
        result = result.next;
    }

    if (carry) {
        result.next = new ListNode(1);
    }
    return resHead.next;
}
