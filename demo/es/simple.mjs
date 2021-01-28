// eslint-disable-next-line import/no-unresolved
import { UniGraphic } from '../../UniGraphic/es/UniGraphic.min.js';

UniGraphic.config({
    path: {
        base: '../../UniGraphic/',
    },
});

const chart = new UniGraphic({
    graph: document.querySelector('#container'),
});

const options = {
    title: '数据地图',
    data: {
        nodes: [],
        lines: [],
    },
};

fetch('../data/datamap-10.json').then((res) => {
    res.json().then((data) => {
        options.data = data;
        chart.setOption(options);
    });
});
