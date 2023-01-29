// utils 

function query(queryString) {
  return document.querySelector(queryString)
}

const IMAGE_MAP = {

}

function loader(image, callback) {
  if(IMAGE_MAP[image]) return callback(IMAGE_MAP[image])
  const dom = new Image() 
  dom.src = image 
  dom.onload = () => {
		callback(dom)
    IMAGE_MAP[image] = dom 
  }
}

// 保留4位小数
function toFixed4(number) {
  return parseFloat(number.toFixed(4))
}

function getWidth(target) {
  return target.width || 1
}

function getHeight(target) {
  return target.height || 1
}

// 碰撞检测
function knockJudge(origin, target, coincide) {
  if(!!coincide) return origin.x === target.x && origin.y === target.y
  return origin.x < target.x + getWidth(target) && origin.x + getWidth(origin) > target.x && origin.y < target.y + getHeight(target) && origin.y + getHeight(origin) > target.y 
}

// 碰撞障碍墙检测
function knockWall(position) {
  const { x, y } = position
  const isOuter = x < 1 || x > 31 || y < 1 || y > 11
  if(isOuter) return true  
  if(x % 1 !== 0 || y % 1 !== 0) {
    const maxX = Math.ceil(x)
    const minX = Math.floor(x)
    const maxY = Math.ceil(y)
    const minY = Math.floor(y)
    return [{ x: minX, y: minY }, { x: minX, y: maxY }, { x: maxX, y: minY }, { x: maxX, y: maxY }].some(knockWall)
  }
  return x % 2 === 0 && y % 2 === 0
}

// Function

function stopGame() {
	isStart = !isStart
	StopButton.innerHTML = isStart ? "⏺ " : "⏩"
	startPrompt && startPrompt()
	if (!isStart) {
		startPrompt = createGamePrompt({
			content: "游戏暂停(*^▽^*)",
			timeout: -1,
			onRestart: () => {
				startPrompt && startPrompt()
				isStart = true
				EventEmitter.emit(EMITTER_START_OP)
			},
		})
	}
	EventEmitter.emit(EMITTER_START_OP)
}

function getInfo(target) {
	return {
		x: target.x(),
		y: target.y(),
		width: target.width(),
		height: target.height(),
	}
}

function formatInfo(target) {
	const parse = (value) => Math.round(value / UNIT)
	return {
		x: parse(target.x),
		y: parse(target.y),
		width: parse(target.width),
		height: parse(target.height)
	}
}

// type
// LoopBuff TimeBoomBuff SuperBoomBuff
function getBuff(type) {
	switch (type) {
		case "LoopBuff":
			return LoopBuff
		case "TimeBoomBuff":
			return TimeBoomBuff
		case "SuperBoomBuff":
			return SuperBoomBuff
	}
}

// type
// BalloonMonster CrossWallMonster SpeedMonster
function getMonster(type) {
	switch (type) {
		case "BalloonMonster":
			return BalloonMonster
		case "CrossWallMonster":
			return CrossWallMonster
		case "SpeedMonster":
			return SpeedMonster
	}
}

function randomMonster() {
	return getMonster(['BalloonMonster', 'CrossWallMonster', 'SpeedMonster'][Math.floor(Math.random() * 3)])
}

// Constants

const BOOM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQAgMAAADbiZG6AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAA////ubm5AAAAiLNewwAAAAR0Uk5TAP///7MtQIgAAACfSURBVHicZc8hDgIxEIXhlwkG1kACl1iycAWOgEZQjUKjpoKDIHFV6J5iFYJKjrBBdJi2FLNi8mX+ZMQAWC2A5Q5k51m0B2C2B9Z9kTxf4S6AP07gTkBjONCTLb10VHQsQ2MkkGGb/Ic6eIjE7izDlCUkS+BfUOE1bLyeiYRkDlspITkOdSERmxyHusBHZMlHC/fR597Ior3rlzf90ma/59yI9sP6IvgAAAAASUVORK5CYII="
const DOOR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQAgMAAAC0OM2XAAAACVBMVEVRGAAAAACVTQGAHO2uAAAAO0lEQVQI12MIDQ0NYQhgZBBhcFqoxcLgpajUwOC1UAtMtDB4Jaq1MHg4sIAJCBcsAVYCVgzWBjYAbBQA8TcS0yJ73RoAAAAASUVORK5CYII="
const DESTRUCTIBLE_WALL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW5ubkBAQH///9VzuObAAAALUlEQVQI12MIBQKGrFWrVjI0MDAwIgiIxKppq1YxMEgwMCAIqARQhgFFBiIBAKX6DvO8+gE5AAAAAElFTkSuQmCC"
const UN_DESTRUCTIBLE_WALL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW8vLwAAAD///9LARpnAAAAHElEQVQI12PQWrVqJUMDAwMjRcTU0NBAhlAgAADV9AuZ84WyfQAAAABJRU5ErkJggg=="
const SUPER_BOOM_BUFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX4uAAAAACsfAD4tteuAAAATklEQVQI12NoYGDgZFANDQ1kkFq1QhBINABZCxgdGaQaRBkZpBgYBBkkBBkCgQRjIoMEgwAjg4SoQyCDJAOQK+XAupBBamrYQogpoUAAACCfDX3F0Gu7AAAAAElFTkSuQmCC"
const TIME_BOOM_BUFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX4uAAAAACsfAD4tteuAAAATUlEQVQI12NoYGDgZFANDQ1kkGJbkMggwdggyCDAwMAIJESABKsDkBAIYGSQEAwQZJASDQCqa3VMZJBawLqQQWqFGJBYGbUQYkooEAAAxAMNgWt8UFQAAAAASUVORK5CYII="
const LOOP_BOOM_BUFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX4uACsfAAAAAD5opkLAAAAOUlEQVQI12NwYGBgY5BatWoRg2poaBCDaggTkAjQAhIOnECCgQmTaOACEgmaQCJqaRBYG8SUVUAAADI/D2AhuIhaAAAAAElFTkSuQmCC"
const WALL_DESTROY_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABblBMVEX7hHP6j37vemvqeGbxsJz8j3/3jX36jXz4inv5g3LEUkLqn4z/k4L8hXX6gnHzf3D5fW7vfW2mOSXzno/xnI7+hnXyemzteWnwd2iwW0muUEO3Tj2ySzuiOiWgOCH3tKHys6DzsJ3xrJjpoo/toI7noY3xnI3xl4rknIn1mIn2kIPflIHuj376gXHodmXTj2Lna13ZZFS5WUupYEnAWEm+U0S4UkLDUEKcT0K6UEG0TjzBTTywTDmxNiKaNBuJNQDisqP3qJXdn4/Ino7dl4vXlontlIbhi4LtlYH4k4H6koH+kH3Zj3vWhXr7inj+iXjggnj+fnHVfnHrg3DwgXDPeG3QkGzlfGvHdmvRm2n0dmbmc2PqcmHhb17RilvIhlXOg1W8XU7HdUu3WUuLWkmzU0i5WUS4UkSiVT67TDuQWDqiXjKeSTGrPi+nQi6aXSuyOyuiPieNOSKpNB+NSxqvMhmNPgxdYgp4TgB4GwCyIuIvAAAA+UlEQVQY0x3G02LDYBgA0C//2iVpnDZGbdvtbNu2jbdfunN14NcslzVNOy+VLnVdv/uGxozfFQoGXY5AwJ/+gTEslUxhOE4QBDZL7/dhhOYZhmSBzWZ5frXwBePrB7kcEob+KcU+XFzVq7fdz7an7nG0n2HSG/dmuuaUN+bzxXzJXVjECVyoJuaI4QE8D2sSuaxWQvMsDDBHsCMgrtBKcyrHIYTkY2jUmkbn4aZjPr5cGy3jHiYiFBWlEuGFXjMSjlJbME1jbjeG0duVuNtZHlYkEgBI6fB0dIklmRPYlFUFCYgv1jIbirx3Bm+iaFuWJdq9p1dbfP/4A6WoJ3KdojKOAAAAAElFTkSuQmCC"
const WALL_DESTROY_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABIFBMVEUAAAD/moXDvZNCRwmRPAD2WTygvIX/g2ttRhBqQgAAYRMAAAAqvGGqmmaVQQHBvZGcuoOYoGNISQcTslldXBoss15MUwV1rmYALgAAwVoAPxXSUDTmlnbeclr/hW21oIG9dEn7X0H/hm6gNgCyuoh+SQq9gU+vqniNTQCJPQF0SBJtQACjq3VvSAB3QABqSQ6UZiaWt4CGoHOZgEWHr3A4PgiRaCltZReMtHp4UACGpGhsUgpiUAAYNgAAs1tyhTcmlU0AAABqqlxJbSxkok1RdDoAyV4AcQ7bQQrQvJHMOgD/wZz/t5j/uZnXwZb/m4b/im73Yz6OQgDPNwDbxZnmqoLanoLrcVHyTzPASQ/gPwrRMgN+NwLIQgDUPACsNAA5ttA7AAAASHRSTlMA/fNn/fyR+6ekIRA8Bf76jn1uQj83NSoYCgf+/f37+vr6+OPazsS/vLWtqKSYmJOMi4OCgH99fHNzZWNWS0NBPCckIyEWExJWgngPAAAAuElEQVQY023MxXrCUBRF4d3S3kqCOxXc3d2dBHd//7fgBBjx8Q/XYAEtl/L1RpmCpPo7frkZ28oguu2ud7cPg7SjwS/ySQI6PJFgORCjijGmYnEjVsIyCznUgjgciqKgxo994+wCsem7ZJrBQaFwm+Uozt4ksxLqnMkC8k1MHAfUeD2v1VY6IGZeb4F11CcjL0fn0KJfwN//B3GsIwA8k0kS5/lAMvdT8J2OeaRlVxoDBYNG1sSDxgVSWRuQg+Tl0wAAAABJRU5ErkJggg=="

