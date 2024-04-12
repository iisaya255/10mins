function solution(nums) {
    const len = nums.length
    // 先排序
    nums.sort((a,b) => a-b)
    // console.log(nums)

    ret = []

    let first, second, third;

    // 固定 a
    for (first = 0; first < len; first++) {
        if (first > 0 && nums[first] == nums[first-1]) {
            continue
        }

        // 固定 b
        for (second = first + 1; second < len; second++) {

            // 设置c
            third = len - 1

            // 相同的数字就跳过
            if (second > first + 1 && nums[second] == nums[second-1]) {
                continue
            }
            // b.index 一定小于 c.index, 找满足条件的(a+b+c > 0)
            while(second < third && nums[first] + nums[second] + nums[third] > 0) {
                // 移动c
                third--
            }
            if (second >= third) {
                break
            }

            if (nums[first] + nums[second] + nums[third] == 0) {
                ret.push([nums[first], nums[second], nums[third]])
            }
        }
    }
    return ret
}

const _main = function() {
    // 3 sum
    // https://leetcode.cn/problems/3sum/description/
    nums = [-1,0,1,2,-1,-4]
    // -4, -1, -1, 0, 1, 2
    console.log(solution(nums), "正确答案 [[-1,-1,2],[-1,0,1]]")
}

_main()