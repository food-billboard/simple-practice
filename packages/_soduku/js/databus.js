import cax from "./libs/cax"
import EventEmitter from "./base/event-emitter";

export const BASE_STAGE = new cax.Stage()

const info = wx.getSystemInfoSync()
export const ContainerWidth = info.windowWidth
const _ContainerHeight = info.windowHeight
export const BANNER_HEIGHT = _ContainerHeight * 0.2 
export const ContainerHeight = _ContainerHeight * 0.8

export const EVENT_EMITTER = new EventEmitter()

export const EVENT_EMITTER_NAME = {
	// 游戏结束
	ON_GAME_OVER: "ON_GAME_OVER",
	// 游戏结算
	ON_GAME_OVER_BEFORE: "ON_GAME_OVER_BEFORE",
	// 游戏开始
	ON_GAME_PLAY: "ON_GAME_PLAY",
	// 游戏开始前
	ON_GAME_PLAY_BEFORE: "ON_GAME_PLAY_BEFORE",
	// 动画
	ON_ANIMATION: "ON_ANIMATION",
	// 柱子移动
	ON_COLUMN_MOVE: "ON_COLUMN_MOVE",
	// 柱子出现
	ON_COLUMN_SHOW: "ON_COLUMN_SHOW",
	// 柱子消失
	ON_COLUMN_HIDDEN: "ON_COLUMN_HIDDEN",
	// 柱子碰撞判断
	ON_COLUMN_KNOCK: "ON_COLUMN_KNOCK",
	// 重新开始
	ON_GAME_RESTART: "ON_GAME_RESTART",
	// 分数刷新
	ON_SCORE: "ON_SCORE",
	// 销毁
	ON_DESTROY: "ON_DESTROY",
}

export const FLAG_MAP = [
	"万事如意",
	"鹏程万里",
	"一帆风顺",
	"锦绣前程",
	"百年好合",
	"长命百岁",
	"日进斗金",
	"相亲相爱",
	"一路平安",
	"安居乐业",
	"名列前茅",
	"天长地久",
	"出人头地",
	"飞黄腾达",
	"功成名就",
	"无忧无虑",
	"招财进宝",
	"茁壮成长",
	"登峰造极",
	"马到成功",
	"金榜题名",
	"旗开得胜",
	"万事大吉",
	"步步高升",
]

class GameData {
	score = 0
	data = {}
}
// game info
export const GAME_DATA = new GameData()