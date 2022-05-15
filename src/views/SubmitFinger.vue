<template>
    <a-spin :loading="loading" style="width: 100%" :size="40">
        <div class="submit-fin">
            <div class="form-collapse">
                <a-space direction="vertical" fill size="medium">
                    <a-collapse :default-active-key="['1','2', '3']" expand-icon-position="right" >
                        <a-collapse-item header="应用信息" key="1">
                            <AppInfo v-model="data.fingerInfo.app" :iwatch="appwatch"></AppInfo>
                        </a-collapse-item>
                        <a-collapse-item header="应用厂商" :key="!data.fingerInfo.app.is_new?'0':'2'" :disabled="!data.fingerInfo.app.is_new">
                            <FactoryInfoForm v-model="data.fingerInfo.app.factory" :disable="!data.fingerInfo.app.is_new" :iwatch="facwatch"></FactoryInfoForm>
                        </a-collapse-item>
                        <a-collapse-item header="指纹信息" key="3">
                            <FingerInfoForm v-model="data.fingerInfo"></FingerInfoForm>
                        </a-collapse-item>
                    </a-collapse>
                    <div>
                        <a-form-item field="vCode" label="验证码">
                            <VCode v-model="data.fingerInfo.vCode"></VCode>
                        </a-form-item>
                        <a-space>
                            <a-popconfirm content="你确定要提交吗?（请确认指纹信息准确）" @ok="submitFinger">
                                <a-button type="primary">提交</a-button>
                            </a-popconfirm>
                            <a-popconfirm content="本次提交无需审核直接入库，请确认指纹信息准确" @ok="submitSuper" v-if="isAdmin">
                                <a-button type="primary" status="danger">免审核提交</a-button>
                            </a-popconfirm>
                            <a-button type="primary" status="success" @click="checkF">测试</a-button>
                        </a-space>

                    </div>
                </a-space>
            </div>
        </div>
    </a-spin>

</template>

<script>
    import AppInfo from "../components/user/AppInfo.vue";
    import {inject, onMounted, reactive, ref} from 'vue'
    import FingerInfoForm from "../components/user/FingerInfoForm.vue";
    import FactoryInfoForm from "../components/user/FactoryInfoForm.vue";
    import VCode from "../components/common/VCode.vue";
    import {saveFinger, checkFinger, saveFingerSuper} from "../api/finger.js";
    import {local2finger} from "../jspak/fingerHandler.js";
    import {getMe} from "../api/user.js";

    export default {
        name: "SubmitFinger",
        components: {VCode, FactoryInfoForm, FingerInfoForm, AppInfo},
        setup() {
            // 获取message对象
            const message = ref(null)
            onMounted(() => {
                message.value = inject("message")
            })

            const appwatch = ref(false)
            const facwatch = ref(false)

            const data = reactive({
                fingerInfo: {
                    app: {
                        is_new: false,
                        factory: {
                            is_new: false
                        },
                    },
                    checkUrls: [
                        {value:''}
                    ]
                }

            })

            const loading = ref(false)

            const submitFinger = () => {
                loading.value = true
                let origin = JSON.parse(JSON.stringify(data.fingerInfo));
                let param_str = local2finger(origin)
                saveFingerSuper(origin, param_str).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("指纹提交成功！")
                        data.fingerInfo = {
                            app: {
                                is_new: false,
                                factory: {
                                    is_new: false
                                },
                            },
                            checkUrls: [
                                {value:''}
                            ]
                        }
                        appwatch.value = !appwatch.value
                        facwatch.value = !facwatch.value

                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    if (error.response.status === 404) {
                        message.value.error("请先登录")
                    } else {
                        message.value.error(JSON.stringify(error.response.data.data))
                    }
                })

            }

            const checkF = () => {
                loading.value = true
                checkFinger(data.fingerInfo).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success(res.data.data)
                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    if (error.response.status === 404) {
                        message.value.error("请先登录")
                    } else {
                        message.value.error(JSON.stringify(error.response.data.data))
                    }

                })
            }

            const isAdmin = ref(false)
            onMounted(() => {
                getMe().then((res) => {
                    if (res.data.code === 200) {
                        if (res.data.data.id != null) {
                            if (res.data.data.role === 'admin') {
                                isAdmin.value = true
                            }
                        }
                    } else {
                        message.value.error("网络错误")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            })

            const submitSuper = () => {
                loading.value = true
                let origin = JSON.parse(JSON.stringify(data.fingerInfo));
                let param_str = local2finger(origin)
                saveFingerSuper(origin, param_str).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("指纹提交成功！")
                        data.fingerInfo = {
                            app: {
                                is_new: false,
                                factory: {
                                    is_new: false
                                },
                            },
                            checkUrls: [
                                {value:''}
                            ]
                        }
                        appwatch.value = !appwatch.value
                        facwatch.value = !facwatch.value

                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    if (error.response.status === 404) {
                        message.value.error("请先登录")
                    } else {
                        message.value.error(JSON.stringify(error.response.data.data))
                    }
                })
            }

            return {
                data,
                submitFinger,
                loading,
                checkF,
                isAdmin,
                submitSuper,
                appwatch,
                facwatch
            }
        }
    }
</script>

<style scoped>
.submit-fin {
    display: flex;
    flex-direction: column;
    align-items: center;
}
    .form-collapse {
        width: 80%;
    }
</style>