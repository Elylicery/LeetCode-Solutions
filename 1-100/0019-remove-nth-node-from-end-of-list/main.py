class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
        dumy_head = ListNode(-1)
        dumy_head.next = head

        p = q = dumy_head
        for i in range(0, n + 1):
            q = q.next

        while q:
            p = p.next
            q = q.next

        del_node = p.next
        p.next = del_node.next

        return dumy_head.next
