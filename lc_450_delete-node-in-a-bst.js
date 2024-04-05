class TreeNode {
    constructor(value, left=null, right=null) {
        this.val = value
        this.left = left
        this.right = right
    }
}

function deleteNode(root, key) {
    if (root == null) {
        return null
    }

    // 左小右大
    if (key < root.val) {
        root.left = deleteNode(root.left, key)
    }
    else if(key > root.val) {
        root.right = deleteNode(root.right, key)
    }
    // root.val == key
    else if (root.left == null || root.right == null) {
        if (root.left) {
            // 只有左子树, 直接用左子树替代返回
            root = root.left
        } else {
            // 只有右子树, 直接用右子树替代返回
            root = root.right
        }
    }
    else {
    	// 左右子树都健全的情况
        // 找到右子树中的最小元素(minElement)作为返回元素
        // minElement.left == root.left
        // minElement.right == 删除过 minElement 的 root.right
        let minElement = root.right
        while (minElement.left != null) {
            minElement = minElement.left
        }
        minElement.right = deleteNode(root.right, minElement.val)
        minElement.left = root.left
        return minElement
    }
    return root
}

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

const __main = function() {
    let root = buildFullBinaryTree([5,3,6,2,4,null,7])
    let target = 3
    let ret = deleteNode(root, target)
    console.log(ret)
    // [5,4,6,2,null,null,7]
}

__main()