function longestCommonPrefix(strs) {
    // 数组空就不用比较了
    if (strs.length === 0) {
        return ''
    }
    // 只有一个当然直接返回就可以了
    if (strs.length === 1) {
        return strs[0]
    }

    // 找出最短的字符串
    const minSize = Math.min(...strs.map(e=>e.length))
    
    let prefix = ''
    
    // 公共前缀不可能超过最短的单词
    for (let i = 0; i < minSize; i++) {
        // 以第一个单词作为前缀对比的基准        
        let first = strs[0][i]
        
        // 用第一个单词中选出来的字符，和每一个单词对应位置的字符对比
        let eq = true
        for (let e = 1; e < strs.length; e++) {
            eq = eq && (first == strs[e][i])
        }

        if (eq) {
            // 如果全部相等, eq == true, 那么就把这个加入到 prefix
            prefix += first
        } else {
            // 如果不相等, 那说明需要中断了
            break
        }
    }

    return prefix
}

function _main() {
    const strs = ["flower","flow","flight"]
    const r = longestCommonPrefix(strs)
    console.log(r)
}

_main()
