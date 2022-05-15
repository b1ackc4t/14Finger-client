<script>
    import {IconBug} from '@arco-design/web-vue/es/icon'
    import { ref, watch, onMounted, reactive } from 'vue'
    import {useRouter, useRoute} from 'vue-router'
    import {getMe, logout} from "../../api/user.js";
    import {getMessage} from "../../utils";
    import { onBeforeRouteUpdate } from "vue-router";

    export default {
        name: "nav",
        components: {
            IconBug
        },
        setup() {
            // 获取Message对象
            const message = getMessage()

            // 跟踪当前路由位置 确定导航栏高亮位置
            const activeKey = ref(['1'])
            const router = useRouter()
            const route = useRoute()    // 当前路由状态
            const checkPath = (pathName) => {
                switch (pathName) {
                    case 'main':
                        activeKey.value[0] = '1'
                        break
                    case 'batchQuery':
                        activeKey.value[0] = '2'
                        break
                    case 'submitFinger':
                        activeKey.value[0] = '3'
                        break
                    case 'fingerLibrary':
                        activeKey.value[0] = '4'
                        break
                    case 'rank':
                        activeKey.value[0] = '5'
                        break
                    case 'login':
                        activeKey.value[0] = '6'
                        break
                    case 'register':
                        activeKey.value[0] = '7'
                        break
                    case 'profile':
                        activeKey.value[0] = '8'
                        break
                    case 'fingerManager':
                        activeKey.value[0] = '10'
                        break
                    case 'userManager':
                        activeKey.value[0] = '11'
                        break
                    case 'scanSetting':
                        activeKey.value[0] = '12'
                        break
                    default:
                        break
                }
                getMe().then((res) => {
                    if (res.data.code === 200) {
                        if (res.data.data.id != null) {
                            data.user = res.data.data
                            isLogin.value = true
                            if (data.user.role === 'admin') {
                                isAdmin.value = true
                            }
                        } else {
                            isLogin.value = false
                        }
                    } else {
                        message.value.error("网络错误")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
            watch(activeKey, (key) => {
                let index = activeKey.value[0]
                switch (index) {
                    case '1':
                        router.push({name: 'main'})
                        break
                    case '2':
                        router.push({name: 'batchQuery'})
                        break
                    case '3':
                        router.push({name: 'submitFinger'})
                        break
                    case '4':
                        router.push({name: 'fingerLibrary'})
                        break
                    case '5':
                        router.push({name: 'rank'})
                        break
                    case '6':
                        router.push({name: 'login'})
                        break
                    case '7':
                        router.push({name: 'register'})
                        break
                    case '8':
                        router.push({name: 'profile'})
                        break
                    case '10':
                        router.push({name: 'fingerManager'})
                        break
                    case '11':
                        router.push({name: 'userManager'})
                        break
                    case '12':
                        router.push({name: 'scanSetting'})
                        break
                    default:
                        break
                }
            })

            // 判断登录状态
            const isLogin = ref(false)
            const isAdmin = ref(false)
            const data = reactive({user:{}})
            onMounted(() => {
                checkPath(route.name)

            })

            // 登出系统
            const logoutSubmit = () => {
                logout().then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("退出成功")
                        isLogin.value= false
                        isAdmin.value = false
                    } else {
                        message.value.error("网络错误")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }

            // 监听路由变化 改变导航栏
            onBeforeRouteUpdate(to => {
                checkPath(to.name)
            });
            return {activeKey, isLogin, data, logoutSubmit, isAdmin}
        }
    }
</script>

<template>
    <div class="menu-demo">
        <a-menu mode="horizontal" :default-selected-keys="['1']" class="my-menu" v-model:selected-keys="activeKey">
            <div>
                <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
                    <div style="color: azure;font-size: 25px">
                        <icon-bug style="color: azure;font-size: 30px;padding: 0;margin: 0"/> 14Finger
                    </div>
                </a-menu-item>
                <a-menu-item key="1" class="my-menu-item">查询指纹</a-menu-item>
                <a-menu-item key="2" class="my-menu-item">批量查询</a-menu-item>
                <a-menu-item key="3" class="my-menu-item">提交指纹</a-menu-item>
                <a-menu-item key="4" class="my-menu-item">指纹库</a-menu-item>
                <a-menu-item key="5" class="my-menu-item">排行榜</a-menu-item>
                <a-menu-item key="10" class="my-menu-item" v-if="isAdmin">指纹管理</a-menu-item>
                <a-menu-item key="11" class="my-menu-item" v-if="isAdmin">用户管理</a-menu-item>
                <a-menu-item key="12" class="my-menu-item" v-if="isAdmin">扫描配置</a-menu-item>


            </div>

            <div>
                <div v-if="isLogin">
                    <a-menu-item key="8" class="my-menu-item">{{data.user.username}}</a-menu-item>
                    <a-menu-item key="9" class="my-menu-item" @click="logoutSubmit">退出登录</a-menu-item>
                </div>
                <div v-else>
                    <a-menu-item key="6" class="my-menu-item">登录</a-menu-item>
                    <a-menu-item key="7" class="my-menu-item">注册</a-menu-item>
                </div>

            </div>
        </a-menu>
    </div>
</template>



<style scoped>
    .menu-demo {
        width: 100%;
    }
    .my-menu ::v-deep(.arco-menu-overflow-wrap) {
        display: flex;
        justify-content: space-between;
    }
    .my-menu ::v-deep(.arco-menu-inner) {
        padding: 0px 20px;
    }
    .my-menu-item {
        margin-top: 14px;
        margin-bottom: 14px;
    }
</style>