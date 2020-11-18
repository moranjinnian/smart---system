<template>
    <div>
        <ul @click="show = !show" class="menu">系统管理
            <transition name="el-zoom-in-center">
                <div v-show="show" class="transition-box">
                    <li class="ul-li" v-for="(item) in menulist" :pid="item.id" :key="item.name" :name="item.name"
                        @click.stop="!item.ch && menuClick(item.name,$event)"
                        @mouseover.stop="hoverover(item.name,$event)"
                        @mouseout.stop="isHoverout && hoverout(item.name,$event)"
                        :style="themeStyle">
                        {{item.value}}
                        <ul class="menuch">
                            <transition name="el-zoom-in-center">
                                <div v-show="show2" class="transition-box">
                                    <li class="ul-li" v-for="(item) in item.ch" :pid="item.id" :key="item.name"
                                        :name="item.name"
                                        @click.stop="!item.ch && menuClick(item.name,$event)"
                                        @mouseover.stop="hoverover(item.name,$event)"
                                        @mouseout.stop="isHoverout && hoverout(item.name,$event)"
                                        :style="themeStyle">
                                        {{item.value}}
                                    </li>
                                </div>
                            </transition>
                        </ul>
                    </li>
                </div>
            </transition>
        </ul>
    </div>
</template>

<script>
    // import $ from '../../../public/jquery-1.11.0.min.js'
    import $ from 'jquery'
    export default {
        name: "navmenu",
        data() {
            return {
                show: false,
                show2: false,
                isHoverout: true,
                activeName: [],
                menuhovebackcolor: this.$store.state.menuhovebackcolor,
                themeStyle: {
                    'background': this.$store.state.background,
                    'color': this.$store.state.fontcolor,
                },
                menulist: [
                    {
                        id: '1',
                        name: '/permmission',
                        value: '返回首页'
                    }, {
                        id: '2',
                        name: 'role',
                        value: '角色管理',
                        ch: [{
                            id: '3',
                            name: '/home/homePage',
                            value: '首页'
                        }, {
                            id: '4',
                            name: 'role',
                            value: '用户配置'
                        }]
                    }, {
                        id: '5',
                        name: '/system/user',
                        value: '用户管理'
                    }, {
                        id: '6',
                        name: 'sys',
                        value: '系统配置',
                        ch: [{
                            id: '7',
                            name: '/home/homePage',
                            value: '权限配置'
                        }, {
                            id: '8',
                            name: 'role',
                            value: '用户配置'
                        }]
                    }, {
                        id: '9',
                        name: 'ziy',
                        value: '资源管理'
                    }, {
                        id: '10',
                        name: 'log',
                        value: '系统日志'
                    },
                ],
            }
        },
        watch: {
            // 监听状态是否被改变
            layertBack: function () {
                console.log(this.menuhovebackcolor)
                this.themeStyle.background = this.$store.state.background
                this.themeStyle.color = this.$store.state.fontcolor
                this.menuhovebackcolor = this.$store.state.menuhovebackcolor
            }
        },
        computed: {
            // 创建监听状态
            layertBack() {
                return this.$store.state.type
            }
        },
        methods: {
            hoverover(path, event) {
                console.log(this.menuhovebackcolor)
                this.show2 = true
                // 鼠标移入的时候 设置 isHoverout 为true 即可开启鼠标移出事件
                this.isHoverout = true
                let el = event.currentTarget;
                el.style.backgroundColor = this.menuhovebackcolor
            },
            hoverout(path, event) {
                this.show2 = false
                let el = event.currentTarget;
                // 如果 当前鼠标所在的行，不等于所选中的行 ，即可删除高亮颜色
                if (this.activeName.indexOf(el.getAttribute('pid') * 1) === -1) {
                    el.style.backgroundColor = this.$store.state.background
                }
            },
            // 选中当前对象，设置当前行高亮，并且还原其他行色
            menuClick(path, event) {
                this.show = false
                this.show2 = false
                let allList = $('.transition-box').find('li')
                let el = event.currentTarget;
                this.activeName = []
                // let allList = el.parentElement.childNodes
                this.activeName.push(el.getAttribute('pid') * 1, el.parentElement.parentElement.parentElement.getAttribute('pid') * 1)
                // isHoverout 设置为false 鼠标悬浮事件即不可触发 类似于解除绑定鼠标悬浮事件
                // 设置 isHoverout 目的为 当点击事件后 ，div关闭 页面会判断鼠标不在当前行，所以会触发鼠标移出事件（误更改高亮色） 所以导致选中高亮不生效
                this.isHoverout = false
                // path 为 用户权限路由 比较当前路由是否和点击的一致，防止控制台错误
                if (path && this.$route.path !== path) {
                    this.$router.push(path)
                }
                // 选中的行 保存以便鼠标移出的时候，误删当前高亮
                for (let i = 0; i < allList.length; i++) {
                    if (allList[i].getAttribute('pid') && allList[i].getAttribute('pid') !== el.getAttribute('pid')) {
                        allList[i].style.backgroundColor = this.$store.state.background
                    }
                }
                el.style.backgroundColor = this.menuhovebackcolor
                el.parentElement.parentElement.parentElement.style.backgroundColor = this.menuhovebackcolor
            },
        }
    }
</script>

<style scoped>

</style>
