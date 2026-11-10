class Solution:
    def reverseBetween(self, head: ListNode | None, left: int, right: int) -> ListNode | None:
        dummy_node = ListNode(-1)
        dummy_node.next = head

        pre = dummy_node
        for i in range(left - 1):
            pre = pre.next
        leftNode = pre.next

        rightNode = pre
        for i in range(right - left + 1):
            rightNode = rightNode.next
        succ = rightNode.next

        pre.next = None
        rightNode.next = None

        self.reverseLinkedList(leftNode)

        pre.next = rightNode
        leftNode.next = succ
        return dummy_node.next

    def reverseLinkedList(self, head: ListNode | None):
        pre = None
        cur = head
        while cur:
            tmp = cur.next
            cur.next = pre
            pre = cur
            cur = tmp
