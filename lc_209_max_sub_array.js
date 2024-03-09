`
209.长度最小的子数组

给定一个含有 n 个正整数的数组和一个正整数 s,
找出该数组中满足其和 ≥ s 的长度最小的连续 子数组，并返回其长度。
如果不存在符合条件的子数组，返回 0。

示例：

输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
提示：

1 <= target <= 10^9
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5
`

function solution(s, nums) {
    const result = []
    for (let i = 0; i < nums.length; i++) {
        let sum = 0
        let sub = []
        for (let j = i; j < nums.length; j++) {
            sum += nums[j]
            sub.push(nums[j])
            if (sum === s) {
                result.push(sub.length)
                break
            }
        }
    }
    if (result.length === 0) {
        return 0
    } else {
        return Math.min(...result)
    }
}

const _assert = function(cond, msg) {
    if (!cond) {throw new Error(msg)}
}

const _main = function() {
    nums = [2, 3, 1, 2, 4, 3]
    _assert(solution(7, nums) == 2, 'error')
}

_main()