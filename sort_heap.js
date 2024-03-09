function heapSort(arr) {
    // 构造堆
    let start = (arr.length - 1) / 2
    for (let i = start; i >= 0; i--) {
        _maxHeap(arr, arr.length, i)
    }

    //先把数组中第0个和堆中最后一个交换位置
    for (let i = arr.length - 1; i > 0; i--) {
        let temp = arr[0]
        arr[0] = arr[i]
        arr[i] = temp
        //再把前面的处理为大顶堆
        _maxHeap(arr, i, 0)
    }
    return arr
}

function _maxHeap(arr, size, index) {
    //左子节点
    let leftNode = 2 * index + 1
    //右子节点
    let rightNode = 2 * index + 2
    //先设当前为最大节点
    let max = index
    //和两个子节点分别对比，找出最大的节点
    if (leftNode < size && arr[leftNode] > arr[max]) {
        max = leftNode;
    }
    if (rightNode < size && arr[rightNode] > arr[max]) {
        max = rightNode;
    }

    //交换位置
    if (max != index) {
        let temp = arr[index]
        arr[index] = arr[max]
        arr[max] = temp;
        //交换位置后，可能会破坏之前排好的堆，所以之间排好的堆需要重新调整
        _maxHeap(arr, size, max)
    }
}

function __main() {
    const array = [4, 6, 8, 5, 9]
    const ret = heapSort(array)
    console.log(ret)
}

__main()