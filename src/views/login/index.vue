<template>
    <div :style="loginStyle">
        <div class="login-header">
            <img :src="logoImg" alt="">
        </div>
        <div class="login_main">
            <div class="login_input" :style="loginWord">
                <div style="height: 10vh"></div>
                <el-input prefix-icon="el-icon-user" v-model="loginForm.username" type="text"></el-input>
                <div style="height: 10px"></div>
                <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
                <br>
                <div style="height: 10px"></div>
                <el-input prefix-icon="el-icon-key" placeholder="验证码" v-model="loginForm.code"
                          class="input-with-select">
                    <el-button class="login_code" @click="romcode" slot="append">{{logincode}}</el-button>
                </el-input>
                <div style="height: 10px"></div>
                <el-button :loading="loginloading" @click="dl">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginloading:false,
                codearr: [
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                logincode: '',
                loginForm: {
                    code: '',
                    username: 'admin',
                    password: 'admin'
                },
                logoImg: require('@/assets/login/shizhdlylogo.png'),
                loginStyle: {
                    height: '100vh',
                    width: '100vw',
                    background: 'url(' + require('@/assets/login/shizhdlybj.jpg') + ')',
                    backgroundSize: '100vw 100vh'
                },
                loginWord: {
                    position: 'absolute',
                    right: '18vw',
                    top: '35vh',
                    height: '45vh',
                    width: '30vw',
                    background: 'url(' + require('@/assets/login/shizhdlydlk.png') + ')',
                    backgroundSize: '100% 100%'
                }
            }
        },
        computed: {},
        created() {
            this.romcode()
        },
        methods: {
            romcode() {
                this.logincode = ''
                for (let i = 0; i < 4; i++) {
                    let s = Math.floor(Math.random() * 62)
                    this.logincode += this.codearr[s]
                }
            },
            dl() {
                if (!this.loginForm.code) {
                    this.$notify.error({
                        title: '错误',
                        offset: 60,
                        message: '请输入验证码！'
                    });
                    this.romcode()
                    return
                } else if (this.loginForm.code !== this.logincode) {
                    this.$notify.error({
                        title: '错误',
                        offset: 60,
                        message: '请输入正确验证码！'
                    });
                    this.romcode()
                    return;
                }
                this.$notify({
                    title: '成功',
                    message: '登录成功！',
                    offset: 60,
                    type: 'success'
                });
                this.loginloading = true
                sessionStorage.setItem('cookie', 'asd4565xcz12as8dqwa312ad5')
                this.$store.state.background = 'rgba(64, 158, 255, 0.78)'
                this.$store.state.btn1 = 'red'
                this.$store.state.btn2 = 'red'
                this.$store.state.btn3 = 'red'
                this.$store.state.btn4 = 'red'
                this.$store.state.btn5 = 'red'
                this.$store.state.btn6 = 'red'
                this.$router.push("/permmission")
            }
        },
    }

</script>

