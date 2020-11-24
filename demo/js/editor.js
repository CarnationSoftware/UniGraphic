"use strict";

(function () {
  // 实例UniGraphic
  var chart = new UniGraphic({
    graph: document.querySelector('#chart')
  });
  var legendData = [];
  var imgName = ['table', 'task', 'quota', 'interface', 'statement'];
  imgName.forEach(function (e, index) {
    var img = new Image(35, 35);
    img.src = "".concat(UniGraphic.path.img, "/node-").concat(e, ".png");
    var label = document.createElement('span');
    label.innerHTML = ['表', '任务', '作业', '接口', '状态'][index];
    legendData.push({
      icon: img,
      title: label,
      type: e
    });
  }); // 节点连线编辑模板

  var lineEdit = function lineEdit() {
    var template = "<form>\n                            <div style='margin:15px auto'>\n                                <label style='margin-right: 10px;vertical-align:top;margin-left: 25px;'> <span style=\"color: red\">*</span>&nbsp;\u540D\u79F0</label><input style=\"border: 1px solid #E6E6E6FF;\n                                outline: none;padding:2px;background:#fff\" class='el-input' type=\"text\" name='name' required value={{name}}>\n                            </div>\n                            <div style='margin:20px auto 0'>\n                                <label style='margin-right: 10px;vertical-align:top;margin-left: 35px;'> \u63CF\u8FF0</label><textarea style=\"border: 1px solid #E6E6E6FF;padding:2px;\n                                outline: none;background:#fff\" class='el-input' rows=\"6\" cols=\"55\" name='description'>{{description}}</textarea>\n                            </div>\n                        </form>";
    return template;
  }; // 节点查看模板


  var lineView = function lineView() {
    var template = "<form>\n                            <div style='margin:15px auto'>\n                                <label style='margin-right: 6px;vertical-align:top;margin-left: 35px;'> \n                                \u540D\u79F0</label>\n                                <input disabled class='el-input' type=\"text\" name='name' style=\"border: 1px solid #E6E6E6FF;padding:2px;\n                                outline: none;\" value={{name}}>\n                            </div>\n                            <div style='margin:20px auto 0'>\n                                <label style='margin-right: 10px;vertical-align:top;margin-left: 35px;'>\n                                 \u63CF\u8FF0</label><textarea disabled class='el-input' rows=\"6\" cols=\"55\" \n                                 name='description' style=\"border: 1px solid #E6E6E6FF;\n                                outline: none;padding:2px;\">{{description}}</textarea>\n                            </div>\n                        </form>";
    return template;
  }; // 节点tip信息,双括号为语法模板，将变量（string、number、object...)写入模板中，
  // 如{{name}}、{{user.name}}、{{list[1]}}，采用正则方法过滤匹配


  var lineTipFormatter = '名称: {{name}}\n 描述: {{description}}'; // 创建节点间连线方法

  var lineCreated = function lineCreated(params, cb) {
    UniUtil.ajax({
      method: 'POST',
      url: '/api/return/success',
      data: params
    }).done(function (res) {
      if (res.status === 0) {
        // 不支持连线， 返回不能创建信息
        cb(res, false);
      } else {
        // 支持连线
        cb(res, true);
      }
    }).fail(function (errorMsg) {
      // 服务失败
      cb(errorMsg, false);
    });
  }; // 删除节点间连线方法


  var lineDelete = function lineDelete(params, cb) {
    UniUtil.ajax({
      method: 'POST',
      url: '/api/return/success',
      data: params
    }).done(function (res) {
      if (res.status === 0) {
        cb(res, false);
      } else {
        cb(res, true);
      }
    }).fail(function (errorMsg) {
      cb(errorMsg, false);
    });
  }; // 节点操作后的保存方法


  var save = function save(params, cb) {
    UniUtil.ajax({
      method: 'POST',
      url: '/api/return/data',
      data: params
    }).done(function (res) {
      if (res.status === 0) {
        cb(res, false);
      } else {
        cb(res, true);
      }
    }).fail(function (errorMsg) {
      cb(errorMsg, false);
    });
  }; // 图形渲染模拟数据


  var options = {
    // 标题
    title: '数据地图',
    // 画布渲染的节点\连线
    data: {
      nodes: [],
      lines: []
    },
    // 图例配置
    legend: {
      filter: 'none',
      show: false,
      // 是否显示
      position: 'right, top',
      // 显示位置
      rowCount: 3,
      // 一行显示图例的个数
      data: legendData // 图例数据 data[].type（需要和node.type对应,必填）/ data[].title / data[].icon
      // data（没有配置，会根据画布自动获取）

    },
    // 缩略图
    outline: {
      show: false,
      // 是否显示
      position: 'bottom,right' // 显示位置

    },
    // 节点浮窗
    tooltip: {
      show: true,
      // 是否显示
      showDelay: 0,
      // 显示延迟
      hideDelay: 0 // 隐藏延迟
      // position: [100, 100],
      // content: '填充填充',

    },
    // 图形配置
    graphic: {
      // 高亮联动
      isHighlightRelated: false,
      // 连线
      line: {
        draw: 'click',
        // 连线配置,defalut,circulation, inclusion等等自定义配置即可。
        // 该配置在工具栏toolbar数据中的连线功能中引用（338行、343行），
        // 设定连线时的样式、回调、修改、编辑、查看方法）。名字可以自定义，保证定义和引入时统一即可。
        "default": {
          // 连线、高亮、箭头样式
          style: {
            line: {
              stroke: '#999',
              linewidth: 1
            },
            highLine: {
              stroke: '#000',
              linewidth: 1
            },
            arrow: {
              stroke: '#999',
              linewidth: 1,
              fill: '#999'
            }
          },
          // 连线类型 可选值：straight、poly、curve
          lineType: 'poly',
          // 箭头类型 可选值: heavyArrow, taperedArrow
          arrowType: 'heavyArrow',
          // 是否可调整大小
          isResizable: false,
          // 线的编辑
          onEdit: lineEdit,
          // 线的查看
          onView: lineView,
          // 线tip格式
          tipFormatter: lineTipFormatter
        },
        circulation: {
          style: {
            line: {
              stroke: '#48C6FDFF',
              linewidth: 1
            },
            highLine: {
              stroke: '#008CD6FF',
              linewidth: 1
            },
            arrow: {
              stroke: '#48C6FDFF',
              linewidth: 1,
              fill: '#48C6FDFF'
            },
            highArrow: {
              stroke: '#008CD6FF',
              linewidth: 1,
              fill: '#008CD6FF'
            }
          },
          lineType: 'poly',
          arrowType: 'heavyArrow',
          isResizable: false,
          // 新建连线
          onCreate: lineCreated,
          // 删除连线
          onDelete: lineDelete,
          // 保存方法
          onSave: save,
          // 编辑方法
          onEdit: lineEdit,
          onView: lineView,
          tipFormatter: lineTipFormatter
        },
        inclusion: {
          style: {
            line: {
              stroke: '#999',
              linewidth: 1,
              lineDash: [10, 5]
            },
            highLine: {
              stroke: '#000',
              linewidth: 1
            },
            arrow: {
              stroke: '#999',
              linewidth: 1,
              fill: '#999'
            },
            highArrow: {
              stroke: '#000',
              linewidth: 1,
              fill: '#000'
            }
          },
          lineType: 'poly',
          arrowType: 'heavyArrow',
          isResizable: false,
          onCreate: lineCreated,
          onDelete: lineDelete,
          onSave: save,
          onEdit: lineEdit,
          onView: lineView,
          tipFormatter: lineTipFormatter
        }
      },
      centerFold: true,
      // 节点配置
      node: {
        // 应用到全部节点
        global: {
          targetFoldable: true,
          sourceFoldable: true,
          // 节点间的距离
          margin: {
            right: 150,
            bottom: 150
          },
          // 节点偏移
          offset: {
            left: 0,
            top: 0
          },
          // 节点宽高
          normal: {
            width: 50,
            height: 50
          },
          // 节点详情最大展示行数
          detail: {
            maxLines: 5
          }
        }
      }
    },
    // 工具栏
    toolbar: {
      // 工具栏样式
      orient: 'horizontal',
      // horizontal/vertical 可选
      // css原生属性
      style: {
        background: {
          backgroundColor: '#F3F3F3',
          height: '44px',
          boxShadow: '0px 6px 17px 1px rgba(0, 0, 0, 0.2)'
        },
        iconStyle: {
          padding: '2px',
          fontSize: '16px'
        }
      },
      // 工具栏菜单项
      data: [{
        name: 'save',
        title: '保存',
        onClick: save // 点击回调

      }, {
        name: 'delete',
        title: '删除',
        isActive: false
      }, {
        show: false,
        name: 'table',
        title: '表'
      }, {
        name: 'pointer',
        title: '选择'
      }, {
        name: 'drag',
        title: '拖动'
      }, {
        name: 'actualSize',
        title: '1:1'
      }, {
        name: 'zoomIn',
        title: '放大'
      }, {
        name: 'zoomOut',
        title: '缩小'
      }, {
        name: 'reload',
        title: '重新加载'
      }, {
        name: 'autoLayout',
        title: '自动布局'
      }, {
        name: 'outline',
        title: '缩略图',
        isAvailable: true
      }, {
        show: true,
        name: 'fullscreen',
        title: '全屏'
      }, {
        name: 'connect',
        title: '连线',
        onClick: {
          type: 'lines',
          data: {
            template: {
              type: '',
              data: [{
                name: '流向关系',
                type: 'circulation',
                id: '122'
              }, {
                name: '引用关系',
                type: 'inclusion',
                id: '123'
              }]
            }
          }
        }
      }, {
        name: 'exportImg',
        title: '导出图片'
      }, {
        name: 'exportExcel',
        title: '导出表格',
        onClick: function onClick() {
          var a = document.createElement('a');
          a.className = 'temporary-exportExcel';
          document.body.appendChild(a);
          a.download = "".concat(options.title, ".xlxs");
          a.href = ''; // `${url}?token=${token}&${hash}`;

          a.click();
          a.parentNode.removeChild(document.getElementsByClassName('temporary-exportExcel')[0]);
        }
      }, {
        name: 'filter',
        title: '过滤',
        onClick: {
          type: 'submenu',
          data: {
            template: "<table border=\"1\" style=\"border-collapse: collapse;padding: 10px;border: 1px solid #d9d9d9;margin: 16px\">\n                                         <thead>\n                                            <th style=\"padding: 0 10px\"></th>\n                                            <th style=\"padding: 0 10px\">\u7C7B\u578B</th>\n                                            <th style=\"padding: 0 10px\">\u8DEF\u5F84</th>\n                                        </thead>\n                                         <tbody>\n                                           <tr style=\"line-height: 30px;\">\n                                             <td style=\"padding: 0 10px\"><input type=\"checkbox\"/></td>\n                                             <td style=\"padding: 0 10px\">\u63A5\u53E3</td>\n                                             <td style=\"padding: 0 10px\">../abs/folder/</td>\n                                           </tr>\n                                           <tr style=\"line-height: 30px;\">\n                                             <td style=\"padding: 0 10px\"><input type=\"checkbox\"/></td>\n                                             <td style=\"padding: 0 10px\">\u8868</td>\n                                             <td style=\"padding: 0 10px\">./mode/_del_fes/newD_as/</td>\n                                           </tr>\n                                          </tbody>\n                                        </table>",
            buttons: [{
              name: '确定',
              callback: function callback() {
                UniUtil.toast('后台请求数据......');
                return true;
              }
            }]
          }
        }
      }, {
        name: 'legend',
        title: '图例'
      }, {
        name: 'separator',
        title: '分割线'
      }, {
        name: 'clear',
        title: '清除'
      }, {
        name: 'search',
        title: '搜索'
      }, {
        name: 'customConfig',
        title: '自定义配置',
        formatter: '',
        icon: '',
        onClick: {
          type: 'submenu',
          data: {
            template: {
              type: 'checkbox',
              data: [{
                name: '显示schema名称',
                value: 'schema'
              }, {
                name: '显示中文名',
                value: 'zhName'
              }, {
                name: '显示英文名',
                value: 'enName',
                checked: true
              }]
            },
            buttons: [{
              name: '确定',
              callback: function callback(values) {
                var data = zrender.util.clone(options.data.nodes);
                data.forEach(function (node) {
                  node.normal.title = '';

                  if (values.indexOf('schema') !== -1) {
                    node.normal.title += "".concat(node.normal.schema, "\n");
                  }

                  if (values.indexOf('zhName') !== -1) {
                    if (values.indexOf('enName') === -1) {
                      node.normal.title += "".concat(node.normal.zhName || node.normal.enName, "\n");
                    } else {
                      node.normal.title += "".concat(node.normal.zhName, "\n");
                    }
                  }

                  if (values.indexOf('enName') !== -1) {
                    if (values.indexOf('zhName') === -1) {
                      node.normal.title += "".concat(node.normal.enName || node.normal.zhName, "\n");
                    } else {
                      node.normal.title += "".concat(node.normal.enName, "\n");
                    }
                  }
                });
                var newData = {
                  nodes: data,
                  lines: options.data.lines
                };
                chart.setData(newData, {
                  isAdd: false
                });
                return true;
              }
            }]
          }
        }
      }]
    }
  }; // 节点详情字段提取方法

  var pick = function pick(cell) {
    var info = chart.pickDetailItem(cell);

    if (info.nodes.length) {
      info.nodes.forEach(function (e) {
        e.detail.menu[0] = {
          title: '关闭提取',
          callback: function callback() {
            chart.setData(chart.getData(info.cacheId));
          }
        };
      });
    }

    chart.setData(info);
  }; // 随机生成节点及连线


  var nodesLength = 5;
  var linesLength = 3;
  var i;

  for (i = 0; i < nodesLength; i++) {
    var index = UniUtil.randomNum(5);
    var type = ['table', 'task', 'quota', 'interface', 'statement'][index];
    var engName = ['table', '', 'quota', 'interface', 'statement'][index];
    var name = ['', '任务', '引用', '接口', '状态'][index];
    var sche = ['TBL', '', 'QOT', 'INTF', 'STT'][index];
    var color = ['#FF7667', '#47C5FD', '#05cb89', '#968AF7', '#FBAA24'][index];
    var icon = chart.imgCached[type];
    var title = "".concat(type);
    var schema = "".concat(sche).concat(i);
    var zhName = "".concat(name);
    var enName = "".concat(engName); // 随机的节点数据添加到对应数组内

    options.data.nodes.push({
      type: type,
      id: "node-".concat(i),
      normal: {
        title: title,
        icon: icon,
        schema: schema,
        zhName: zhName,
        enName: enName
      },
      // 节点详情信息
      detail: {
        // 标题
        title: "Detail: ".concat(type).concat(i),
        // 颜色
        color: color,
        // 字段
        items: [{
          title: '昵称',
          icon: icon,
          id: "node-".concat(i, "-0")
        }, {
          title: '密码',
          icon: icon,
          id: "node-".concat(i, "-1")
        }, {
          title: '登录设备号',
          icon: icon,
          id: "node-".concat(i, "-2")
        }, {
          title: '姓名',
          icon: icon,
          id: "node-".concat(i, "-3")
        }, {
          title: '年纪',
          icon: icon,
          id: "node-".concat(i, "-4")
        }, {
          title: '所在地',
          icon: icon,
          id: "node-".concat(i, "-5")
        }, {
          title: '生日月份',
          icon: icon,
          id: "node-".concat(i, "-6")
        }, {
          title: '所在公司地址',
          icon: icon,
          id: "node-".concat(i, "-7")
        }],
        // 字段连线
        lines: [] // 提取功能

      },
      // 节点浮窗信息，双括号为语法模板，将变量（string、number、object...)写入模板中，
      // 如{{name}}、{{user.name}}、{{list[1]}}，采用正则方法过滤匹配
      tooltip: {
        formatter: '标题：{{normal.title}}\n中文名：{{normal.zhName}}\n英文名：{{normal.enName}}'
      },
      menu: [{
        title: '提取',
        callback: pick
      }, {
        title: '查看属性',
        callback: function callback() {
          window.open('http://127.0.0.1:8008/jsdoc-sdk/index.html', '_blank');
        }
      }, {
        title: '查看血统图',
        callback: function callback() {
          window.open('https://www.baidu.com/', '_blank');
        }
      }, {
        title: 'separator'
      }, {
        title: '查看影响图',
        callback: function callback() {
          window.open('http://127.0.0.1:8008/demo/html/datamap.html?file=datamap-4', '_blank');
        }
      }, {
        title: '查看数据地图',
        callback: function callback() {
          window.open('http://127.0.0.1:8008/demo/html/datamap.html', '_blank');
        }
      }]
    });
  } // 随机生成连线


  var getRandomNum = function getRandomNum(max) {
    var exitNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var num = Math.floor(Math.random() * max);

    if (num !== exitNum) {
      return num;
    }

    return getRandomNum(max, exitNum);
  };

  for (i = 0; i < linesLength; i++) {
    var sId = getRandomNum(nodesLength);
    var tId = getRandomNum(nodesLength, sId); // 节点间连线

    options.data.lines.push({
      id: "line-".concat(i),
      source: "node-".concat(sId),
      target: "node-".concat(tId),
      detail: {
        name: '接口',
        description: '这是描述'
      },
      isEditable: false,
      // 是否可编辑
      isDeletable: false,
      // 是否可删除
      type: 'default'
    }); // 字段连线

    var n = 3;

    while (n--) {
      options.data.nodes[sId].detail.lines.push({
        source: "node-".concat(sId, "-").concat(UniUtil.randomNum(6)),
        target: "node-".concat(tId, "-").concat(UniUtil.randomNum(6)),
        id: "item-line-".concat(UniUtil.randomNum(6)),
        detail: {
          name: '接口',
          description: '这是描述'
        },
        // 是否可编辑、删除
        isEditable: false,
        isDeletable: false,
        type: 'default'
      });
    }
  } // 渲染画布模拟数据


  setTimeout(function () {
    chart.setOption(options);
  }, 300);
  window.chart = chart;
  /**
   * 树相关内容
   * options2 数据树的模拟数据
   */

  var baseSrc = '../../UniTree/img/tree-'; // 图片路径

  var iconArr = ['dir', 'view', 'table']; // 图片名称

  var treeLazy = new UniTree(document.getElementById('UniTree'));

  function randomStr() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var chars = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split('');
    var charLength = chars.length;
    var k = 0;
    var str = '';

    while (k < len) {
      str += chars[Math.floor(charLength * Math.random())];
      ++k;
    }

    return str;
  }

  var usedUnionId = {};

  function createUnionId() {
    var id = randomStr(18);

    if (!usedUnionId[id]) {
      usedUnionId[id] = true;
      return id;
    }

    return createUnionId();
  }

  function fixData(data) {
    data.forEach(function (item) {
      var randomNum = Math.floor(Math.random() * 3);
      var iconSrc = "".concat(baseSrc).concat(iconArr[randomNum], ".png");
      item.icon = iconSrc;
      item.expanded = false;
    });
  }

  treeLazy.onCreate(function (node) {
    var dragDom = node.dom.querySelector('.mg-tree-group-item-title-icon');
    chart.addDragSource(node.dom, {
      data: {},
      onDragStart: function onDragStart() {
        // 制造拖动节点
        var dragLenth = 3;
        var dragdomArr = [];

        for (i = 0; i < dragLenth; i++) {
          var obj = {};
          UniUtil.assignDeeply(obj, options.data.nodes[UniUtil.randomNum(nodesLength)]);
          dragdomArr.push(obj); // dragdomArr[i].id = `node-${UniUtil.randomNum(100, 10)}`;

          dragdomArr[i].id = "node-".concat(i + 50);
        }

        var dragData = {
          nodes: dragdomArr,
          lines: [{
            source: dragdomArr[0].id,
            target: options.data.nodes[0].id,
            data: {
              name: '接口',
              description: '这是描述'
            },
            isEditable: false,
            isDeletable: false
          }, {
            source: "".concat(dragdomArr[1].id),
            target: "".concat(dragdomArr[2].id),
            data: {
              name: '接口',
              description: '这是描述'
            },
            isEditable: false,
            isDeletable: false
          }]
        };
        return dragData;
      },
      follower: {
        dom: dragDom
      },
      offset: {
        top: 14,
        left: 14
      }
    });
  });
  treeLazy.setConfig({
    // 节点
    data: [],
    // 支持搜索
    filter: {
      show: true,
      autoComplete: true,
      data: [] // 自动填充的数据,不提供将从树当前显示的节点中提取

    },
    // 分页器配置
    pagination: {
      show: true,
      total: 2,
      // 总条数
      current: 1,
      // 当前页
      pageSize: 8,
      // 每页展示条数
      pageCount: 6 // 展示的页面数量

    },
    // 是否支持懒加载
    lazy: true,
    // 加载节点的展开数据 注：这里可以请求接口，整理数据后返回给数据树
    load: function load(node, callback) {
      // 异步加载数据
      UniUtil.ajax({
        url: '/data/lazytree-0.json'
      }).then(function (data) {
        var result = []; // 如果节点数据中存在分页信息，需要获取指定分页的数据信息；如果没有，默认获取第一页

        var pageOptions;
        var startNum = 1;
        var endNum = treeLazy.options.pagination.pageSize;

        if (node.pageInstance && node.pageInstance.pageOptions) {
          pageOptions = node.pageInstance.pageOptions;
          startNum = (pageOptions.current - 1) * pageOptions.pageSize + 1;
          endNum = pageOptions.current * pageOptions.pageSize;
        } // 保证在范围内取


        if (node.data && node.data.childrenLength && endNum > node.data.childrenLength) {
          endNum = node.data.childrenLength;
        } // 根据id，分页获取对应的数据


        if (!node.id) {
          result = data.all.slice(startNum - 1, endNum);
        } else {
          result = data[node.id].slice(startNum - 1, endNum);
        }

        fixData(result);
        callback(result);
      });
    },
    // 右键功能菜单列表 树内置了添加节点、修改节点、删除节点方法
    contextmenu: {
      show: true,
      data: [{
        value: '添加节点',
        callback: function callback(targetNode) {
          var random = Math.floor(Math.random() * 3);
          var iconSrc = "".concat(baseSrc).concat(iconArr[random], ".png");
          setTimeout(function () {
            treeLazy.append({
              name: "\u540D\u79F0".concat(createUnionId()),
              id: createUnionId(),
              childrenLength: random,
              icon: iconSrc,
              parentId: targetNode.id
            }, targetNode);
          }, 200);
        }
      }, {
        value: '修改节点',
        callback: function callback(targetNode) {
          treeLazy.modify(targetNode);
        }
      }, {
        value: '删除节点',
        callback: function callback(targetNode) {
          treeLazy.remove(targetNode);
        }
      }]
    },
    // 是否开启右键功能
    openRightKey: true,
    checkbox: {
      // 是否开启选中功能
      show: true,
      // 是否在点击节点的时候选中节点，默认false; false则只有在点击复选框的时候选中，true点击节点也可选中
      checkOnClickNode: false,
      defaultCheckedIds: ['1']
    }
  });
})();