/*地图水波扩散特效 Start*/
// eslint-disable-next-line no-unused-vars
let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
// eslint-disable-next-line no-unused-vars
let cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
/**
 * sos告警圆形范围绘制(只有存在map对象时才可以使用)
 * @param radius 半径
 * @param level 层数
 * @param point BMap.Point对象，圆的中心点
 * @param color  颜色对象，包含{fillColor,fillOpacity}
 * @constructor
 */

// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars
let circles, map, radius, level, point, color, icon, speedOpacity, endOpacity, clock, circle

export function CircleShow(radiust, levelt, pointt, colort, icont, mapt) {
    map = mapt
    radius = radiust;
    level = new Number(levelt)
    point = pointt
    color = colort
    icon = icont
    if (Number.isNaN(level)) {
        level = 1;
    }//至少1层

    if (!color || !color.fillColor) {
        color = {
            fillColor: "blue",//默认蓝色
            fillOpacity: 0.3     //默认初始透明度0.3
        }
    }
    // var elasticMarker = new AMap.ElasticMarker({
    //     styles: [
    //         {
    //             icon: {
    //                 img: icon,
    //                 size: [145, 217],//可见区域的大小
    //                 ancher: [72.5, 217],//锚点
    //                 fitZoom: 18,//最合适的级别，在此级别下显示为原始大小
    //                 scaleFactor: 2,//地图放大一级的缩放比例系数
    //                 maxScale: 2,//最大放大比例
    //                 minScale: 0.257//最小放大比例
    //             }
    //         },
    //     ],
    //     zoomStyleMapping: {
    //         11: 0,
    //         12: 0,
    //         13: 0,
    //         14: 0,
    //         15: 0,
    //         16: 0,
    //         17: 0,
    //         18: 0,
    //         19: 0,
    //         20: 0
    //     },
    //     position: point,
    //     zIndex: 150
    // });
    // map.add(elasticMarker)
    //计算平均每段扩展距离的透明度
    endOpacity = 0.1;    //终止透明度设置为0.1
    speedOpacity = (color.fillOpacity - endOpacity) / radius;    //每米的透明度
    //按层数循环构造覆盖物，并加在图片上
    circles = new Array();
    for (let i = 1; i < level; i++) {
        var circle = new AMap.Circle({
            center: point,
            // icon: 'direct.png',
            radius: radius, //半径
            fillColor: color.fillColor, //圆形填充颜色
            fillOpacity: 0.2, //填充透明度
            strokeWeight: 1,
            strokeColor: color.fillColor, //线条颜色，为了保证感觉无线条，和填充颜色一致即可
            strokeOpacity: 0.2, //线条透明度，为了保证感觉无线条，和填充颜色透明度一致即可
            zIndex: 50
        });
        circles.push(circle);
        circle.setMap(map);
    }
    clock = new Array(level);
}

/**
 * 动画启动
 * @param distance 波纹间隔时间（单位ms）
 * @param t0 扩散一次所需的时间
 */
export function start(distance, t0) {
    /**
     * 定义动画函数
     * @param startTime 启动的初始时间
     * @param circle 圆形覆盖物对象
     * @param index 序号
     */
    function animateStart(startTime, circle, index) {
        //计算时间差
        let time = new Date().getTime() - startTime;
        if (time < 0) {
            circle.setRadius(0);                  //半径
            // circle.setFillOpacity(color.fillColor);   //透明度
            // circle.setStrokeOpacity(color.fillOpacity);   //透明度
            //如果未达到执行实现则直接等待
            clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
            return;
        }
        //计算当前半径
        //匀减速运动下，每隔t时间，应该扩散的半径:
        //r=r0*(2*t*t0-t*t)/t0
        //其中，r0为最终的扩散半径，即radius
        let r = Math.floor(radius * (2 * time / t0 - time * time / t0 / t0));
        // eslint-disable-next-line no-unused-vars
        let opacity = 0;
        if (time >= t0) {
            //达到运行时间之后
            //设置圆形覆盖物的样式
            circle.setRadius(radius);             //半径
            // circle.setFillOpacity(endOpacity);    //透明度
            // circle.setStrokeOpacity(endOpacity);  //透明度

            startTime = new Date().getTime() + distance;   //起始时间设置为当前时间加上1倍的时间间隔
            clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
        } else {
            //计算透明度
            let opacity = color.fillOpacity -
                Number.parseFloat((speedOpacity * r).toFixed(5));    //四舍五入小数点后5位

            //设置圆形覆盖物的样式
            circle.setRadius(r);            //半径
            circle.setOptions({
                strokeOpacity: opacity,
                fillOpacity: opacity
            })
            // circle.setFillOpacity(opacity);    //透明度
            // circle.setStrokeOpacity(opacity);   //透明度

            clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
        }
    }

    if (circles != undefined && circles != null) {
        // console.log(Math.round(radius * 0.1))
        // console.log(color)
        //先加一层红色的覆盖物，加在图片上表示覆盖范围
        let circleCenter = new AMap.Circle({
            center: point,
            radius: Math.round(radius * 0.1), //半径
            fillColor: color.fillColor,
            fillOpacity: color.fillOpacity,
            strokeWeight: 1,
            strokeColor: color.fillColor,
            strokeOpacity: color.fillOpacity,
            enableEditing: false,
            zIndex: 150
        });
        map.add(circleCenter);
        //循环每一层执行动画
        for (let i = 1; i < circles.length; i++) {
            animateStart(new Date().getTime() + i * distance, circles[i], i)
        }
    }
}

/**
 * 停止动画.
 */
export function stop() {
    for (let caf of clock) {
        window.cancelAnimationFrame(caf);
    }

    //重置覆盖物样式
    for (let circle of circles) {
        circle.setRadius(0);            //半径
        // circle.setFillOpacity(color.fillOpacity);     //透明度
        // circle.getStrokeOpacity(color.fillOpacity);    //透明度
    }

    clock = null;
}

/**
 * 移除覆盖物.
 */
export function remove() {
    //停止动画
    for (let caf of clock) {
        window.cancelAnimationFrame(caf);
    }

    map.remove(circle);
    for (let circle of circles) {
        map.remove(circle);
    }
}
/*地图水波扩散特效 End*/
