<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-form :model="form" :style="{width:'100%'}" auto-label-width>
                <div v-if="mode === 'submit'">
                    <a-form-item field="app_id" label="应用"  required validate-trigger="blur" v-if="!form.is_new">
                        <a-select v-model="form.app_id" placeholder="请选择应用" allow-search>
                            <a-option v-for="item of data.apps" :key="item.id" :value="item.id" :label="item.name"></a-option>
                        </a-select>
                        <template #extra>
                            <div>平台已经收录的应用</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="is_new" label="是否新建应用" >
                        <a-switch v-model="form.is_new">
                            <template #checked>
                                是
                            </template>
                            <template #unchecked>
                                否
                            </template>
                        </a-switch>
                        <template #extra>
                            <div>平台未收录该应用</div>
                        </template>
                    </a-form-item>
                </div>
                <div v-if="form.is_new || mode === 'view'">
                    <a-form-item field="name" label="名称"  required validate-trigger="blur">
                        <a-input v-model="form.name" placeholder="请输入" />
                        <template #extra>
                            <div>应用的名称</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="appLayer" label="系统层级" >
                        <a-select v-model="form.app_layer" placeholder="请选择">
                            <a-option>应用层</a-option>
                            <a-option>支持层</a-option>
                            <a-option>服务层</a-option>
                            <a-option>系统层</a-option>
                            <a-option>硬件层</a-option>
                            <a-option>其他</a-option>
                        </a-select>
                        <template #extra>
                            <div>根据应用的功能和存在形式划分</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="isOpen" label="是否开源" >
                        <a-switch v-model="form.is_open">
                            <template #checked>
                                是
                            </template>
                            <template #unchecked>
                                否
                            </template>
                        </a-switch>
                    </a-form-item>
                    <a-form-item field="app_type" label="应用种类"  required validate-trigger="blur">
                        <a-select v-model="form.app_type" placeholder="请选择" allow-search>
                            <a-option>CMS</a-option>
                            <a-option>操作系统</a-option>
                            <a-option>编程语言</a-option>
                            <a-option>前端框架</a-option>
                            <a-option>前端UI框架</a-option>
                            <a-option>后端框架</a-option>
                            <a-option>JS库</a-option>
                            <a-option>Web服务器</a-option>
                            <a-option>应用组件</a-option>
                            <a-option>应用服务</a-option>
                            <a-option>应用框架</a-option>
                            <a-option>数据库</a-option>
                            <a-option>开发工具</a-option>
                            <a-option>网络设备</a-option>
                            <a-option>API接口</a-option>
                            <a-option>编程语言第三方库</a-option>
                            <a-option>平台管理系统</a-option>
                            <a-option>CDN</a-option>
                            <a-option>容器</a-option>
                            <a-option>木马后门</a-option>
                            <a-option>其他</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="appIndustry" label="应用行业" >
                        <a-select v-model="form.app_industry" placeholder="请选择" allow-search>
                            <a-option>互联网行业</a-option>
                            <a-option>金融行业</a-option>
                            <a-option>地质行业</a-option>
                            <a-option>生物行业</a-option>
                            <a-option>医学行业</a-option>
                            <a-option>教育行业</a-option>
                            <a-option>其他</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="appLang" label="应用开发语言" >
                        <a-select v-model="form.app_lang" placeholder="请选择" allow-search>
                            <a-option>Python</a-option>
                            <a-option>Java</a-option>
                            <a-option>C/C++</a-option>
                            <a-option>JavaScript</a-option>
                            <a-option>Golang</a-option>
                            <a-option>Rust</a-option>
                            <a-option>Shell</a-option>
                            <a-option>其他</a-option>
                        </a-select>
                        <template #extra>
                            <div>以后端语言为准</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="app_desc" label="应用描述">
                        <a-textarea v-model="form.app_desc" placeholder="请输入" :max-length="200" allow-clear show-word-limit default-value="" />
                        <template #extra>
                            <div>简短描述应用功能</div>
                        </template>
                    </a-form-item>
                </div>

            </a-form>
        </a-spin>

    </div>
</template>

<script>
    import {computed, onMounted, reactive, watch, ref} from 'vue'
    import {getAllApp} from "../../api/app.js";

    export default {
        name: "AppInfo",
        props: {
            modelValue: {
                default: {
                    name: '',

                }
            },
            mode: {
                default: 'submit'
            },
            iwatch: Boolean
        },
        setup(props, context) {
            const form = computed({
                get: () => {
                    return props.modelValue
                },
                set: (value) => {
                    context.emit(`update:modelValue`, value)
                }
            })

            const data = reactive({
                apps: []
            })

            const loading = ref(false)
            // 获取平台所有厂商
            const loadApp = () => {
                loading.value = true
                getAllApp().then((res) => {
                    if (res.data.code === 200) {
                        data.apps = res.data.data
                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    console.log(error)
                })
            }

            const load = () => {
                loadApp()
            }
            onMounted(() => {
                load()
            })

            watch(()=>props.iwatch, () => {
                load()
            })
            return {
                form,
                data,
                props,
                loading
            }
        }
    }
</script>

<style scoped>

</style>