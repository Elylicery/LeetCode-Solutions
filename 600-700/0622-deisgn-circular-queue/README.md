# 622. 设计循环队列

用数组实现循环队列，注意头尾指针对队列最大容量的取余判断

```
class MyCircularQueue {
  private queue: number[]; // 队列数组
  private queueCapacity: number; // 队列最大容量
  private iHead: number; // 队列头指针
  private iTail: number; // 队列尾指针
  private queueLen: number; // 队列当前元素个数

  constructor(k: number) {
    this.queue = new Array(k);
    this.queueCapacity = k;
    this.iHead = 0;
    this.iTail = 0;
    this.queueLen = 0;
  }

  enQueue(value: number): boolean {
    if (this.queueLen + 1 > this.queueCapacity) {
      return false;
    } else {
      this.queue[this.iTail] = value;
      this.iTail++;
      this.iTail = this.iTail % this.queueCapacity;
      this.queueLen++;
      return true;
    }
  }

  deQueue(): boolean {
    if (this.queueLen === 0) {
      return false;
    } else {
      this.iHead ++;
      this.iHead = this.iHead % this.queueCapacity;
      this.queueLen--;
      return true;
    }
  }

  Front(): number {
    if (this.queueLen === 0) {
      return -1;
    }
    return this.queue[this.iHead];
  }

  Rear(): number {
    if (this.queueLen === 0) {
      return -1;
    }
    return this.queue[this.iTail === 0 ? this.queueCapacity - 1 : this.iTail - 1];
  }

  isEmpty(): boolean {
    return this.queueLen === 0;
  }

  isFull(): boolean {
    return this.queueLen === this.queueCapacity;
  }
}

```