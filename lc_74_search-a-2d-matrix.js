const _binarySearchNear = function(arr, target) {
    const length = arr.length

    let s = 0
    let e = length

    while(s < e) {
        let mid = Math.floor((e-s) / 2) + s
        if (arr[mid] <= target) {
            s = mid
        }
        else {
            e = mid - 1
        }
    }
    return s
}

const _binarySearch = function(arr, target) {
    const length = arr.length

    let s = 0
    let e = length - 1 

    while(s <= e) {
        // 取中值
        let middle = Math.floor((e-s) / 2) + s
        if (arr[middle] == target) {
            return middle
        }
        else if (arr[middle] > target) {
            e = middle - 1
        } else {
            s = middle + 1

        }
    }
    return -1
}


const searchMatrix = function(matrix, target) {
    const h = matrix.length
    const w = matrix[0].length

    // 先从第一列二分找到出来不大于 target 的最大值
    const col1 = []
    for (let i = 0; i < h; i++) {
        col1.push(matrix[i][0])
    }
    const maxY = _binarySearchNear(col1, target)
    // console.log(maxY)
    
    // 再对当前行做二分查找
    const line = []
    for (let i = 0; i < w; i++) {
        line.push(matrix[maxY][i])
    }
    const x = _binarySearch(line, target)

    // console.log(line, x)
    return (x > -1)
}

const _main = function() {
    const m = [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
    ]
    const target1 = 3
    const ret1 = searchMatrix(m, target1)
    console.log(m, target1, ret1)


    const target2 = 13
    const ret2 = searchMatrix(m, target2)
    console.log(m, target2, ret2)
}

_main()