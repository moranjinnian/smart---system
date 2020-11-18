<template>
    <div style="width: 100%;height: 100%">
        <div style="width: 100%;height: 100%;overflow: hidden" :id="mychart"></div>
    </div>
</template>

<script>
    export default {
        name: "lineChart",
        data() {
            return {
                mychart: new Date() + Math.random(),
                charts: {
                    names: ['某某', '某某', '某某', '某某', '某某', '扬尘'],
                    lineX: 314,
                    value: [89, 46, 52, 60, 40, 27]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let myehhart = this.$echarts.init(document.getElementById(this.mychart))
                var category = [
                    {name: "某某养护", value: 30},
                    {name: "某某养护", value: 10},
                    {name: "某某养护", value: 6},
                    {name: "某某养护", value: 17},
                    {name: "某某养护", value: 16},
                    {name: "扬尘养护", value: 25},
                ]; // 类别
                var total = 30; // 数据总数
                var datas = [];
                category.forEach(value => {
                    datas.push(value.value);
                });
                let option = {
                    xAxis: {
                        max: total,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 80,
                        top: 20, // 设置条形图的边距
                        right: 80,
                        bottom: 20
                    },
                    yAxis: [{
                        type: "category",
                        inverse: false,
                        data: category,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    }],
                    series: [{
                        type: "bar",
                        barWidth: 18,
                        legendHoverLink: false,
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    colorStops: [{
                                        offset: 0,
                                        color: "#3a7bfe" // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: "#4ff8e9" // 100% 处的颜色
                                        }
                                    ]
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "left",
                                formatter: "{b}",
                                textStyle: {
                                    color: "#99c6ec",
                                    fontSize: '110%'
                                }
                            }
                        },
                        data: category,
                        z: 1,
                        animationEasing: "elasticOut"
                    },
                        {
                            // 分隔
                            type: "pictorialBar",
                            itemStyle: {
                                normal: {
                                    color: "#061348"
                                }
                            },
                            symbolRepeat: "fixed",
                            symbolMargin: 6,
                            symbol: "rect",
                            symbolClip: true,
                            symbolSize: [1, 21],
                            symbolPosition: "start",
                            symbolOffset: [1, -1],
                            symbolBoundingData: this.total,
                            data: category,
                            z: 2,
                            animationEasing: "elasticOut"
                        },
                        {
                            // 外边框
                            type: "pictorialBar",
                            symbol: "rect",
                            symbolBoundingData: total,
                            itemStyle: {
                                normal: {
                                    color: "none"
                                }
                            },
                            label: {
                                normal: {
                                    formatter: (params) => {
                                        return params.data;
                                    },
                                    color: '#fff',
                                    position: 'right',
                                    distance: 10, // 向右偏移位置
                                    show: true
                                }
                            },
                            data: datas,
                            z: 0,
                            animationEasing: "elasticOut"
                        },
                        {
                            name: "外框",
                            type: "bar",
                            barGap: "-120%", // 设置外框粗细
                            data: [total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total],
                            barWidth: 25,
                            itemStyle: {
                                normal: {
                                    color: "transparent", // 填充色
                                    barBorderColor: "#1C4B8E", // 边框色
                                    barBorderWidth: 1, // 边框宽度
                                    // barBorderRadius: 0, //圆角半径
                                    label: {
                                        // 标签显示位置
                                        show: false,
                                        position: "top" // insideTop 或者横向的 insideLeft
                                    }
                                }
                            },
                            z: 0
                        }
                    ]
                };
                myehhart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
