import createChart from './images/create-chart.png'
import game2048 from './images/2048-game.png'
import bomberMan from './images/bomber-man.png'
import canvasPoint from './images/canvas-point-shake.png'
import canvasRain from './images/canvas-rain.png'
import goldMan from './images/gold-man.png'
import marioGame from './images/mario-game.png'
import summary from './images/summary.png'
import whiteBlock from './images/white-block-game.png'
import toolbox from './images/tool-box.png'
import movieWeapp from './images/movie-weapp.png'
import management from './images/mini-app-management.png'
import chunFileLoad from './images/chunk-file-load.png'
import chunkFileLoadComponent from './images/chunk-file-load-component.png'
import reactUndo from './images/react-undo-component.png'
import chatDemo from './images/chat-demo.png'
import threeStudy from './images/threejs-study.png'
import jdCarousel from './images/jd-carousel.png'
import danmu from './images/danmu.png'
import widthCarousel from './images/width-carousel.png'
import minesweeper from './images/mine-sweeper.png'
import fuitAlliance from './images/fruit-alliance.png'

const internalUrl = (name: string) => `https://food-billboard.github.io/simple-practice/${name}/index.html`

const BASE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADZUlEQVR4Ae3B4Y0bVxaE0e+NGQgVSZUi69uZVUX2PBySbsEwsF7ZgH7snsP/vMWfzMzmP5iZxb/kxg9mZh/Hwd+wZ2bxL/iNl5nZx3EAi/Y79/s32u/c799ov3O/f6P9zv3+jbWG+/0+SU7+od/4NDP7OA5g0QbJtEEybZBMGyTTBsmsNdzv90ly8g+smdm2+VlJ+Bkzs/h045MkfpYkfsbMbGDd+MOiDZJpg2TaIJk2SOY8h7/DNpJpg2TaIJk2SKYNMzDDvvHSBsm0QTJtkEwbJNMGCMdxcFnA5rJoQxIgSKYNkmmDZNogmYQvN14k0wbJtEEybUhCMkB4OM+TywAnD8dxABsox3FwnicQJNMGybRBMm0A83DjpQ2SaYNk2iCZZDiOg8sCNpdFG87z5DgObPOjJEimDZJpg2QSvnzwIpk2SKYNkmnDZfG0eVo8bR6O4+A8T/be7A1JeJBMGyTTBsm04e3GSxsk0wbJtEEyyfC0eVrABjZPC5s/zAx7b6A8tEEybZBMGyST8OXGi2TaIJk2SKYNEJ4WsGmDc/IWh70FLNpgG1hAeJBMGyTTBsm0AczDBy9tkEwbJNMGyVw2bXHC8DY4oS2wuWze2iCZNkimDZJ5++BFMm2QTBsk04bLwgmxGT7NAQwwJAEWf0UybZBMGyTThrcPXtogmTZIpg2SuWweJBEbZsEAs5nh0+ayeGuDZNogmTZI5u2DF8m0QTJtkEwbLouHtiThy/CDxWXzJpk2SKYNkmnD2wcvbZBMGyTTBslcNgPYYubgyxzAydPmr7RBMm2QTBsk8/bBi2TaIJk2SKYNl4Vt4OTLDHACQ2JgcVm8SaYNkmmDZNrw9sFLGyTTBsm0QTKXjSQSAwsYYEiCJGBz2by1QTJtkEwbJPN240UybZBMGyTTBghPC9hIYu8NLGBzWUD4M8m0QTJtkEwbwDx88NIGybRBMm2QzGXztHjaPC2eNm9rLWzz0AbJtEEybZDM240XybRBMm2QTBsgtOUSoFwClB8lQTJtkEwbJNMGybQBzMONlzZIpg2SaYNkbP5rkmmDZNogmTZIpg2SSfhy40UybZBMGyTThr1NGyTTBsm0QTJtkEwbJNMGybRBMm2QTBsk0wbJtAHMw5qZDcOvMAOLp82vsfi/X+13k89g6r2xEdsAAAAASUVORK5CYII="

