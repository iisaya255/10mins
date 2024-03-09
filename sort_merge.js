/**
 * 归并排序
 */

function mergeSort(array) {
    // 处理最小的排序单元
    if (array.length <= 1) {
        return array
    }

    if (array.length == 2) {
        if (array[0] < array[1]) {
            return array
        } else {
            return [array[1], array[0]]
        }
    }

    // 分治
    let mid = Math.floor(array.length / 2)
    const head = array.slice(0, mid)
    const tail = array.slice(mid, array.length)

    const headArray = mergeSort(head)
    const tailArray = mergeSort(tail)

    // 有序子数组的合并
    // 此时 headArray 和 tailArray 一定都是有序数组
    // 设置两个游标, ph, pt
    let ph = 0
    let pt = 0
    let m = []
    while (ph < headArray.length || pt < tailArray.length) {
        // 先处理边界情况, ph 或者 pt 到结束了, 就直接加另一边的元素
        if (ph == headArray.length) {
            m.push(tailArray[pt])
            pt += 1
            continue
        }
        if (pt == tailArray.length) {
            m.push(headArray[ph])
            ph += 1
            continue
        }

        // 处理合并的情况 
        if (headArray[ph] < tailArray[pt]) {
            m.push(headArray[ph])
            ph += 1
        } else {
            m.push(tailArray[pt])
            pt += 1
        }
    }
    return m
}


const result = mergeSort([1, 8, 2, 4, 3, 9, 6])
console.log(...result)