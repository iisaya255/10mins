`
给定一个正整数 n, 生成一个包含 1 到 n^2 所有元素, 且元素按顺时针顺序螺旋排列的正方形矩阵

示例:
输入: 3 
输出: 
[ [ 1, 2, 3 ], 
  [ 8, 9, 4 ], 
  [ 7, 6, 5 ] ]
`
function solution(n) {
    let start = 1
    let end = n * n

    // initial, n*n
    let m = []
    for (let i = 0; i < n; i++) {
        const row = []
        for (let j = 0; j < n; j++) {
            row.push(0)
        }
        m.push(row)
    }

    let x = 0
    let y = 0
    let current = start
    let arrow = 'right'

    while(current <= end) {
        m[y][x] = current
        if (arrow === 'right') {
            x += 1
        }
        else if (arrow === 'left') {
            x -= 1
        }
        else if (arrow === 'top') {
            y -= 1
        }
        else {
            // bottom
            y += 1
        }
        // console.log(x, y, arrow, current)
        if (arrow === 'right' && (x === n-1 || m[y][x+1] !== 0)) {
            arrow = 'bottom'
        }
        if (arrow === 'bottom' && (y === n-1 || m[y+1][x] !== 0)) {
            arrow = 'left'
        }
        if (arrow === 'left' && (x === 0 || m[y][x-1] !== 0)) {
            arrow = 'top'
        }
        if (arrow === 'top' && (y === 0 || m[y-1][x] !== 0)) {
            arrow = 'right'
        }

        current += 1
    }
    return m
}

const _assert = function(cond, msg) {
    if (!cond) {throw new Error(msg)}
}

const _assertArrayEqual = function(s1, s2, msg) {
    // console.log(s1, s2)
    _assert(s1.join(',') == s2.join(','), msg)
}

const _main = function() {
    const s = 3
    const r = [ [ 1, 2, 3 ], 
                [ 8, 9, 4 ], 
                [ 7, 6, 5 ] ]
    _assertArrayEqual(solution(s), r, 'error')
}

_main()