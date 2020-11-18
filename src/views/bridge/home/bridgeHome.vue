<template>
    <div class="constant">
        <el-container>
            <el-header class="bridge-header">
                <div class="bridge-header-left">
                    <span>某 某 检 测 系 统</span>
                </div>
                <div class="bridge-header-right"></div>
                <div id="menu-active" @click="menuClick(2,$event)" class="bridge-menu bridge-menu1">
                    <span class="icon iconfont icon-bulb"></span>&nbsp;<span>运行监测</span>
                </div>
                <div @click="menuClick(2,$event)" class="bridge-menu bridge-menu2">
                    <span class="icon iconfont icon-bulb"></span>&nbsp;<span>养护计划</span>
                </div>
                <div @click="menuClick(2,$event)" class="bridge-menu bridge-menu3">
                    <span class="icon iconfont icon-bulb"></span>&nbsp;<span>养护任务</span>
                </div>
                <div @click="menuClick(2,$event)" class="bridge-menu bridge-menu4">
                    <span class="icon iconfont icon-bulb"></span>&nbsp;<span>统计分析</span>
                </div>
                <div @click="menuClick(2,$event)" class="bridge-menu bridge-menu5">
                    <span class="icon iconfont icon-bulb"></span>&nbsp;<span>系统配置</span>
                </div>
                <div class="bridge-menu6">
                    <div class=" ">
                        <user></user>
                    </div>
                </div>
            </el-header>
            <el-main class="bridge-main">
                <div style="height: 50px">
                    <el-button @click="buttonClick(2,$event)" id="button-active" class="el-button el-button1"
                               type="text">单位列表
                    </el-button>
                    <el-button @click="buttonClick(2,$event)" id="" class="el-button el-button2" type="text">地图标点
                    </el-button>
                </div>
                <div class="bridge-main-container">
                    <div class="bridge-main-container-left">
                        <div class="screen-query-left">
                            <div class="page-title"><span class="icon iconfont icon-Rightxiangyou33">&nbsp;报警列表</span>
                            </div>
                            <el-input style="width: 50%" size="medium" v-model="sbname"
                                      class="input-with-select">
                                <el-button class="input-button"
                                           style="margin-top: 0;background: none;color: #3eadd3;padding: 0"
                                           slot="append"
                                           icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                        <div class="container-left-main">
                            <el-table size="mini" class="el-table-first" :data="tableDataList"
                                      style="width: 100%">
                                <el-table-column prop="sb" label="设备">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.sb === 0"
                                              class="icon iconfont icon-IOTtubiao_huabanfuben tem-span wd">温度</span>
                                        <span v-if="scope.row.sb === 1"
                                              class="icon iconfont icon-yingbianji tem-span yb">应变</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="wz" label="位置">
                                </el-table-column>
                                <el-table-column show-overflow-tooltip prop="bjlx" label="报警类型">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.bjlx === 0"
                                              style="color: yellow"
                                              class="icon iconfont icon-yuandianzhong tem-span ">黄色</span>
                                        <span v-if="scope.row.bjlx === 1"
                                              style="color: red"
                                              class="icon iconfont icon-yuandianzhong tem-span">红色</span>
                                        <span v-if="scope.row.bjlx === 2"
                                              style="color: orange"
                                              class="icon iconfont icon-yuandianzhong tem-span">橙色</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="container-left-foot-left">
                            <el-pagination background class="div-page" :small="true" layout="jumper,prev, pager, next"
                                           :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="bridge-main-container-right">
                        <div class="screen-query-right">
                            <div class="page-title"><span class="icon iconfont icon-Rightxiangyou33">&nbsp;报警列表</span>
                            </div>
                            <div style="display: flex;position: absolute;right: 40px;">
                                <div class="dif-button-div">
                                    <el-button class="dif-but icon iconfont icon-21new" @click="monitorAdd">
                                        &nbsp;新增
                                    </el-button>
                                    <el-button class="dif-but icon iconfont icon-bianji" @click="monitorUpdate">&nbsp;编辑
                                    </el-button>
                                    <el-button class="dif-but icon iconfont icon-shanchu1">&nbsp;删除</el-button>
                                </div>
                                <div class="dif-input-div">
                                    <el-input placeholder="某某名称" class="dif-inp"></el-input>
                                </div>
                                <div class="dif-button-div">
                                    <el-button class="dif-but dis-but-primary">搜索</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="container-left-main-right">
                            <el-table size="mini" class="el-table-second" ref="multipleTable"
                                      @selection-change="tableSelect"
                                      @row-click="rowClick"
                                      :border="true"
                                      :data="tableDataList1"
                                      style="width: 100%">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="qlmc" label="某某名称">
                                </el-table-column>
                                <el-table-column prop="qlbm" label="某某编码">
                                </el-table-column>
                                <el-table-column show-overflow-tooltip prop="wz" label="位置">
                                </el-table-column>
                                <el-table-column show-overflow-tooltip prop="szdl" label="所在道路">
                                </el-table-column>
                                <el-table-column show-overflow-tooltip prop="yhdj" label="养护等级">
                                </el-table-column>
                                <el-table-column show-overflow-tooltip prop="xxxx" label="详细信息">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="container-left-foot">
                            <el-pagination class="div-page" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                                           layout="total, sizes, prev, pager, next, jumper" :total="400">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-dialog class="dif-dialog" width="50vw" :title="dialogTitle" :show-close="false"
                   :visible.sync="dialogVisible">
            <div style="padding: 20px 40px">
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="某某名称:">
                        <el-input class="dif-form-inp" v-model="addDateList.qlmc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="某某编码:">
                        <el-input class="dif-form-inp" v-model="addDateList.qlbm"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="位置:">
                        <el-input class="dif-form-inp" v-model="addDateList.wz"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="所在道路:">
                        <el-input class="dif-form-inp" v-model="addDateList.szdl"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="养护等级:">
                        <el-input class="dif-form-inp" v-model="addDateList.yhdj"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="addDateList" label-width="80px">
                    <el-form-item label="详细信息:">
                        <el-input class="dif-form-inp" type="textarea" :rows="2" v-model="addDateList.xxxx"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button class="dif-but-submit" @click="ialogVisible = false">确 定</el-button>
                        <el-button class="dif-but-close" @click="dialogVisible = false">取 消</el-button>
                 </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import user from '@/components/user/usermsg'

    export default {
        name: "bridgeHome",
        components: {
            user
        },
        data() {
            return {
                tableSelectList: [],
                dialogTitle: '',  // dialog title
                dialogVisible: false, // 控制dialog状态
                addDateList: {
                    qlmc: '',
                    qlbm: '',
                    wz: '',
                    szdl: '',
                    yhdj: '',
                    xxxx: ''
                }, // 新增 编辑字段
                sbname: '',
                tableDataList: [
                    {sb: 1, wz: '财政局西南侧', bjlx: 1},
                    {sb: 1, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 0},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 1, wz: '财政局西南侧', bjlx: 0},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 1},
                    {sb: 0, wz: '财政局西南侧', bjlx: 2},
                ],
                tableDataList1: [
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                    {qlmc: '鲤鱼江桥（三八路）', qlbm: '530775B0005', wz: '西环路交叉口', szdl: '西环路', yhdj: '二级', xxxx: '详细信息'},
                ]
            }
        },
        created() {

        },
        methods: {
            tableSelect(row) {
                this.tableSelectList = row
            },
            monitorUpdate() {
                if (this.tableSelectList.length > 1) {
                    this.$message({
                        message: '只能选择一项！',
                        type: 'warning'
                    });
                    return
                } else if (this.tableSelectList.length === 0) {
                    this.$message({
                        message: '至少选择一项！',
                        type: 'warning'
                    });
                    return
                }
                this.dialogVisible = true
                this.dialogTitle = '编辑'
            },
            monitorAdd() {
                this.removeSelect()
                this.dialogVisible = true
                this.dialogTitle = '新增'
            },
            rowClick(row) {
                this.$refs.multipleTable.toggleRowSelection(row)
                this.addDateList = row
            },
            menuClick(type, e) {
                let el = e.currentTarget;
                let ty = document.getElementById('menu-active')
                if (ty) {
                    ty.id = ''
                }
                el.id = 'menu-active'
            },
            buttonClick(type, e) {
                let el = e.currentTarget;
                let ty = document.getElementById('button-active')
                if (ty) {
                    ty.id = ''
                }
                el.id = 'button-active'
            },
            removeSelect() {
                this.addDateList = {
                    qlmc: '',
                    qlbm: '',
                    wz: '',
                    szdl: '',
                    yhdj: '',
                    xxxx: ''
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

    .wd {
        color: #6a4ee3 !important;
    }

    .yb {
        color: #3eadd3 !important;
    }

    .tem-span {
        font-size: 1rem !important;
    }

    .container-left-main {
        padding: 0 10px;
    }

    .container-left-foot {
        position: absolute;
        bottom: 10px;
        right: 2vw;
    }

    .container-left-main-right {
        padding: 0 2vw;
    }

    .container-left-foot-left {
        position: absolute;
        bottom: 10px;
        left: 0;
    }

    .bridge-main-container-left {
        width: 20%;
    }

    .bridge-main-container-right {
        width: 80%;
    }

    .bridge-main-container {
        height: calc(100% - 50px);
        display: flex;
    }

    #button-active {
        color: #54c3e8;
    }

    #menu-active {
        background: url("../../../assets/bridge/nav_bj1.png") !important;
        background-size: 100% 100% !important;
        color: #54c3e8 !important;
    }


    .el-button1 {
        margin-right: 2vw;
    }

    .el-button2 {
        margin-left: 2vw;
    }

    .bridge-main {
        height: calc(100vw - 60px);
        background: url("../../../assets/bridge/content_bj.png");
        background-size: 100% 100%;
    }

    .bridge-menu {
        width: 12vw;
        margin-top: 10px;
        background: url("../../../assets/bridge/nav_bj2.png");
        background-size: 100% 100%;
        height: calc(55px - 15px);
        color: #fff;
        line-height: 40px;
        cursor: pointer;
    }

    .bridge-menu:hover {
        width: 12vw;
        margin-top: 10px;
        background: url("../../../assets/bridge/nav_bj1.png");
        background-size: 100% 100%;
        height: calc(55px - 15px);
        color: #fff;
        line-height: 40px;
        cursor: pointer;
    }

    .bridge-menu1 {
        position: absolute;
        left: 18vw;
    }

    .bridge-menu2 {
        position: absolute;
        left: 28.5vw;

    }

    .bridge-menu3 {
        position: absolute;
        left: 39vw;
    }

    .bridge-menu4 {
        position: absolute;
        left: 49.5vw;
    }

    .bridge-menu5 {
        position: absolute;
        left: 60vw;
    }


    .bridge-menu6 {
        position: absolute;
        right: 1vw;
    }

    .bridge-header-left {
        background: url("../../../assets/bridge/title.png");
        background-size: 100% 100%;
        width: 20vw;
    }

    .bridge-header-right {
        position: absolute;
        left: 20vw;
        width: 80vw;
        height: 5px;
        background: url("../../../assets/bridge/title2.png");
        background-size: 100% 100%;
    }

    .bridge-header-left > span {
        width: 25vw;
        font-weight: bold;
        text-align: center;
        line-height: 60px;
        font-size: 3.5vh;
        color: #fff;
    }

    .constant {
        width: 100vw;
        height: 100vh;
        background: url("../../../assets/homePageImg/bj.png");
        background-size: 100vw 100vh;
    }

    .bridge-header {
        display: flex;
    }
</style>