const FIRE_HORIZONTAL_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAAD5fWzAKw79vbVkpeBgAAAAAXRSTlMAQObYZgAAADFJREFUCNdjQANNTE1MDKuAgCEyNDKUIfRq6FWG/0AAIULDQ8MZUoEAoqRjUcciNP0Aid0XQfm1zdEAAAAASUVORK5CYII="
const FIRE_HORIZONTAL_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD5fWz9vbX5fWzAKw5yCC2EAAAAAnRSTlMA+1z85qwAAAA+SURBVAjXnc5BDQAgDATBfSABBVQBnIEm1L8mKKkCNpnkngfu7YnoPSFtXRNbssSoPoetYQlVaIeuSVTUCT+RzRSx8GvuggAAAABJRU5ErkJggg=="
const FIRE_VERTICAL_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD9vbX5fWzAKw79vbU4oKx4AAAAAnRSTlMA81Inbp4AAAAwSURBVAjXY2BgNlIUVDZgAAIjFSdlBijDGCLi4oQqxWysghAxBosYgUQgDBfKzQEA3CAN81iVPigAAAAASUVORK5CYII="
const FIRE_VERTICAL_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAD9vbX5fWz9vbX9vbX5fWzAKw4LDe+8AAAABHRSTlMA8/fo8T22IwAAADRJREFUCNdjSAsSNDQUCk1gYA1xAYLQNAa2UBAjLIEhKRXKYINJpYGkXEEiYEYohhTF5gAA+3Mj8g4HdDQAAAAASUVORK5CYII="

const FIRE = {
	left: {
		head: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD9vbXAKw75fWz9vbUwWy76AAAAAnRSTlMA81Inbp4AAABDSURBVAjXY8APFBSYGJgYGJgUlEAAyFBSNlY2NgbKKJkYGzsDGUzKLkDgCBSBMKBSxoYghrKRsZExsnaQiUpMeCwEAKDPCZHzwuXOAAAAAElFTkSuQmCC",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAD5fWz9vbX9vbX9vbXAKw75fWypna8pAAAABHRSTlMA+vPomoBIqAAAAFlJREFUCNdFjLEJwDAQA9VohAyUxLj+Rt8bHO0/QuzYkEOFOIQgIhBBMCjpOCDpsbOBtmv3CabL4EJkn+WGsixD7/Kb7Ntoj0MutZfvZ9IgZzrVQC0gEjHyAq2FIxTik3vAAAAAAElFTkSuQmCC"
		],
	},
	right: {
		head: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD9vbXAKw75fWz9vbUwWy76AAAAAnRSTlMA81Inbp4AAABCSURBVAjXfcqxEcAwCARBRjW4AObdAe8OcP81+QgcSvcBGxCHcgUDohTwbVcO3G6h66UK8MP20wJlNtC0eM6cA/Z9t/4JzNDj1mEAAAAASUVORK5CYII=",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD5fWz9vbXAKw75fWwT5lq7AAAAAnRSTlMA+bLyh4AAAABPSURBVAjXNcjRCcAwDANRgUfIBsEDCJQJYu0/U+sW39fjADKoCEhr6SXsY1cReZ0fdueKHzlnW4M5NZiTEvLu3Dbh7jSOXBKhjhQYIIl4ABAaFgF6VriyAAAAAElFTkSuQmCC"
		],
	},
	top: {
		head: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAADAKw75fWz9vbVsXmLiAAAAAXRSTlMAQObYZgAAADlJREFUCNdjQAcsjAwMjK6uQCJsCpAb/dSBgTH/J5Cb/dOBgSH7JQOQeApk5b+EchmjwaynICUvHQC/AhBENHUjngAAAABJRU5ErkJggg==",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD5fWz9vbXAKw75fWwT5lq7AAAAAnRSTlMA+bLyh4AAAABQSURBVAjXVYvBDcAwDAJdsYmVAVzhCWLvP1NJGqkqrxMcRlgEAUOARNBIVleFoZUN2e5dMnO6DzVMV5pyNqhZMATX/E2S7zyAMx15Ne/rmx4ERxV+RgElawAAAABJRU5ErkJggg=="
		],
	},
	bottom: {
		head: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAADAKw75fWz9vbVsXmLiAAAAAXRSTlMAQObYZgAAADpJREFUCNdjYMz+6cDAkP2SAUg8BbLyX0K5jNFg1lMgKxvEyv8JVBL9FEiETQWKuQY6MDAyOAAlUAAAV+8Qy6uzR4UAAAAASUVORK5CYII=",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD5fWz9vbXAKw75fWwT5lq7AAAAAnRSTlMA+bLyh4AAAABPSURBVAjXRYvRDcBACEJt3MTcADY4QY/9ZyomtscX8MDAiFhMu56QCHO22Wl3jfFBM+7mex30j6srIUBmAZZ9IxuRrEas2oAaSJm6u1sqvx67FcraHW9dAAAAAElFTkSuQmCC"
		],
	},
	middle: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD9vbXAKw75fWz9vbUwWy76AAAAAnRSTlMA81Inbp4AAABcSURBVAjXPU7BDcQwDLLuFkmIJzCZwGX/mUpaqfYDhBE4In7kiDMg8ZLFGudSG5xGaAs9Au2VXZUplSooCwCDDXSniSyk6BRAWo6caTyJ/9VZ86nYl4W33Y7vjRv9LBGk1hYcnwAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX5fWz9vbUAAAD9vbX9vbX5fWzAKw6u+Mg/AAAABHRSTlP78wDo+6dQ/wAAAEpJREFUCNdjSAt1cXFxDU1iSA1xAYLQNIZUoAhQKIwBSIMYAQwuQCmQHIMLFBDFcEVjhEANdAkAWQoCbAxqEEYSgxqzoKGgIUMaADcZInT+FUzmAAAAAElFTkSuQmCC",
	]
}

const BALLOON_MONSTER = {
	normalImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAD4eFgAAAD///8NEY3oAAAAAnRSTlMA60FL9sgAAABPSURBVAjXRYzREYAgDEPDBqAuYO0Clglk/6FM6B3ko333rg2A0nuFdjNrIm4SxSG4K4rNCHz4SAiPDftmfannCfVQpZCSmEpCuT5kzpfjB0dLCpRQ9YAjAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQBAMAAAA7eDg3AAAAD1BMVEUAAAAAAAD4eFj///8AAAD9CsFLAAAAAnRSTlMA60FL9sgAAABMSURBVAjXY0ACgkAApoWUlBRBLCANZDEwMEIYAgyMSmAAYigbKRtBGE7KTkgMuGKEdgZBJRUnJaCBQDmQDMQOoA1gIGwItV7EEUgAAOZ1Cki49JoyAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQBAMAAAACH4lsAAAAD1BMVEUAAAAAAAD4eFj///8AAAD9CsFLAAAAAnRSTlMA60FL9sgAAABESURBVAjXbczRCQAgCARQ2yDboFvBRmj/mdIzkCDv53HIyf+aqvYEANIR9GpQs0sDzANqeR7Vn1zlyo6VWiYJ0gIUqwMC9QoM1JUzqAAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAD4eFj///8AAAD9CsFLAAAAAnRSTlMA60FL9sgAAABMSURBVAjXY0ACgkAApoWUlBRBLCANZDEwMEIYAgyMSmAAYigbKRtBGE7KTkgMuGKEdgZBJRUnJaCBQDmQDMQOoA1gIGwItV7EEUgAAOZ1Cki49JoyAAAAAElFTkSuQmCC"
	],
	destroyingImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAD4eFj///8AAAD9CsFLAAAAAnRSTlMA60FL9sgAAABFSURBVAjXY0ACgiAEBIxKAkAEZAgpKQIRiGFspGyMwmA0MVJ2FgAxQCJghpKKkxKE4eIC0Q5iKIIZQKAINxBuBdxSBAAAnK8JPHR4SOQAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///8AAAD4eFgAAAD///+8Af66AAAAA3RSTlMA6+twJNUJAAAAO0lEQVQI12PABpgZGAzADGMDZmMwQ1TYMBDMEHQ2EQQzGIUNBSCqhQ2h2kycodpVnKDagQDVHGMQwgcAl38FhEfYAF0AAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAAD///8AAAD4eFjxWn9bAAAAA3RSTlMA6+twJNUJAAAAKklEQVQI12PACgx4gISICJCQfgIk2C8ACeYDQIJvA5Cw/wMkbGwg6tAAAMx5BautVy9jAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAD////4eFhKR4shAAAAAnRSTlMA60FL9sgAAAAaSURBVAjXY8ANAliBhIQKpoSGBpBYwIVVEwA01AGMofFw+wAAAABJRU5ErkJggg=="
	],
	dieImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAD4eFgAAAD///8NEY3oAAAAAnRSTlMA60FL9sgAAABVSURBVAjXVYvREYAwCEPTDUp1AaELCC5g7f4zSfTDMx/k3eMCoERUsEVVSNlJKZq72VZRdI4+lXCNfnzwezGEphGaKwhBgFTmFFQUj6Jg1hNvlj3PDbhWC+QPnwNoAAAAAElFTkSuQmCC"

}

