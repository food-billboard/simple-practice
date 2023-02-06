
// constants
const Container = document.querySelector('#app')
const Canvas = document.querySelector('#canvas canvas')

const ContainerWidth = Container.clientWidth
const ContainerHeight = Container.clientHeight

// ------------images------------

// 测试图片
const TEST_IMAGE = "data:image/jpeg;base64,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" 
const ANOTHER_TEST_IMAGE = "data:image/jpeg;base64,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"
// 九宫格图片
const GRID_IMAGES = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAgVBMVEUAAAC/v7+/v7+/v7+/v7+/v7/AwMC/v7+/v7+/v7/AwMC/v7+/v7/AwMC/v7+/v7+/v7+/v7/BwcG/v7+/v7+/v7+/v7+/v7/AwMDAwMC9vb2+vr6/v7+6urrAwMC/v7/AwMC/v7+/v7+/v7/Gxsa/v7+9vb2/v7/b29u/v7++vr6cwWT9AAAAKXRSTlMAIenXiX/3lk/s37+qMBm5kkI7I/zz3NDLjmhcNBHDnnJhRyoSrKIUB6X+iTQAAAFBSURBVEjH5dTXbsMwDAXQ6yGveMRx9mqapuP6/z+wsQsnKEQx8Wt7XgwZIikJlPAfTCcYK+AbxinIV4yzJV8wTkUGGMWbkzxjjJBXeR+ce3DaT8I9UKDjs1N2h02DMvZ3EMXkFH3umj1zLbKgSQJWkB1WpB8w9zYZf2SbDZmTTOCQkEzZafmLD5eGDu7m+cr6/O2TIWbfrSylyACxHXbm+wwxZVPUUQbLklFFlySQWi6kYiE29oyaVrw+ETUZBKlSglxBsKDGh4Cadg5bSV0pnZhuBsuOup30pui2sNTU1bB47A29b4082KiTX2FNAEEoLOv+J4TAEyfftyJZ062CKBlyt1aleQPZygoYxh9w+Iy0zpcVahfLGqlO1EBzWA97vn3XBzxwSvvJQ0B6wmOXcHmrsgwveE5h4qN/jE2BP+4b3JSRk0KKAk4AAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAh1BMVEUAAAC/v7+/v7+/v7+/v7+/v7+7u7u/v7/AwMC/v7++vr6+vr7AwMC/v7+/v7+/v7/AwMDAwMC/v7+/v7+/v7/AwMC/v7/AwMC/v7/AwMDAwMC/v7+/v7/BwcG/v7/BwcGzs7O/v7+9vb2+vr6/v7++vr7AwMC9vb2/v7+9vb3CwsK/v7/AwMBSaFvqAAAAK3RSTlMA+Pz08OEK58PKFuXY0LKgM+u0ihD23b3UrXx3YFc7KAVKHqebknFtaCMqIckIdQAAAcxJREFUSMftldl2qjAARZuEUUArVnHWDrfD3fn/7yshhOKqprD62v3gAyubk5wkcvfHVRb/xhrv8D7OOBdQnEcpbwjB2xgjWhMo1tEI5RUR1M7rcOMhx6SQPwxWdliF3eCQDE2wBLKhMVtqlFHYDjMmqlEEJmsySNlgEALD8w+vPx62s2ROXyFOZtvD8XtYdNi9VCEtq0aR1AS0hNXL7tDf2hSDpiVxSk5L41P0lOTijai0VnTP0FZJe8qpIEOCUjZplSPr33Z80AiC4tRfzEdKZvJdWBFLYoFGBSCskX5cFvCUuIktmz1JtMzk3C0CXT95+tZwgugWq9xYhySZXNmVCuk6a+azkj2jmlw9jSUtaV4vWUhRhc4ob5zPaNq0VQAxgZXXGKY37+d5g8IgjLS0254KNr4/jrk9AlLWCkG7mLVHMIph3qR0hD4jsnVRk0HXeuRR7unImjg7tXuPskeDalJCvk733qMs7LSc4qa28CglDmfGUkPpUUK0DnC4HBn6Clsq19Js1t3HkMhTmLDrZXOq74OVYp17Ktu3F2zaDjkZSamAvacwYYRjL3f2Q2Ulmunj5bPjM+jSk+KEPo9TPJ/a/zdqufvjN3wCZVNmcAJ+nYMAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAilBMVEUAAAC/v7+/v7/AwMC/v7++vr6/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7/AwMDAwMC/v7/CwsLAwMC/v7+/v7+/v7++vr7BwcG/v7/AwMC/v7/AwMC/v7+/v7+5ubm/v7/AwMC/v7/AwMC/v7/AwMC+vr6/v7+4uLi/v7/BwcG+vr6/v7++vr6/v79dp86wAAAALXRSTlMAf+22qo369dvJ5uCuo4VhNCnUiXVtOhqzm5dQTEcRwbt4aFtWJx4Izj8vj2bZbpAxAAABWUlEQVRIx+3U2XKCMBhA4YRF9lVxQ9ytS3ve//Vaq1bTAoaZXvrdZs6EkB/Ei5bMzLomFrJjccLZd0z62B2LBH/UrVjBVnSws11wZkJPyYUDoWZSeT0wIACOQtM+fUswACKhb4DP2VA/MTE4m2gXbxgOZ26He19yMddNXEzodJgt7oGLRK+Ye0Rc2bqfiWdyZSorTWMag+TGEg8kQVFXrEEuqH2wKAdrV3PvyAk/CnUtBD9Rg2oBUnJXKssG5hK8OL1f+hTcrcUD9cAfEEwDIJfrsirsMHdwppVSeEKVA5NBZHCTx8O+wyOpFllqAHhxEU/GZmQXWdb3UaVKIfHDHt/8ryCeWgt+GwuFAfRoN1OTkKfGf4cPjU0UO5o0D/6RVlLUkLRYilobGr2LBkO37kX3CDai0SisCbBHok3aD1C3sobP/8HJ2OXmsEqFnvmpHKzWm1kmXv7FJ43Vakw//8qTAAAAAElFTkSuQmCC',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAflBMVEUAAAC/v7/AwMC/v7+/v7+/v7+/v7++vr6+vr7AwMDAwMC/v7/AwMC/v7+/v7+/v7+/v7+/v7+/v7/AwMC+vr7AwMC+vr7AwMC/v7/AwMC/v7/Dw8O/v7+/v7/AwMC+vr7CwsK/v7/AwMC+vr6+vr7CwsK+vr65ubm/v7++vr7QbbWHAAAAKHRSTlMAf/ny2oXj0zS5tKb17eC/lW1jYD8iGOjMjUcHn5yKZyooenlORycLiACVewAAAQNJREFUSMft0cdyhDAQBNAhCAQsOcNGx/b//6CNS9LKBBUX33gnimHoLokOh8N/syZperYMzmlqTcRKgN0CsXLBjy8YqA8ushh2k8UKmGklCrEybLZaDAaxMuoT8/JIQoRf9laIGoUkFfKVmY2cpBon7HBCTUomYjbCHDHM6OnhiGHiYsH15eaDNExW63rM9LGsxUjXqL+3N+ZqCezVUc8N/fEGxef38hoFQXQt79x/HjenmZt2G05YVk1TFWGs3XFFCy8wymlFBSRY1QIlraoDxB4WvBgdpw0js+HNkhIPNvukbTyaftuqgOm8I05mQ+9D07F32uEjz0Lfcfwwy2s6HHTf6YRtmv+W23MAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAh1BMVEUAAAC/v7+/v7+/v7/BwcHAwMC/v7+/v7+/v7+/v7+/v7++vr6+vr6+vr6/v7+/v7+/v7/AwMC/v7/AwMC/v7+/v7+/v7+/v7/AwMDBwcGzs7O/v7/AwMC/v7+/v7+/v7/BwcG/v7/AwMDAwMC/v7+/v7+/v7+/v7+/v7+/v7+9vb28vLy/v78vMbeGAAAALHRSTlMAQO/MELOvpI95b2c1Hvh/WxXY1dDHqkooCQXq38S/lmJWRLqZhWBMMJuLLnAVVIQAAAEwSURBVEjH7dPJVoNAEEDRAgzzPEMSM5hJff//fbrT09CNHLe5+3eqqabl6d9eVheJje1a64a4AO7KWUlmUyvNclTjrt6BzYrvKbpjkIUXmjzMgmO3fMDbBoWXG4PIAbYo6khfeODsmbHRFS0cKmY188Ur5BUa3lxxAHHRyqbFHfwMg/sk2VD1NgrjCs5wOmCQclZvBE9KjK5K4pMXmO0nG36xWKAkFXJamdhIuDJJGQLMUiUp+TxhVk5usosxe1OSK8cBM09JbgTiYOQrSUwjPkbR9LXEFibloCYh7+aTBaIqdpwj9HaFTIRsTGNCmRod2hwdZ5QZ8Zb2g3lpL7M6qH1m9aJhNdDumLBj0Rp82Dq2UriFmMQXgJQfniVL+mD/6++NEvmTMXlY3x7JKE+qL54am09L6hnyAAAAAElFTkSuQmCC',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAeFBMVEUAAAC/v7+/v7+/v7/AwMC/v7/AwMDAwMC/v7++vr6/v7/AwMDAwMDAwMDAwMC+vr7AwMDAwMDAwMDAwMC/v7/CwsK+vr65ubnAwMC/v7+/v7+/v7++vr6+vr7AwMC+vr69vb25ubm/v7+/v7+9vb28vLy/v7/AwMD39g5GAAAAJnRSTlMApvv28OGQ5cyVdGZaTDgsz7qbgGAhFQvp1sO1ropsQz4OCN5GJugv4K8AAADtSURBVEjH7dXHFoIwEIXhEBKaghV7L5f3f0MXHuVoJhc4LuXbuPodM1JU7z8sh9PxZn9sH5wjPNlBy+IU422ybJUMUVuXTd+fjldhaOxrjJ4pLluhZowN5hce3Cw+BQvFHeC4FvxHQaCPdEmicOQtSg1Z4k0m8PFtuYCX9qxtB3QdE5JkLRZ3MOLSBmDmUhKB2UtJACbonmylJIWoIlP48SMpGYE5dP4rUYjJlhSxEuX0KLLEWRW9XviYqfKJnCHPz3ihut6XOXtyb1C5B+JP8csOqNzrnsu+RiSFalSmuq5s1v7lZQCTpLnq/e4Bg3FyNbkBh6UAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAh1BMVEUAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7/AwMC/v7+/v7/AwMC/v7+/v7+/v7/CwsLAwMC/v7/AwMDAwMC/v7+/v7+/v7/BwcHBwcG/v7+9vb3BwcG+vr7Ly8u1tbXAwMDAwMC+vr7AwMC/v7++vr6+vr7AwMC/v7+/v7++vr4t8lTaAAAAK3RSTlMAcJvu25VhMvjp4NHNuIBpTUEp+tTJs6+MelJGNyMZFQ0I8b+kcV1aPKUsuNmmKAAAASpJREFUSMft1VtzgjAQhuEtlQKCiCIH5eCpWtuP///7StphhqZLNly3zwV680oyuIH+gu3L7GKHembiACuyVZQJkYdev7TKzTdyAiDf3FTiHh0AFskzepG6ZAt19eTkFYOvOCDZGj84ZCHCtw7MungHtaAU8FWxJyt1pjai9r60/wsc3Ch5wFmfyMZ5e38auVd1KwSFj1/C/Xm6aJZgLTzjk+cdiXfFpIIvTikGHfSvDzaJYVCyybv20934LhGbrGDgs4kLgx2bbKCThyAYbUR9jHmGgeS5NOECzXCvoJlKSjCESQvACg2DcwPLOJwLJhCO2jcwKjIK5aco3+byQYIMmlg+kPS512dYnoE1yRKMXclGjpHEKmm4ZcmvY2XWMd7GS/hpGLf0T/cJN1V3Stgf5LEAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAhFBMVEUAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7/AwMC+vr6/v7+/v7/AwMDAwMDAwMC/v7/AwMDFxcW/v7+/v7+/v7/AwMDAwMDAwMDAwMC/v7+/v7+/v7+/v7/ExMTAwMC/v7/AwMDAwMC/v7+/v7/AwMDCwsLAwMC/v7++vr7tOBD/AAAAKnRSTlMAv/t/8t/T0OpLNOZxQu7Xw6yMWxH49cu4spNmOiYgGgjOpJ6bfWFVKn4imSQwAAABaklEQVRIx93V2XKCMBiG4T8hAWQRRNyXutd+uf/7K04zBUNCOG2fcfQ/eYXEMNIfNnkQHYIgoDHymmjOABQApmO+XQJSIF5yNFhGftcwYkwu0AgnNCTJJjW9KAZN3sjtVKUAFpu8mcVvEs3cxSegoF5vV6K4REO9kvVA0cpIlkrPDK61fMToyItSXwQoV45ki65oFbYzcvtWLdClIqn0yBmO1tvSt9HiPx/xWcJ+WgqYOASQCgVIawIbvhF6SvsFU7BoN6B/awFaqjPydjb3bAavu5Gk8DobyRReoZGE8DJP8wUKHnPzp+d4p2AoyHSHR0I9O+Mi+mVfiZbwtwKqOzuesX0IpwvZ1QKw78KSXFLXjglnsnElkTOpXEnmTI5LezOtyenhPCtuW4W+3VBximFSIqEhT8tahgs69AL+JI/QPI4R+ezNJzojr9M8iNFxpDF2ndVUZPD+aaxprC9d3Gi8Q7BesWpP/943X7mbHNdJk6wAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAh1BMVEUAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+8vLy4uLi/v7+/v7/AwMC/v7++vr6/v7/AwMC/v7/AwMC/v7+/v7++vr7AwMDAwMC/v7++vr6/v7++vr7AwMC/v7+/v7/AwMC/v7+/v7/AwMDAwMC/v7+/v7++vr68vLy/v7+/v7/IyMi/v7++vr5S6TtXAAAAK3RSTlMAsEnY9IqXkSYIt4VhVS0V+L+8s390aVpPPTQb7OHd2NDNyMOsp0Uen3wOLDK3mQAAAQ9JREFUSMft1VtTgzAQBeBTEu5guRS0tNXW3tTD//99OkynYkNIeHJ0+j3xskN2s2eCv2mOqRJYelpdPtwKtl797kAeH2DrkSIFZnyGvYhME/KAzsrwg6DrhpSCfMe89nahuZFdHECQXypvTQGzkMzcY1ciSBnYNU8KXtQYFyy86BifDrxa7/M8n43O2ilIZuzb1DBY8CfZAFY17bUkgQWfPcJqZ7Yt+1xzQiRvRKbrl1SUxoVUxaPp4qAAeoIK0wg4aCxrS2roUxZTYwmdGTWce8lvlrjTr/JEjfPktdxA74WDfOglLRUtx5+mrSlhqjCjosC4s+SN/QcMwkJp3Sz9npt8a2DJ8cvSq9IG/90nu615kcUOEMoAAAAASUVORK5CYII='
]
// 火龙果 杨桃 香蕉 西瓜 苹果 橙子 草莓 葡萄 菠萝
const GRID_IMAGES_ACTIVE = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAB71BMVEUAAACMxz+Mxj+8D1KMxj+Mxj+Nxz6Mxz66AEjJH12Nxz7OKWKMxj/IH12Mxj+Lxj66AE2Mxj2+AEq4cVnGGVmLxT+silLCFFbLJmDFGVnRHmmNxz7OKGG5AEuNxz69Bk+7AEy+BFHHHlvIIWCMyECLxj7LHlqLxD+MxkDLI1/KIGCpilDMJ2Ckj0yapEeMxj7NPGSRukGNxz/jNH+vdlLGP17PK2OMxj/IH12Mxj+ZpUXKIV+goEuMxz/GHVuljEzFGVqTs0KYsUSMxT+Mxz6/DVaNxz7NKGCOxkKPzD2Pv0CS20nVOmv///+Mxj//UKC/v7/mQoDIUmO9aVyAgIDfP3fMS2W2dljm5ub/e7j+T57vR4vDXWCxgFXf39+fn5/TNGhAQED//P3/6fP/3u3/yeL/s9b/p8/Ozs60tLT/b7H/ZKv/WaX/WKT/U6L6TZr2S5TsRojoRIPZPHDRQWnPR2fKT2RaWlqjmk3u7u7Z2dnJycnFxcXTPWnNSWa6b1quhVOVtET/0ubj4+P/zOP/w9//vtzV1dWxsbGqqqr6TZuZmZnzSpDtQ4njQnxwcHDVKWzRMGbQLmTBYl6+Zl2eokqgl0pISEibq0eSukPPRWfIRmFgYGDASly/UVuojlGnkU+TtkSQv0EjIyMGBgZFTZacAAAATHRSTlMAqpQg1r9/IRKMM/74699fMCsj/vbq6dzYy8OelZWKh39yZV1QR0RBPDsY/vf09PHu7Orn5eHd29HPzsq6urm4opCKbVJQTk0bGRAHX+DgqQAAAu5JREFUSMflk2dTGlEUhi9CsBtj19i7pvfee3LOvQhGFASx965g772X2NLbD81ZdmOc2d04fE0eZmCG3YfD+96z7H8g6ETAiomfCtAI4/xkgMqTA346QOUuxJoCM4JjAfbzAlIe9wHYDX7ZEPyXxCfSwxiTe0oAgL7vr6SyuZm9DIrX7oKu8iDGpd8uqARiwkxDLnBzronfY9q8vuWCBBM3GEOvgUSl7XroI9eOgXP+lOmQ2/eVX+b8DIC1jHhHeexQSUa8fk/7nO/ynYNRULCRBbuc6y/Pmyj+aXwAvGOg0A+E/bOOYg6jt+cXoXKC7jxU7LYysMIHs+aa5nFDIUsFGBune45gtXkBUllBRBRTcYNHPADCuz0KKl6YtFYunU9yF+hwTnOxC7nNNqDjDHCX5uMTQUdOadVsf5u0WSmKmkukHIn+Fn4zaX8P9ttayvkxOKTE6RAOZ4nyt8YBXFe1lIk/A7qE6KjoEKJLHmXthy9WpqYYvKN98giHaJypwZqZRuFQBpVZoVitFIHCmmibRRyqRsTZNrEGCkVqJQcUulrrkGhGoq61CxRy1Eo2yPSIBnR/REsVWkoRG0QPyGSrlXyQ6axAxCpssuCIBRErOkEmX60YlbZEvcWNzZJFWLBeKAdkZGo8cl2i1uJD3/BgNfqGqkqxVsileZgGSSDR3YZYjsQ0unGQPtu6QSJJSwkFiZUWOfnyIi5iORXQsgISoVqKcQsIZwuWr1PyhSZcH1mQFCcQW0amxR1/lnbKjPOIbjk+tvuz3GeaPPNIjVH8vcG94elq/Dm/TPH9jYXHMG1u0sVeUU/xh+n06UXUi1769iHTIeSsVBkdZVM1/ihFt/8opcIimS7R4TSms0GqeQjRR0pDJw0JNzJ9YuJoyWgt/YPKpbWkFYuTgugTkrwJzvY5uSyca3fCZnIIO4asSE+Jo3GKHrGpRkeJJzKLHU9IRuLG6hI9yEurG4kZqhF6NWSmpVxJScuMZv84vwBUeDNns/q6vQAAAABJRU5ErkJggg==',
  'data:image/png;base64,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',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAB8lBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgGAMMCQECAQAAAAAAAAAAAAAAAAD/tgD/tgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqHgAMCAD/tgAAAAACAQAEAwD/tgARDAAAAAAAAAAAAAAAAAD/tgAAAAD/twAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuIQC9hgD/tQAmGwCbbwB4VQD/tgD0rwD/tgAAAABwTwDEjQDrqAD/tgBGMgAZEwb/tQA9LAAAAADhoQBfRAD/twBvUQA5JwBeRQAAAACYZwBgQwD/tgAAAAAAAAD/zUD/tgCAWwC0kS0WEQQIBgD/yTXNpTP/xSZnUhr/vxdNPRP/vBH/ugodFgTsqABzUgBmSQD/zDz/xy5SQhQmHwkwJAWSaQP/twJ2VQKidAH7swC1gQCfcQCOZQBDMAArHwD/yzvluDmOciOAZyD/wR5uWRs8Lwz/uQlkSwlcRAeEXgLxrADwqwC/iACcbwBcQgBWPQBMNgDxwjzSqTX/yDK+mTCvjSypiCqigimjgSP/wR3utB2/kx3gqBaUcRWIZxBAMxDRmw8zKQ2AYAqpfAm5hQLgoADRlQDFjQC5hACsewDnmFOoAAAAWXRSTlMAf4r37qqONCnf2si1hWxoYlBMRhv+/N3VzLSwq4t4Vjs4JxcQ/u7n5uLTwby5p6SbmZaGdnVgWi8fB/r39uzr4+DOx8G5t7a1r66ioqKbmX9+dW9dRT0qC8WkhowAAAKCSURBVEjH7ZTVVxtREId3iRsQElyLuxcodXfX350lISGEJLi7Q9G6u/+f3T0USraB7p7DI9/LPsz9dubcmTvcPoowlhnVKjrwKo0GaBpVKlGIUmnEojBHnZEBZKo5n603A9o4haft2EADpCpUHBYNoAWKsAYHp5BGg7MOxwABFZxyDuJED4QeHFCuWHG8FYsrqFRsHIL2yCe8C7oTVfS9dCkeL2kduUoVM86SC03UjiyFRibMp8iNx7SIWGVGjgVXaBndjIaVDmY5ks+LNc0w+glrWMS5g2EDbtJgPJoYDUG3PcLDFB3JiAH4EhrBLBungfDCypMAXXaEvoOvomBATNJMvQj7ay0uAoWyG3GcEY0bRAJaGHsifuxh4XycKwWSbYa/Ta8GzJlpktE9wZiPxuCUFb1+8roJQBIfY3dE61OLNdBU3xWNYeApYx19P2CRlV0Mga7dqtBikyTbvfSjREPAC8aYl0LypWQ05IsOna65batMsV7VRxvvpxcQUS/QKhrjbcGAbPh5FF1KgPCQiAouXE6vqUorIZHvC0AXE5mmEaSEJ9GOAQkujK3QNr71u4EpyWjuG8xDnHx7LrQA7gBGB8RMEksD8y6gtUkyOtpIkCfhci147xElwBXoCfV+np8FNgQJyRCTyMgG3jBPSze2+DDpYRv46RciDX4W8LqDsUee51NdXTOTzybYH5rnaBmRtz4PfOlk/+Dtk5pZxkXkDtD+ViZ1+ikoAHpuB7IS4Qp99LKtkrw+GhyJh6l+l0ebCmD165zfN/3K528TpyV0GNA7ud0wRJmAhLzR1f7+9rVRNwDd/3fkgzprIjZJzjBwyshtsNdmxNTHGbl99oTf07rjKDOfWesAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABfVBMVEUAAAAAAAAAAAAAAgADCQIBAwAAAADyWoYAAAAAAAADBwEAAADyWocAAAAAAAAAAAAAAAAAAAALBAYAAAAAAAAAAAAAAAAlUhQ1Ex4AAAAgSBIECQItZRkIEQQAAADzWobzWoYAAAAAAAAAAADxWobyWYYAAADzW4YnVhUPIAgNHgcCBAERBgkxbhobPA4ycBsOHggvaRkfQxAwahkeChAOIAchDBMAAAALDQYAAAAAAAAzExs7FiAAAAAAAADyWoYAAABczjK1Q2QDBwEJBQ9FmiU9iyFTuy1AkCMnWBXVUHa3RGipP2CKM1BZyDBNripDGio0cxzXUHivQWKiPVyaOlqMNFJ7Lkl3LUZIoicxcBstZRghShINHgfpV4HmVYDESW6+R2u7RWqUOFaRNlSDMU11K0FayzFLHTFClCQ6hCAdQhAaOw4KFgUIEwXMTHFuKT1tKTxVIDZWwS9RtSxPsStLqSk9FyI4fR42eh4qXxcRCBMNBhEcPw8QJQlGLlhlAAAAP3RSTlMAf4jx7NNG27+4s5WMbWMiGAj9PTUyJ/36+Pf34+Pauaejn5yDYV8q+vb29PLo6OTi4ODf39jXzMvLqnloZk6k+2dmAAACBklEQVRIx+3T1VcbQRQG8CHuQgR3q7vbfDfZJIQY1hKFUqBAkbrL3947S0K3OUkOL7zl97A7uzvf3Dtzzoqurq7z1qM4HJM9HUw6HPq9HnHizJz1yBQSicQB3sc6eIcDnoSpRmP4RlTBV9nBIipEZTQa8+EHURK9C7Kt5V4kifrgq0dsOCTaBVb5W5Zzr7Z4sKqetjalXN9elnIF2CU6hK0eCSJORH/wWsoNbVHKPS0jN379XJcxbU/Kba0oZRE1IoojKOoeYZ8ojX5e98VLrrTGg1yOL2tZ7qnIr/qRVr07RYMPF9QaXKaNnN5HH7yiwY+hAlEViEneiVr+eUZVXOGBOpO3QJWoMAS/OOXGoF6ml79/0Him2tImXzKaavKKXmQQbvFP1KzOcAm4Y5exnUaVnSxXWpD2e8C82ok5KgxMuJTSMw88sonHoic+XoRJGAVG8ZuI5gHLk2m7PGWffnwZWCJ1oKMB8Z9nQEVl4oA1MjfjGR8bG/fMzIWtOEm8AcKiyVNgX2VqAMyu2VAgEPK5LABqyZOErcVfA3wnVj6GwXGZWBrwihZCwK0UsVL1KA4WP0p/IZa6BsyKlvxOWIbz1CQ/bMH9sGgjaBrAyM3PZPDp9ggGTEHRXmQCwI2rpUIqn08VStfvApiIiM5sJisMHpps4gyiXrfLajZbXW6vX3R1Gf0FLdu8HfrWaXoAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABYlBMVEUAAAAJBQ8JAw4IBBAIBQ8JBQ8JBA4JBA4JBQ8KBQ8JBA4QABAIBQ8JBQ4IBA4IBA8JBA8IBA8JAA8MAAwAAAAJBQ/5Pkj5PkgJBA4JBQ8JBQ8JBQ8JBQ8IBRAIBg76PkgLBRAGBgwICBAAAABeGSMKBg8JBQ/5PkcKBg/5PkgJBQ76P0gIBRD3PEgvChQZCRT6PkijKjMJBQ81DxnVNT9FEx0VCRKBIiz5PkgtDhcKBQ4rDBaFIizRMz5NFB8JBA36PEb4O0gICA/yQED/M035PkgJBQ/3EShFEx3bN0H5Jzf5N0NTFiDqOkT5Okb4GC25DSH4NEHMMz2eKTNkGiRmCxpvChpDCRUYCRIfBxL5MD74IDKBISt7ICr3EyluHSfqECfWEiayDSCKDB2CCxs0DxkSBhDlOUP3Kzu9Lzr5KjqvLDfxIjSRJS+QJS+0HCt7GybgDyWmDR9SChcmDBZKCRaBI2QCAAAARXRSTlMAz0pA8Neyr6VnNhCZkH96c0IZEwX31szHxL+4qmJbWS8pIAn+6t+ShXttamBA+/ju7uzp3czKxa6qoJSQi1pOMyciFArqgBIxAAACAklEQVRIx+2UV1vUQBSGJ2Fbsr3h4hYWly7Ye2/zTQJZd9m+AlIU7F3/v4NE1Ewmax5uea9y8z7fKXNCTjg2Ud/GmQAC4TF/IWFwwlGfQYkAlKjf6hSEfc8gAB/9ZNVyMrEYQ6GymEiW1exIYakIB5GKp6ApAC5Pb25sTQ9gbG1+7v7YBxRNbkSAa9df0V9YaFHO2vuvfSAkM0rA7XFqU2/ZHyusCxTcjdPAPW5YH+hffLTqK6y5j4ibEQPIDUpNwDCpjWkBJs9hQyREQwXiC5TT+g502twy33WAwRtKnzbYDqAKSgjBhxcOu9gY4Ded+mE77KU4gjRwf+6o9bZlAIbVtitcfc62zwkxGm9wnMrgMS8w71DiqDymUt4ytosJYcLZZbnyjLFtwKEEQSblyhpjTFAugZyVK6tuSh61BSrnQMkLhVUnR6QEhU2qDzzb/4KiQ5lH+Qn12suu8DKXkCSnpMr6wSrjDkXnm5qTKg3G+tDEa9GXPbpvIlhzKinEpJW9ZqzLC3eSmUVaskx+L03MZohACiEeI5nXN6SISE5BSdimfS09KDnigj6D0l2Xstb5SeaniCsqoNwRMhrNPmAbIukCcPPKv89+pwcEdCKlFgdmrl78U9Sn3hAIe//K9Rg45/cMzt4QnFtpMoqp1ASOKGqPyH+Ry1THONVMjpzg5CeZ6/qQDnmKwwAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABGlBMVEUAAADtYCFSvy7uYSLuYCDuYCHtYSHtXyLuYCDvXSBVuyrtYCH+fTztYCHtYCFRvy7tYCHtXyHsXyD4dDRRwC3uYCHsYCH4dDNRvy3uYCH/gT9SwC1TwC/tYCHtXiL/gD/lXhr+gED3cjP8eTv9fT79fDztYCH6dzdWvS9ssCx8qi3afjH+fj7tYCH9eztSvy5Svy7+fj3xaSf7ezv8fDvtYCFTwC3tYSLtYCD/f0HuYCL1bC/9eTb/gEDuXyL/gD5Uvi7sXyJRvi3/fT//gD3uXiFVwS7wZB9VuzPtWyT/gEDtYCFSvy7/fj7/czb/djj8eTnxZib5dDX4cjL9ezv/ejv0bC36dzbvYyT/fD3/dzjzaivhhDenky32e45HAAAASnRSTlMA/OPNppFiOSwVCu/q5uDRyr6wpqKblZOMdHBjWU1LJAn6+Pb09PTx8e/k4+HYz8O7uLaulIqBgX92amhnXFtGQ0M/PTYuISEPDlS1udwAAAFsSURBVEjH7dPnUsJAFIbhBVRUOgKCFLH33ntv+5FGSEDQ+78NWRzKhLOQGX/KM8PPd/acZcNG/ofpXCKyl753H7ynS7+8WZfFo7fUsT/tKsmVuiKvbLCn493gytLa1ma7OB0SzAV529f3xro3kR0y1d0271WujU0NO4I7VIywf2BxwXl/43lgcjecoGP1RVrML3CKiag0OeA0A2eS4plLlOGRXNsRlwHO6WRZmjSwQy/PpUxgkkqu5UkVmKCSWXmiAydUMsMpn5Z4AcCY+0RVldYpcfeDWZbYRXLK1cAbG6eSyQonaSpvAJeMssj7KM1fXVUA+MnksL9QNZGVgRAj5cv9Q9XFlRliFZpPcQwl1DUT4r3QCo3e/1C1RKdwHUCSyYzbPYlmtZap1IDQFJOK2c5ltGaBApP7iBm644NE9xXTinHYejcwHAUtAxi2WdWrpl0Tgc/PhnpLedARzjBXirdJXwAIRFN5NvJ3P1Xn4edEz6/PAAAAAElFTkSuQmCC',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABj1BMVEUAAADrAETRADxezj/iADzRADtczjxczzxczzzWAD1e0EHiAD9j1Ub7AEnRADz3AEhk1Un5AElczjtm1kxczzzvAEZczjzQADzSADzRADtn1k3/AEpczjxdzzzVADzRADtg1ETRAD1n20/5AEv/AEvTADn3AEjoAERh0kRczjxbzjzRADz1AEhczjz4AEn8AEr/AEv7AErYAD5j1Ehczjxl1kr7AErvAEXRADz+AEtn10zuAEXRADz/AEryAEfRAD1czjxm1U1m1kzRADzsAEbSAD1czT3yAEbrAET/AEpczT32AEhm1k3SADvQADvxAEf/AEv/AErRADtn1kzsAEjRADrPAD5Z0zdVzDPtAEn/AEvRADxczjxm1kz/l8HyAEfoAEP/Jmj/GV/4AEj2AEjrAETeAEDZAD7/fKz/X5b/S4b/D1bjAELhAEH/WZH7AEle0D//ear/caT/RYH/N3b/K239AEr0AEfxAEbtAEVg0kPXAD7/jLj/hLL/ZZr/Qn7/HmP/Bk/kAELaAD/TAD3nqvXiAAAAWnRSTlMAcNI/CNyylmVfMhn++fXv7d7e1sujnZuBeWNYUUlFOTcyKikiFPr59+/t6+rn5uHU0s/OzMjHv766uLi3srCsppmWlZKPi4qAf3pycWxoXlJPTkpDLCUXDw43dFUhAAAB+klEQVRIx+2UZ1cTQRSGrwlpRBEBEZQqYO+99957uXezAWMKCSIoRcGuP9z7ZgLHMrs7fNbnw3sm58xz3pm9c0L/Aps3rthozw2sUDmfy50gV5JXeomac4oerTeVjEcrnucl47egXHjaqT8clB2echDK4TYsm6OVc9i3GkorVrspmjQ2LkBZwCpFDhzSjVNQppzOBXq2m5Ntg3GDnBjo0JrWdhXa0uRKT6rjYdzrTD8jF5qG7q76hUxffzZCOLOGf+d1sRzrbgo2htfx37wsS2IwUFnLNvIiMkJ2jrLywsQyBeZRkbN24znu8baiUat81hwfx13KRS5oTb9VucaK748xV/03ZllvYC6JXLYq6xkt0/WWGc3JpRb+JhKzKic54C6oarEqlziIV0Etj9gw+wU5U0PmGSyKbCAru8zJPnzUHPMnMUZ53xjMIAXeH5t9Nh8NlyhpTohcDJ9+tYr8NKsxJ3lUyc4nQcpVtoCSbgpkj8XQkljIU77JoDHFwsRSSYZCMK/fvJWSjOpyXuQUhbHJKJXpr/hceTPGPgplv3FqOFhxDjPBFF1qDPWSlscUwRE2fMfcUdJFUdxjgLmbksQIRXKcwfyPoim5Q9Hc5zrvECU5Ri6cZsVoIg+clOFlZVFukxtD+xr/eYkMuZK9vpe3bD3QlaX//MlPkcgAfJeKs1oAAAAASUVORK5CYII=',
  'data:image/png;base64,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',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABZVBMVEUAAAD/0TH/twBgxkldwEX/zy3/tgBGpSxgxkpNsjZFoi1HpSz/1jtgx0r/tgBOsjb9zSpHpS3/twD/xx7/twBn1kxHpi1HpS3/tgBHpiz/yyZl1Uv/uwv/whNGpS3/tQD/twBhxEr/tABapTz/vwBgxkr/vhBOsjb/0jT/0zVgxUpgxUlm1kxm00pizUpKqzNgxkrOuxdgxktPszdHpS1PsjZHpi1gxkpOsjb/twBgx0v/yydn1kxgxUpOsTX/zShl1UtIpS7/tgBl1kz/vhFhx0pn1k1m10v/xx5IpixIpS5Qszb/whZNsjf/wRD/tQD/tABfyEtj1U7/tQD/tQBMszn/vAD/tgD/swD/20Vm1kz/tgBHpS1gxkr/yCJOsjb/0zT/yyf/2UH/2D7/1Tn/whZhy0pfy0X/uQVaxkG1zjacyTJ5xD5YwT5SuDmnzDOPxTL70DHexi2HsShnqCX0whf/vAtkGq37AAAAWXRSTlMAsUrAFdeLf2lWJ/j38N/Z0Mq/u7WvqpWRhoZzVkdGNSwpHQgI9vXz8/Hq4tzY2NjX183JvLm3r6afmpiXlZCOi4uFfHZkY19fXFhQUE8+Pj0zMSYfGxcOCvPHoxoAAAFsSURBVEjH7dRnT8JAGMDxBxXZIhtkKrj33nvvPXrXWqAgCO71+b2ACYGOO18Zjf/X/aU3nhz8zhq+LTaBsd1zKLcUBNZGF0oLmkMnzMQk2k0AHtQH7I2LomkDIQ/TGWybgbQvip39CK1Cg3FmJA60HI6AGeziPUIoON8jDAG9OM9blqfEHCEDgmBrBYZ2eJ4ffECkG0EwgnZmg2/CG4h4ibktE1s9aVLzT5Ex8rmlQki9RqBk4EvlEClHRPsxAJN5KxYKj8WnO0FYB4Z8ry/PEkdKJ1PvwzEW0pzmKqVwIxVcWLmqMtidoJBurqYkdmsLFycri1e0xJ4kJ1Ien2oQvQxQjyCpRJK4SV0ccIrlcZsqaVEmWXykSnTK5BrX/ZMfIPSrPFQlYeaBYR9L9uH3a5CttFykP3BM83lROC/KI5Ow1ooMdoJ2Z121e3deAqUrl1R1JX5gKKTPfK0p1TEdBcbCizrd7FooCn+9T5G5/5WpjkxNAAAAAElFTkSuQmCC'
]
// 连线图片
const LINE_CONNECT_IMAGES = new Array(8).fill(TEST_IMAGE)
// 抽奖图片
const LUCKY_IMAGES = GRID_IMAGES_ACTIVE

