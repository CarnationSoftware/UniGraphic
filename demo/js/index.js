"use strict";

(function () {
  // 不兼容就强制退出
  if (!URL || !fetch) {
    document.body.innerHTML = '<center style="margin-top:100px;">您的浏览器版本过低，无法继续浏览本网站，请使用最新版的Chrome或者Edge浏览器！</center>';
    throw new Error('Browser is too low!!!');
  } // 加载footer


  if (!/index\.html/.test(window.location.pathname)) {
    fetch('index.html').then(function (res) {
      res.text().then(function (html) {
        var dom = document.createElement('div');
        dom.innerHTML = html;
        document.body.append(dom.querySelector('footer'));
      });
    });
  } // 显示更多版本


  var editionMore = document.querySelector('.edition-more');

  if (editionMore) {
    editionMore.addEventListener('click', function () {
      editionMore.style.display = 'none';
      document.querySelectorAll('.edition .item').forEach(function (e) {
        e.style.display = 'block';
      });
    });
  } // 代码预览


  var codeBtn;
  var codeEditor;
  var codeView = document.querySelector('.code-view');

  if (codeView) {
    codeBtn = document.querySelector('.code');

    window.require(['vs/editor/editor.main'], function () {
      codeEditor = window.monaco.editor.create(codeView, {
        value: '// 加载中...',
        language: 'javascript',
        theme: 'vs-dark',
        readOnly: true
      });
    });

    codeBtn.addEventListener('click', function (e) {
      var data = e.currentTarget.dataset;
      codeView.classList.add('active');

      if (data.source) {
        fetch(data.source).then(function (res) {
          res.text().then(function (value) {
            codeEditor.setValue(value);
          });
        });
      }
    });
    codeView.querySelector('.close').addEventListener('click', function () {
      codeView.classList.remove('active');
    });
  } // 左侧菜单


  var menu = document.querySelector('.menu');
  var codeSources = {
    datamap: '/demo/es/datamap.js',
    simple: '/demo/es/simple.mjs',
    editor: '/demo/es/editor.js'
  };

  if (menu) {
    menu.addEventListener('click', function (e) {
      var item = e.target;

      if (item.classList.contains('item')) {
        menu.querySelectorAll('.active').forEach(function (a) {
          return a.classList.remove('active');
        });
        item.classList.add('active');

        if (item.parentNode.parentNode.classList.contains('group')) {
          item.parentNode.parentNode.classList.add('active');
        }

        var url = new URL(item.href);
        var name = url.pathname.match(/\/([^/]+)\.html/i)[1];

        if (name in codeSources) {
          codeBtn.dataset.source = codeSources[name];
        }

        codeView.classList.remove('active');
        codeEditor.setScrollTop(0);
      }
    });
  } // 首页整屏滚动


  if (/index\.html$/i.test(window.location.pathname)) {
    var downloadPage = document.querySelector('#download'); // eslint-disable-next-line no-undef

    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      mousewheel: true,
      releaseOnEdges: true,
      allowTouchMove: false,
      pagination: {
        el: '.swiper-pagination'
      },
      on: {
        reachEnd: function reachEnd() {
          if (downloadPage.scrollHeight > downloadPage.clientHeight) {
            swiper.mousewheel.disable();
          }
        }
      }
    });
    downloadPage.addEventListener('scroll', function (e) {
      if (e.target.scrollTop === 0) {
        swiper.mousewheel.enable();
      }
    });
    downloadPage.addEventListener('mousewheel', function (e) {
      if (downloadPage.scrollTop === 0) {
        if (e.deltaY < 0) {
          swiper.mousewheel.enable();
        } else {
          swiper.mousewheel.disable();
        }
      }
    });
  }
})();