const CROSS_MONSTER = {
	normalImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAAAAAAA8vP////8AAADL5MkNAAAAA3RSTlMA69m484SJAAAAVElEQVQI102Niw2AQAhDwQkwTEKKE6ATXNx/FYun0SYlj/CpUMsqUw5jVdNEkDy8gBAZBQKH3d+gwJ414cjRkB/gvxx9jhPYXggGhT9/TB2dTyt9AdeCElF3cgv0AAAAAElFTkSuQmCC" ,
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAAD///8AAAA8vP////8AAAAn+112AAAABHRSTlPrAOvZ8Gjg9AAAAFlJREFUCNdVzMENgDAIBVCaND3zd3AQEz8bVM89NO4/gr+2iREOPAhgQEkoDQbnbmQyZAapRqgvfFvIKnNCnlF5DFzRdeXxQSHkutCF+zfJ842WKZthpDcADyXUGQuXuXDsAAAAAElFTkSuQmCC" ,
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAAAAAAA8vP////8AAADL5MkNAAAAA3RSTlPrANmgzpHvAAAAV0lEQVQI1zXK2wmAMAyF4ZTie84MLlA8cYLquyDdfxVzQQjkS/gF4rMeiBqFZJNOmmMEZkJn4ggwm528bFZ82xswFtSq+eORWORZyE9nNZDupy9AtwbgA+KXFBDjEzJnAAAAAElFTkSuQmCC" ,
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAAAAAAD///88vP////8AAAD0q+XQAAAABHRSTlPrANnr1c/lBQAAAFtJREFUCNdVzMEJgDAMBdAUiuf8HRzBAUR+NqieeyjuP4K/tiAmh7wEfgxYEpYKg3M3Mhkyg9QilBe+Tawa40KeUXh0XNGU8vigEnKZaML9u+TxJikum6G3VwAPOGIZOsx3P9IAAAAASUVORK5CYII=" ,
	],
	destroyingImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAA8vP////8AAABkwTciAAAAAnRSTlMA60FL9sgAAABFSURBVAjXY0ACgiAEBIxKAkAEZAgpKQIRiGFspGyMwmA0MVJ2FgAxQCJghpKKkxKE4eIC0Q5iKIIZQKAINxBuBdxSBAAAnK8JPHR4SOQAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///8AAAA8vP8AAAD///8lygjTAAAAA3RSTlMA6+twJNUJAAAAO0lEQVQI12PABpgZGAzADGMDZmMwQ1TYMBDMEHQ2EQQzGIUNBSCqhQ2h2kycodpVnKDagQDVHGMQwgcAl38FhEfYAF0AAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAAD///8AAAA8vP+A2GXGAAAAA3RSTlMA6+twJNUJAAAAKklEQVQI12PACgx4gISICJCQfgIk2C8ACeYDQIJvA5Cw/wMkbGwg6tAAAMx5BautVy9jAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAD///88vP87xZG8AAAAAnRSTlMA60FL9sgAAAAaSURBVAjXY8ANAliBhIQKpoSGBpBYwIVVEwA01AGMofFw+wAAAABJRU5ErkJggg=="
	],
	dieImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAAAAAAA8vP////8AAADL5MkNAAAAA3RSTlPrANmgzpHvAAAAWklEQVQI10XKwQnAMAwDQLumf7srdAGD3AmSAQpN9l+lcQhErxMS2cnXYWSk4QICk2DGN7REjQpOtGgDNxLzk1MiFjSQyTOenpCC3j/4hmJNJg/EYWTKr47+A8oBFTsXgWfBAAAAAElFTkSuQmCC",
}

const SPEED_MONSTER = {
	normalImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAADkAFgAAADkAFgAAAD///+wE2WmAAAABHRSTlMA65PZs0fqcgAAAFZJREFUCNdjYGAUBAIDBiDDBQgEgAwhEEMRyBANBYJAoIwKSMRJAKjELcUtxQXICHULcQsJBYmAGC7IjFCQYrAUGAiAtLuGALXDDURYgbCUWVA0EOgMAIfWF3a5W98rAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQBAMAAAA7eDg3AAAAFVBMVEUAAAAAAADkAFgAAADkAFgAAAD///+wE2WmAAAABHRSTlMA65PZs0fqcgAAAFFJREFUCNdjwAIYBYFAAMgQcgECRSBDNBQIAoEyKiARJwEGRhe3FLcUFyAj1C3ELSQUJAJiuCAzQkGKwVJgIADS7hoC1I4wEGEFs6BooKABAwAaTRUUQQ2AYwAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQBAMAAAACH4lsAAAAElBMVEUAAAAAAADkAFjkAFgAAAD///92JbasAAAAA3RSTlMA65Mu+iwHAAAAQUlEQVQI12MgHgiCAJihbGxsbARkMoq4gICjAAOjsXEoEBoDWS7OIcYhJi5gMSALXQwCICwXEAthCtxkiG0uINsA6GkQt4nXYhAAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAADkAFgAAADkAFgAAAD///+wE2WmAAAABHRSTlMA65PZs0fqcgAAAFFJREFUCNdjwAIYBYFAAMgQcgECRSBDNBQIAoEyKiARJwEGRhe3FLcUFyAj1C3ELSQUJAJiuCAzQkGKwVJgIADS7hoC1I4wEGEFs6BooKABAwAaTRUUQQ2AYwAAAABJRU5ErkJggg==",
	],
	destroyingImage: [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAADkAFjkAFj///8AAACGPvoPAAAAA3RSTlMA65Mu+iwHAAAAS0lEQVQI12NAAoIgBASMSgJABGQIGSsCEZAh7OJs4mIIEgExQCKMrs4mIQIgBkgEzDA2DTaGMEJDwQwhIAOi3RgIDOEGwq2AW4oAAFIjC8I3bcwTAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAADkAFj///8AAADkAFgAAAD///+CKHIAAAAABHRSTlMAk+vrxpRx5AAAADtJREFUCNdjwAYYGRgEwAxBAUZBMENNUSgJzFAKcVUCM5hUnBQgqlWcoNpEA6HaTYOh2oEA1RxBEMIHAF6RBGOSaE/RAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAADkAFj///8AAACyrCoQAAAABHRSTlMAk+vrxpRx5AAAACpJREFUCNdjwAoEWICEhgaQ0K0AEpwJQILRAUiwXwASoiFAQkQEog4NAAB5VAMwGGxDiwAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAADkAFj///8AsbELAAAAA3RSTlMAk+uXwib3AAAAGklEQVQI12PADRZwAQkVCUwJEREgEcCKVRMAOooBZDkgtJwAAAAASUVORK5CYII="
	],
	dieImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAAAAADkAFgAAADkAFgAAAD///+wE2WmAAAABHRSTlMA65PZs0fqcgAAAFtJREFUCNdjYGAUBAIDBiDDBQgEgAwhEEMRyBANBYJAoIwKSMRJAKgkLcUtzQXICE1NcQsLBYmAGC4oUiDFYCkX1xCgiSDtoaFA7QgDGYRAUorIljILigYCnQEAzO4Yb7S8mwIAAAAASUVORK5CYII="
}

