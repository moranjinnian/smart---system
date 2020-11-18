<template>
    <div>
        <el-dropdown trigger="click">
            <div class="setup">
                <img src="../../assets/cs.gif">
                <div>admin</div>
                <div><span class="el-icon-caret-bottom"></span></div>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-picture-outline-round">
                    <span @click="tst">折叠/展开</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-picture-outline-round">
                    <router-link class="inlineBlock" to="/permmission">
                        返回主页
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid">
                    <span>个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-tools">
                    <span>修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-more">
                    <router-link class="inlineBlock" to="/">
                        退出登陆
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-promotion">
                    <router-link class="inlineBlock" to="/home">
                        关于其他
                    </router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "usermsg",
        methods: {
            tst() {
                this.$emit('tst')
            }
        }
    }
</script>

<style scoped>

</style>
