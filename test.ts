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

// let obj = new MyCircularQueue(3);
// obj.enQueue(2);
// console.log(obj)
// console.log(obj.Front());
// // console.log(obj.Rear())
// // console.log(obj.isFull())
// // obj.deQueue()
// // obj.enQueue(4)
// console.log(obj.Rear());
