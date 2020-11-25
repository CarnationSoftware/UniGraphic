# UniGraphic

## 简介

UniGraphic，是一个使用JavaScript实现的数据关系可视化工具， 得益于Canvas技术，使其具备敏捷的数据解析能力，可以流畅地运行在PC和移动设备上。

在UniGraphic解决方案中，提供常规的数据地图、知识图谱、思维导图等数据展示场景的支持，同时对于关系建立、模型设计等编辑场景也支持，并且支持自定义，满足一切关于定义数据之间关系的交互建模、反映数据之间的语义关联的使用场景，是一个直观且可高度定制化的数据关系可视化工具。

[查看更多详细介绍](http://www.carnation.com.cn/news_show.php?id=112&type_news=0&menuid=3)

## 文档

https://carnationsoftware.gitee.io/unigraphic/doc

## 开始使用

### 引入UniGraphic
引入CSS
```html
<link rel="stylesheet" href="UniGraphic.min.css">
```
引入JS，UniGraphic.all.min.js相对与UniGraphic.min.js额外包含了polyfill和zrender，否则需要自行引入
```html
<script src="UniGraphic.all.min.js"></script>
```

### 初始化
```javascript
const chart = new UniGraphic({
    graph: document.querySelector('#container'),
});
```

### 设置配置信息以及数据
```javascript
chart.setOption(options);
```
详细配置可查看文档里setOption方法的[参数说明](https://carnationsoftware.gitee.io/unigraphic/doc/UniGraphic.html#setOption)

## 例子

###### 网格布局（场景：数据地图）
![alt datamap](https://carnationsoftware.gitee.io/unigraphic/demo/img/datamap-0.png)

###### 树图布局（场景：思维导图）
![alt tree](https://carnationsoftware.gitee.io/unigraphic/demo/img/tree-0.png)

###### 星形布局（场景：知识图谱）
![alt star](https://carnationsoftware.gitee.io/unigraphic/demo/img/star-0.png)

###### 模型设计
![alt model](https://carnationsoftware.gitee.io/unigraphic/demo/img/table-0.png)
