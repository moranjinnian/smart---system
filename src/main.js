import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import router from './router/router'
import App from './App.vue'
import ElementUI from 'element-ui';
import chart from 'echarts';

Vue.prototype.$echarts = chart
import './support/style.css';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import "./util/request"
import "./router/permission"
import "./icon/iconfont.css"

//
// 创建一个 store
var store = new Vuex.Store({
    state: {
        // 监听状态
        type: false,
        menubackground: '#1edbdb',
        fontcolor: '#fff',
        // 背景色
        background: '#409eff',
        menuhovebackcolor: '#67c23a',
        // 按钮 默认色
        btn1: '#fff',
        // 主要按钮
        btn2: '#409eff',
        // 成功按钮
        btn3: '#67c23a',
        // 信息按钮
        btn4: '#909399',
        // 警告按钮
        btn5: '#f56c6c',
        // 危险按钮
        btn6: '',
        btn7: '',
        btn8: '',
        btn9: '',
    }
})

Vue.prototype.axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,//挂在到vue
    render: h => h(App),
}).$mount('#app')
