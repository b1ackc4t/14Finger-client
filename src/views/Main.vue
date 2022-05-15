<template>
    <a-spin :loading="loading" style="width: 100%" :size="40">
        <div v-if="isQuery">
            <a-space direction="vertical" fill  style="width: 100%;" size="large">
                <div style="width: 100%;display: flex;justify-content: center;margin-bottom: 20px">
                    <a-input-search @search="singleQuery" class="query-input" :style="{width:'60%'}" placeholder="请输入URL地址，例如http://www.4399.com" search-button size="medium" allow-clear>
                        <template #button-icon>
                            <icon-search/>
                        </template>
                        <template #button-default>
                            扫描
                        </template>
                    </a-input-search>
                    <a-button type="primary"  style="width: 32px;height: 32px" class="main-btn" @click="openSetting">
                        <template #icon>
                            <icon-settings style="height: 15px;width: 15px"/>
                        </template>
                    </a-button>
                </div>
                <div>
                    <div style="margin-bottom: 10px;display: flex;justify-content: space-between">
                        <div>
                            <icon-search style="margin-right: 3px" /><b>{{data.url}}</b> 的查询结果如下：
                        </div>
                        <div>
                            执行时长：{{time}} 秒
                        </div>
                    </div>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" title="指纹结果">
                            <a-table style="width: 100%" :columns="columns1" :data="data.table_data1" :pagination="false" column-resizable/>
                        </a-tab-pane>
                        <a-tab-pane key="2" title="爬虫结果">
                            <a-table style="width: 100%" :columns="columns2" :data="data.table_data2" :pagination="true">
                                <template #urls="{ record,rowIndex }">
                                    <a-link :href="record.url">{{record.url}}</a-link>
                                </template>
                            </a-table>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </a-space>
        </div>
        <div class="main" v-else>

            <a-space direction="vertical" fill  style="width: 100%;">
                <div style="color: azure;font-size: 65px">
                    <icon-bug style="color: azure;font-size: 60px;padding: 0;margin: 0"/> 14Finger
                </div>
                <div style="width: 100%;display: flex;justify-content: center">
                    <a-input-search @search="singleQuery" class="main-input" :style="{width:'60%'}" placeholder="请输入URL地址，例如http://www.4399.com" search-button size="large" allow-clear>
                        <template #button-icon>
                            <icon-search/>
                        </template>
                        <template #button-default>
                            扫描
                        </template>
                    </a-input-search>
                    <a-button type="primary"  style="width: 50px;height: 50px" class="main-btn" @click="openSetting">
                        <template #icon>
                            <icon-settings style="height: 20px;width: 20px"/>
                        </template>
                    </a-button>
                </div>
            </a-space>

        </div>
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
    </a-spin>

</template>

<script>
    import {IconBug, IconSearch, IconSettings} from '@arco-design/web-vue/es/icon'
    import '@arco-design/web-vue/es/button/style/css.js'
    import {onMounted, ref, reactive} from 'vue'
    import {querySingleFinger} from "../api/finger.js";
    import {getMessage} from "../utils";

    export default {
        name: "Main",
        components: {
            IconBug,
            IconSearch,
            IconSettings,
        },
        setup(props, context) {
            const message = getMessage()

            const loading = ref(false)
            onMounted(() => {
            })

            const columns1 = [
                {
                    title: '应用名称',
                    dataIndex: 'name',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '应用种类',
                    dataIndex: 'app_type',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '应用描述',
                    dataIndex: 'app_desc',
                    ellipsis: true,
                    tooltip: true,
                    width: 500
                },
            ];
            const columns2 = [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    width: 100
                },
                {
                    title: 'URL',
                    slotName: 'urls',
                    width: 500
                },
            ];

            const isQuery = ref(false)

            const data = reactive({
                table_data1: [],
                table_data2: [],
                url: ''
            })
            const time = ref(0)
            const singleQuery = (url) => {
                loading.value = true
                data.url = url
                let start = performance.now()
                querySingleFinger(url, setting).then((res) => {
                    if (res.data.code === 200) {
                        let end = performance.now()
                        time.value = Math.round(((end-start) / 1000)*100)/100
                        data.table_data1 = res.data.data.finger
                        data.table_data2 = res.data.data.spider

                    }
                    isQuery.value = true
                    loading.value = false
                }).catch((error) => {
                    isQuery.value = false
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
                setting.only_home = true
            };
            const handleCancel = () => {
                visible.value = false;
            }
            onMounted(() => {
                resetting()
            })

            return {
                loading,
                singleQuery,
                isQuery,
                columns1,
                columns2,
                data,
                openSetting,
                visible,
                resetting,
                handleCancel,
                setting,
                time
            }
        }
    }
</script>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70vh;
    }
    .main ::v-deep(.arco-space-item) {
        display: flex;
        justify-content: center;
    }
    .main-input {
        height: 50px;
    }
    .main-input ::v-deep(.arco-btn){
        border-bottom-right-radius: 0px;
        border-top-right-radius: 0px;
        border-right-style: solid;
        border-right-color: rgb(100,100,100);

    }
    .main-btn{
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
        border-left-style: solid;
        border-left-color: rgb(100,100,100);
    }
    .main-input ::v-deep(.arco-input-wrapper .arco-input.arco-input-size-large) {
        font-size: 20px;
    }
    .main-input ::v-deep(.arco-btn-size-large) {
        font-size: 20px;
        height: 50px;
    }
    .query-input {
        height: 32px;
    }
    .query-input ::v-deep(.arco-input-wrapper .arco-input.arco-input-size-large) {
        font-size: 15px;
    }
    .query-input ::v-deep(.arco-btn-size-large) {
        font-size: 15px;
        height: 32px;
    }
    .query-input ::v-deep(.arco-btn){
        border-bottom-right-radius: 0px;
        border-top-right-radius: 0px;
        border-right-style: solid;
        border-right-color: rgb(100,100,100);

    }
</style>