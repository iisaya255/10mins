const aysncPool = aysnc (poolLimit, iter, iterFn) => {
	const ret = []
	const exec = new Set()

	for (let item of iter) {
		const p = Promise.resolve().then(() => iterFn(item, iter))
		ret.push(p)
		exec.add(p)
		const clean = () => exec.delete(p)
		p.then(clean).catch(clean)
		if (execute.size >= poolLimit) {
			await Promise.race(exec)
		}
	}
	return Promise.all(ret)
}
