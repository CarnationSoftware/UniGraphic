"use strict";

/* eslint-disable no-unreachable */
(function () {
  // 基础配置
  UniGraphic.config({
    style: {
      defaultColor: 'rgba(201, 205, 255, 0.13)',
      // 主色
      hoverColor: 'rgba(201, 205, 255, 0.13)',
      // 悬停色
      // activeColor: '#ff1e00', // 活动色
      activeColor: 'rgba(201, 205, 255, 0.13)',
      // 活动色
      warnColor: '#f8b13c' // 警告色

    }
  });
  var chart = new UniGraphic({
    graph: document.querySelector('#container')
  }, {
    is3D: true
  });
  window.chart = chart;
  var options = {
    // 工具栏
    toolbar: {
      // 工具栏样式
      orient: 'horizontal',
      // horizontal/vertical（水平、竖直方向） 可选
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
        name: 'reload',
        title: '重新加载'
      }, // {
      //     name: 'autoLayout',
      //     title: '自动布局',
      // },
      {
        name: 'pointer',
        title: '选择'
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
        name: 'undo',
        title: '回退',
        isActive: false
      }, {
        name: 'redo',
        title: '前进',
        isActive: false
      }, {
        show: true,
        name: 'fullscreen',
        title: '全屏'
      }, {
        // show: false,
        name: 'help',
        "float": 'right',
        title: '帮助'
      }]
    },
    data: {
      nodes: [],
      lines: []
    },
    // 节点浮窗
    tooltip: {
      show: true,
      // 是否显示
      showDelay: 0,
      // 显示延迟
      hideDelay: 0,
      // 隐藏延迟
      // position: [100, 100],
      content: '填充填充'
    },
    graphic: {
      layout: 'multiForce3D',
      isHighlightRelated: true,
      scale: 0.8
    }
  };
  UniUtil.ajax({
    url: '../data/3d-0.json'
  }).then(function (data) {
    var nodesMap = {};
    data.nodes.forEach(function (e) {
      nodesMap[e.id] = e;
      e.tooltip = {
        formatter: '标题：{{normal.title}}\n中文名：{{normal.zhName}}\n英文名：{{normal.enName}}'
      };
      var i = 1;

      while (i < 10) {
        e.detail.items.push({
          title: "ABC-DEF-GHI-".concat(e.id, "/").concat(i),
          id: "".concat(e.id, "/0")
        });
        ++i;
      }
    });
    data.lines.forEach(function (e) {
      if (!nodesMap[e.source].detail.lines) {
        nodesMap[e.source].detail.lines = [];
      }

      nodesMap[e.source].detail.lines.push({
        source: "".concat(e.source, "/0"),
        target: "".concat(e.target, "/0")
      });
    });
    Object.assign(options.data, data);
    chart.setOption(options);
  });
  return;
  var graph = new UniGraph3D(document.getElementById('container'));
  var render = graph.render;
  var scene = graph.root;
  var camera = graph.camera;
  var controls = graph.controls; // 物体

  var texture = new THREE.TextureLoader().load('../../UniGraphic/img/node-table.png');
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture
  }); // 中心

  var centerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  var centerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load('../../UniGraphic/img/scroll-bottom.png')
  });
  var center = new THREE.Mesh(centerGeometry, centerMaterial);
  scene.add(center); // 节点

  var nodes = []; // const randP = () => (Math.random() > 0.5 ? 1 : -1) * Math.floor(150 * Math.random());

  var randNode = function randNode() {
    return nodes[Math.floor(nodes.length * Math.random())];
  };

  var i = 20;

  while (i--) {
    nodes.push({
      sources: [],
      targets: []
    });
  }

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x999999
  });
  var lines = [];
  i = 10;

  while (i--) {
    var source = randNode();
    var target = randNode();
    source.targets.push(target);
    target.sources.push(source);
    lines.push({
      source: source,
      target: target
    });
  } // eslint-disable-next-line no-unused-vars


  var layoutInfo = UniGraphic.prototype.multiForce3DLayout(nodes, function () {
    nodes.forEach(function (node) {
      var shape = node.shape;
      shape.position.x = node.position[0];
      shape.position.y = node.position[1];
      shape.position.z = node.position[2];
    });
    lines.forEach(function (line) {
      var positions = line.shape.geometry.attributes.position.array;
      line.shape.geometry.attributes.position.needsUpdate = true;
      positions[0] = line.source.position[0];
      positions[1] = line.source.position[1];
      positions[2] = line.source.position[2];
      positions[3] = line.target.position[0];
      positions[4] = line.target.position[1];
      positions[5] = line.target.position[2];
    });
  });
  nodes.forEach(function (node) {
    var shape = new THREE.Mesh(geometry, material);
    shape.position.x = 0;
    shape.position.y = 0;
    shape.position.z = 0;
    node.shape = shape;
    scene.add(shape);
  });
  lines.forEach(function (line) {
    var geo = new THREE.BufferGeometry();
    geo.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
    var shape = new THREE.Line(geo, lineMaterial);
    line.shape = shape;
    scene.add(shape);
  });
  camera.position.z = 10; // 分层面
  // const levelMetarial = new THREE.MeshBasicMaterial({
  //     transparent: true,
  //     opacity: 0.3,
  // });
  // layoutInfo.levels.forEach((e) => {
  //     const geo = new THREE.CircleGeometry(100, 1000);
  //     const circle = new THREE.Mesh(geo, levelMetarial);
  //     circle.position.x = 0;
  //     circle.position.y = 0;
  //     circle.position.z = e.z - 1;
  //     scene.add(circle);
  // });
  // 载入模型

  var loader = new THREE.GLTFLoader();
  loader.load('/demo/img/snowscape.glb', function (gltf) {
    scene.add(gltf.scene);
  }); // 渲染

  var animate = function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render.render(scene, camera);
  };

  animate();
})();