const PERSON_MOVE = {
	PERSON_TOP_MOVE_1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD///88vP/////4eFiQJQqpAAAAAnRSTlMA2Ymcp0gAAABUSURBVAjXTcrRDYAwCEVRMB0A2gUsugBlgcZ0/5kMfX7IDye5j4jYVShPx6UbLYZ/CEAjkLg5xmSGX836Lolsq95PXwmOkAQdZidh1AUQBsos84cXUIMIOhGd8bYAAAAASUVORK5CYII=",
	PERSON_TOP_MOVE_2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD///88vP/////4eFiQJQqpAAAAAnRSTlMA2Ymcp0gAAABRSURBVAjXPcrRDYAwCARQMB0A2gUUXaBlgcZ0/5nUg3g/vHBHRKxd6IuOU4Hmoyc8oO5RccsxmeGsanb8QLddd4DdZeFjtgNc3waQMoEyA5kHVq8H5JxaCw4AAAAASUVORK5CYII=",
	PERSON_TOP_MOVE_3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD///88vP/////4eFiQJQqpAAAAAnRSTlMA2Ymcp0gAAABUSURBVAjXTcrRDYAwCEVRMB0A2gUsugBlgcZ0/5kMfX7IDye5j4jYVShPx6UbLYZ/CEAjkLg5xmSGX836Lolsq95PXwmOkAQdZidh1AUQBsos84cXUIMIOhGd8bYAAAAASUVORK5CYII=",
	PERSON_TOP_MOVE_4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAD///88vP/////4eFiQJQqpAAAAAnRSTlMA2Ymcp0gAAABUSURBVAjXPcvRDYAgDATQ1jgAhQWkugB0AWLYfyZznHo/fem1IqJmSRDrpy2U6O1FEBbBSkvjsbhzZvc60eTr/nGgmRqRFjZ3bNBVvu9DP+xDGOABS+cIG59QbRQAAAAASUVORK5CYII=",

	PERSON_BOTTOM_MOVE_1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAAD///////////88vP/4eFj///+g6OoBAAAABHRSTlMA2eu5PvxJKgAAAFJJREFUCNdjYGBgFBQUYAABYUFBQzBDlDUgEM5AlWIUS4QoZnBxgdCCLi6CYBkRFxdHkFwoiBEKYrC4uDiAGAwgBkS7ipMAhKHABGGwBrAGIDEA0wYK5QJQ0EAAAAAASUVORK5CYII=",
	PERSON_BOTTOM_MOVE_2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAATUlEQVQI12NgYGAUFBRgAAEhQUFFMEOExcERzkCVYhQNhChmMDaG0MLGxoIuIBkgwxDGMADJuDAjGKZAXWA5QwiDxYERxmBxYIAAEAMASBUIZsLs0rwAAAAASUVORK5CYII=",
	PERSON_BOTTOM_MOVE_3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAUElEQVQI11XK2wmAQAxE0QmmgI2PAuxAmQYibAP234zMBkTzkwNzAVhEg26O2AdWz+vFf7Ltrhhk/SBjLAt5autCFybyECCgIiVCs4Kn5wcPSA0Io+1eV3wAAAAASUVORK5CYII=",
	PERSON_BOTTOM_MOVE_4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAATElEQVQI12NgYGAUFBRgAAEhQUFFMEOExcERzkCVYhQNhChmMDYGUy6CxsaGYIYwkAGWY0ZiGLiAdQXDGMJAGTBDgMUBzGBxgDIgFABd3QjPjDRBAAAAAABJRU5ErkJggg==",

	PERSON_LEFT_MOVE_1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAV0lEQVQI12NgYBANDWV0ANJMSoKhAgxAwMLC4ioIZYSCGAgpBsHQYAMwg9nYGMIQNg4VhjJMA8G6nI1NYAyXYKhiF2MGiH5DAQjDhRHCYHFhcWCACgEZAA8kCnnByAj0AAAAAElFTkSuQmCC",
	PERSON_LEFT_MOVE_2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/////4eFghNXn7AAAAA3RSTlMA2bkYMbGgAAAAV0lEQVQI10WKwQ2AIBAE19CARChAKyDZ+JdwBdxD+m9FuDNhPje5WWATeTIG15kqJqq97i6vyUpbkgaDpN0epBWTkW6dFoUmGkhPB/+NMEX/lJgVTsfiAyLDDatJ2UHJAAAAAElFTkSuQmCC",
	PERSON_LEFT_MOVE_3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAV0lEQVQI12NgYBANDWV0ANJMSoKhAgxAwMLC4ioIZYSCGAgpBsHQYAMwg9nYGMIQNg4VhjJMA8G6nI1NYAyXYKhiF2MGiH5DAQjDhRHCYHFhcWCACgEZAA8kCnnByAj0AAAAAElFTkSuQmCC",
	PERSON_LEFT_MOVE_4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAWElEQVQI1yXKwQ2AMAiFYYwdAGI6gE7Q5Nk7Bxygid1/FeWVA/kCv3BKrs1MW+I6q/HsHkMXngRfQ1Y8QciO0QhgsgmgG3EAr6d+3IRUdCVMLYjiUojI4gP86wrerf0G+wAAAABJRU5ErkJggg==",

	PERSON_RIGHT_MOVE_1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAVUlEQVQI1zXLwQ2AMAgFUBo7QInhbpzABnsnkQ2U/VcxBcrphf8/QG1ICPMK4XlM4CciDksUy2gbhuBgvhzduDvoXXj49tXQBGuWy44QaBqoohLwxw9AiAsZM7VGDgAAAABJRU5ErkJggg==",
	PERSON_RIGHT_MOVE_2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAWklEQVQI1zWN0Q2AIAxEj9ABrAkLOIHmFiARByDI/qsILfbnXtJ3OQAZ62JQ3Yy07sfMkIqIw+uAtF5gdzkmnjCnk95uZBkpD3kZ3ANMaaymFA1qkCH/vkz1A2pdCXYD86hKAAAAAElFTkSuQmCC",
	PERSON_RIGHT_MOVE_3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAVUlEQVQI1zXLwQ2AMAgFUBo7QInhbpzABnsnkQ2U/VcxBcrphf8/QG1ICPMK4XlM4CciDksUy2gbhuBgvhzduDvoXXj49tXQBGuWy44QaBqoohLwxw9AiAsZM7VGDgAAAABJRU5ErkJggg==",
	PERSON_RIGHT_MOVE_4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD///////88vP/4eFj////WdSo/AAAAA3RSTlMA2bkYMbGgAAAAWElEQVQI1yWKwQ2AMAwDgxr+BKkLMEGR1T8VXaAS2X8VmtoP+2RbRNpudkgoj/OK3HJXJXwETqHqg2cAK1P10mfqOycC3DgBRfnB3QNswNenWWIzjdIn/AcPjwtNvlE9hwAAAABJRU5ErkJggg==",
}

const UnDestructibleWallPosition = [
  ...new Array(5).fill(0).reduce((acc, _, index) => {
    acc.push(...new Array(15).fill(0).map((_, inIndex) => {
      return [
        inIndex * 2 + 2,
        index * 2 + 2
      ]
    }))
    return acc 
  }, []),
  ...new Array(2).fill(0).reduce((acc, _, index) => {
    acc.push(...new Array(33).fill(0).map((_, inIndex) => {
      return [
        inIndex,
        index * 12
      ]
    }))
    return acc 
  }, []),
  ...new Array(2).fill(0).reduce((acc, _, index) => {
    acc.push(...new Array(13).fill(0).map((_, inIndex) => {
      return [
        index * 32,
        inIndex
      ]
    }))
    return acc 
  }, [])
]

const LEVEL_MAP = [
  {
    wall: [
      ...UnDestructibleWallPosition
    ],
    destructibleWall: [
      [2, 3], [3, 3], [4, 3], [1, 3], [10, 5], [8, 7], [20, 3], [1, 7], [1, 8], [3, 2],
      [1, 9], [2, 7], [3, 2], [11, 5], [12, 5], [13, 5], [12, 1], [13, 1], [14, 1],
      [16, 1], [17, 1], [18, 1], [18, 7], [19, 7], [20, 7], [18, 11], [19, 11], [20, 11],
      [3, 11], [4, 11], [5, 11], [11, 8], [11, 9], [11, 10], [24, 5], [25, 5], [28, 11], [29, 11], 
      [29, 1], [29, 2], [24, 9], [25, 9], [26, 9], [4, 1],
    ],
    monster: [
      ['BalloonMonster', 8, 1],
      ['BalloonMonster', 20, 5],
      ['BalloonMonster', 14, 9],
      ['BalloonMonster', 8, 9],
      ['CrossWallMonster', 10, 3],
      ['SpeedMonster', 30, 7]
    ],
    door: [ 18, 7 ],
    buff: [
      ["SuperBoomBuff", 2, 3],
      ["LoopBuff", 8, 7],
      ["TimeBoomBuff", 20, 3],
    ],
    time: 480 
  }
]

let GOD = true 

const LeftMoveButton = query(".action-left")
const RightMoveButton = query(".action-right")
const TopMoveButton = query(".action-top")
const BottomMoveButton = query(".action-bottom")

const DropButton = query(".action-j")
const BoomButton = query(".action-k")
const StopButton = query(".action-p")

const TimeContent = query(".banner .banner-title-time")
const LevelContent = query(".banner .banner-title-level")

const IS_MOBILE = isMobile.any 

function CreateKeyboardAnimation() {
	let pressMap = {
		W: 0,
		S: 0,
		A: 0,
		D: 0
	}
	let currentList = [] 
	let index = 0 

	const moveMap = {
		W: [EMITTER_TOP_OP, { deltaX: 0, deltaY: -1 }],
		S: [EMITTER_BOTTOM_OP, { deltaX: 0, deltaY: 1 }],
		A: [EMITTER_LEFT_OP, { deltaX: -1, deltaY: 0 }],
		D: [EMITTER_RIGHT_OP, { deltaX: 1, deltaY: 0 }],
	}
	const validKeys = Object.keys(moveMap)

	const isValid = (key) => validKeys.includes(key)

	function press(key) {
		if(!isValid(key)) return 
		const index = currentList.indexOf(key)
		if(!~index) {
			currentList.push(key)
		}else {
			currentList.splice(index, 1)
			currentList.push(key)
		}
		pressMap[key] ++ 
	}

	function animation() {
		index ++ 
		index = index % 5
		if(index === 0 && currentList.length) EventEmitter.emit(...moveMap[currentList[currentList.length - 1]])
	}

	function up(key) {
		if(isValid(key)) {
			pressMap[key] = 0 
			const index = currentList.indexOf(key)
			if(!!~index) currentList.splice(index, 1)
		}
	}

	return {
		press,
		up,
		animation
	}

}
function buttonActionBind(target, key) {
	const start = IS_MOBILE ? 'touchstart' : 'mousedown'
	const end = IS_MOBILE ? 'touchend' : 'mouseup'
	target.addEventListener(start, (e) => {
		e.preventDefault()
		if(!game.loading) {
			createKeyboardAnimation.press(key)
			window.addEventListener(end, (e) => {
				e.preventDefault()
				if(!game.loading) {
					createKeyboardAnimation.up(key)
				}
			})
		}
	})
}

document.addEventListener("keydown", (e) => {
	const key = e.key.toUpperCase()
	if(!game.loading) {
		if(key === 'G') GOD = true 
		createKeyboardAnimation.press(key)
	}
})

document.addEventListener("keyup", (e) => {
	const key = e.key.toUpperCase()
	const actionMap = {
		J: EMITTER_DROP_OP,
		K: EMITTER_BOOM_OP,
		P: EMITTER_START_OP,
	}
	if (!game.loading) {
		createKeyboardAnimation.up(key)
		if(Object.keys(actionMap).includes(key)) {
			if (key === "P") {
				stopGame()
			} else {
				EventEmitter.emit(actionMap[key])
			}
		}
	}
})