// ------------images------------

// eventemitter 
const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  // 碰撞
  ON_COLLISION: 'ON_COLLISION',
  // 球体静止
  ON_SLEEP: 'ON_SLEEP',
  // 下一球
  ON_NEXT_BALL: 'ON_NEXT_BALL',
  // 下一步 
  // ? 用于在释放下一球之前做一些判断
  ON_NEXT: 'ON_NEXT',
  // 下一关
  ON_RESET: 'ON_RESET',
  // 游戏结束
  ON_GAME_OVER: 'ON_GAME_OVER',
  // 本关通关
  ON_GAME_WIN: 'ON_GAME_WIN',
  // 游戏开始 游戏暂停后开始
  ON_GAME_START: 'ON_GAME_START',
  // 游戏暂停 
  ON_GAME_STOP: 'ON_GAME_STOP',
  // 游戏启动 游戏一开始启动的时候
  ON_GAME_PLAY: 'ON_GAME_PLAY',
  // 游戏静止 游戏通过一关后的暂时静止
  ON_GAME_STATIC: 'ON_GAME_STATIC',
  // 游戏动画定时器
  ON_ANIMATION_REQUEST: 'ON_ANIMATION_REQUEST',
  // 转盘抽奖 触发抽奖
  ON_LUCKY: 'ON_LUCKY',
  // 转盘抽奖完成
  ON_LUCKY_DONE: 'ON_LUCKY_DONE',
  // 点亮宫格
  ON_GRID_LIGHTING: 'ON_GRID_LIGHTING',
  // 更新连线奖励
  ON_LINE_CONNECT: 'ON_LINE_CONNECT',
  // 积分
  ON_SCORE: 'ON_SCORE'
}

