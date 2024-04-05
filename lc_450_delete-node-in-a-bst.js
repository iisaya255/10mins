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

	if (root.val > key) {
		root.left = deleteNode(root.left, key)
	}
	else if(root.val < key) {
		root.right = deleteNode(root.right, key)
	}
	else if (root.left == null || root.right == null) {
		if (root.left) {
			root = root.left
		} else {
			root = root.right
		}
	}
	else {
		nexter = root.right
		while (nexter.left) {
			nexter = nexter.left
		}
		nexter.right = deleteNode(root.right, nexter.val)
		nexter.left = root.left
		return nexter
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