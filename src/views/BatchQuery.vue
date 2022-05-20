<template>
    <a-spin :loading="loading" style="width: 100%" :size="40">
        <div class="batchq">
            <a-form :model="form" :style="{width:'80%'}" @submit="handleSubmit" auto-label-width>
                <a-form-item field="urls" label="批量扫描指纹" required validate-trigger="blur">
                    <a-textarea placeholder="一个目标一行" allow-clear :auto-size="{
                    minRows:10,
                    maxRows:15
                }" v-model="form.urls"/>
                </a-form-item>
                <a-form-item field="vCode" label="验证码">
                    <VCode v-model="form.vCode"></VCode>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="handleSubmit" class="left-btn">
                        <template #icon>
                            <icon-search />
                        </template>
                        <!-- Use the default slot to avoid extra spaces -->
                        <template #default>扫描</template>
                    </a-button>
                    <a-button type="primary"  style="width: 32px;height: 32px" class="right-btn" @click="openSetting">
                        <template #icon>
                            <icon-settings style="height: 15px;width: 15px"/>
                        </template>
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </a-spin>

    <a-drawer :visible="visible" @cancel="handleCancel" unmountOnClose width="400px">
        <template #title>
            扫描设置
        </template>
        <div>
            <a-form :model="setting"  auto-label-width>
                <a-form-item field="browser" label="模拟浏览器">
                    <a-switch v-model="setting.browser">
                        <template #checked>
                            开启
                        </template>
                        <template #unchecked>
                            关闭
                        </template>
                    </a-switch>
                    <template #extra>
                        <div>针对需要加载js的动态页面，开启会大幅降低运行速度</div>
                    </template>
                </a-form-item>
                <a-form-item field="spider" label="爬虫模式">
                    <a-switch v-model="setting.spider">
                        <template #checked>
                            开启
                        </template>
                        <template #unchecked>
                            关闭
                        </template>
                    </a-switch>
                    <template #extra>
                        <div>对站点进行深度爬取url来分析指纹，开启会大幅降低运行速度</div>
                    </template>
                </a-form-item>
                <a-form-item field="only_spider" label="仅爬虫">
                    <a-switch v-model="setting.only_spider">
                        <template #checked>
                            开启
                        </template>
                        <template #unchecked>
                            关闭
                        </template>
                    </a-switch>
                    <template #extra>
                        <div>仅对站点进行深度爬取url</div>
                    </template>
                </a-form-item>
                <a-form-item field="only_home" label="简洁扫描">
                    <a-switch v-model="setting.only_home">
                        <template #checked>
                            开启
                        </template>
                        <template #unchecked>
                            关闭
                        </template>
                    </a-switch>
                    <template #extra>
                        <div>仅匹配当前页和通用指纹</div>
                    </template>
                </a-form-item>
            </a-form>
        </div>
        <template #footer>
            <a-button type="primary" @click="resetting">重置默认值</a-button>
        </template>
    </a-drawer>

</template>

<script>
    import {onMounted, reactive, ref} from 'vue'
    import {IconSearch, IconSettings} from '@arco-design/web-vue/es/icon'
    import VCode from "../components/common/VCode.vue";
    import {queryBatchFinger} from "../api/finger.js";
    import {getMessage} from "../utils";

    export default {
        name: "BatchQuery",
        components: {
            VCode,
            IconSearch,
            IconSettings
        },
        setup() {
            const message = getMessage()
            const form = reactive({
                urls: '',
                vCode: '',
            })
            const loading = ref(false)
            const test = ref('1')


            const handleSubmit = (data) => {
                loading.value = true
                queryBatchFinger(form.urls, setting).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("扫描任务添加成功！正在后台扫描")

                    } else {
                        message.value.error("请先登录")
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

            // 控制setting抽屉
            const setting = reactive({
            })
            const visible = ref(false);
            const openSetting = () => {
                visible.value = true
            }
            // 重置为默认值
            const resetting = () => {
                setting.browser = false
                setting.spider = false
                setting.only_spider = false
                setting.only_home = false
            };
            const handleCancel = () => {
                visible.value = false;
            }
            onMounted(() => {
                resetting()
            })
            return {
                form,
                handleSubmit,
                test,
                visible,
                setting,
                openSetting,
                handleCancel,
                resetting,
                loading
            }
        }
    }
</script>

<style scoped>
.batchq {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.right-btn{
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-left-style: solid;
    border-left-color: rgb(100,100,100);
}
.left-btn{
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    border-left-style: solid;
    border-left-color: rgb(100,100,100);
}
</style>