buttonActionBind(LeftMoveButton, 'A')
buttonActionBind(RightMoveButton, 'D')
buttonActionBind(TopMoveButton, 'W')
buttonActionBind(BottomMoveButton, 'S')

const eventName = IS_MOBILE ? 'touchstart' : 'click'

DropButton.addEventListener(eventName, () => {
	EventEmitter.emit(EMITTER_DROP_OP)
})
BoomButton.addEventListener(eventName, () => {
	EventEmitter.emit(EMITTER_BOOM_OP)
})
StopButton.addEventListener(eventName, stopGame)
document.onselectstart = function(){return false;}

let CANVAS_WIDTH = Math.min(document.documentElement.offsetWidth, 800)
let CANVAS_HEIGHT = (CANVAS_WIDTH * 13) / 33
const UNIT = CANVAS_WIDTH / 33
// 单步移动
const MOVE_UNIT = UNIT / 100

const Stage = new Konva.Stage({
	container: "container-main",
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT,
})

const Layer = new Konva.Layer()
const MonsterLayer = new Konva.Layer()
const BoomLayer = new Konva.Layer() 
const PromptLayer = new Konva.Layer()
const PersonLayer = new Konva.Layer()

Stage.add(Layer)
Stage.add(MonsterLayer)
Stage.add(BoomLayer)
Stage.add(PromptLayer)
Stage.add(PersonLayer)

PromptLayer.zIndex(4)
PersonLayer.zIndex(3)
MonsterLayer.zIndex(2)
BoomLayer.zIndex(1)

let idCounter = 0
// 游戏状态
let isStart = true
let startPrompt

// 销毁
const EMITTER_DESTROY = "EMITTER_DESTROY"
// 游戏结束
const EMITTER_GAME_OVER = "EMITTER_GAME_OVER"
// 墙被摧毁
const EMITTER_WALL_DESTROY = "EMITTER_WALL_DESTROY"
// 怪物创建
const EMITTER_MONSTER_CREATE = "EMITTER_MONSTER_CREATE"
// 怪物移动
const EMITTER_MONSTER_MOVE = "EMITTER_MONSTER_MOVE"
// 人物移动
const EMITTER_PERSON_MOVE = "EMITTER_PERSON_MOVE"
// 左移动操作
const EMITTER_LEFT_OP = "EMITTER_LEFT_OP"
// 右移动操作
const EMITTER_RIGHT_OP = "EMITTER_RIGHT_OP"
// 上移动操作
const EMITTER_TOP_OP = "EMITTER_TOP_OP"
// 下移动操作
const EMITTER_BOTTOM_OP = "EMITTER_BOTTOM_OP"
// 炸弹爆炸
const EMITTER_BOOM_BOOMING = "EMITTER_BOOM_BOOMING"
// 放炸弹操作
const EMITTER_DROP_OP = "EMITTER_DROP_OP"
// 释放炸弹操作
const EMITTER_BOOM_OP = "EMITTER_BOOM_OP"
// 开始暂停操作
const EMITTER_START_OP = "EMITTER_START_OP"
// 进入下一关操作
const EMITTER_NEXT_OP = "EMITTER_NEXT_OP"
// 全局动画
const EMITTER_TIMER = "EMITTER_TIMER"
const EventEmitter = new EventEmitter3()

const createKeyboardAnimation = CreateKeyboardAnimation()

// Object

class CoreObject {
	// 在这里监听unit改变

	constructor(position) {
		this.id = idCounter++
		this.x = position[0]
		this.y = position[1]
		this.eventBind = this.eventBind.bind(this)
		this.eventUnBind = this.eventUnBind.bind(this)
		this.destroy = this.destroy.bind(this)
	}

	x = 0
	y = 0
	instance
	loading = false
	disabled = false
	id

	create() {}

	actionWrapper(action) {
		const that = this
		return function (...args) {
			if (that.disabled) return
			action.call(that, ...args)
		}
	}

	eventBind() {
		EventEmitter.once(EMITTER_DESTROY, this.destroy)
		EventEmitter.addListener(EMITTER_START_OP, this.onStart, this)
	}

	eventUnBind() {
		EventEmitter.removeListener(EMITTER_START_OP, this.onStart, this)
	}

	updatePosition(position) {
		if (position) {
			this.x = position.x
			this.y = position.y
		}
		this.instance &&
			this.instance.absolutePosition({ x: this.x * UNIT, y: this.y * UNIT })
	}

	destroy() {
		this.instance && this.instance.destroy()
		this.eventUnBind()
	}

	onStart() {
		isStart ? this.start() : this.stop()
	}

	stop() {
		this.disabled = true
	}

	start() {
		this.disabled = false
	}
}

class AnimationObject extends CoreObject {

	constructor(position) {
		super(position)
	}

	normalImage 
	dieImage 
	destroyingImage = []
	moveImage 

	lifeCycle = 1

	moveIndex = 0 
	moveAnimationIndex = 0 

	get isAlive() {
		return this.lifeCycle === 1
	}

	// 创建
	create(afterCrate) {
		loader(this.normalImage, image => {
			this.instance = new Konva.Image({
				x: this.x * UNIT,
				y: this.y * UNIT,
				width: UNIT,
				height: UNIT,
				image,
			})
			afterCrate && afterCrate()
			this.loading = false 
		})
	}

	// 全局循环
	loop(options={}) {
		const realOptions = {
			move: 1,
			destroy: 1,
			...options
		}
		if(this.isAlive) {
			this.moveAnimationIndex %= realOptions.move
			this.moveAnimationIndex === 0 && this.moveAnimation()
			this.moveAnimationIndex ++ 
		}else if(this.lifeCycle >= 2 && this.lifeCycle < 100) {
			this.dieAnimation()
		}else if(this.lifeCycle >= 100) {
			this.lifeCycle % realOptions.destroy === 0 && this.destroyAnimation()
		}
		return !this.isAlive
	}

	over() {
		this.lifeCycle = 2
	}

	// 运动动画
	moveAnimation() {
		const move = this.moveImage 
		if(Array.isArray(move) && move.length) {
			const length = move.length
			if((length - 1) < this.moveIndex) {
				this.moveIndex = 0 
			}
			loader(move[this.moveIndex], image => {
				this.instance.image(image)
			})
			this.moveIndex ++
			this.moveIndex %= length
		}
	}

	// 死亡动画
	dieAnimation() {
		if(!this.dieImage) {
			this.lifeCycle = 100 
			return 
		}
		if(this.lifeCycle === 2) {
			loader(this.dieImage, (image) => {
				this.instance.image(image)
			})
		}
		this.lifeCycle ++
	}

	// 消失动画
	destroyAnimation() {
		const destroy = this.destroyingImage 
		const destroyImageLength = destroy.length
		if(this.lifeCycle > 120 + 20 * destroyImageLength) {
			return this.destroy()
		}
		const index = (this.lifeCycle - 100) / 20 
		const targetImage = destroy[index]
		if(targetImage) {
			loader(targetImage, (image) => {
				this.instance.image(image)
			})
		}
		this.lifeCycle ++
	}

}

// 角色
class Person extends AnimationObject {
	constructor(position, life) {
		super(position)
		this.create()
		this.life = life
		this.move = this.actionWrapper(this.move)
		this.dropBoom = this.actionWrapper(this.dropBoom)
		this.eventBind()
	}

	type = "PERSON"

	normalImage = PERSON_MOVE.PERSON_RIGHT_MOVE_1

	// buff
	boom = new BoomFactory()
	life = 3

	create() {
		super.create(() => {
			PersonLayer.add(this.instance)
			EventEmitter.emit(
				EMITTER_PERSON_MOVE,
				this,
				{ x: this.x, y: this.y },
				() => {}
			)
		})
	}

	die() {
		this.over()
		this.life--
		EventEmitter.emit(EMITTER_GAME_OVER, this.life)
	}

	revisePosition(position, delta) {
		const { x, y } = position 
		const newPosition = {
			...position
		}
		const { deltaX, deltaY } = delta 
		const roundX = Math.round(x)
		const roundY = Math.round(y)
		let newX = Math.abs(roundX - x) <= 0.3 ? roundX : x
		let newY = Math.abs(roundY - y) <= 0.3 ? roundY : y
		if(!!deltaX) {
			newPosition.y = newY
		}else if(!!deltaY) {
			newPosition.x = newX
		}
		return newPosition
	}

	getMoveImage(delta) {
		const { deltaX, deltaY } = delta
		if(!!deltaX) return new Array(4).fill(0).map((_, index) => PERSON_MOVE[`PERSON_${deltaX > 0 ? 'RIGHT' : 'LEFT'}_MOVE_${index + 1}`])
		return new Array(4).fill(0).map((_, index) => PERSON_MOVE[`PERSON_${deltaY > 0 ? 'BOTTOM' : 'TOP'}_MOVE_${index + 1}`])
	}

	move(delta) {
		const { deltaX, deltaY } = delta
		this.moveImage = this.getMoveImage(delta)
		if (this.loading || this.loop()) return
		this.loading = true
		let newX = this.x + (deltaX * MOVE_UNIT * 20) / UNIT
		let newY = this.y + (deltaY * MOVE_UNIT * 20) / UNIT
		newX = toFixed4(newX)
		newY = toFixed4(newY)
		const newPosition = this.revisePosition({
			x: newX,
			y: newY,
		}, delta)
		// 碰到障碍墙
		if (knockWall(newPosition)) {
			console.log("person knocked wall")
			this.loading = false 
			return
		}
		let counter = EventEmitter.listenerCount(EMITTER_PERSON_MOVE)
		if (counter === 0) {
			this.updatePosition(newPosition)
			this.loading = false
			return
		}
		let knocked = false
		let knockType
		EventEmitter.emit(
			EMITTER_PERSON_MOVE,
			this,
			newPosition,
			(type, isKnock) => {
				counter--
				if (isKnock) {
					knocked = true
					knockType = type
				}
				if (counter === 0) {
					if (knocked && knockType !== "BUFF") {
						switch (knockType) {
							case "MONSTER":
							case "FIRE":
								this.die()
								break
						}
					} else {
						this.updatePosition(newPosition)
					}
					this.loading = false
				}
			}
		)
	}

