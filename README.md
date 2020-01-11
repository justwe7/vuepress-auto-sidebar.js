# vuepress-auto-sidebar.js

读取目录层级自动生成 vuepress 侧边栏导航插件

### 如何使用

（一） 安装   

    npm i vuepress-auto-sidebar.js -D

（二） 修改文件 `.vuepress\config.js`

```js
const autoSidebar = require('vuepress-auto-sidebar.js')
module.exports = {
  // ...vuepressconfig
  plugins: [
    [
      autoSidebar,
      // { titleOverflow: 10, ignoreFilder: ['temp'] }  // plugin-config
    ]
  ]
}
```

（三） 运行

    npx vuepress dev
   

### config

| key           | desc                     | type    | default |
| ------------- | ------------------------ | ------- | ------- |
| ignoreFilder  | 忽略的目录               | Array   | []      |
| titleOverflow | 超出文本长度截断         | Number  | 13      |
| suffix        | 展示后缀名               | Boolean | false   |
| base          | 目标目录                 | String  | ''      |
| gitignore     | 同步`.gitignore`文件忽略 | Boolean | true    |
