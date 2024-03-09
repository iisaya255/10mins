const log = console.log.bind(this)

function climbStairs(n) {
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return 2
    }
    let s1 = 1
    let s2 = 2

    let res = 0
    for (let i = 0; i < n-2; i++) {
        res = s1 + s2
        s1 = s2
        s2 = res
    }
    return res
}

function _main() {
    const r = climbStairs(3)
    log(r) // 3
}

_main()