	dropBoom() {
		const position = {
			x: this.x,
			y: this.y,
		}
		this.boom.create(position)
	}

	boomedBoom() {
		this.boom.boom()
	}

	onTargetMove(instance, position, onKnock) {
		const isKnock = knockJudge({ x: this.x, y: this.y }, { ...position })
		if (isKnock && instance.type !== 'PREV') {
			this.die()
		}
		onKnock(this.type, isKnock)
	}

	eventBind() {
		super.eventBind()
		EventEmitter.addListener(EMITTER_LEFT_OP, this.move, this)
		EventEmitter.addListener(EMITTER_RIGHT_OP, this.move, this)
		EventEmitter.addListener(EMITTER_TOP_OP, this.move, this)
		EventEmitter.addListener(EMITTER_BOTTOM_OP, this.move, this)

		EventEmitter.addListener(EMITTER_DROP_OP, this.dropBoom, this)
		EventEmitter.addListener(EMITTER_BOOM_OP, this.boomedBoom, this)

		EventEmitter.addListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)

		EventEmitter.addListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
	}

	eventUnBind() {
		super.eventBind()
		EventEmitter.removeListener(EMITTER_LEFT_OP, this.move, this)
		EventEmitter.removeListener(EMITTER_RIGHT_OP, this.move, this)
		EventEmitter.removeListener(EMITTER_TOP_OP, this.move, this)
		EventEmitter.removeListener(EMITTER_BOTTOM_OP, this.move, this)

		EventEmitter.removeListener(EMITTER_DROP_OP, this.dropBoom, this)
		EventEmitter.removeListener(EMITTER_BOOM_OP, this.boomedBoom, this)

		EventEmitter.removeListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)

		EventEmitter.removeListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
	}
}

// 火🔥
class Fire extends CoreObject {

	constructor(position, options) {
		super(position)
		const { delta, isMax, headImage, barImage, barInfo, headInfo } = options
		this.delta = delta
		this.isMax = isMax 
		this.headImage = headImage 
		this.barImage = barImage
		this.barInfo = barInfo
		this.headInfo = headInfo
		this.calculate()
	}

	headTargets = [] 
	barTargets = []  

	knocked = false 

	type = "PREV"
	headImage = [] 
	barImage = [] 

	width = 0
	height = 0
	delta 
	isMax 
	barInfo
	headInfo

	loading = true 

	boomInfo 

	calculate() {
		let newInfo = { x: this.x, y: this.y, height: this.height, width: this.width }
		let tempInfo = {
			...newInfo,
			width: 1,
			height: 1,
		}
		const _calculate = (callback) => {
			if(knockWall(tempInfo)) {
				this.knocked = true
				callback()
			}else if(this.isMax(tempInfo)) {
				newInfo = {
					...newInfo,
					...tempInfo
				}
				callback()
			}else {
				this.emitBooming(tempInfo, (isKnock) => {
					if (isKnock) {
						this.knocked = true 
						callback()
					}else {
						newInfo = {
							...newInfo,
							...tempInfo
						}
						tempInfo = this.delta(tempInfo)
						_calculate(callback)
					}
				})
			}
		}
		_calculate(() => {
			this.type = 'FIRE'
			Object.entries(newInfo).forEach(item => {
				const [ key, value ] = item
				this[key] = value  
			})
			this.boomInfo = tempInfo
			this.create()
		})
	}

	outerEmitBoom() {
		this.boomInfo && this.emitBooming(this.boomInfo)
	}

	emitBooming(info, callback) {
		let counter = EventEmitter.listenerCount(EMITTER_BOOM_BOOMING)
		let knockType
		let knocked = false
		EventEmitter.emit(EMITTER_BOOM_BOOMING, this, info, (type, isKnock) => {
			counter--
			if (isKnock) {
				knockType = type
				knocked = true
			}
			if (counter === 0) {
				callback && callback(knocked && ['WALL', 'DOOR'].includes(knockType))
			}
		})
	}

	create() {

		const info = {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			knocked: this.knocked
		}

		if(!this.width || !this.height) return 

		loader(this.barImage[0], image => {
			this.barTargets.push(...this.barInfo(info).map(item => {
				const instance = new Konva.Image({
					...item,
					image,
				})
				BoomLayer.add(instance)
				return instance
			}))
			if(!this.knocked) {
				loader(this.headImage[0], image => {
					const instance = new Konva.Image({
						...this.headInfo(info)[0],
						image 
					})
					BoomLayer.add(instance)
					this.headTargets.push(instance)
					this.eventBind()
				})
			}else {
				this.eventBind()
			}
		})
	}

	updateImage(index) { 
		this.headTargets.forEach(item => {
			loader(this.headImage[index], image => {
				item.image(image)
			})
		})
		this.barTargets.forEach(item => {
			loader(this.barImage[index], image => {
				item.image(image)
			})
		})
	}

	onTargetMove(instance, position, onKnock) {
		const isKnock = knockJudge({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		}, position)
		onKnock(this.type, isKnock)
	}

	eventBind = () => {
		super.eventBind()
		EventEmitter.addListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
	}

	eventUnBind = () => {
		super.eventBind()
		EventEmitter.removeListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
	}

	destroy() {
		super.destroy()
		this.headTargets.forEach(item => item.destroy())
		this.barTargets.forEach(item => item.destroy())
	}

}

// 炸弹
class Boom extends CoreObject {
	constructor(position, options) {
		super(position)
		const { onBoom, multipleState, timeState, hugeState } = options
		this.onBoom = onBoom
		this.multipleState = multipleState
		this.timeState = timeState
		this.hugeState = hugeState
		this.create()
		this.eventBind()
	}

	type = "BOOM"

	multipleState = false
	timeState = false
	hugeState = false

	onBoom
	// loading timeing wait boom destroy
	timeStep = -1
	timeoutStart
	timeoutRest = 2000

	initBoomInstance
	fireMap = []

	get maxBoomArea() {
		return this.hugeState ? 3 : 1
	}

	get isBoomed() {
		return this.timeStep > 4
	}

	onTargetMove = (instance, position, onKnock) => {
		const isKnock = knockJudge(position, { x: this.x, y: this.y })
		const prevKnock = knockJudge({ x: instance.x, y: instance.y }, { x: this.x, y: this.y })
		onKnock(this.type, isKnock && !prevKnock)
	}

