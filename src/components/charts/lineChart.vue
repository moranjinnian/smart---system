<template>
    <div style="width: 100%;height: 100%">
        <div style="width: 100%;height: 100%;overflow: hidden" id="mychart"></div>
    </div>
</template>

<script>
    export default {
        name: "lineChart",
        data() {
            return {
                charts: {
                    names: ['某某', '某某', '某某', '某某', '某某', '扬尘'],
                    lineX: ['06/04', '06/05', '06/06', '06/07', '06/08', '06/09', '06/10'],
                    value: [
                        [74, 70, 74, 70, 74, 70, 74],
                        [64, 60, 64, 60, 64, 60, 64],
                        [54, 50, 54, 50, 54, 50, 54],
                        [44, 40, 44, 40, 44, 40, 44],
                        [34, 30, 34, 30, 34, 30, 34],
                        [24, 20, 24, 20, 24, 20, 24],
                    ]

                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let the = this
                var color = ['rgba(52,77,197', 'rgba(158,62,75', 'rgba(173,95,58', 'rgba(172,142,59', 'rgba(78,167,101', 'rgba(55,156,200']
                var lineY = []
                let myehhart = this.$echarts.init(document.getElementById('mychart'))
                for (var i = 0; i < the.charts.names.length; i++) {
                    var x = i
                    var data = {
                        name: the.charts.names[i],
                        type: 'line',
                        color: color[x] + ')',
                        smooth: false,
                        areaStyle: {
                            normal: {
                                color: new the.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color[x] + ', 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: color[x] + ', 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 5,
                        data: the.charts.value[i]
                    }
                    lineY.push(data)
                }
                var option = {
                    backgroundColor: 'rgba(13,35,94,0)',
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: the.charts.names,
                        textStyle: {
                            fontSize: 12,
                            color: 'rgb(0,253,255,0.6)'
                        },
                        right: '4%'
                    },
                    grid: {
                        top: '14%',
                        left: '7%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: the.charts.lineX,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(46,107,205,0.95)'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(46,107,205,0.95)'
                            },
                            formatter: function (params) {
                                return params.split(' ')[0]
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: 'rgba(46,107,205,0.95)'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(46,107,205,0.95)'
                            }
                        }
                    },
                    series: lineY
                }
                myehhart.setOption(option)
            }
        }
    }
</script>

<style scoped>

</style>
