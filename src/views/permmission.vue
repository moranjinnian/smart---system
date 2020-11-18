<template>
    <div class="layout-cont">
        <el-container>
            <el-header class="home-header-body">
                <div class="header-layout">
                    <div class="header_menu"></div>
                    <div class="header_menu hrar_left"><span class="icon iconfont icon-earth"></span>
                        &nbsp;<span>某某监控</span></div>
                    <div class="header_menu hrar_left"><span
                            class="icon iconfont icon-bulb"></span>&nbsp;<span>智慧某某</span>
                    </div>
                    <div class="header_menu hrar_left"><span
                            class="icon iconfont icon-qiaoliang"></span>&nbsp;<a href="/bridgeHome">某某监测</a>
                    </div>
                    <div class="header_menu_title">此处为logo</div>
                    <div class="header_menu hrar_rigth"><span
                            class="icon iconfont icon-fenzu"></span>&nbsp;<span>某某某某</span>
                    </div>
                    <div class="header_menu hrar_rigth"><span
                            class="icon iconfont icon-daxingbengzhan"></span>&nbsp;<span>某某监控</span>
                    </div>
                    <div class="header_menu hrar_rigth"><span
                            class="icon iconfont icon-yangchen"></span>&nbsp;<span>某某莫某</span></div>
                    <div class=" header_menu">
                        <user @tst="tst"></user>
                    </div>
                </div>
            </el-header>
            <el-main class="main_container">
                <div class="page_header">
                    <div class="home_left_body">
                        <div class="home_left">
                            <div id="table_run">
                                <div class="div-title">
                                    <span class="icon iconfont icon-barchart"></span>&nbsp;
                                    <span>报警数量统计</span>
                                </div>
                                <div style="padding-left: 1rem">
                                    <table class="top-const">
                                        <thead>
                                        <tr class="top-const_tr">
                                            <th>项目</th>
                                            <th>接入量</th>
                                            <th>正常</th>
                                            <th>异常</th>
                                            <th>离线</th>
                                        </tr>
                                        </thead>
                                        <tbody class="tbody-top">
                                        <tr v-for="(item,index) in tabledata1" :key="index">
                                            <td>{{ item.project }}</td>
                                            <td>{{ item.accessNum }}</td>
                                            <td>{{ item.zc }}</td>
                                            <td>{{ item.yc }}</td>
                                            <td>{{ item.lx }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div id="lin_chart" style="margin-top: 10%;">
                                <div class="div-title">
                                    <span class="icon iconfont icon-areachart"></span>&nbsp;
                                    <span>报警趋势图</span>
                                </div>
                                <div style="height: calc(100% - 3rem)">
                                    <mychart></mychart>
                                </div>
                            </div>
                        </div>
                        <div class="home_rigth">
                            <div>
                                <div class="div-title-rigth">
                                    <span class="icon iconfont icon-bingtu1"></span>&nbsp;
                                    <span>报警数量对比</span>
                                </div>
                                <div style="height: calc(80% - 3rem);width: 100%">
                                    <ringchart></ringchart>
                                </div>
                                <div class="rin-but-div">
                                    <div>
                                        <div class="num">125</div>
                                        <div class="type">
                                            <span class="type-span" style="background: #94a04e">轻</span>&nbsp;轻度报警
                                        </div>
                                    </div>
                                    <div>
                                        <div class="num">97</div>
                                        <div class="type">
                                            <span class="type-span" style="background: #b05c3a">中</span>&nbsp;中度报警
                                        </div>
                                    </div>
                                    <div>
                                        <div class="num">34</div>
                                        <div class="type">
                                            <span class="type-span" style="background: #86142f">重</span>&nbsp;重度报警
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 10%">
                                <div class="div-title-rigth" style="text-align:center">
                                    <el-button id="el-button-acti" @click="yhclick(1,$event)" class="el-button-zdy">
                                        养护计划
                                    </el-button>
                                    <el-button @click="yhclick(2,$event)" class="el-button-zdy">养护记录</el-button>
                                </div>
                                <div style="height: calc(100% - 3rem)">
                                    <columnchart></columnchart>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100vw;height: calc(100vh - 60px );display: flex">
                            <div class="orea oreal" :style="mapConter"></div>
                            <div id="container" style="width:100%; height:100%;resize:both;"></div>
                            <div class="orea orear" :style="mapConter"></div>
                        </div>
                        <div class="home_buttom" style="width: 100vw;height: 30vh;">
                            <div class="runtable" style="height: 140px">
                                <span class="icon iconfont icon-stock"></span>&nbsp;
                                <span>报警趋势图</span>
                            </div>
                            <div style="height: 45px"></div>
                            <div class="top">
                                <table class="top">
                                    <thead>
                                    <tr class="top_th">
                                        <th>时间</th>
                                        <th>检测点</th>
                                        <th>设备名称</th>
                                        <th>报警状态</th>
                                        <th>报警值</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div style="background: #0e1a30;width: 100%;height: 100%">
                                <div class="scroll-box">
                                    <table class="tab-scroll">
                                        <tbody class="tab-boy">
                                        <tr v-for="(item,index) in tableData" :key="index">
                                            <td>{{ item.time }}</td>
                                            <td>{{ item.jcd }}</td>
                                            <td>{{ item.name }}</td>
                                            <td v-if="item.type == 0">
                                                <div class="warningType" style="background: #42b983"></div>
                                            </td>
                                            <td v-if="item.type == 1">
                                                <div class="warningType" style="background: red"></div>
                                            </td>
                                            <td v-if="item.type == 2">
                                                <div class="warningType" style="background: #999999"></div>
                                            </td>
                                            <td>{{ item.value }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import '@/style/custom.css'
    import mychart from '@/components/charts/lineChart'
    import user from '@/components/user/usermsg'
    import ringchart from '@/components/charts/ringChart'
    import columnchart from '@/components/charts/columnChart'
    // import {CircleShow, start} from "../../public/mapAnimate.js"

    export default {
        name: "layout",
        components: {
            mychart,
            user,
            ringchart,
            columnchart
        },
        data() {
            return {
                maxZoom: 5000,
                timeindex: 0,
                zoomIndex: 10, // 层级放大活缩小
                mapConter: {'width': '20vw'},
                transforml: 'translate3d(-20vw, 0, 0)',
                transformr: 'translate3d(20vw, 0, 0)',
                transformb: 'translate3d(0, 40vh, 0)',
                tabledata1: [
                    {project: '某某', accessNum: '80', zc: '60', yc: '15', lx: '3'},
                    {project: '某某', accessNum: '70', zc: '60', yc: '15', lx: '3'},
                    {project: '扬尘', accessNum: '35', zc: '20', yc: '14', lx: '1'},
                    {project: '某某', accessNum: '70', zc: '60', yc: '15', lx: '3'},
                    {project: '某某', accessNum: '50', zc: '60', yc: '15', lx: '3'},
                    {project: '某某', accessNum: '50', zc: '60', yc: '15', lx: '3'}
                ],
                tableData: [
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '1', type: '1', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '2', type: '0', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '3', type: '2', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '4', type: '0', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '5', type: '2', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '6', type: '0', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '7', type: '1', value: '-1589.42'},
                    {time: '2020-01-03 12:00', jcd: '北控客服中心西门', name: '8', type: '2', value: '-1589.42'}
                ],
                butType: false,
                dialogVisible: false,
                markArr: [],
                drawer: false,
                show: false,
                map: null,
                show2: false,
                isHoverout: true,
                activeName: '',
                direction: 'rtl',
                background: this.$store.state.background,
                color: this.$store.state.fontcolor,
                menuactbackcolor: this.$store.state.menubackground,
                menuhovebackcolor: this.$store.state.menuhovebackcolor,
                themeStyle: {
                    'background': this.$store.state.background,
                    'color': this.$store.state.fontcolor,
                }
            }
        },
        mounted() {
            this.initMapData();
            this.runtable();
        },
        methods: {
            yhclick(type, e) {
                let el = e.currentTarget;
                let ty = document.getElementById('el-button-acti')
                if (ty) {
                    ty.id = ''
                }
                el.id = 'el-button-acti'
            },
            // 展开/关闭侧边栏
            tst() {
                let left = document.getElementsByClassName('home_left')[0]
                let rigth = document.getElementsByClassName('home_rigth')[0]
                let buttom = document.getElementsByClassName('home_buttom')[0]
                left.style.transform = this.transforml
                rigth.style.transform = this.transformr
                buttom.style.transform = this.transformb
                let zcl = 'translate3d(-20vw, 0, 0)'
                let zcr = 'translate3d(20vw, 0, 0)'
                let zcb = 'translate3d(0, 40vh, 0)'
                this.transforml = this.transforml === zcl ? 'translate3d(0vw, 0, 0) rotateY(20deg)' : zcl
                this.transformr = this.transformr === zcr ? 'translate3d(0vw, 0, 0) rotateY(-20deg)' : zcr
                this.transformb = this.transformb === zcb ? 'translate3d(0, 0vh, 0)' : zcb
                this.mapConter.width = this.mapConter.width === '20vw' ? '0' : '20vw'
                this.mapConter.height = this.mapConter.height === '100%' ? '100vw' : '100%'
            },
            // 页面下方列表
            runtable() {
                var sTab = document.getElementsByClassName('tab-scroll')[0];//要滚动的表
                var tbody = sTab.getElementsByTagName('tbody')[0];//要滚动表格的内容
                sTab.appendChild(tbody.cloneNode(true));//追加一次滚动内容,以防滚动后可视区域无内容
                var speed = sTab.getElementsByTagName('td')[0].offsetHeight;//每次滚动的距离
                var tbdh = tbody.offsetHeight;//整个表的高度,是因为上边的边不算滚动
                function scrollTop() {
                    var t = sTab.offsetTop;//获取要滚动表的位置
                    if (-tbdh >= t) {//比较  滚动的距离等于整个表的高度   即第一个表完全看不见
                        sTab.style.transition = '0s';//过渡动画设为0秒
                        sTab.style.top = 0;//位置设为初始位置
                        scrollTop();//因为偷梁换柱消耗了一次过程,所以把这一次过程补回来
                    } else {
                        sTab.style.transition = '1s';
                        sTab.style.top = t - speed + 'px';
                    }
                }

                setInterval(scrollTop, 1000);
            },
            initMapData() {
                let the = this
                this.map = new AMap.Map('container', {
                    // mapStyle: 'amap://styles/e389fccfb129d0b321a170a90c977778', //设置地图的显示样式
                    // mapStyle: 'amap://styles/53b91c3e976d7050f5d35e90ad397fcf', //设置地图的显示样式
                    mapStyle: 'amap://styles/53e19c0d7c76c1fcb159f66151ccb944', //设置地图的显示样式
                    layers: [
                        // 高德默认标准图层
                        new AMap.TileLayer,
                        // 楼块图层
                        new AMap.Buildings({
                            zooms: [14, 20],
                            zIndex: 10,
                            // heightFactor: 2//2倍于默认高度，3D下有效
                        })
                    ],
                    resizeEnable: true,
                    rotateEnable: true,
                    pitchEnable: true,
                    zoom: the.zoomIndex,
                    pitch: 60,
                    rotation: -15,
                    viewMode: '3D', //开启3D视图,默认为关闭
                    buildingAnimation: true, //楼块出现是否带动画
                    expandZoomRange: false,
                    zooms: [3, 20],
                    center: [116.979938, 36.662371]
                });
                this.map.addControl(new AMap.ControlBar({
                    showZoomBar: false,
                    showControlButton: true,
                    position: {
                        right: '10px',
                        top: '10px'
                    }
                }))
                this.map.on('zoomchange', this.mapZoom);
                let markerList = [
                    '116.641593,36.970108,jg,red',
                    '117.210136,36.868001,zm,yellow',
                    '117.424369,37.042488,ql,green',
                    '116.759696,36.56086,gs,red',
                    '116.956077,36.569684,bz,red',
                    '117.479301,36.685406,yc,yellow']
                for (let i = 0; i < markerList.length; i++) {
                    let mark = markerList[i].split(',')
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(mark[0], mark[1]),

                        offset: new AMap.Pixel(-7, -53),
                        content: '<div class="mark" style="position: absolute;left: -20px;top:-20px">' +
                            '</div>',
                    });
                    this.map.add(marker);

                    let circle = new AMap.Circle({
                        center: new AMap.LngLat(mark[0], mark[1]),  // 圆心位置
                        radius: the.maxZoom, // 圆半径
                        fillColor: mark[3],   // 圆形填充颜色
                        fillOpacity: 0.2,// 透明
                        strokeOpacity: 0.2,
                        strokeColor: mark[3],
                        strokeWeight: 3, // 描边宽度
                    });
                    let circle1 = new AMap.Circle({
                        center: new AMap.LngLat(mark[0], mark[1]),  // 圆心位置
                        radius: the.maxZoom, // 圆半径
                        fillColor: mark[3],   // 圆形填充颜色
                        fillOpacity: 0.2,// 透明
                        strokeOpacity: 0.2,
                        strokeColor: mark[3],
                        strokeWeight: 3, // 描边宽度
                    });
                    the.map.getZoom()
                    this.markArr.push(circle)
                    // console.log(circle.setRadius())
                    setInterval(function () {
                        if (the.timeindex >= the.maxZoom) {
                            the.timeindex = 0
                        }
                        circle1.setRadius(the.timeindex)
                        the.timeindex += 50
                    }, 100);
                    this.map.add(circle);
                    this.map.add(circle1);
                }
            },
            mapZoom() {
                let the = this
                if (this.map.getZoom()) {
                    this.markArr.forEach(function (item) {
                        if (the.zoomIndex * 1 < the.map.getZoom() * 1) {
                            the.maxZoom = item.getRadius() - item.getRadius() / the.map.getZoom() * 1.5
                        } else {
                            the.maxZoom = item.getRadius() + item.getRadius() / the.map.getZoom() * 1.5
                        }
                        item.setRadius(the.maxZoom)
                    })
                    the.zoomIndex = the.map.getZoom()
                }
            }
        },
    }
</script>