const LUCKY_TYPE_MAP = {
  // 分数增加
  SCORE: 'SCORE',
  // 连线点亮
  GRID_LIGHT: 'GRID_LIGHT'
}

// game info 
const GAME_DATA = {
  score: 0,
  currentStep: 0,
  lineConnectScore: [10, 30, 60, 100, 150, 240, 300, 400],
  gridLightScore: 10,
  step: [
    {
      hinder: [
        ...new Array(6).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 7 * (index + 1),
              y: ContainerHeight / 5 * 1.2
            },
            lucky: false 
          }
        }),
        ...new Array(4).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 5 * (index + 1),
              y: ContainerHeight / 5 * 1.7
            },
            lucky: false 
          }
        }),
        ...new Array(3).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 4 * (index + 1),
              y: ContainerHeight / 5 * 2.2
            },
            lucky: false 
          }
        }),
        ...new Array(6).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 7 * (index + 1),
              y: ContainerHeight / 5 * 2.7
            },
            lucky: false 
          }
        }),
        ...new Array(2).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 3 * (index + 1),
              y: ContainerHeight / 5 * 3.2
            },
            lucky: true 
          }
        }),
      ],
      // 抽奖除亮灯外的其他奖励
      // score 积分
      lucky: [
        {
          type: LUCKY_TYPE_MAP.SCORE,
          value: 100,
          label: '100积分',
          image: ANOTHER_TEST_IMAGE
        }
      ],
      // 判断是否赢了
      isWin() {

      }
    }
  ]
}

