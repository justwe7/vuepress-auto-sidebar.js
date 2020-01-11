var exports = module.exports
/* 
  根节点处理
*/
exports.parseRootPath = (pathArr, fileName, fullPath, sidebar) => {
  pathArr.forEach(pathName => {
    let sidebarIdx = null
    const curObj = sidebar.filter((item, idx) => {
      if (item.title === pathName) {
        sidebarIdx = idx
        return true
      }
      return false
    })
    if (curObj.length) {
      if (!sidebar[sidebarIdx].children) {
        sidebar[sidebarIdx].children = []
      }
      sidebar[sidebarIdx].children.push([fullPath, fileName])
    } else {
      sidebar.push({
        title: pathName,
        children: [[fullPath, fileName]]
      })
    }
  })
}

/* 
·多级路径处理
*/
exports.parseLeafPath = (fullPathArr, fileName, fullPath, sidebar) => {
  let HEAD = sidebar
  const pathArr = fullPathArr.slice(0)
  pathArr.forEach(pathName => {
    let _HEAD = HEAD.filter(item => pathName === item.title)
    if (_HEAD.length) {
      HEAD = _HEAD[0]
      HEAD = HEAD.children
    } else {
      HEAD.push({
        title: pathName,
        children: []
      })
      HEAD = HEAD[HEAD.length - 1].children
    }
  })
  HEAD.push([fullPath, fileName])
}
