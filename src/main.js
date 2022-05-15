import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import requests from "~/axios";
import { Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/es/message/style/css.js'
import axios from "axios";

function getServerConfig() {  // 定义
    axios.get('/config.json').then(res => {  // 请求上面描述的本地配置文件
        const app = createApp(App)
        Message._context = app._context;
        const server = process.env.NODE_ENV !== 'development' ? res.data.BASE_URL_PROD : res.data.BASE_URL_DEV
        requests.defaults.baseURL = server
        app.provide('message', Message)
        app.provide('server', server)
        app.use(router).mount('#app')
    })
}

getServerConfig()