// 缓存加载的图片
const IMAGE_MAP = {}

// utils 

// 图片加载
function loader(image, callback) {
  if(IMAGE_MAP[image]) return callback(IMAGE_MAP[image])
  const dom = new Image() 
  dom.src = image 
  dom.onload = () => {
		callback && callback(dom)
    IMAGE_MAP[image] = dom 
  }
}
function getCurrentStep() {
  return GAME_DATA.step[GAME_DATA.currentStep]
}
// 获取当前关卡的转盘图片数据
function getCurrentStepLucky() {
  return getCurrentStep().lucky
}
// 获取当前关卡的障碍数据
function getCurrentStepHinder() {
  return getCurrentStep().hinder
}
// 是否为球
function isBall(object) {
  return object.__internal_type__ === 'BALL'
}
// 是否为底
function isBottomBorder(object) {
  return object.__internal_type__ === 'BOTTOM_BORDER'
}
// 获取球的尺寸
function getBallSize() {
  return (ContainerWidth - BottomHinder.WIDTH * 0 - Border.BORDER_SIZE * 2) / 9 
}
// 唯一id
function uuid(prefix) {
  return (prefix || 'PREFIX') + Date.now() + Math.random() + Math.random()
}
// 是否为碰撞阻碍
function isHinder(object) {
  return object.__internal_type__ === 'HINDER'
}
//  是否为抽奖阻碍
function isLuckyHinder(object) {
  return isHinder(object) && !!object.__internal_lucky__
}

