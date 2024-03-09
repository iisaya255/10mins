const log = console.log.bind(this)

function search(nums, target) {
    let max = nums.length
    let min = 0
    while (true) {
        let i = Math.floor((max + min) / 2)
        if (nums[i] < target) {
            min = i
        } else if (nums[i] > target) {
            max = i
        } else {
            return i
        }
        if (max-1 <= min) {
            return -1
        }
    }
}

function _main() {
    const r = search([-1, 0, 3, 5, 9, 12], 12)
    log(r, r == 5)
}

_main()