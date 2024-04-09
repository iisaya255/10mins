class TreeNode {
    constructor(value, left=null, right=null) {
        this.val = value
        this.left = left
        this.right = right
    }
}

function buildFullBinaryTree(value) {
    // 构造二叉树: 通过栈来维护

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

const jsonFromTree = function(tree) {
    // 这里需要掌握层次遍历, 实现 json 的组装, 本质还是树的遍历
    if (tree == null) {
        return null
    }

    const object = {}

    const key = tree.val.toString()
    const children = {}
    object[key] = children
    children['left'] = jsonFromTree(tree.left)
    children['right'] = jsonFromTree(tree.right)  

    return object
}

const treeFromJson = function(json) {
    // 此时 json 也是树的形状, 所以也是相同的遍历方法, 只是生成的是 tree 节点
    if (json == null) {
        return null
    }
    // 每个节点下面只有一个
    let val = Object.keys(json)[0]
    const root = new TreeNode(parseInt(val))
    root.left = treeFromJson(json[val]['left'])
    root.right = treeFromJson(json[val]['right'])

    return root
}

const _main = function() {
    /*
    树的形状
                1
            2       3
          4   5       7
        8 

    */
    const array = [1, 2, 3, 4, 5, null, 7, 8]
    const tree = buildFullBinaryTree(array)
    const json = jsonFromTree(tree)
    console.log(JSON.stringify(json, null, '  '))
    /*
    {
      "1": {
        "left": {
          "2": {
            "left": {
              "4": {
                "left": {
                  "8": {
                    "left": null,
                    "right": null
                  }
                },
                "right": null
              }
            },
            "right": {
              "5": {
                "left": null,
                "right": null
              }
            }
          }
        },
        "right": {
          "3": {
            "left": null,
            "right": {
              "7": {
                "left": null,
                "right": null
              }
            }
          }
        }
      }
    }
    */
    const tree2 = treeFromJson(json)
    console.log(tree2)
}

_main()