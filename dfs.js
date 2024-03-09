// 骑士周游（马踏棋盘）问题
// https://blog.csdn.net/joshua317/article/details/120279976

function _finish(chessMap) {
    // 判断是否完成
    for (let i = 0; i < chessMap.length; i++) {
        for (let j = 0; j < chessMap[i].length; j++) {
            if (chessMap[i][j] === 0) {
                return false
            }
        }
    }
    return true
}

function _check(x, y) {
    // 8x8的棋盘, 这个8 先写死吧
    let max = 8
    // 检查是否越界
    if (x >= max || x < 0) {
        return false
    }
    if (y >= max || y < 0) {
        return false
    }
    return true
}

function nextJump(x, y) {
    // 穷举所有可以跳跃的地方
    const ret = []
    const selection = [
        [-2, 1], [-1, 2], [2, 1], [1, 2],
        [2, -1], [1, -2], [-2, -1], [-1, -2],
    ]

    for (let dxy of selection) {
        let [dx, dy] = dxy
        if (_check(x + dx, y + dy)) {
            ret.push([x + dx, y + dy])
        }
    }
    
    return ret
}

function dfs(map, x, y, step) {
    map[x][y] = step
    const pointList = nextJump(x, y)

    // 这里优先对最少合法移动目标格子进行搜索
    pointList.sort((pre, next) => {
        const [x1, y1] = pre
        const [x2, y2] = next
        const cnt1 = nextJump(x1, y1).length
        const cnt2 = nextJump(x2, y2).length
        return cnt1 - cnt2
    })

    while (pointList.length > 0) {
        const [px, py] = pointList.shift()
        if (map[px][py] === 0) {
            dfs(map, px, py, step + 1)
        }
    }

    if (step < 64 && !_finish(map)) {
        map[x][y] = 0
    } else {
        return map
    }
}


function solution(nn) {
    // 初始化 N x N 的棋盘
    const chessMap = []
    for (let i = 0; i < nn; i++) {
        const subArray = []
        for (let j = 0; j < nn; j++) {
            subArray.push(0)
        }
        chessMap.push(subArray)
    }

    let result = dfs(chessMap, 0, 0, 1)
    if (result) {
        for (let e of result) {
            console.log(e.join(',\t'))
        }
    } else {
        console.log("无解")
    }
}


function _main() {
    solution(8)
}

_main()