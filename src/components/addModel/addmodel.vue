<template>
    <div>
        <el-dialog class="dif-dialog" width="50vw" title="新增" :visible.sync="dialogVisible">
            <div style="height: 50vh">
                <el-form ref="form" :model="addDateList[0]" label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input v-model="addDateList[0].name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="selectDate">取 消</el-button>
                <el-button type="primary" @click="selectDate">确 定</el-button>
            </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "addmodel",
        data() {
            return {
                dialogVisible: false,
            };
        },
        props: {
            addDateList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            flages: {
                default: function () {
                    return false
                }
            }
        },
        watch: {
            addDateList(val) {
                console.log(val)
            },
            flages() {
                this.dialogVisible = true
            }
        },
        methods: {
            selectDate() {
                this.dialogVisible = false
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
