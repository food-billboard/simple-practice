const fsPromise = require('fs-extra')
const path = require('path')
const shelljs = require('shelljs')
const chalk = require('chalk')

// 删除dist

// 遍历整个packages  

// 打包需要打包的package  

// 整合所有包到最外层dist

// 打包子项目
async function buildPackage(dir) {
  return new Promise((resolve) => {
    shelljs
    .cd(dir)
    .exec('yarn', {
      async: true 
    }, resolve)
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      shelljs.exec('yarn build', {
        async: true 
      }, (_, __, error) => {
        if(error && (typeof error === 'string' && !error.includes('Browserslist'))) {
          reject(error)
        }else {
          resolve()
        }
      })
    })
  })
}

// 移动子项目dist到最外层dist
async function movePackageDistToOuter(dir, dirname) {
  return fsPromise.copySync(dir, path.join(__dirname, '../dist', dirname))
}

const packagesDirname = path.join(__dirname, '../packages')  
const rootDist = path.join(__dirname, '../dist')  

new Promise((resolve, reject) => {
  if(fsPromise.existsSync(rootDist)) {
    console.log(chalk.green('empty the root dist dir'))
    fsPromise.emptyDir(path.join(__dirname, '../dist')).then(resolve).catch(reject)
  }else {
    console.log(chalk.green('create the root dist dir'))
    fsPromise.mkdir(rootDist).then(resolve).catch(reject)
  }
})
.then(() => {
  return fsPromise.readdir(packagesDirname)
})
.then(async (_dirList) => {
  const dirList = _dirList.filter(dir => !dir.startsWith('_') && !['.DS_Store', 'flappy-bird'].includes(dir))
  console.log(chalk.green(`read the packages dir ${dirList.join(',')}`))
  for(let i = 0; i < dirList.length; i ++) {
    const dir = dirList[i]
    const packageRoot = path.join(packagesDirname, dir)
    console.log(chalk.green(`current package is --- ${packageRoot}`))
    console.log(chalk.yellow('-'.repeat(20)))
    const packageJsonPath = path.join(packageRoot, 'package.json')
    const hasPackageJson = fsPromise.existsSync(packageJsonPath)
    const srcDir = path.join(packageRoot, 'src')
    const distDir = path.join(packageRoot, 'dist')
    const buildDir = path.join(packageRoot, 'build')
    // 存在package.json
    if(hasPackageJson) {
      console.log(chalk.green(`${dir} package need build`))
      
      if(fsPromise.existsSync(distDir)) {
        console.log(chalk.green('remove the dist dir'))
        await fsPromise.remove(distDir)
      }
      if(fsPromise.existsSync(buildDir)) {
        console.log(chalk.green('remove the build dir'))
        await fsPromise.remove(buildDir)
      }

      console.log(chalk.green('build package'))
      await buildPackage(packageRoot)
      console.log(chalk.green(`move ${distDir} to root dist and rename to ${dir}`))

      if(fsPromise.existsSync(distDir)) {
        await movePackageDistToOuter(distDir, dir)
      }
      if(fsPromise.existsSync(buildDir)) {
        console.log(chalk.green('remove the build dir'))
        await movePackageDistToOuter(buildDir, dir)
      }

    }else {
      console.log(chalk.green(`move ${srcDir} to root dist and rename to ${dir}`))
      await movePackageDistToOuter(srcDir, dir)
    }
  }
})
.catch(err => {
  console.error(err)
})