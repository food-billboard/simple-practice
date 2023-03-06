
// 唯一id
export function uuid(prefix) {
	return (prefix || "PREFIX") + Date.now() + Math.random() + Math.random()
}

export function random(max, min) {
	return Math.ceil(Math.random() * (max - min + 1) + min)
}

export function getWidth(target) {
	return target.width || 1
}

export function getHeight(target) {
	return target.height || 1
}

// 碰撞检测
export function knockJudge(origin, target, coincide) {
	if (!!coincide) return origin.x === target.x && origin.y === target.y
	return (
		origin.x < target.x + getWidth(target) &&
		origin.x + getWidth(origin) > target.x &&
		origin.y < target.y + getHeight(target) &&
		origin.y + getHeight(origin) > target.y
	)
}