	eventBind = () => {
		super.eventBind()
		EventEmitter.addListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_TIMER, this.animation, this)
	}

	eventUnBind = () => {
		super.eventBind()
		EventEmitter.removeListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_TIMER, this.animation, this)
	}

	create() {
		loader(BOOM, (image) => {
			this.initBoomInstance = new Konva.Sprite({
				x: this.x * UNIT,
				y: this.y * UNIT,
				width: UNIT,
				height: UNIT,
				image,
				animation: 'normal',
				frameRate: 3,
				frameIndex: 0,
				scaleX: UNIT / 16,
				scaleY: UNIT / 16,
				animations: {
					normal: [
						0, 0, 16, 16,
						16, 0, 16, 16,
						32, 0, 16, 16,
						48, 0, 16, 16
					],
				}
			})
			this.timeStep = 0
			Layer.add(this.initBoomInstance)
			this.initBoomInstance.start()
			this.timeoutStart = Date.now()
			if (this.timeState) {
				this.timeStep = 1
			}
		})
	}

	animation() {
		if (this.timeStep === 0) {
			const now = Date.now()
			this.timeoutRest -= now - this.timeoutStart
			this.timeoutStart = now
			if (this.timeoutRest <= 0) this.timeStep += 2
		} else if (this.timeStep >= 2) {
			this.immediateBoom()
		}
	}

	updateImage(index) {
		loader(FIRE.middle[index], image => {
			this.initBoomInstance.image(image)
		})
		this.fireMap.forEach(item => item.updateImage(index))
	}

	eventEmit() {
		this.fireMap.forEach(item => item.outerEmitBoom())
	}

	// 立刻爆炸
	immediateBoom(step) {
		if(step !== undefined) this.timeStep = 2
		// init
		if (!this.fireMap.length) {
			this.type = 'FIRE'
			EventEmitter.emit(EMITTER_BOOM_BOOMING, this, { x: this.x, y: this.y }, () => {
				this.type = 'BOOM'
			})
			this.initBoomInstance.stop()
			this.initBoomInstance.destroy()
			loader(FIRE.middle[0], image => {
				this.initBoomInstance = new Konva.Image({
					x: this.x * UNIT,
					y: this.y * UNIT,
					width: UNIT,
					height: UNIT,
					image 
				})
				BoomLayer.add(this.initBoomInstance)
			})
			this.fireMap.push(new Fire([this.x - 1, this.y], { // left 
				delta: (info) => {
					return {
						x: info.x - 1,
						y: info.y,
						width: info.width + 1,
						height: info.height
					}
				},
				headInfo: (info) => {
					return [{
						x: info.x * UNIT,
						y: info.y * UNIT,
						width: UNIT,
						height: UNIT
					}]
				},
				barInfo: (info) => {
					const x = info.knocked ? info.x : info.x + 1
					const width = info.knocked ? info.width : info.width - 1
					const common = {
						y: info.y * UNIT,
						height: UNIT
					}
					return new Array(width).fill(0).map((item, index) => {
						return {
							...common,
							width: UNIT,
							x: (x + index) * UNIT
						}
					})
				},
				isMax: (info) => info.width === this.maxBoomArea,
				headImage: FIRE.left.head,
				barImage: [FIRE_HORIZONTAL_1, FIRE_HORIZONTAL_2]
			}),
			new Fire([this.x + 1, this.y], { // right 
				delta: (info) => {
					return {
						x: info.x,
						y: info.y,
						width: info.width + 1,
						height: info.height 
					}
				},
				isMax: (info) => info.width === this.maxBoomArea,
				headInfo: (info) => {
					return [{
						x: (info.x + info.width - 1) * UNIT,
						y: info.y * UNIT,
						width: UNIT,
						height: UNIT
					}]
				},
				barInfo: (info) => {
					const x = info.x
					const width = info.knocked ? info.width : info.width - 1
					const common = {
						y: info.y * UNIT,
						height: UNIT
					}
					return new Array(width).fill(0).map((item, index) => {
						return {
							...common,
							width: UNIT,
							x: (x + index) * UNIT
						}
					})
				},
				headImage: FIRE.right.head,
				barImage: [FIRE_HORIZONTAL_1, FIRE_HORIZONTAL_2]
			}),
			new Fire([this.x, this.y - 1], { // top
				delta: (info) => {
					return {
						x: info.x,
						y: info.y - 1,
						width: info.width,
						height: info.height + 1 
					}
				},
				isMax: (info) => info.height === this.maxBoomArea,
				headInfo: (info) => {
					return [{
						x: info.x * UNIT,
						y: info.y * UNIT,
						width: UNIT,
						height: UNIT
					}]
				},
				barInfo: (info) => {
					const y = info.knocked ? info.y : info.y + 1
					const height = info.knocked ? info.height : info.height - 1
					const common = {
						x: info.x * UNIT,
						width: UNIT
					}
					return new Array(height).fill(0).map((item, index) => {
						return {
							...common,
							height: UNIT,
							y: (y + index) * UNIT
						}
					})
				},
				headImage: FIRE.top.head,
				barImage: [FIRE_VERTICAL_1, FIRE_VERTICAL_2]
			}),
			new Fire([this.x, this.y + 1], { // bottom 
				delta: (info) => {
					return {
						x: info.x,
						y: info.y,
						width: info.width,
						height: info.height + 1 
					}
				},
				isMax: (info) => info.height === this.maxBoomArea,
				headInfo: (info) => {
					return [{
						x: info.x * UNIT,
						y: (info.y + info.height - 1) * UNIT,
						width: UNIT,
						height: UNIT
					}]
				},
				barInfo: (info) => {
					const y = info.y
					const height = info.knocked ? info.height : info.height - 1
					const common = {
						x: info.x * UNIT,
						width: UNIT
					}
					return new Array(height).fill(0).map((item, index) => {
						return {
							...common,
							height: UNIT,
							y: (y + index) * UNIT
						}
					})
				},
				headImage: FIRE.bottom.head,
				barImage: [FIRE_VERTICAL_1, FIRE_VERTICAL_2]
			}))
			return
		}

		if(this.timeStep === 10) {
			this.updateImage(1)
			this.eventEmit()
		}else if(this.timeStep === 20) {
			this.updateImage(0)	
		}else if(this.timeStep > 30) {
			this.onBoom(this.id)
			this.destroy()
		}
		this.timeStep++
	}

	destroy() {
		super.destroy()
		try {
			this.initBoomInstance.destroy()
			this.fireMap.forEach(item => item.destroy())
		} catch (err) {}
	}
}

class BoomFactory {
	multipleState = false
	timeState = false
	hugeState = false

	boomMap = {}

	onBoom = (id) => {
		this.boomMap[id] = undefined
		delete this.boomMap[id]
	}

	create(position) {
		const multipleState = GOD || this.multipleState
		if (Object.keys(this.boomMap).length >= (multipleState ? 5 : 1)) return
		const { x, y } = position
		const boom = new Boom([Math.round(x), Math.round(y)], {
			onBoom: this.onBoom,
			multipleState,
			timeState: GOD || this.timeState,
			hugeState: GOD || this.hugeState,
		})
		this.boomMap[boom.id] = boom
	}

	boom() {
		if(!GOD && !this.timeState) return 
		const targetId = Math.min(...Object.entries(this.boomMap).filter(item => !item[1].isBoomed).map(item => item[0]))
		!!this.boomMap[targetId] && this.boomMap[targetId].immediateBoom(2)
	}
}

class Buff extends AnimationObject {
	display = false

	constructor(position) {
		super(position)
		this.eventBind()
	}

	type = "BUFF"

	create() {
		super.create(() => {
			Layer.add(this.instance)
		})
	}

	onTargetMove(instance, position, onKnock) {
		const isKnock = knockJudge(position, { x: this.x, y: this.y }) && instance.type === 'PERSON'
		onKnock(this.type, isKnock)
		if (isKnock) {
			this.destroy()
		}
	}

	onWallDestroy(position) {
		if (position.x === this.x && position.y === this.y) {
			this.create()
			this.nextEventBind()
		}
	}

	nextEventBind() {
		EventEmitter.addListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
	}

	eventBind = () => {
		super.eventBind()
		EventEmitter.addListener(EMITTER_WALL_DESTROY, this.onWallDestroy, this)
	}

	eventUnBind = () => {
		super.eventBind()
		EventEmitter.removeListener(EMITTER_WALL_DESTROY, this.onWallDestroy, this)
		EventEmitter.removeListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
	}
}

// 连放炸弹buff
class LoopBuff extends Buff {

	normalImage = LOOP_BOOM_BUFF

	onTargetMove(instance, position, onKnock) {
		super.onTargetMove(instance, position, (type, isKnock) => {
			onKnock(type, isKnock)
			if (isKnock) instance.boom.multipleState = true
		})
	}
}

// 炸弹定点爆炸buff
class TimeBoomBuff extends Buff {
	normalImage = TIME_BOOM_BUFF
	onTargetMove(instance, position, onKnock) {
		super.onTargetMove(instance, position, (type, isKnock) => {
			onKnock(type, isKnock)
			if (isKnock) instance.boom.timeState = true
		})
	}
}

// 炸弹爆炸范围buff
class SuperBoomBuff extends Buff {
	normalImage = SUPER_BOOM_BUFF
	onTargetMove(instance, position, onKnock) {
		super.onTargetMove(instance, position, (type, isKnock) => {
			onKnock(type, isKnock)
			if (isKnock) instance.boom.hugeState = true
		})
	}
}

class Door extends Buff {

	type = "DOOR"
	normalImage = DOOR
	isKnock = false 

	onTargetMove(instance, position, onKnock) {
		if (EventEmitter.listenerCount(EMITTER_MONSTER_CREATE) !== 0 && !['FIRE', 'PREV'].includes(instance.type)) {
			return onKnock(this.type, false)
		}
		const type = instance.type 
		const isKnock = knockJudge(position, { x: this.x, y: this.y })
		onKnock(this.type, isKnock)
		if (isKnock) {
			if(type === 'PERSON') EventEmitter.emit(EMITTER_NEXT_OP)
			if(type === 'FIRE' && !this.isKnock) {
				this.isKnock = true 
				setTimeout(() => {
					new Array(5).fill(0).forEach(() => {
						new (randomMonster())([this.x, this.y])
					})
					this.isKnock = false 
				}, 3000)
			}
		}
	}

	nextEventBind() {
		super.nextEventBind()
		EventEmitter.addListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
	}

	eventUnBind() {
		super.eventBind()
		EventEmitter.removeListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
	}

}

class Wall extends AnimationObject {
	constructor(position, destructible) {
		super(position)
		this.destructible = destructible
		this.loading = this.destructible
		this.normalImage = this.destructible ? DESTRUCTIBLE_WALL : UN_DESTRUCTIBLE_WALL
		this.create()
		this.destructible && this.eventBind()
	}

	// 是否可以被破坏
	destructible = false
	// 位置
	position = []
	type = "WALL"

	loading = true 

	destroyingImage = [
		WALL_DESTROY_1,
		WALL_DESTROY_2
	]

	create() {
		super.create(() => {
			Layer.add(this.instance)
		})
	}

	onTargetMove(instance, position, onKnock) {
		if(this.loading || !this.isAlive) return onKnock(this.type, false)
		const isKnock = knockJudge({ x: this.x, y: this.y }, { ...position })
		onKnock(this.type, isKnock)
		if(isKnock && instance.type === 'FIRE') {
			this.nextEventBind()
			this.over()
		}
	}

	nextEventBind() {
		EventEmitter.addListener(EMITTER_TIMER, this.loop, this)
	}

	eventBind() {
		super.eventBind()
		EventEmitter.addListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
	}

	eventUnBind() {
		super.eventUnBind()
		EventEmitter.removeListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_MONSTER_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_TIMER, this.loop, this)
	}

	destroy() {
		super.destroy() 
		EventEmitter.emit(EMITTER_WALL_DESTROY, { x: this.x, y: this.y })
	}

}

class Monster extends AnimationObject {
	constructor(position) {
		super(position)
		this.init() 
		this.create()
		this.eventBind()
	}

	type = "MONSTER"

