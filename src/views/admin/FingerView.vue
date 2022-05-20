<template>
    <a-spin :loading="loading" style="width: 100%" :size="40">
        <div class="submit-fin">
            <div class="form-collapse">
                <a-space direction="vertical" fill size="medium">
                    <a-collapse :default-active-key="['1', '2', '3']" expand-icon-position="right" >
                        <a-collapse-item header="应用信息" key="1">
                            <a-space direction="vertical" fill size="medium">
                                <AppInfo v-model="data.fingerInfo.app" mode="view"></AppInfo>
                                <div style="display: flex;justify-content: flex-end">
                                    <a-button type="primary" status="warning" @click="handleExApp">更换应用</a-button>
                                </div>
                            </a-space>

                        </a-collapse-item>
                        <a-collapse-item header="应用厂商" key="2">
                            <FactoryInfoForm v-model="data.fingerInfo.app.factory" mode="view"></FactoryInfoForm>
                            <div style="display: flex;justify-content: flex-end">
                                <a-button type="primary" status="warning" @click="handleExFac">更换厂商</a-button>
                            </div>
                        </a-collapse-item>
                        <a-collapse-item header="指纹信息" key="3">
                            <FingerInfoForm v-model="data.fingerInfo"></FingerInfoForm>
                        </a-collapse-item>
                    </a-collapse>
                    <div class="foot">
                        <div>
                            <a-space>
                                <a-popconfirm content="你确定要提交修改吗?（请确认指纹信息准确）" @ok="submitFinger">
                                    <a-button type="primary">提交修改</a-button>
                                </a-popconfirm>
                                <a-button type="primary" status="success" @click="checkF">测试</a-button>
                            </a-space>

                        </div>

                        <div style="display: flex;align-items: center">
                            <a-tag v-if="data.fingerInfo.is_right" color="green" size="large" style="margin-right: 10px">已审核</a-tag>
                            <a-tag v-else color="orangered" size="large" style="margin-right: 10px">未审核</a-tag>
                            <FingerActionButton :id="id" size="medium" @reload="load" @delete_reload="go" :view="true"></FingerActionButton>
                        </div>
                    </div>
                </a-space>
            </div>
        </div>
    </a-spin>
    <a-modal v-model:visible="visible1" @ok="handleOkApp" @cancel="handleCancel1">
        <template #title>
            更换应用
        </template>
        <div>
            <a-select v-model="ex_app_id" placeholder="请选择应用" allow-search>
                <a-option v-for="item of data.apps" :key="item.id" :value="item.id" :label="item.name"></a-option>
            </a-select>
        </div>
    </a-modal>
    <a-modal v-model:visible="visible2" @ok="handleOkFac" @cancel="handleCancel2">
        <template #title>
            更换厂商
        </template>
        <div>
            <a-select v-model="ex_fac_id" placeholder="请选择应用" allow-search>
                <a-option v-for="item of data.factorys" :key="item.id" :value="item.id" :label="item.name"></a-option>
            </a-select>
        </div>
    </a-modal>

</template>

<script>
    import AppInfo from "../../components/user/AppInfo.vue";
    import {inject, onMounted, reactive, ref} from 'vue'
    import FingerInfoForm from "../../components/user/FingerInfoForm.vue";
    import FactoryInfoForm from "../../components/user/FactoryInfoForm.vue";
    import VCode from "../../components/common/VCode.vue";
    import {checkFinger, getFingerForAdmin, updateFinger, modifySingleFinger} from "../../api/finger.js";
    import FingerActionButton from "../../components/admin/FingerActionButton.vue";
    import {useRouter} from "vue-router";
    import {getAllApp} from "../../api/app.js";
    import {getAllFactory} from "../../api/factory.js";

    export default {
        name: "FingerView",
        components: {FingerActionButton, VCode, FactoryInfoForm, FingerInfoForm, AppInfo},
        props: {
            id: Number
        },
        setup(props) {
            // 获取message对象
            const message = ref(null)
            onMounted(() => {
                message.value = inject("message")
            })

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
                },
                apps: [],
                factorys: []

            })

            const loading = ref(false)

            const submitFinger = () => {
                loading.value = true
                updateFinger(props.id, data.fingerInfo).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("修改成功")
                    }
                    loading.value = false
                    load()
                }).catch((error) => {
                    loading.value = false
                    message.value.error("服务端错误，请重试！")
                })

            }

            const loadFinger = () => {
                loading.value = true
                getFingerForAdmin(props.id).then((res) => {
                    if (res.data.code === 200) {
                        data.fingerInfo = res.data.data
                        ex_app_id.value = data.fingerInfo.app.id
                        ex_fac_id.value = data.fingerInfo.app.factory.id
                        data.fingerInfo.checkUrls = [
                            {value:''}
                        ]
                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    message.value.error("服务端错误，请重试！")

                })
            }

            const load = () => {
                loadFinger()
            }

            onMounted(() => {
                load()
            })

            const router = useRouter()

            const go = () => {
                router.push({
                    name: 'fingerManager'
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

            const visible1 = ref(false);
            const visible2 = ref(false);
            const ex_app_id = ref(-1)
            const ex_fac_id = ref(-1)

            const handleExApp = () => {
                loading.value = true
                getAllApp().then((res) => {
                    if (res.data.code === 200) {
                        data.apps = res.data.data
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
                visible1.value = true;
            };
            const handleExFac = () => {
                loading.value = true
                getAllFactory().then((res) => {
                    if (res.data.code === 200) {
                        data.factorys = res.data.data
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
                visible2.value = true;
            };
            const handleOkApp = () => {
                loading.value = true
                modifySingleFinger(props.id, ex_app_id.value, '').then((res) => {
                    if (res.data.code === 200) {
                        message.value.success(res.data.data)
                        loading.value = false
                        load()
                    } else {
                        loading.value = false
                    }
                }).catch((error) => {
                    loading.value = false
                    if (error.response.status === 404) {
                        message.value.error("请先登录")
                    } else {
                        message.value.error(JSON.stringify(error.response.data.data))
                    }

                })
                visible1.value = false;
            };
            const handleOkFac = () => {
                loading.value = true
                modifySingleFinger(props.id, '', ex_fac_id.value).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success(res.data.data)
                        loading.value = false
                        load()
                    } else {
                        loading.value = false
                    }
                }).catch((error) => {
                    loading.value = false
                    if (error.response.status === 404) {
                        message.value.error("请先登录")
                    } else {
                        message.value.error(JSON.stringify(error.response.data.data))
                    }

                })
                visible2.value = false;
            };
            const handleCancel1 = () => {
                visible1.value = false;
            }
            const handleCancel2 = () => {
                visible2.value = false;
            }


            return {
                data,
                submitFinger,
                loading,
                props,
                load,
                go,
                checkF,
                handleCancel1,
                handleCancel2,
                handleExApp,
                handleExFac,
                handleOkApp,
                handleOkFac,
                visible1,
                visible2,
                ex_app_id,
                ex_fac_id
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
    .foot {
        display: flex;
        justify-content: space-between;
    }
</style>