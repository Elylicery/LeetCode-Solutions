class Solution:
    def swapPairs(self, head: ListNode | None) -> ListNode | None:
        dummy_node = ListNode(-1)
        dummy_node.next = head

        p = dummy_node
        while p.next and p.next.next:
            node1 = p.next
            node2 = p.next.next
            node1.next = node2.next
            node2.next = node1
            p.next = node2
            p = node1
        return dummy_node.next
