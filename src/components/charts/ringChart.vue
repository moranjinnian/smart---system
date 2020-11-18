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
                mychart: new Date(),
                charts: {
                    names: ['某某报警', '某某报警', '某某报警', '某某报警', '某某报警', '扬尘报警'],
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
                let color = ['rgba(50,123,250', 'rgba(244,201,7', 'rgba(23,216,161', 'rgba(122,60,235', 'rgba(15,197,243', 'rgba(55,156,200']
                let the = this
                let chartData = []
                let chartName = []
                for (let i = 0; i < the.charts.value.length; i++) {
                    chartData.push(
                        {
                            value: the.charts.value[i],
                            name: the.charts.names[i] + '-' + the.charts.value[i],
                            itemStyle: {
                                color: color[i] + ',0.7)',
                                borderColor: color[i] + ',0.8)',
                                borderWidth: 3
                            }
                        }
                    )
                    chartName.push((the.charts.names[i] + '-' + the.charts.value[i]))
                }
                let width = window.screen.width / 100 + 2.5;
                let option = {
                    dataset: {
                        source: chartData
                    },
                    legend: {
                        orient: 'vertical',
                        top: "center",
                        right: "6%",
                        icon: 'circle',
                        data: chartName,
                        formatter: function (name) {
                            let data = name.split('-')
                            let num = data[1] * 1 / 314 * 100
                            let target = num.toFixed(0)
                            let percent = data[1];
                            let arr = ['{a|' + percent + '} /' + ' {b|' + target + '%}', ' {c|' + data[0] + '}'];
                            return arr.join("\n")
                        },
                        textStyle: {
                            lineHeight: width,
                            color: '#8db8da',
                            align: 'right',
                            fontSize: width - 5.1,
                            rich: {
                                a: {
                                    color: '#fdfdfd',
                                    fontSize: width - 5.1,

                                },
                                b: {
                                    color: '#ffffff',
                                    fontSize: width - 5.1,

                                },
                                c: {
                                    color: '#8db8da',
                                    fontSize: width - 6.1,
                                },
                            }

                        },
                    },
                    series: [{
                        type: 'pie',
                        label: {
                            show: false,
                            formatter: function (e) {
                                let data = e.name.split('-')
                                let num = data[1] * 1 / 314 * 100
                                let target = num.toFixed(0)
                                let percent = data[1];
                                let arr = [percent + '/' + target + '%',  data[0]];
                                return arr.join("\n")
                            },
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: width - 10,
                                fontWeight: 'bold'
                            }
                        },
                        seriesLayoutBy: 'row',
                        radius: ['40%', '60%'],
                        center: ['20%', '50%'],
                    }]
                }
                let _t = 0;
                let dat = chartData
                myehhart.setOption(option)
                setInterval(() => {
                    // 取消之前高亮的图形
                    myehhart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: _t % dat.length
                    });
                    myehhart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 1,
                        dataIndex: _t % dat.length
                    });
                    _t++;
                    // 高亮当前图形
                    myehhart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: _t % dat.length
                    });
                    myehhart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 1,
                        dataIndex: _t % dat.length
                    });
                }, 2000)
            }
        }
    }
</script>

<style scoped>

</style>
