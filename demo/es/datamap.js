(() => {
    // 显示加载中
    UniUtil.showLoading(true);
    // 基础配置
    UniGraphic.config({
        // path: {
        //     base: '/static/img/',
        // },
        // 缓存图片
        img: {
            book: {
                title: '书',
                src: `${UniGraphic.path.img}/node-term.png`,
                color: '#000',
            },
        },
        style: {
            // defaultColor: '#595857', // 主色
            // hoverColor: '#ddd', // 悬停色
            // activeColor: '#ff1e00', // 活动色
            activeColor: '#000', // 活动色
            warnColor: '#f8b13c', // 警告色
        },
    });
    // 实例化图形工具
    const chart = new UniGraphic({
        graph: document.querySelector('#container'),
    });
    // 方便在console里查看
    window.chart = chart;
    // 水印图片对象
    const waterMark = new Image();
    waterMark.setAttribute('crossOrigin', 'Anonymous');
    waterMark.src = './../img/name.png';
    // 图形渲染模拟数据
    const options = {
        // 标题
        title: '数据地图',
        // 画布渲染的节点\连线
        data: {
            nodes: [],
            lines: [],
        },
        // 图例配置
        legend: {
            show: false, // 是否显示
            auto: true, // 自动获取图例
            position: 'right,top', // 显示位置
            // rowCount: 6, // 每行数量
            // height: 300, // 高度
            data: [
                {
                    title: '表',
                    icon: chart.imgCached.table,
                    type: 'table',
                },
            ], // 图例数据，如果配置了自动获取图例，此项设置将无效
        },
        // 缩略图
        outline: {
            show: false, // 是否显示
            position: 'right,bottom', // 显示位置
        },
        // 节点浮窗
        tooltip: {
            show: true, // 是否显示
            showDelay: 0, // 显示延迟
            hideDelay: 0, // 隐藏延迟
            // position: [100, 100],
            // content: '填充填充',
        },
        // 图形配置
        graphic: {
            // 缩放比例
            scale: 0.5,
            // 高亮联动
            isHighlightRelated: true,
            // 设置中心点的情况下，是否开启中心点向上下游折叠功能
            // （中心点上游支持向上游折叠；下游支持向下游折腾）
            centerFold: true,
            // 排列方向
            direction: 'left2right',
            // 单击延迟时间，以便等待双击，并阻断单击的触发
            clickDelay: 0,
            // 连线方式， 可选'drag' 'click'
            lineDrawingMode: 'drag',
            // 连线之间的间距，设置为0则相同关系的连线将重叠为1条线
            lineSpace: 3,
            // lineSpace: [0, 3],
            // 配置鼠标触边，按各个方向滚动
            autoScroll: {
                // 鼠标触发范围10或[10,20,30,10]，可以配四个方向一样，也可以单独配置[上，右，下，左]
                range: [44 + 10, 10, 25 + 10, 10],
                speed: 200, // 速度，100/s
                delay: 2000, // 延迟时间加速
            },
            // 节点配置
            node: {
                // 应用到全部节点
                global: {
                    animate: {
                        name: 'beat',
                        duration: 2000,
                        // iteration: 'infinite',
                    },
                    // targetFoldable: true,
                    // sourceFoldable: true,
                    // 节点名称每行最大展示数，超出则换行
                    titleStyle: {
                        width: '20em',
                        // average: true,
                        // align: 'right',
                    },
                    // 节点之间的间距（right\bottom)
                    margin: {
                        right: 150,
                        bottom: 150,
                    },
                    // 节点相对于初始位置的偏移
                    offset: {
                        left: 0,
                        top: 0,
                    },
                    // 节点占位的宽高
                    normal: {
                        width: 50,
                        height: 50,
                    },
                    // 节点展开详情最大展示行数（超过会出现滚动条）
                    detail: {
                        maxLines: 5,
                        // width: 200, // 宽度
                        // lineHeight: 30, // 行高
                    },
                    // 最大列数，仅当没有连线关系时生效
                    maxColumn: 5,
                    // 悬停显示详情的触发时间（毫秒）
                    // showByHoverDuration: 0,
                },
            },
            line: {
                default: {
                    animate: {
                        name: 'trail',
                        duration: 2000,
                        // iteration: 'infinite',
                    },
                    style: {
                        line: {
                            // stroke: '#999',
                            // lineDash: [4],
                            linewidth: 1,
                        },
                        highLine: {
                            // stroke: '#000',
                            linewidth: 1,
                        },
                        arrow: {
                            // stroke: '#999',
                            linewidth: 1,
                            // fill: '#999',
                        },
                    },
                    // lineType: 'bezierCurve',
                    // arrowType: ['diamond', 'sharpArrow'],
                    // arrowType: 'sharpArrow', // taperedArrow、heavyArrow、sharpArrow
                    isResizable: false,
                    // inAndOut: ['left', 'right'], // ['left', 'right']
                },
            },
        },
        // 工具栏
        toolbar: {
            // 工具栏样式
            orient: 'horizontal', // horizontal/vertical（水平、竖直方向） 可选
            // css原生属性
            style: {
                background: {
                    backgroundColor: '#F3F3F3',
                    height: '44px',
                    boxShadow: '0px 6px 17px 1px rgba(0, 0, 0, 0.2)',
                },
                iconStyle: {
                    padding: '2px',
                    fontSize: '16px',
                },
            },
            // 工具栏菜单项
            data: [
                {
                    name: 'reload',
                    title: '重新加载',
                },
                {
                    name: 'autoLayout',
                    title: '自动布局',
                },
                {
                    name: 'pointer',
                    title: '选择',
                },
                {
                    name: 'drag',
                    title: '拖动',
                },
                {
                    name: 'actualSize',
                    title: '1:1',
                },
                {
                    name: 'zoomIn',
                    title: '放大',
                },
                {
                    name: 'zoomOut',
                    title: '缩小',
                },
                {
                    name: 'undo',
                    title: '回退',
                    isActive: false,
                },
                {
                    name: 'redo',
                    title: '前进',
                    isActive: false,
                },
                {
                    name: 'outline',
                    title: '缩略图',
                    isAvailable: true,
                },
                {
                    show: true,
                    name: 'fullscreen',
                    title: '全屏',
                },
                {
                    name: 'exportImg',
                    title: '导出图片',
                },
                {
                    name: 'exportExcel',
                    title: '导出表格',
                    onClick: () => {
                        const a = document.createElement('a');
                        a.className = 'temporary-exportExcel';
                        document.body.appendChild(a);
                        a.download = `${options.title}.xlsx`;
                        a.href = ''; // 这里填写下载地址
                        a.click();
                        a.parentNode.removeChild(document.getElementsByClassName('temporary-exportExcel')[0]);
                    },
                },
                {
                    show: true,
                    name: 'filter',
                    title: '过滤',
                    onClick: {
                        type: 'submenu',
                        data: {
                            template: `<table border="1" style="border-collapse: collapse;padding: 10px;border: 1px solid #d9d9d9;margin: 16px">
                                         <thead>
                                            <th style="padding: 0 10px"></th>
                                            <th style="padding: 0 10px">类型</th>
                                            <th style="padding: 0 10px">路径</th>
                                        </thead>
                                         <tbody>
                                           <tr style="line-height: 30px;">
                                             <td style="padding: 0 10px"><input type="checkbox"/></td>
                                             <td style="padding: 0 10px">接口</td>
                                             <td style="padding: 0 10px">../abs/folder/</td>
                                           </tr>
                                           <tr style="line-height: 30px;">
                                             <td style="padding: 0 10px"><input type="checkbox"/></td>
                                             <td style="padding: 0 10px">表</td>
                                             <td style="padding: 0 10px">./mode/_del_fes/newD_as/</td>
                                           </tr>
                                          </tbody>
                                        </table>`,
                            buttons: [
                                {
                                    name: '确定',
                                    callback: () => {
                                        UniUtil.showLoading();
                                        return true;
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    name: 'collapseAll',
                    title: '全部收起',
                },
                {
                    name: 'expandAll',
                    title: '全部展开',
                },
                {
                    name: 'legend',
                    title: '图例',
                },
                {
                    name: 'scrollTop',
                    title: '返回顶部',
                },
                {
                    name: 'separator',
                    title: '分割线',
                },
                {
                    name: 'search',
                    title: '搜索',
                },
                {
                    name: 'customConfig',
                    title: '自定义配置',
                    formatter: '',
                    icon: '',
                    onClick: {
                        type: 'submenu',
                        data: {
                            template: {
                                type: 'checkbox',
                                data: [
                                    {
                                        name: '显示schema名称',
                                        value: 'schema',
                                    },
                                    {
                                        name: '显示中文名',
                                        value: 'zhName',
                                    },
                                    {
                                        name: '显示英文名',
                                        value: 'enName',
                                        checked: true,
                                    },
                                ],
                            },
                            buttons: [
                                {
                                    name: '确定',
                                    callback: (values) => {
                                        const data = UniUtil.clone(options.data.nodes);
                                        data.forEach((node) => {
                                            node.normal.title = '';
                                            if (values.indexOf('schema') !== -1) {
                                                node.normal.title += `${node.normal.schema || ''}\n`;
                                            }
                                            if (values.indexOf('zhName') !== -1) {
                                                if (values.indexOf('enName') === -1) {
                                                    node.normal.title += `${node.normal.zhName || node.normal.enName || ''}\n`;
                                                }
                                                else {
                                                    node.normal.title += `${node.normal.zhName || ''}\n`;
                                                }
                                            }
                                            if (values.indexOf('enName') !== -1) {
                                                if (values.indexOf('zhName') === -1) {
                                                    node.normal.title += `${node.normal.enName || node.normal.zhName || ''}\n`;
                                                }
                                                else {
                                                    node.normal.title += `${node.normal.enName || ''}\n`;
                                                }
                                            }
                                        });
                                        const newData = {
                                            nodes: data,
                                            lines: options.data.lines,
                                        };
                                        chart.setData(newData, {
                                            isAdd: false,
                                        });
                                        return true;
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    // show: false,
                    name: 'help',
                    float: 'right',
                    title: '帮助',
                },
            ],
        },
        // 水印信息
        waterMark: {
            // 可以是文本字符串，也可以是img
            // content: waterMark,
            content: 'UniGraphic',
            position: [0, 0], // 水印起始位置
            rotate: 30, // 旋转 0代表0°
            repeat: { x: true, y: true },
            space: { // 重复间距
                right: 40,
                bottom: 60,
            },
            // 样式，同CanvasRenderingContext2D
            style: {
                fillStyle: 'rgba(0,0,255,0.5)',
            },
        },
    };
    // 节点详情字段提取方法
    const pick = (cell) => {
        const info = chart.pickDetailItem(cell);
        if (info.nodes.length) {
            info.nodes.forEach((e) => {
                e.detail.menu[0] = {
                    title: '关闭提取',
                    callback: () => {
                        chart.setData(chart.getData(info.cacheId));
                    },
                };
            });
        }
        chart.setData(info);
    };
    const urlQuery = UniUtil.getUrlParams();
    /**
     * url参数：
     * layout               布局算法
     * scale                缩放比例
     * direction            方向
     * lineType             连线类型
     * nodeMarginBottom     下边距
     * nodeMarginRight      右边距
     * random               随机生成
     * nodeLen              随机节点数量
     * lineLen              随机连线数量
     */
    if (urlQuery.layout) {
        options.graphic.layout = urlQuery.layout;
    }
    if (urlQuery.scale) {
        options.graphic.scale = +urlQuery.scale;
    }
    if (urlQuery.direction) {
        options.graphic.direction = urlQuery.direction;
        options.graphic.line.default.inAndOut = urlQuery.direction.split('2');
    }
    if (urlQuery.lineType) {
        options.graphic.line.default.lineType = urlQuery.lineType;
    }
    if (urlQuery.nodeMarginBottom) {
        options.graphic.node.global.margin.bottom = +urlQuery.nodeMarginBottom;
    }
    if (urlQuery.nodeMarginRight) {
        options.graphic.node.global.margin.right = +urlQuery.nodeMarginRight;
    }
    const isRandom = urlQuery.random;
    if (isRandom) {
        // 随机生成节点及连线
        const nodesLength = +urlQuery.nodeLen || 3;
        let i;
        for (i = 0; i < nodesLength; i++) {
            const keys = Object.keys(chart.imgCached);
            const index = Math.floor(keys.length * Math.random());
            const icon = chart.imgCached[keys[index]];
            const type = keys[index];
            const name = icon.dataset.title;
            const title = `${type}${i}`;
            const schema = `${type}Schema${i}`;
            const zhName = `${name}${i}`;
            const enName = `${type}${i}`;
            // 随机的节点数据添加到对应数组内
            options.data.nodes.push({
                type,
                id: `node-${i}`,
                normal: {
                    title, schema, zhName, enName,
                },
                // 节点详情信息
                detail: {
                    // 标题
                    title: `Detail: ${type}${i}`,
                    // 颜色
                    color: icon.dataset.color,
                    // 字段
                    items: [
                        { title: '昵称', icon, id: `node-${i}-0` },
                        { title: '密码', icon, id: `node-${i}-1` },
                        { title: '登录设备号', icon, id: `node-${i}-2` },
                        { title: '姓名', icon, id: `node-${i}-3` },
                        { title: '年纪', icon, id: `node-${i}-4` },
                        { title: '所在地', icon, id: `node-${i}-5` },
                        { title: '生日月份', icon, id: `node-${i}-6` },
                    ],
                    // 字段连线
                    lines: [],
                    // 提取功能
                    menu: [
                        {
                            title: '提取',
                            callback: pick,
                        },
                    ],
                },
                // 节点浮窗信息,双括号为语法模板，将变量（string、number、object...)写入模板中，
                // 如{{name}}、{{user.name}}、{{list[1]}}，采用正则方法过滤匹配
                tooltip: {
                    formatter: '标题：{{normal.title}}\n中文名：{{normal.zhName}}\n英文名：{{normal.enName}}',
                },
            });
        }
        const linesLength = +urlQuery.lineLen || 2;
        for (let j = 0; j < linesLength; ++j) {
            const sI = Math.floor(nodesLength * Math.random());
            const tI = Math.floor(nodesLength * Math.random());
            options.data.lines.push({
                source: `node-${sI}`,
                target: `node-${tI}`,
            });
            options.data.nodes[sI].detail.lines.push(
                {
                    source: `node-${sI}-${Math.floor(7 * Math.random())}`,
                    target: `node-${tI}-${Math.floor(7 * Math.random())}`,
                },
                {
                    source: `node-${sI}-${Math.floor(7 * Math.random())}`,
                    target: `node-${tI}-${Math.floor(7 * Math.random())}`,
                },
            );
        }
        chart.setOption(options);
        // 隐藏加载中
        UniUtil.showLoading(false);
    }
    else {
        // 对数据进行进一步处理
        const fixData = (data) => {
            const nodeTypeMap = {
                TransformationTask: 'task',
                ETLTask: 'task',
            };
            const checkDetailChildren = (node) => {
                if (node.detail) {
                    if (typeof node.detail.load === 'string') {
                        const filename = node.detail.load;
                        node.detail.load = (n, cb) => {
                            UniUtil.ajax({
                                url: `../data/${filename}.json`,
                            }).then((res) => {
                                fixData(res);
                                cb({
                                    children: res,
                                });
                            });
                        };
                    }
                    if (node.detail.children && node.detail.children.nodes instanceof Array) {
                        node.detail.children.nodes.forEach(checkDetailChildren);
                    }
                    if (node.detail.lines instanceof Array) {
                        node.detail.lines.forEach((l) => {
                            l.lineType = 'straight';
                        });
                    }
                }
            };
            data.nodes.map((e) => {
                if (e.type in nodeTypeMap) {
                    e.type = nodeTypeMap[e.type];
                }
                else {
                    e.type = e.type.toLowerCase();
                }
                if (!e.normal) {
                    e.normal = {};
                }
                e.normal.icon = chart.imgCached[e.type] || chart.imgCached.empty;
                if (!e.detail) {
                    e.detail = {};
                }
                e.detail.color = e.normal.icon.dataset.color;
                if (!e.detail.menu) {
                    e.detail.menu = [{}];
                }
                e.detail.menu[0].title = '提取';
                e.detail.menu[0].callback = pick;
                e.menu = [
                    {
                        title: '查看详情',
                        callback: (item) => {
                            window.open(`https://www.baidu.com/?id=${item.data.id}`);
                        },
                    },
                    {
                        title: '查看血统图',
                        callback: (item) => {
                            window.open(`https://www.baidu.com/?id=${item.data.id}`);
                        },
                    },
                    {
                        title: 'separator',
                    },
                    {
                        title: '查看影响图',
                        callback: () => {
                            window.open('http://127.0.0.1:8008/demo/html/datamap.html?file=datamap-4', '_blank');
                        },
                    },
                    {
                        title: '查看数据地图',
                        callback: () => {
                            window.open('http://127.0.0.1:8008/demo/html/datamap.html', '_blank');
                        },
                    },
                ];
                checkDetailChildren(e);
                return e;
            });
        };
        // 异步加载数据
        UniUtil.ajax({
            url: `../data/${urlQuery.file || 'datamap-0'}.json`,
        }).then((data) => {
            fixData(data);
            Object.assign(options.data, data);
            chart.setOption(options);
            // 隐藏加载中
            UniUtil.showLoading(false);
        });
    }
})();
