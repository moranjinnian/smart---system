<template>
    <div class="layout-cont">
        <el-container>
            <el-header class="layout-header-body" :style="themeStyle">
                <div class="header-layout-left">
                    <navmenu></navmenu>
                </div>
            </el-header>
            <el-main class="layout-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navmenu from '@/components/headermenu/menu'
    // element UI无法设置table样式，我们可以做代码污染它
    import '@/style/custom.css'

    export default {
        components: {navmenu},
        name: "layout",
        data() {
            return {
                dialogVisible: false,
                drawer: false,
                show: false,
                show2: false,
                isHoverout: true,
                activeName: '',
                direction: 'rtl',
                background: this.$store.state.background,
                color: this.$store.state.fontcolor,
                themeStyle: {
                    'background': this.$store.state.background,
                    'color': this.$store.state.fontcolor,
                }
            }
        },
        watch: {
            // 监听状态是否被改变
            layertBack: function () {
                this.themeStyle.background = this.$store.state.background
                this.themeStyle.color = this.$store.state.fontcolor
            }
        },
        computed: {
            // 创建监听状态
            layertBack() {
                return this.$store.state.type
            }
        },
        methods: {

        },
    }
</script>