// ------------matter-js------------

const {
  Engine,
  Render,
  Runner,
  Body,
  Events: MatterEvents,
  Composite,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Bodies
} = Matter

// create engine
const EngineInstance = Engine.create() 
const WorldInstance = EngineInstance.world 
// create renderer
const renderInstance = Render.create({
  canvas: Canvas,
  engine: EngineInstance,
  options: {
    width: ContainerWidth,
    height: ContainerHeight,
    wireframes: false,
    background: 'transparent',

    // showDebug: true,
    // showStats: true,
    // showPerformance: true,
    // showBounds: true,
    // showVelocity: true,
    // showCollisions: true,
    // showSeparations: true,
    // showAxes: true,
    // showPositions: true,
    // showAngleIndicator: true,
    // showIds: true,
    // showVertexNumbers: true,
    // showConvexHulls: true,
    // showInternalEdges: true,
    // showMousePosition: true
  }
})

Render.run(renderInstance)

// create runner 
const RunnerInstance = Runner.create() 
Runner.run(RunnerInstance, EngineInstance)

// ------------matter-js------------

// ------------konva------------

// 动画
const Stage = new Konva.Stage({
	container: "#animation-canvas",
	width: ContainerWidth,
	height: ContainerHeight,
})

const Layer = new Konva.Layer()

