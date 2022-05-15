<template>
    <a-spin :loading="loading" style="width: 100%" :size="40">
        <a-form :model="setting" :style="{width:'900px'}" layout='vertical'>
            <a-form-item field="rad_config" label="Rad爬虫配置">
                <a-textarea v-model="setting.rad_config" :auto-size="{
    minRows:12,
    maxRows:20
  }"/>
                <template #extra>
                    <div>yml格式的配置文件</div>
                </template>
            </a-form-item>
            <a-form-item field="thread_num" label="扫描线程数">
                <a-input-number v-model="setting.thread_num" :style="{width:'320px'}" placeholder="请输入线程数" class="input-demo" :min="1" :max="1000"/>
                <template #extra>
                    <div>修改线程数量会销毁当前平台所有正在进行的扫描任务</div>
                </template>
            </a-form-item>
            <a-form-item field="name" label="扫描header头部">
                <a-textarea v-model="setting.headers" :auto-size="{
    minRows:12,
    maxRows:20
  }"/>
                <template #extra>
                    <div>json格式</div>
                </template>
            </a-form-item>
            <a-form-item field="name" label="扫描cookies">
                <a-textarea v-model="setting.cookies" :auto-size="{
    minRows:12,
    maxRows:20
  }"/>
                <template #extra>
                    <div>json格式</div>
                </template>
            </a-form-item>
            <a-form-item field="name" label="扫描超时时间">
                <a-input-number v-model="setting.timeout" :style="{width:'320px'}" placeholder="请输入超时时间" class="input-demo" :min="0" :max="100"/>
            </a-form-item>
        </a-form>
        <a-space>
            <a-button type="primary" @click="submit">提交修改</a-button>
            <a-button type="primary" status="success" @click="reset">重置为默认值</a-button>
        </a-space>

    </a-spin>

</template>

<script>
    import {onMounted, reactive, ref} from "vue";
    import {getConfig, setConfig, getDefaultConfig} from "../../api/config.js";
    import {getMessage} from "../../utils";

    export default {
        name: "ScanSetting",
        setup() {
            const message = getMessage()

            const loading = ref(false)

            const data = reactive({
            })

            const setting = reactive({
                thread_num: 1,
                rad_config: '',
                timeout: 10,
                headers: '',
                cookies: ''
            })

            const loadConfig = () => {
                loading.value = true
                getConfig().then((res) => {
                    if (res.data.code === 200) {
                        setting.rad_config = res.data.data.rad_config
                        setting.headers = JSON.stringify(res.data.data.headers, null, 4)
                        setting.cookies = JSON.stringify(res.data.data.cookies, null, 4)
                        setting.thread_num = res.data.data.thread_num
                        setting.timeout = res.data.data.timeout
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }

            const load = () => {
                loadConfig()
            }

            onMounted(() => {
                load()
            })

            const submit = () => {
                loading.value = true
                setConfig(setting).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("修改成功")
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }

            const reset = () => {
                loading.value = true
                getDefaultConfig().then((res) => {
                    if (res.data.code === 200) {
                        setting.rad_config = res.data.data.rad_config
                        setting.headers = JSON.stringify(res.data.data.headers, null, 4)
                        setting.cookies = JSON.stringify(res.data.data.cookies, null, 4)
                        setting.thread_num = res.data.data.thread_num
                        setting.timeout = res.data.data.timeout
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }
            return {
                data,
                loading,
                setting,
                submit,
                reset
            }
        }
    }
</script>

<style scoped>

</style>