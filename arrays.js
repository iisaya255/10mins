// js 数字方法

const $ = {};

$.assert = function(cond, msg) {
    if (!cond) {
        throw new Error(msg)
    }
} 
$.log = console.log.bind(this)

// ======================================================
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find

$.find = function(array, condition) {
    for (let e of array) {
        if (condition(e)) {
            return e
        }
    }
    // 不写默认也是返回, 总之显式的写一下
    return undefined
}

// test for find
const findR1 = $.find([1, 2, 3, 4, 5], (e) => e > 3)
$.assert(findR1 == 4, "find test1 failed")

// ======================================================
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// 这个算法应该还可以优化
$.flat = function(array, depth=1) {
    // 根据深度展开数组
    let ret = []
    let temp = array
    for (let d = 0; d < depth; d++) {
        for (let e of temp) {
            if (typeof(e) == 'number') {
                ret.push(e)
            } else {
                // 这里不考虑复杂情况, 比如传错类型
                ret.push(...e)
            }
        }
        if (d < depth - 1) {
            temp = [...ret]
            ret = []
        }
    }
    return ret
}
// 这里就直接看打印结果吧
const flat1 = $.flat([1, 2, [3, 4]])
$.log("flat test 1", flat1)
// [1, 2, 3, 4]

const flat2 = $.flat([1, 2, [3, 4, [5, 6]]])
$.log("flat test 2", flat2)
// [1, 2, 3, 4, [5, 6]]

const flat3 = $.flat([1, 2, [3, 4, [5, 6]]], 2);
$.log("flat test 3", flat3)
// [1, 2, 3, 4, 5, 6]

// ======================================================
$.from = function(target, func) {
    const ret = [...target]

    if (func) {
        const appendRet = []
        for (let r of ret) {
            appendRet.push(func(r)) 
        }
        // 提前返回
        return appendRet
    }
    return ret
}

$.log($.from('foo'))
// Expected output: Array ["f", "o", "o"]
$.log($.from([1, 2, 3], (x) => x + x))
// Expected output: Array [2, 4, 6]

/// =============================================
$.map = function(array, func) {
    const ret = []
    for (let e of array) {
        ret.push(func(e))
    }
    return ret
}
const map1 = $.map([1, 4, 9, 16], (x) => x * 2)
$.log(map1)
// Expected output: Array [2, 8, 18, 32]

/// =============================================

$.reduce = function(array, func, initValue) {
    let accumulator = 0
    accumulator += initValue
    // reduce就是合并结果
    for (let e of array) {
        accumulator = func(accumulator, e)
    }
    return accumulator
}

// test 
const initialValue = 0
const sumWithInitial = $.reduce(
    [1, 2, 3, 4], 
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
)

$.log(sumWithInitial)
// Expected output: 10

/// =============================================
$.startwith = function(s, starts) {
    const sLen = starts.length
    const baseLen = s.length

    if (sLen > baseLen) {
        return false
    }

    let eq = true
    for (let i = 0; i < sLen; i++) {
        eq = eq && (s[i] == starts[i])
    }

    return eq
}

$.log($.startwith("hello, world", "hello"))
$.log($.startwith("hello, world", "no"))

/// =============================================
/// 小写转大写
$.upper = function(s) {
    let ret = ''
    const lchars = "qwertyuiopasdfghjklzxcvbnm"
    const uchars = "QWERTYUIOPASDFGHJKLZXCVBNM"

    for(let i = 0; i < s.length; i++) {
        let index = lchars.indexOf(s[i])
        if (index == -1) {
            ret += s[i]
        } else {
            ret += uchars[index]
        }
    }
    return ret
}

$.log($.upper('cute huihui'))
// 大写转小写, 翻过来就行

/// ============================================

$.splice = function(array, start, deleteCount, ...items) {
    /**
     * 函数说明
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
     * 
     * 从 start 删除指定元素，然后插入 items，返回删除的元素
     */
    const ret = []
    // 先添加前面的元素
    for (let i = 0; i < start; i++) {
        ret.push(array[i])
    }
    // 再添加插入的元素
    for (let i = 0; i < items.length; i++) {
        ret.push(items[i])
    }
    // 跳过删除的元素, 添加剩下的元素
    for (let i = start + deleteCount; i < array.length; i++) {
        ret.push(array[i])
    }
    return ret
}

let months = ['Jan', 'March', 'April', 'June']
months = $.splice(months, 1, 0, 'Feb')
// Inserts at index 1
console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months = $.splice(months, 4, 1, 'May')
// Replaces 1 element at index 4
$.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

//===============================================
$.sort = function(array, compareFn) {
    if(compareFn == undefined) {
        // 如果没有传入排序函数
        // 提供一个标准定义的排序函数
        compareFn = (a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                // a 一定等于 b
                return 0;
            }
        }
    }

    // 这里用最简单的冒泡排序来实现
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            // 这里比较大小, 如果func 返回 -1, 则交换
            if (compareFn(array[i], array[j]) === -1) {
                let temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
    }
    return array
}

$.log($.sort([1, 3, 2]))
$.log($.sort([{val: 1}, {val: 3}, {val: 2}], (a, b) => a.val - b.val))

//===============================================
$.filter = function(array, condition) {
    const ret = []
    for (let e of array) {
        if (condition(e)) {
            ret.push(e)
        }
    }
    return ret
}

const words = ['spray', 'elite', 'exuberant', 'destruction', 'present']
$.log(words.filter((word) => word.length > 6))
// Expected output: Array ["exuberant", "destruction", "present"]

//================================================
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// 这里只是简单的实现, 不考虑正则表达式
// 这里实现的是首次替换(仅替换第一个匹配的子串)
$.replace = function(s, target, replace) {
    // 替换需要做一件事就是从 s 中找到 target, 然后替换成 replace
    // 查找子串最简单的方法就是遍历
    // 还有一种效率更高的办法是 KMP 算法
    // 这里使用 遍历, 写起来简单

    const targetLen = target.length
    const sLen = s.length
    // 比目标短 不可能找到 直接返回原始字符串就行
    if (sLen < targetLen) {
        return s
    }
    let index = -1
    // 硬匹配
    for (let i = 0; i < sLen-targetLen; i++) {
        let eq = true
        for (let j = 0; j < targetLen; j++) {
            eq = eq && (s[i+j] == target[j])
        }
        if (eq) {
            s = s.slice(0, i) + replace + s.slice(i + targetLen)
        }
    }
    return s
}

$.log($.replace("this is a test.", "test", "example"))