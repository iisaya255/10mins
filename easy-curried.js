function testFn(a, b, c) {return a+b+c}
// length 表示参数的长度
// testFn.length == 3
// 根据这个特性 编写方法

function curryBox(fn) {

	function curried(...args) {
		if (args.length >= fn.length) {
			// 参数够
			return function() {
				fn.apply(this, args)
			}
		} else {
			// 参数不够则返回一个接受参数的函数
			function curried2(...args2) {
				const temp = [...args, ...args2]
				// 这里相当于是一个递归
				// 返回的是: 用外面函数 curried 的 args 和 里面函数的 args2 包装的函数
				// 注意这里的 args2 是这次调用的参数
				// args 则是下次调用的参数
				return curried.apply(this, temp)
			}
			return curried2
		}
	}

	return curried
}

let mentalMethod = function(a, b, c) {
	const s = `战胜${a},${b},${c}`
	console.log(s)
}

mentalMethod = curryBox(mentalMethod)

const __main = function() {

	mentalMethod('峨眉')('武当')('少林')();
	mentalMethod('峨眉','武当')('少林')();
	mentalMethod('峨眉','武当','少林')();
}

__main()