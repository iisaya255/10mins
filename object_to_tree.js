

function buildFullBinaryTree(value) {
    const makeNode = function(val) {
        if (val != null) {
            return new TreeNode(val)
        } else {
            return null
        }
    }

    // 广度优先遍历填充
    const stack = [makeNode(value.shift())]
    const rootRef = stack[0]

    while (stack.length > 0) {
        let root = stack.shift()
        if (value.length == 0) {
            root.left = null
            root.right = null
            break
        }
        let left = makeNode(value.shift())
        let right = makeNode(value.shift())
        root.left = left
        root.right = right
        stack.push(left)
        stack.push(right)
    }
    return rootRef
}


const _main = function() {

}

_main()