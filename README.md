# UniGraphic
UniGraphic，是一个使用JavaScript实现的数据关系可视化工具， 得益于Canvas技术，使其具备敏捷的数据解析能力，可以流畅地运行在PC和移动设备上。

在UniGraphic解决方案中，提供常规的数据地图、知识图谱、思维导图，并且支持自定义，满足一切关于定义数据之间关系的交互建模，反映数据之间的语义关联的使用场景，是一个直观且可高度定制化的数据关系可视化工具。

## 使用

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
详细配置可查看文档里setOption方法的参数说明
