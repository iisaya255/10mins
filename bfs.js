/**
 * https://www.cnblogs.com/bbsno1/p/3260556.html
 * 
 * 有3个容器，容量分别为12升，8升，5升。其中12升中装满油，另外两个空着。
 * 要求你只用3个容器操作，最后使得某个容器中正好有6升油。
 */
const log = console.log.bind(this) 
const btSize = [12, 8, 5]
const finalRest = 6

class Tree {
    constructor(value) {
        this.value = value
        this.child = []
    }
    addChild(node) {
        this.child.push(node)
        node.parent = this
    }
}

// 这个函数用来交换两个容器的水
function solve(btRest, start, end, treeNode) {
    // start 往 end 倒入, 需要保证 start 有水, end 不是满的
    if (btRest[start] == 0 || btRest[end] == btSize[end]) {
        return null
    }
    // 同时需要注意, start 倒入的水量不能超过 end 的总容量
    let need = btSize[end] - btRest[end]
    if (need > btRest[start]) {
        // 水不够倒满
        btRest[end] += btRest[start]
        btRest[start] = 0
    } else {
        // 水够
        btRest[start] = btRest[start] - need
        btRest[end] = btSize[end]
    }
    const nextState = new Tree([...btRest])
    treeNode.addChild(nextState)
    return nextState
}

// 检查是否满足条件
function check(treeNode) {
    for (let i = 0; i < 3; i++) {
        if (treeNode.value[i] == finalRest) {
            // 打印路径
            const  path = []
            while(treeNode != null) {
                // log(treeNode)
                path.push(treeNode.value)
                treeNode = treeNode.parent
            }
            for (let i of path.reverse()) {
                log(i.join(','))
            }
            return true
        }
    }
    return false
}

function _main() {
    // 异常检查, 如果大于 最大的容量, 或者小于 0, 直接返回, 无解
    if (finalRest > Math.max(...btSize) || finalRest < 0) {
        return
    }
    
    // 初始状态
    const root = new Tree([12, 0, 0])
    const stateList = [root]

    while (stateList.length > 0) {
        // 取出一个状态
        let treeNode = stateList.shift()
        // 复制一个用于处理
        let btRest = [...treeNode.value]
        
        // 每一次广度搜索有6种选择, 这里直接打表, 3x2 
        const selection = [
            [0, 1], [0, 2], [1, 2], [1, 0], [2, 0], [2, 1],
        ]

        for (let sel of selection) {
            const [start, end] = sel
            let nextState = solve([...btRest], start, end, treeNode)
            if (nextState) {
                const rs = check(nextState)
                if (rs) {
                    return
                }
                // 保存状态 下一轮用
                stateList.push(nextState)
            } else {
                continue
            }
            // console.log(stateList)
        }
    }
}

_main()