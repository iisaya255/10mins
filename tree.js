/**
 * 树就是一种 1:N 的数据结构
 * 二叉树是 N=2 的情况
 * 
 * 内容:
 *  - 二叉树如何构建
 *  - 如何遍历二叉树 
 */
const log = console.log.bind(this)

class TreeNode {
    // 最简单的二叉树
    // 就是有左右子节点就可以了
    constructor(val) {
        this.left = null
        this.right = null
        this.value = val
    }
}

function buildTree() {
    // 从上往下按大小构造一个二叉树
    const value = [1, 2, 3, 4, 5, 6, 7]
    const first = value.shift()
    let root = new TreeNode(first)
    let rootRef = root

    // 构造一个临时存储的栈
    const stack = []

    while (value.length > 0) {
        if (rootRef.left === null) {
            // 如果左节点没有则赋值
            const val = value.shift()
            rootRef.left = new TreeNode(val)
        } else if (rootRef.right === null) {
            // 如果右节点没有则赋值
            const val = value.shift()
            rootRef.right = new TreeNode(val)        
        } else {
            // 将左右节点都加入到临时栈中
            stack.push(rootRef.left)
            stack.push(rootRef.right)
        }

        // 如果子节点都填满了, 就从栈中弹出一个新的节点
        const fill = rootRef.left != null && rootRef.right != null
        if (stack.length > 0 && fill) {
            rootRef = stack.shift()
        }
    }

    return root
}

function preOrder(root) {
    // 先访问根结点, 再前序遍历左子树, 最后前序遍历右子树
    log(root.value)
    if (root.left != null) {
        preOrder(root.left)
    }
    if (root.right != null) {
        preOrder(root.right)
    }
}

function inOrder(root) {
    // 中序遍历左子树, 访问根结点, 中序遍历右子树
    if (root.left != null) {
        inOrder(root.left)
    }
    log(root.value)
    if (root.right != null) {
        inOrder(root.right)
    }
}

function postOrder(root) {
    // 后序遍历左子树, 后序遍历右子树, 访问根结点
    if (root.left != null) {
        postOrder(root.left)
    }
    if (root.right != null) {
        postOrder(root.right)
    }
    log(root.value)
}

const _main = function() {
    const tree = buildTree()
    log(tree)
    // 演示不同的遍历方案, 这里之看递归的解法
    // https://blog.csdn.net/qq_61959780/article/details/127690872
    log("==前序遍历==")
    preOrder(tree)
    log("==中序遍历==")
    inOrder(tree)
    log("==后序遍历==")
    postOrder(tree)
    
    // https://blog.csdn.net/qq_45971148/article/details/111105862
    // 通过遍历顺序恢复树
    log("========== recover")
}


_main()