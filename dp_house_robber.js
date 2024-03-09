// 打家劫舍
// https://leetcode.cn/problems/house-robber/description/

// 计算不相邻的数字最大和
const log = console.log.bind(this)

function rob(nums) {
    const length = nums.length
    // 记录状态, 每一个位置都有 偷和不偷两个状态
    const dpState = new Array(length+1).fill(0)

    // 这里的状态转移思路是: 
    // 初始状态: 如果0, 则0, 如果1 肯定偷第一个
    // 对于最后一个房子, 只有偷和不偷两种选项
    //   如果第 N 个不偷, 那么第 N-1 个偷, 则 N-2 不偷...
    //   如果第 N 个偷, 那么第 N-1 个不偷, 则 N-2 偷...
    // 所以, 找到 fn(N-1) 和 fn(N-2) 的最大值就可以求解

    // 初始状态
    dpState[0] = 0
    dpState[1] = nums[0]

    for (let i = 2; i <= length; i++) {
        const current = nums[i-1]
        // 对比 当前不拿 和 当前拿 哪个大
        dpState[i] = Math.max(dpState[i-1], current + dpState[i-2]) 
    }

    return dpState[length]
}

function _main() {
    const r1 = rob([1,2,3,1])
    log(r1, r1 == 4)

    const r2 = rob([2,7,9,3,1])
    log(r2, r2 == 12)
}

_main()