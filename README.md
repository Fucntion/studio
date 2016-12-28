# 云商

放着方便

## 目录结构

``` 
1.组件通过bower管理
2.入口文件main.js,路由配置文件router-config.js
3.公共组件放在components,静态资源放在assets
```

1.组件通过bower管理
2.入口文件main.js,路由配置文件router-config.js
3.公共组件放在components,静态资源放在assets,

## diy element组件
packages 下添加目录

components.json添加



如果需要定制element ui组件。
在packages下新建目录写index.js即可。eg packages/modal/index.js+modal.vue
然后添加css
packages/theme-default/src/index.csss引入css

先build file生成src.index自动把packages下所有的组件动态引入，然后dist