Stage.add(Layer)

// 弹框提示
const ModalStage = new Konva.Stage({
  container: "#modal-canvas",
	width: ContainerWidth,
	height: ContainerHeight,
})

const ModalLayer = new Konva.Layer()

ModalStage.add(ModalLayer)

// ------------konva------------

// ------------event------------



// ------------event------------

// 球体
class Ball {

  constructor() {
    this.create()
    this.append()
    this.eventBind()
  }

  instance 

  disabled = false 
  died = false 

  create() {
    const size = getBallSize()
    this.instance = Bodies.circle(
      ContainerWidth / 2, 
      size / 2, 
      size / 2 - BottomHinder.WIDTH / 1.8, 
      { 
        render: { fillStyle: '#456' },
        __internal_type__: 'BALL',
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
        __internal_type__: "BALL"
      }
    )
  }

  append() {
    Composite.add(WorldInstance, [
      this.instance,
    ])
  }

  onSleep(target) {
    if(this.died || this.disabled) return 
    const { bodyA, bodyB } = target 
    if(bodyA.id === this.instance.id || bodyB.id === this.instance.id) {
      // 两球碰撞游戏结束
      if(isBall(bodyA) && isBall(bodyB)) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_OVER)
      }
      // 球与底板碰撞则下一球
      else if((isBall(bodyA) || isBall(bodyB)) && (isBottomBorder(bodyA) || isBottomBorder(bodyB))) {
        const ball = isBall(bodyA) ? bodyA : bodyB
        const { position: { x } } = ball 
        const index = Math.floor((x - Border.BORDER_SIZE) / ((ContainerWidth - Border.BORDER_SIZE * 2) / 9))
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, index)
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT)
      }

    }
  }

  onGameOver() {
    this.died = true 
    // 清楚球体
    setTimeout(() => {
      Composite.remove(WorldInstance, this.instance)
    }, 1000)
  }

  onCollision() {
    if(this.died || this.disabled) return 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
  }

}

// 阻碍点
class Hinder {

  constructor() {
    this.init()
    this.eventBind()
  }

  instances = {}
  static UNIT = 0.05

  disabled = false 

  init() {
    this.instance = {}
    this.create() 
    this.append()
  }

  create() {

    getCurrentStepHinder().forEach(hinder => {

      const { position, lucky } = hinder

      const __internal_type__ = "HINDER"
      const __internal_id__ = uuid('HINDER')
      const unit = getBallSize()
      const size = Hinder.UNIT * unit
      this.instances[__internal_id__] = Bodies.circle(
        position.x,
        position.y, 
        size, 
        { 
          __internal_type__,
          __internal_id__,
          __internal_lucky__: lucky,
          isStatic: true, 
          render: { fillStyle: lucky ? '#0ff' : '#060a19' } 
        }
      )
      
    })
  }

  append() {
    Composite.add(WorldInstance, Object.values(this.instances))
  }

  onCollision(bodyA, bodyB) {
    if(this.disabled) return 
    // 触发幸运抽奖
    if((isBall(bodyA) || isBall(bodyB) ) && (isLuckyHinder(bodyA) || isLuckyHinder(bodyB))) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LUCKY)
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision)
  }

}

// 外框
class Border {

  constructor() {
    this.init()
    this.append()
  }

  static BORDER_SIZE = 10

  BorderLeft 
  BorderTop 
  BorderRight 
  BorderBottom

  init() {
    this.BorderLeft = Bodies.rectangle(
      Border.BORDER_SIZE / 2, 
      ContainerHeight / 2, 
      Border.BORDER_SIZE, 
      ContainerHeight, 
      { 
        isStatic: true, 
        render: { fillStyle: '#060a19' },
        __internal_type__: 'BORDER_LEFT'
      } 
    )
    this.BorderTop = Bodies.rectangle(
      ContainerWidth / 2, 
      Border.BORDER_SIZE / 2, 
      ContainerWidth, 
      Border.BORDER_SIZE, 
      { 
        isStatic: true, 
        render: { fillStyle: '#060a19' },
        __internal_type__: 'BORDER_TOP'
      } 
    )
    this.BorderRight = Bodies.rectangle(
      ContainerWidth - Border.BORDER_SIZE / 2, 
      ContainerHeight / 2, 
      Border.BORDER_SIZE, 
      ContainerHeight, 
      { 
        isStatic: true, 
        render: { fillStyle: '#060a19' },
        __internal_type__: 'BORDER_RIGHT'
      }   
    )
    this.BorderBottom = Bodies.rectangle(
      ContainerWidth / 2, 
      ContainerHeight - Border.BORDER_SIZE / 2, 
      ContainerWidth, 
      Border.BORDER_SIZE, 
      { 
        isStatic: true, 
        render: { fillStyle: '#060a19' },
        __internal_type__: 'BOTTOM_BORDER'
      }   
    )
  }

  append() {
    Composite.add(WorldInstance, [
      this.BorderLeft,
      this.BorderTop,
      this.BorderRight,
      this.BorderBottom
    ])
  }

}

// 底部挡板
class BottomHinder {

  constructor() {
    this.create()
    this.append()
  }

  static WIDTH = 5
  instances = {}

  create() {

    new Array(8).fill(0).forEach((_, index) => {
      const __internal_type__ = "BOTTOM_HINDER"
      const __internal_id__ = uuid('BOTTOM_HINDER')
      const unit = getBallSize()
      const height = unit * 2.2
      this.instances[__internal_id__] = Bodies.rectangle(
        unit * (index + 1) + Border.BORDER_SIZE,
        ContainerHeight - height / 2, 
        BottomHinder.WIDTH, 
        height, 
        { 
          __internal_type__,
          __internal_id__,
          isStatic: true, 
          render: { fillStyle: '#060a19' } 
        }
      )

    })
  }

  append() {
    Composite.add(WorldInstance, Object.values(this.instances))
  }

  eventBind() {
   
  }

  eventUnBind() {

  }

}

// 顶部档条
class TopHinder {

  constructor() {
    this.init()
    this.append()
    this.eventBind()
  }

  static WIDTH = 10
  // ? 为了在旋转的时候还是保持球的活动范围
  static HINDER_HEIGHT_UNIT = 1.7

  instanceLeft 
  instanceRight 

  rotate = {
    direction: -1,
    value: 0,
    area: 0.3,
    unit: 0.005
  }

  init() {
    const ballSize = getBallSize()
    
    const height = ballSize * 1.5
    const leftX = ContainerWidth / 2 - (ballSize + TopHinder.WIDTH) / TopHinder.HINDER_HEIGHT_UNIT
    const leftY = Border.BORDER_SIZE + height / 3
    const rightX = ContainerWidth / 2 + (ballSize + TopHinder.WIDTH) / TopHinder.HINDER_HEIGHT_UNIT 
    const rightY = leftY

    this.instanceLeft = Bodies.rectangle(
      leftX, 
      leftY, 
      TopHinder.WIDTH, 
      height, 
      {   
        __internal_center_top_pos__: {
          x: leftX,
          y: Border.BORDER_SIZE
        },
        isStatic: true, 
        render: { 
          fillStyle: '#f0f' 
        } 
      }
    )
    this.instanceRight = Bodies.rectangle(
      rightX, 
      rightY, 
      TopHinder.WIDTH, 
      height, 
      {   
        __internal_center_top_pos__: {
          x: rightX,
          y: Border.BORDER_SIZE
        },
        isStatic: true, 
        render: { 
          fillStyle: '#ff0' 
        } 
      }
    )
  }

  append() {
    Composite.add(WorldInstance, [
      this.instanceLeft,
      this.instanceRight,
    ])
  }