	// 移动速度
	speed = 1
	// 可穿越
	crossable = false

	// 运动方向
	direction
	// 运动距离
	moveCounter = 0

	loading = true 

	init() {}

	create() {
		super.create(() => {
			MonsterLayer.add(this.instance)
		})
	}

	move = () => {
		if (this.loading || this.loop({
			move: 20
		})) return
		this.loading = true
		if (this.moveCounter === 0) {
			// left top right bottom
			const directions = [
				[-1, 0],
				[0, -1],
				[1, 0],
				[0, 1],
			]
			const moveCounters = [1, 3, 5, 7, 9]
			this.direction = directions[Math.floor(Math.random() * directions.length)]
			this.moveCounter =
				moveCounters[Math.floor(Math.random() * moveCounters.length)] * 100
		}
		this.moveCounter--
		const [deltaX, deltaY] = this.direction
		const newX = this.x + (deltaX * MOVE_UNIT * this.speed) / UNIT
		const newY = this.y + (deltaY * MOVE_UNIT * this.speed) / UNIT
		const newPosition = {
			x: toFixed4(newX),
			y: toFixed4(newY),
		}
		// 碰到障碍墙
		if (knockWall(newPosition)) {
			this.moveCounter = 0
			this.loading = false
			console.log("monster knock the undestructible wall")
			return
		}
		let counter = EventEmitter.listenerCount(EMITTER_MONSTER_MOVE)
		if (counter === 0) {
			this.updatePosition(newPosition)
			this.loading = false
			return
		}
		let knocked = false
		let knockType
		EventEmitter.emit(
			EMITTER_MONSTER_MOVE,
			this,
			newPosition,
			(type, isKnock) => {
				counter--
				if (isKnock) {
					if (!this.crossable || type !== "WALL") {
						knocked = true
						knockType = type
					}
				}
				if (counter === 0) {
					if (knocked) {
						console.log("monster knocked", knockType)
						if(knockType === 'FIRE') {
							// 死亡
							this.over()
						}
						this.moveCounter = 0
					} else {
						this.updatePosition(newPosition)
					}
					this.loading = false
				}
			}
		)
	}

	onTargetMove(instance, position, onKnock) {
		if(this.loading || !this.isAlive) return onKnock(this.type, false)
		const isKnock = knockJudge(position, { x: this.x, y: this.y })
		onKnock(this.type, isKnock)
		if (instance.type === "FIRE" && isKnock) {
			this.over()
		}
	}

	createMonster() {
		/** Prefix */
	}

	eventBind() {
		super.eventBind()
		EventEmitter.addListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
		EventEmitter.addListener(EMITTER_MONSTER_CREATE, this.createMonster, this)
		EventEmitter.addListener(EMITTER_TIMER, this.move, this)
	}

	eventUnBind() {
		super.eventUnBind()
		EventEmitter.removeListener(EMITTER_PERSON_MOVE, this.onTargetMove, this)
		EventEmitter.removeListener(EMITTER_BOOM_BOOMING, this.onTargetMove, this)
		EventEmitter.removeListener(
			EMITTER_MONSTER_CREATE,
			this.createMonster,
			this
		)
		EventEmitter.removeListener(EMITTER_TIMER, this.move, this)
	}

}

// 气球怪
class BalloonMonster extends Monster {

	init() {
		this.normalImage = BALLOON_MONSTER.normalImage[0]
		this.moveImage = BALLOON_MONSTER.normalImage
		this.dieImage = BALLOON_MONSTER.dieImage
		this.destroyingImage = BALLOON_MONSTER.destroyingImage
	}

	animation() {
		const scaleY = this.instance.scaleY() || 1
		this.instance.scaleY(scaleY == 1 ? 0.8 : 1)
	}
}

// 穿墙怪
class CrossWallMonster extends Monster {
	crossable = true

	init() {
		this.normalImage = CROSS_MONSTER.normalImage[0]
		this.moveImage = CROSS_MONSTER.normalImage
		this.dieImage = CROSS_MONSTER.dieImage
		this.destroyingImage = CROSS_MONSTER.destroyingImage
	}

	animation() {
		const scaleX = this.instance.scaleX() || 1
		this.instance.scaleX(scaleX == 1 ? 0.8 : 1)
	}
}

// 高速怪
class SpeedMonster extends Monster {
	speed = this.speed * 3

	init() {
		this.normalImage = SPEED_MONSTER.normalImage[0]
		this.moveImage = SPEED_MONSTER.normalImage
		this.dieImage = SPEED_MONSTER.dieImage
		this.destroyingImage = SPEED_MONSTER.destroyingImage
	}

	animation() {
		const scaleX = this.instance.scaleX() || 1
		this.instance.scaleX(scaleX == 1 ? 0.8 : 1)
	}
}

function createGamePrompt({ content, onRestart, timeout }) {
	const group = new Konva.Group({
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT,
		x: 0,
		y: 0,
	})
	group.add(
		new Konva.Rect({
			width: CANVAS_WIDTH,
			height: CANVAS_HEIGHT,
			x: 0,
			y: 0,
			fill: "rgba(0, 0, 0, 0.9)",
		})
	)
	PromptLayer.add(group)
	const commonFontConfig = {
		align: "center",
		verticalAlign: "center",
		fontSize: CANVAS_WIDTH / 50,
		x: Stage.width() / 2,
		y: Stage.height() / 2,
		fill: "#fff",
	}
	const text = new Konva.Text({
		...commonFontConfig,
		text: content,
	})
	text.offsetX(text.width() / 2)
	text.offsetY(text.height() / 2)

	if (!~timeout) {
		text.on(eventName, () => {
			group.destroy()
			onRestart()
		})
	}

	group.add(text)
	if (!!~timeout) {
		setTimeout(() => {
			group.destroy()
			onRestart()
		}, timeout)
	}
	return group.destroy.bind(group)
}

class Game {
	constructor() {
		this.init()
		this.eventBind()
	}

	animationTimer
	timer
	timeout = 480

	level = 1
	personLife = 3

	loading = false

	get levelData() {
		return LEVEL_MAP[this.level - 1]
	}

	init() {
		const { wall, destructibleWall, monster, time, buff } = this.levelData
		this.timeout = time
		wall.forEach(this.createWall.bind(this, false))
		destructibleWall.forEach(this.createWall.bind(this, true))
		monster.forEach(this.createMonster)
		buff.forEach(this.createBuff)
		this.initDoor()
		this.initPerson()
		this.initlevel()
		this.start()
	}

	initlevel() {
		LevelContent.innerHTML = this.level
	}

	// 创建障碍墙
	createWall(destructible, position) {
		new Wall(position, destructible)
	}

	// 创建怪物
	createMonster([type, ...position]) {
		new (getMonster(type))(position)
	}

	// 创建buff
	createBuff([type, ...position]) {
		new (getBuff(type))(position)
	}

	// 创建门
	initDoor() {
		const { door } = this.levelData
		new Door(door)
	}

	// 创建角色
	initPerson() {
		new Person([1, 2], this.personLife)
	}

	onGameOver(life) {
		if (this.loading) return
		this.loading = true
		this.personLife = typeof life === "number" ? life : this.personLife - 1
		this.destroy()
		if (this.personLife !== 0) {
			createGamePrompt({
				content: `你已阵亡！（还剩${this.personLife}次机会）`,
				onRestart: this.restart.bind(this),
				timeout: 3000,
			})
		} else {
			createGamePrompt({
				content: `你已阵亡！点我继续(*^▽^*)`,
				onRestart: () => {
					this.personLife = 3
					this.restart()
				},
				timeout: -1,
			})
		}
	}

	onNext() {
		this.loading = true 
		this.destroy()
		if (this.level === LEVEL_MAP.length) {
			createGamePrompt({
				content: "恭喜通关！！！点我重玩(*^▽^*)",
				onRestart: () => {
					this.level = 1
					this.personLife = 3
					this.restart()
				},
				timeout: -1,
			})
		} else {
			this.level++
			createGamePrompt({
				content: `恭喜通过本关！！即将进入下一关`,
				onRestart: this.restart.bind(this),
				timeout: 3000,
			})
		}
	}

	onStart() {
		isStart ? this.start() : this.stop()
	}

	eventBind() {
		EventEmitter.addListener(EMITTER_GAME_OVER, this.onGameOver, this)
		EventEmitter.addListener(EMITTER_NEXT_OP, this.onNext, this)
		EventEmitter.addListener(EMITTER_START_OP, this.onStart, this)
	}

	eventUnBind() {
		EventEmitter.removeListener(EMITTER_GAME_OVER, this.onGameOver, this)
		EventEmitter.removeListener(EMITTER_NEXT_OP, this.onNext, this)
		EventEmitter.removeListener(EMITTER_START_OP, this.onStart, this)
	}

	start() {
		TimeContent.innerHTML = this.timeout
		this.timer = setInterval(() => {
			this.timeout--
			TimeContent.innerHTML = this.timeout
			if (this.timeout === 0) {
				this.stop()
				this.onGameOver()
			}
		}, 1000)
		this.animationTimer = setInterval(() => {
			EventEmitter.emit(EMITTER_TIMER)
			createKeyboardAnimation.animation()
		}, 1000 / 60)
	}

	stop() {
		clearInterval(this.timer)
		clearInterval(this.animationTimer)
	}

	destroy() {
		this.stop()
		this.loading = false
		this.timeout = 480
		EventEmitter.emit(EMITTER_DESTROY)
	}

	restart() {
		this.destroy()
		this.init()
	}
}

const game = new Game()
