const globby = require('globby')
const { parseRootPath, parseLeafPath } = require('./lib/path-parser')
const getConfig = require('./lib/get-config')

module.exports = (options, ctx) => {
  const sidebar = []
  const { pattern, gitignore, titleOverflow, suffix } = getConfig(options)

  const aMdList = globby.sync(pattern, { gitignore })
  return {
    async ready() {
      const { themeConfig } = ctx.getSiteData ? ctx.getSiteData() : ctx

      aMdList.forEach(path => {
        const pathArr = path.split('/')
        let fileName = pathArr.pop()
        const pathLevel = pathArr.length
        if (!pathLevel) {
          return false
        }
        if (!suffix) {
          try {
            fileName = /(\S+)\.md/.exec(fileName)[1]
          } catch (error) {
            console.error(error)
          }
        }
        if (titleOverflow && !isNaN(Number(titleOverflow))) {
          fileName.length > titleOverflow &&
            (fileName = `${fileName.substr(0, titleOverflow)}...`)
        }
        if (pathLevel === 1) {
          // 层级为1 直接操作源数据
          parseRootPath(pathArr, fileName, path, sidebar)
        } else {
          // 多级目录文件 操作引用地址
          parseLeafPath(pathArr, fileName, path, sidebar)
        }
      })
      
      themeConfig.sidebar = sidebar
      return sidebar
    }
  }
}