export const PACKAGE_MAP = [
  {
    label: '2048小游戏',
    description: '一个简单的2048小游戏',
    date: '2018-07-22',
    image: game2048,
    key: '2048',
    url: internalUrl('2048-game'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/2048-game'
  },
  {
    label: '炸弹人小游戏',
    description: '仿照儿时FC小霸王游戏机的炸弹人游戏',
    date: '2022-11-18',
    image: bomberMan,
    key: 'bomber-man',
    url: internalUrl('bomber-man'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/bomber-man'
  },
  {
    label: 'canvas漂浮动画',
    description: '一个使用canvas绘图实现的漂浮动画demo',
    date: '2018-12-12',
    image: canvasPoint,
    key: 'canvas-point-shake',
    url: internalUrl('canvas-point-shake'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/canvas-point-shake'
  },
  {
    label: 'canvas雨滴',
    description: '一个使用canvas绘图实现的雨滴特效demo',
    date: '2018-12-12',
    image: canvasRain,
    key: 'canvas-rain',
    url: internalUrl('canvas-rain'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/canvas-rain'
  },
  {
    label: '轮播改宽型',
    description: '简单的轮播图-改动图片宽度',
    date: '2018-05-01',
    image: widthCarousel,
    key: 'change-width-carousel',
    url: internalUrl('change-width-carousel'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/change-width-carousel'
  },
  {
    label: '弹幕',
    description: '一个简单的发送弹幕效果',
    date: '2018-05-03',
    image: danmu,
    key: 'danmu-demo',
    url: internalUrl('danmu-demo'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/danmu-demo'
  },
  {
    label: '黄金矿工',
    description: '基于canvas实现的黄金矿工游戏（有点辣鸡）',
    date: '2018-11-01',
    image: goldMan,
    key: 'gold-man',
    url: internalUrl('gold-man'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/gold-man'
  },
  {
    label: '京东轮播图',
    description: '一个渐隐渐显的轮播图demo',
    date: '2018-03-15',
    image: jdCarousel,
    key: 'jd-carousel',
    url: internalUrl('jd-carousel'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/jd-carousel'
  },
  {
    label: '超级玛丽',
    description: '基于canvas实现的超级玛丽游戏（有点辣鸡）',
    date: '2018-12-21',
    image: marioGame,
    key: 'mario-demo-game',
    url: internalUrl('mario-demo-game'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/mario-demo-game'
  },
  {
    label: '扫雷游戏',
    description: '一开始学习javascript时实现的一个简单的扫雷小游戏',
    date: '2017-07-08',
    image: minesweeper,
    key: 'minesweeper-game',
    url: internalUrl('minesweeper-game'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/minesweeper-game'
  },
  {
    label: '我与2022的自己的对话',
    description: '一个手绘风格的简单聊天对话框',
    date: '2022-12-20',
    image: summary,
    key: 'summary',
    url: internalUrl('summary'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/summary'
  },
  {
    label: '水果联盟',
    description: '游戏厅里看到的一款有趣的投球连线游戏',
    date: '2023-02-08',
    image: fuitAlliance,
    key: 'fruit-alliance',
    url: internalUrl('fruit-alliance'),
    development: true,
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/fruit-alliance'
  },
  {
    label: '别踩白块儿',
    description: '一个简单的别踩白块儿小游戏',
    date: '2018-06-20',
    image: whiteBlock,
    key: 'white-block-game',
    url: internalUrl('white-block-game'),
    code: 'https://github.com/food-billboard/simple-practice/tree/master/packages/white-block-game'
  },
  {
    label: '可视化大屏设计器',
    description: '基于Echarts的可视化数据大屏设计器（包含设计、预览、分享等全部流程）。',
    date: '2023-01-19',
    image: createChart,
    key: 'create-chart',
    url: 'http://47.97.27.23/api/backend/screen/index.html#/',
    code: 'https://github.com/food-billboard/create-chart',
    development: true 
  },
  {
    label: '可视化大屏设计器（静态版）',
    description: '可视化大屏设计器的纯前端版本，无后端交互。',
    date: '2023-01-19',
    image: createChart,
    key: 'create-chart-static',
    url: 'https://food-billboard.github.io/create-chart/index.html#/',
    development: true,
    code: 'https://github.com/food-billboard/create-chart'
  },
  {
    label: '后台服务',
    description: `后台服务供应了其他项目中需要用到数据的服务接口。  
    项目使用Node + Koa + MongoDB。  
    其中存在简单的增删改查，以及文件上传，登录注册等`,
    date: '2023-01-18',
    image: BASE_ICON,
    key: 'node-server',
    code: 'https://github.com/food-billboard/node-server',
    development: true,
  },
  {
    label: '工具箱',
    description: '一个使用相关类库完成的各类实用工具的网站。 其中包括 图片主题色获取、视频转gif、文件MD5获取等等',
    date: '2022-11-30',
    image: toolbox,
    key: 'tool-box',
    url: 'http://47.97.27.23/api/backend/tool-box/index.html',
    development: true,
    code: 'https://github.com/food-billboard/tool-box',
  },
  {
    label: '管理后台',
    description: '一个对相关项目的数据的一个综合的管理平台。其中包括：聊天Demo、数据可视化大屏、电影推荐h5。',
    date: '2022-10-04',
    image: management,
    key: 'manage',
    url: 'http://47.97.27.23/api/backend/index.html',
    development: true,
    code: 'https://github.com/food-billboard/mini-app-management',
  },
  {
    label: '电影推荐h5',
    description: '记录一些自己看过的电影的手机网站',
    date: '2022-08-08',
    image: movieWeapp,
    key: 'movie-weapp',
    url: 'http://47.97.27.23/api/backend/moviet5/index.html',
    development: true,
    code: 'https://github.com/food-billboard/movie-weapp',
  },
  {
    label: '文件分片上传类库',
    description: '文件分片上传的自实现，功能相对简单，实现了在各个存在es6相关模块API的兼容。（比如小程序）',
    date: '2022-03-01',
    image: chunFileLoad,
    key: 'chunk-file-load',
    url: 'https://food-billboard.github.io/chunk-file-load',
    code: 'https://github.com/food-billboard/chunk-file-load',
  },
  {
    label: 'React分片上传组件',
    description: '基于上面的类库实现的React组件。',
    date: '2022-01-20',
    image: chunkFileLoadComponent,
    key: 'chunk-file-load-component',
    url: 'https://food-billboard.github.io/chunk-file-load-component/#/',
    code: 'https://github.com/food-billboard/chunk-file-load-component',
  },
  {
    label: 'React状态控制类库',
    description: `控制React组件的工具，可以对组件的状态进行前进、后退等操作。 
    支持class和hook组件。  
    并且对class组件的状态可以选择全量控制或部分控制。`,
    date: '2022-01-05',
    image: reactUndo,
    key: 'react-undo-component',
    url: 'https://food-billboard.github.io/react-undo-component/#/',
    code: 'https://github.com/food-billboard/react-undo-component',
  },
  {
    label: '简易聊天室',
    description: `基于socket.io实现的简单聊天室，后台使用的是上面的后台服务。  
    功能包含群聊和单聊。  
    可以添加、删除好友。`,
    date: '2021-11-18',
    image: chatDemo,
    key: 'chat-demo',
    url: 'http://47.97.27.23/api/backend/communicate/index.html',
    code: 'https://github.com/food-billboard/chat-demo',
  },
  {
    label: 'three.js学习',
    description: '此项目是本人在学习three.js过程中，写得一些简单的Demo。',
    date: '2021-11-22',
    image: threeStudy,
    key: 'threejs-study',
    url: 'http://47.97.27.23/api/backend/threejs-study/base/index',
    code: 'https://github.com/food-billboard/threejs-study-demo',
  },
]

// 我的项目图标
export const MY_PROJECT_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABQ0lEQVR4AcXBAW6DMBBFwedo78XezH9vtj6ZS5pURSgECoTOFN6Q1DmZpMKEsUBSd3fOMgwDEcGoA4WnGy9I6u7OWYZhICJ4xZiR1GutnCkiWGJMSOq1VlprXMVYkJkcVWultcY7xgJJHCNqZZXxVme/YIsbazofZWxWWNbZy1hT+CaJWitzpRSOMHYoJfglIHgQ0PkLYwcJaq3MlSL+ythIEpK4k8RZjM06v4KzGDtIQhJnMHbpnMVYJCD4NGNB75UrGAtaa5xNEpIYdUaSijETEXyCJCRx5+5kJqNuTEjiUyRx5+5kJj+MkaTOBdydzGTKJPVaK1eICOaMp9Ya/8E4IDPZwt1ZYsz44NxlS9ZIYovMZIkxFzw4qzKTVzITd2cLYyY9OcrdWSOJUbnxDyQxKoyMUURwFUmMCk+Fh851ChNfhxx7+xF1KZkAAAAASUVORK5CYII="
// 色调修改图标
export const THEME_CHANGE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEO0lEQVR4AcXB0WFUyQFE0duCQIZIqhSJlMnrjkSzmVRlso6k/QaEGbRCi9cfPof/t8HHNh8b/I8G79uckiCJ97TFNq8G/9An/mqfmHNyuVxoy+XyhfaRy+UL7SOXyxf+9a9nnp+fuVyuJExg8Q888LN9oi0waItk2iCZNkimDZK5OQ6Yk5vNf2dzGvywT7RFMm2QDGPznqZIpg2SWQvm5GbwezanB96QTBsk0wb24D2yWGMimTb8Uw98s5Nw0wbJtEEyjM1H2iAZO8zJzebv7RM3D7ySRFsk0wbJtIE9WCzec3AQhzZI5jftE2MMbh64I5k2SKYNkmnDsSeLxWJxb7G4kUwbjgPm5GbzgTEG333mThsk0wbJtEEybTi2acPy4t6xJ22QTBvAfGDzs/EJ2CfaIpk2WGYtuD5deWyQTBskMx4nTy/PjMfJ08szbZBMGyQzRrhcriRMYPHDPrHW4jSAxemBV5Jpg2VYwAEssMxYIJk2SKYNkmmDZNogmTZIxg5zcrP5Zp8YY3Aa3HngVRskwwIOYAEHsIADxgLJtEEybZBMGyTTBsm0QTJ2mJObfWKMwWnwxmdeSWYs4AAWcAALOIDFV22QTBsk0wbJtOFmLU4mARvm5LQZY/Arn3nVBjAs4AAWcACLr+IgmTZIpg2SacNNYubkjoENDOac3Mw5NzC488ArycThq8U3i6/iIJk2SKYNkmmDZBIzJzcDGHy1gcF3tpmTm82dB161QTJx2AfEYR8QB8m0QTJtkEwbJNOGNzZsYHAanGxzY4c5udm8euCVZNogmTZIpg2yYYBs2iCZNkimDZK5s2EDg9PgjmTe8wmYJ9pHJNMGybRBNvf+uF4Zj0EybZBMG56erowBCafFafDNToJk2iCZMcLlciVhAusTsE7z5eVKGyTTBtm8VeDp5UobJNMGybTh6enKGJBwM4GZBMm0QTJtkEwLCTfrM6/aIJk2SOY9B7AGHNu0QTJtkEwbjsPYQTJtkEwbJNMGybQBzHcPvJJMGyTThsX7DmANkEwbJNMGybRBMm2QTBsk0wbJtEEy9z7xzVqL+fJypQ2SGY/hj+sV88MCChwb2iCZNthircn1euHx8RHJtEEybZBMGyTThj//vJJwsz7zk400aINkSFg23zlBMm2QzBibt2wBk71NGyTTBsm0QTIJ//GJH9Zpzrm5XL7QBsmMx/D0cmU8Bsm0QTJjbH7NrDV4eXmmDZJpg2TW4quEm/XAz8YJ2EimDZJpg2TaIJk2/I42SKYNkmnDzZzcDE4P/NU4ARvJtEEybZBMGyQDi/ctYJEYybRBMm1IzFuDX9tzTo5j0gbJtEEybZDMGJO39p60QTJtkEwbEnMzJzeDV4OPbU5zgh0k0wbJtEEybZBMGyTTBsm0ITHfzcl3gzuDj23emJPfNif3Bu8Y/Nrmm8HPNr9v8Df+DcUVxNOyoGVGAAAAAElFTkSuQmCC"
// 我的blog图标
export const MY_BLOG_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLElEQVR4AcXBAXYiORBEwZ9M3wvdrFInm9LJaiWgZ1kG8wx47Qi+QPEG8Q67WGwm8YJfvMquiqC3BhJkGug86cAbxB12AQUUn3DgDcVfiqUKqpgKKB7YeIP4i7CZiqWKE6k4EzfEK+wiggLE1DsnNpPY2cUSwYnEhbgQz7KLCAoQF73zh80krtnFEsGJxIV+8Qy7iKAAAQV0ptZgDE5ag0wDnV1mJ7MjmTHg92/onalvPKt3xJm4YfOQLeziiniRTUXwh8QiHrGLCJCYxLTxIhsBZbMTLxDfxS4iQGISFwd+mPgOdhEBEpO4cuCHif+bXVyzmcTFxh22iy9ipghOemexXUy22fhAa40vkQkSH9m4YbsigjEGmck9tslMdpnJrrXGtWyNtLnVWmPZ+EBmEhHcY5tdZhJhoADRu7nHNpnJLjNZDlyxXRHBGINd7x1J7CRhm/8qQEARYSKCCBMRRJiIYMlMbh24IzOJCHZVIIlbmUlEAAIKEFCAgAIEFCCuZSa7Axe2KyIYY3CttUbvpgokYZvWGv8SUICAAgQUIKAAIYFtWmvc2riRmUQEu+PxyNK7qTKSyUwW29hM4kyciTNxKzNZbDNJTLYrIhhj0FrjI7aJMBJkJktm8hmtNZbMZLHNJDHZrohgjMGSmTwSNgIyk2dkJottJjFttisiGGOwa63xSAfM19i4OB6PfNaximf13llsM4mLjWmMwU/ZmDKT72CbSVzZbPOT/gFj0Qxbp9VeWgAAAABJRU5ErkJggg=="
// 我的github图标
export const MY_GITHUB_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABoklEQVR4AcXBgXXaQBBAwb96Kkyd3d/ORGUbgbA5OOwYiMMM7xa8prgWPCh4Xm3oRQSb4AHB84rvBT8QPKfoqBypbIIHzLxoXVdeETyv1nXlw7IsbIIHTbxgXVfWdeUVweOKT3JNOsEPTDymQECqipFUFSCb4loBxY2JXyObYlcFFCdFZ+YpAo2qxq3D4cCFgFXsktHEzxXIz8hOil0CchJ0Jv6hw+HAPQnISXBjVouOGmrRUUPlQo4yk96yLFwISCDfmdk05ZNWU65oNaWXQFN6qSzLwjXZyT0TnWSUjJJRMgiQnXwl1OIXqAEUu+ALM2dN6aXSlF4qTeml0pReKmfBX0zckYySUTJKHhNq8Z+pwdnMpikfUmlKL5Wm9FJpSi+VpvRSacoVLTXYTHSSUTJKRskoGSXXQi3eaOasKb1UmtJLpSm9VJrSS6UpvVSa0ktl4o5klIySUTJKRsku1OKNZjZN+ZBKU3qpNKWXSlN6qTSll0pTeqk0JZWJTchJMkp2IZ9CBskouQg5Sa6FWiJHIt8RORJ5lIjIrUCKN5p4sz9Q3sORDnvLnAAAAABJRU5ErkJggg=="
// 开始图标
export const START_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhElEQVR4Ad3BAW7bRgAEwFlC/9b55VtFJ4SkRcqOoaBoZ/zbYq+In6nX4sDiXJ2rVVFfK+qTxV5MtVdTUav6c7WxOBdTfcNAURsDw81wZrFRaoq9WAWxUVy9MAbDocWJUlOs4qbUmyw2QtyU2ih1U1rqjRYnQtyU+osu9oqE2AjxEOLAB4ZPhofBGI7EXhFTEceKoH4mHi72Yqq9IqhTA1dT/NK6+/hgDIcW52KqLxVXZ65XWocWO60p9mIVxJssTrWmWMVd600WO4m71k7rrqX1RhenEnetb/nAsJW4G4Pr1aGLvSIkdhK/JZ7EK2MwhkOLc3WX+C0x1Ztc7MVUe0VQr8WxOnFxLqb6WrwWU/1Arer/rqaaaqpVUauipqKmoqaiKIp6WDyrvSKmIlZF7AVF7AUxxcPiWbxWxLGgjtWBxdeCoqagVkVMNQVFrOK/oKaaaqpVTUXtFbWqqaaiNhbfV8+CmoogqHOxsXhWx4L6c7UKamPxLM7FXhFTUBSxilV98g9Y7JORWOFW2QAAAABJRU5ErkJggg=="

export const APP_MAP = [
  {
    title: 'my project',
    icon: MY_PROJECT_ICON,
    key: 'project',
  },
  {
    title: 'my blog',
    icon: MY_BLOG_ICON,
    key: 'blog',
    url: 'https://food-billboard.github.io/'
  },
  {
    title: 'my github',
    icon: MY_GITHUB_ICON,
    key: 'github',
    url: 'https://github.com/food-billboard'
  }
]