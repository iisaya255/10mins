const log = console.log.bind(this)

function dp125(amount) {
    const coins = [1, 2, 5]
    const values = new Array(amount+1).fill(0)

    values[0] = -1
    values[1] = 1
    values[2] = 1
    values[5] = 1

    log(values)
    // 1, 2, ... 11
    for (let i = 1; i <= amount+1; i++) {
        if (values[i] != 0) {
            continue
        } else {
            const result = []
            for (let c of coins) {
                if (i - c > 0) {
                    result.push(values[i-c])
                } else {
                    // pass                    
                }
                // 状态转移方程
                values[i] = Math.min(...result) + 1
            }
        } 
    }
    log(values)
    return values[amount]
}


function _main() {
    const r = dp125(11)
    log(r)
}

_main()