  onAnimation() {

    this.rotate.value += (this.rotate.direction * this.rotate.unit) 
    if(Math.abs(this.rotate.value) >= this.rotate.area) {
      this.rotate.direction *= -1
    }

    Body.rotate(this.instanceLeft, this.rotate.unit * Math.PI * this.rotate.direction, this.instanceLeft.__internal_center_top_pos__)
    Body.rotate(this.instanceRight, this.rotate.unit * Math.PI * this.rotate.direction, this.instanceRight.__internal_center_top_pos__)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST, this.onAnimation, this)
  }

  eventUnBind() {
  EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST, this.onAnimation)
  }

}

// 抽奖
class LuckyPie {
  constructor() {
    this.eventBind()
  }

  static getTargetInfo() {
    const ballSize = getBallSize()

    return {
      width: ballSize * 2,
      height: ballSize,
    }
  }

  instance
  loading = false 
  gameover = false 
  

  initBase() {
    LUCKY_IMAGES.forEach((item) => {
      loader(item)
    })
  }

  init() {
    if(!this.instance) {
      const { 
        startY,
        height: opHeight,
      } = LineConnect.getTargetInfo()
      const {
        width,
        height,
      } = LuckyPie.getTargetInfo()
      const textHeight = height / 2
      loader(LUCKY_IMAGES[0], (image) => {
        this.instance = new Konva.Image({
          x: ContainerWidth / 2 - width / 2,
          y: startY + (LineConnect.COUNT + 1) * opHeight + textHeight,
          width,
          height,
          image
        })
        Layer.add(this.instance)
        Layer.add(
          new Konva.Text({
            x: ContainerWidth / 2 - width / 2,
            y: startY + (LineConnect.COUNT + 1) * opHeight,
            align: 'center',
            text: '开启幸运抽奖',
            width,
            height: height / 2,
            fontSize: ContainerWidth / 30
          })
        )
      })

      this.initBase()
    }


    getCurrentStepLucky().forEach(item => {
      loader(item.image)
    })

  }

  // 开始抽奖
  onLucky() {
    if(this.loading) return 
    this.loading = true 
    const extraLucky = getCurrentStepLucky()
    const allLucky = [
      ...LUCKY_IMAGES,
      ...extraLucky.map(item => item.image)
    ]
    const total = 9 + extraLucky.length
    const speed = 5
    let changeTotal = 150 
    let luckyResult = 0

    const lucky = () => {
      requestAnimationFrame(() => {
        changeTotal --
        if(changeTotal % speed === 0) {
          luckyResult = Math.floor(Math.random() * total) 
          loader(allLucky[luckyResult], image => {
            this.instance.image(image)
          })
        }
        if(changeTotal > 0) {
          lucky()
        }else {
          let params = {}
          if(luckyResult < LUCKY_IMAGES.length) {
            params.type = LUCKY_TYPE_MAP.GRID_LIGHT
            params.value = luckyResult
          }else {
            const target = extraLucky[luckyResult - LUCKY_IMAGES.length]
            params.type = target.type
            params.value = target.value
          }
          this.loading = false 
          // 游戏结束就不用算积分了
          if(!this.gameover) EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LUCKY_DONE, params)
          this.gameover = false 
        }
      })

    }
    setTimeout(lucky, 500)
  }

  onGameOver() {
    this.gameover = false 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.init, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.init)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
  }
}

// 九宫格
class GridBlock {

  constructor() {
    this.init()
    this.eventBind()
  }

  static getTargetInfo() {
    const ballSize = getBallSize()
    const size = ballSize / 1.2
    const startX = ContainerWidth / 2 - size * 1.5 
    const startY = (TopHinder.HINDER_HEIGHT_UNIT + 0.5) * ballSize 
    return {
      size,
      startX,
      startY
    }
  }

  instances = []
  instancesLightMap = new Array(9).fill(false)
  isInit = true 

  // {
  //   '012': {
  //     0: false,
  //     1: false,
  //     2: false 
  //   }
  // }
  generateLineConnectMap() {

    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 7],
    ].reduce((acc, cur) => {
      const key = cur.join('')
      acc[key] = cur.reduce((acc, cur) => {
        acc[cur] = false 
        return acc 
      }, {})
      return acc 
    }, {})
  }

  init() {

    // 已存在则无须初始化
    if(this.instances.length) {
      return this.instances.forEach((_, index) => {
        this.stateChange(false, index)
      })
    }

    const {
      size,
      startX, 
      startY
    } = GridBlock.getTargetInfo()

    GRID_IMAGES.forEach((item, index) => {
      const xUnit = index % 3
      const yUnit = Math.floor(index / 3)
      loader(item, image => {
        const instance = new Konva.Image({
          x: startX + xUnit * size,
          y: startY + yUnit * size,
          width: size,
          height: size,
          image,
        })
        this.instances.push(instance)
        Layer.add(instance)
      })
    })

  }

  // 重置
  onReset() {
    if(this.isInit) {
      this.isInit = false 
      return 
    }
    this.init()
  }

  // 判断是否触发连线
  lineConnectJudge() {
    const lineConnectMap = this.generateLineConnectMap()
    const counter = Object.values(lineConnectMap).reduce((acc, cur) => {
      if(Object.keys(cur).every((item) => this.instancesLightMap[item])) acc ++
      return acc 
    }, 0)

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LINE_CONNECT, counter)

  }

  stateChange(isLight, index) {
    this.instancesLightMap[index] = isLight
    const target = isLight ? GRID_IMAGES_ACTIVE[index] : GRID_IMAGES[index]
    loader(target, image => {
      this.instances[index].image(image)
    })
  }

  // 球进洞点亮宫格
  onGridLighting(index) {
    this.stateChange(true, index)
    this.lineConnectJudge()
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SCORE, GAME_DATA.gridLightScore)
  }

  eventBind() {

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, this.onGridLighting, this)

  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, this.onGridLighting)
  }

}

// 连线记录
class LineConnect {

  constructor() {
    this.init()
    this.eventBind()
  }

  static COUNT = 8
  static getTargetInfo() {
    const {
      size,
      startX: blockStartX, 
      startY: blockStartY
    } = GridBlock.getTargetInfo()

    return {
      width: size * 2.5,
      height: size / 1.5,
      startX: blockStartX + size * 4,
      startY: blockStartY
    }
  }

  instances = []
  isInit = true 
  connectCounter = 0 

  init() {
    this.connectCounter = 0 

    // 已存在则无须初始化
    if(this.instances.length) {
      return this.instances.forEach((_, index) => {
        this.stateChange(true, index)
      })
    }

    const {
      width,
      height,
      startX,
      startY
    } = LineConnect.getTargetInfo()

    new Array(LineConnect.COUNT).fill(0).forEach((_, index) => {
      loader(LINE_CONNECT_IMAGES[index], image => {
        const instance = new Konva.Image({
          x: startX,
          y: startY + index * height,
          width,
          height,
          image,
        })
        this.instances.push(instance)
        Layer.add(instance)
      })
    })

  }

  // 重置
  onReset() {
    if(this.isInit) {
      this.isInit = false 
      return 
    }
    this.init()
  }

  stateChange(isNormal, index) {
    loader(isNormal ? TEST_IMAGE : ANOTHER_TEST_IMAGE, image => {
      this.instances[index].image(image)
    })
  }

  // 触发连线
  onLineConnect(count) {
    new Array(count).fill(0).forEach((_, index) => {
      this.stateChange(false, this.instances.length - index - 1)
    })
    const addCount = count - this.connectCounter
    this.connectCounter = count 
    !!this.connectCounter && EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SCORE, addCount * GAME_DATA.lineConnectScore[this.connectCounter - 1] || 0)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LINE_CONNECT, this.onLineConnect, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LINE_CONNECT, this.onLineConnect)
  }

}

// 积分
class Score {

  constructor() {
    this.init()
    this.eventBind()
  }

  instance 

  fillText() {
    return `当前分数：${GAME_DATA.score}`
  }

  init() {
    if(!this.instance) {
      this.instance = new Konva.Text({
        x: 0,
        y: Border.BORDER_SIZE * 2,
        align: 'right',
        text: this.fillText(),
        width: ContainerWidth - Border.BORDER_SIZE * 2,
        fontSize: ContainerWidth / 25
      })
      Layer.add(this.instance)
    }
  }

  onScore(score) {
    GAME_DATA.score += score 
    StorageInstance.setValue({
      score: GAME_DATA.score
    })
    this.instance.text(this.fillText())
  }

  // 抽奖结果
  onLuckyDone({ value, type }) {
    switch(type) {
      case LUCKY_TYPE_MAP.SCORE:
        this.onScore(value)
        break 
      case LUCKY_TYPE_MAP.GRID_LIGHT:
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, value)
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 碰撞
class Collision {

  constructor() {
    this.eventBind() 
  }

  collisionMap = {

  }

  collisionTimeout = {

  }

  onCollisionStart = (event) => {
    event.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + '--' + bodyB.id
      const collisionMapKeyB = bodyB.id + '--' + bodyA.id
      // 去除之前的碰撞
      delete this.collisionMap[collisionMapKeyA]
      delete this.collisionMap[collisionMapKeyB]
      clearTimeout(this.collisionTimeout[collisionMapKeyA])
      clearTimeout(this.collisionTimeout[collisionMapKeyB])
      delete this.collisionTimeout[collisionMapKeyA]
      delete this.collisionTimeout[collisionMapKeyB]

      this.collisionMap[collisionMapKeyA] = pair 

      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLLISION, bodyA, bodyB)

      // 1s 后碰撞仍然存在则确定为静止
      this.collisionTimeout[collisionMapKeyA] = setTimeout(() => {
        if(this.collisionMap[collisionMapKeyA]) {
          const target = this.collisionMap[collisionMapKeyA]
          EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SLEEP, target)
          delete this.collisionMap[collisionMapKeyA]
          delete this.collisionTimeout[collisionMapKeyA]
        }
      }, 1000)

    })
  }

  onCollisionEnd = (event) => {
    event.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + '--' + bodyB.id
      const collisionMapKeyB = bodyB.id + '--' + bodyA.id
      delete this.collisionMap[collisionMapKeyA]
      delete this.collisionMap[collisionMapKeyB]
      clearTimeout(this.collisionTimeout[collisionMapKeyA])
      clearTimeout(this.collisionTimeout[collisionMapKeyB])
      delete this.collisionTimeout[collisionMapKeyA]
      delete this.collisionTimeout[collisionMapKeyB]
    })
  }

  onGamePlay() {
    // 去除碰撞key缓存
    this.collisionMap = {} 
    // 去除定时器
    Object.values(this.collisionTimeout).forEach(item => clearTimeout(item))
    this.collisionTimeout = {}
  }

  eventBind() {
    MatterEvents.on(EngineInstance, 'collisionStart', this.onCollisionStart)
    MatterEvents.on(EngineInstance, 'collisionEnd', this.onCollisionEnd)

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay, this)

  }

  eventUnBind() {
    MatterEvents.off(EngineInstance, 'collisionStart', this.onCollisionStart)
    MatterEvents.off(EngineInstance, 'collisionEnd', this.onCollisionEnd)

    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay)
  }

}

// 发球
class ServeBall {

  constructor() {
    this.init()
    this.eventBind()
  }

  disabled = true  
  lucky = false 

  serverBall = () => {
    if(this.disabled || this.lucky) return 
    this.disabled = true 
    new Ball()
  }

  init() {
    // 先简单使用键盘，后面再改
    window.addEventListener('keydown', this.serverBall)
  }

  onNextBall() {
    this.disabled = false 
  }

  onDisabled() {
    this.disabled = true 
  }

  onLucky() {
    this.lucky = true 
  }

  onLuckyDone() {
    this.lucky = false  
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 动画定时器
class Animation {

  constructor() {
    this.eventBind()
  }

  isStop = false  

  animation() {
    if(this.isStop) return 
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST)
    requestAnimationFrame(this.animation.bind(this))
  }

  start() {
    this.isStop = false  
    this.animation()
  }

  stop() {
    this.isStop = true 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.start, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.start)
  }

}

// 缓存相关
// 存储游戏信息
class StorageFactory {

  key = 'western_travel_alliance'

  static Storage = localStorage

  base = {
    score: 0,
    currentStep: 0
  }

  init() {
    this.getValue()
  }

  reset() {
    this.setValue(this.base)
  }

  getValue() {
    let result = StorageFactory.Storage.getItem(this.key)
    if(!result) {
      StorageFactory.Storage.setItem(this.key, JSON.stringify(this.base))
      return this.base 
    }else {
      return JSON.parse(result) 
    }
  }

  setValue(value) {
    const origin = this.getValue() 
    StorageFactory.Storage.setItem(this.key, JSON.stringify({
      ...origin,
      ...value 
    }))
  }

}

// 交互相关
class Interactive {

  constructor() {
    this.init()
    this.eventBind()
  }

  guide = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false 
  }
  gameComplete = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameOver = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameStop = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameWin = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  nextBll = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  luckyDone = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }

  getCommonSizeInfo() {
    const width = ContainerWidth / 2
    const height = width / 2
    const x = ContainerWidth / 2 - width / 2
    const y = ContainerHeight / 2 - height / 2
    return {
      width,
      height,
      x,
      y,
    }
  }

  generateWrapper() {
    const wrapper = new Konva.Group({
      x: 0,
      y: 0,
      width: ContainerWidth,
      height: ContainerHeight,
      visible: false 
    })
    const mask = new Konva.Rect({
      width: ContainerWidth,
      height: ContainerHeight,
      x: 0,
      y: 0,
      fill: '#000',
      opacity: 0.5
    })
    wrapper.add(mask)
    return wrapper
  }

  initGameComplete() {
    this.gameComplete.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: 'red'
    })
    test.on('click', () => {
      this.gameComplete.instance.visible(false)
    })
    this.gameComplete.instance.add(test)
    ModalLayer.add(this.gameComplete.instance)
  }

  initGameOver() {
    this.gameOver.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: 'yellow'
    })
    test.on('click', () => {
      this.gameOver.instance.visible(false)
      StorageInstance.setValue({
        score: 0
      })
    })
    this.gameOver.instance.add(test)
    ModalLayer.add(this.gameOver.instance)
  }

  initGameStop() {
    this.gameStop.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: 'green'
    })
    test.on('click', () => {
      this.gameStop.instance.visible(false)
    })
    this.gameStop.instance.add(test)
    ModalLayer.add(this.gameStop.instance)
  }

  initGameWin() {
    this.gameWin.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: 'pink'
    })
    test.on('click', () => {
      this.gameWin.instance.visible(false)
    })
    this.gameWin.instance.add(test)
    ModalLayer.add(this.gameWin.instance)
  }

  initNextBall() {
    this.nextBll.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: 'blue'
    })
    this.nextBll.instance.add(test)
    ModalLayer.add(this.nextBll.instance)
  }

  initLuckyDone() {
    this.luckyDone.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      ...this.getCommonSizeInfo(),
      fill: '#0ff'
    })
    this.luckyDone.instance.add(test)
    ModalLayer.add(this.luckyDone.instance)
  }

  init() {
    this.initGameComplete()
    this.initGameOver() 
    this.initGameStop()
    this.initGameWin()
    this.initNextBall()
    this.initLuckyDone()
  }

  // 动画
  animation() {

  }

  // 游戏引导
  guide() {
    // TODO 
  }

  // 游戏通关
  onGameComplete() {
    this.gameComplete.instance.visible(true)
  }

  // 游戏结束
  onGameOver() {
    this.gameOver.instance.visible(true)
  }

  // 游戏暂停
  onGameStop() {
    this.gameStop.instance.visible(true)
  }

  // 游戏通关（本关）
  onGameWin() {
    const value = StorageInstance.getValue()
    if(value.currentStep + 1 === GAME_DATA.step.length) {
      this.onGameComplete()
    }else {
      this.gameWin.instance.visible(true)
      const newStep = value.currentStep + 1
      setTimeout(() => {
        StorageInstance.setValue({
          currentStep: newStep
        })
        GAME_DATA.currentStep = newStep
        this.gameWin.instance.visible(false)
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_RESET)
      }, 1000) 
    }
  }

  // 下一球
  onNextBall() {
    console.log('next ball')
    // TODO 
  }

  // 下一步
  onNext() {
    // 判断一下是否游戏可以下一关
    if(GAME_DATA.step[GAME_DATA.currentStep].isWin()) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_WIN)
    }else {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT_BALL)
    }
  }

  // 抽奖完成
  onLuckyDone({ value, type }) {
    console.log('lucky done')
    // TODO 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onGameWin, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT, this.onNext, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onGameWin)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT, this.onNext)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 游戏
class Game {

  // 游戏开始
  start() {

    this.gameInfoInit()
    new Animation()
    new LuckyPie()
    new GridBlock()
    new LineConnect()
    new TopHinder()
    new ServeBall()
    new Collision()
    new Hinder()
    new BottomHinder()
    new Border()
    new Score() 
    new Interactive()

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_RESET)
  }

  // 数据重置
  gameInfoReset() {
    StorageInstance.reset()
  }

  // 数据初始化
  gameInfoInit() {
    const value = StorageInstance.getValue()
    Object.entries(value).forEach(item => {
      const [ key, value ] = item
      GAME_DATA[key] = value  
    })
  }

}

const StorageInstance = new StorageFactory()
new Game().start()
