<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-space direction="vertical" fill size="medium">
                <div class="first-row">
                    <a-space>
                        <a-input placeholder="应用种类" v-model="search.app_type"></a-input>
                        <a-select :style="{width:'200px'}" placeholder="搜索范围" v-model="search.key">
                            <a-option label="全部字段" value="all"></a-option>
                            <a-option label="应用名称" value="app_name"></a-option>
                            <a-option label="厂商名称" value="fac_name"></a-option>
                            <a-option label="应用描述" value="app_desc"></a-option>
                        </a-select>
                        <a-input-search v-model="search.value" :style="{width:'200px'}" placeholder="搜索" search-button @search="searchSubmit"/>
                    </a-space>
                </div>
                <a-table :columns="columns" :data="data.table_data" :pagination="false"/>
                <div class="last-row">
                    <a-pagination :total="total" v-model:current="currentPage" v-model:page-size="pageSize" @change="changePage" show-total show-jumper/>
                </div>

            </a-space>
        </a-spin>
    </div>
</template>

<script>
    import {inject, onMounted, reactive, ref} from 'vue';
    import {getSimpleFingerPage} from "../api/finger.js";
    import {timeFormat} from "../utils";
    import {useRouter} from "vue-router";

    export default {
        name: "FingerLibrary",
        props: {
            page: Number,
            size: Number,
            app_type: String,
            key1: String,
            value: String
        },
        setup(props) {
            // 获取message对象
            const message = ref(null)
            onMounted(() => {
                message.value = inject("message")
            })

            const loading = ref(true)
            const router = useRouter()

            const columns = [
                {
                    title: '指纹ID',
                    dataIndex: 'id',
                },
                {
                    title: '应用名称',
                    dataIndex: 'name',
                    ellipsis: true,
                    tooltip: true,
                },
                {
                    title: '应用种类',
                    dataIndex: 'app_type',
                    ellipsis: true,
                    tooltip: true,
                },
                {
                    title: '厂商名称',
                    dataIndex: 'fac_name',
                    ellipsis: true,
                    tooltip: true,
                },
                {
                    title: '应用描述',
                    dataIndex: 'app_desc',
                    ellipsis: true,
                    tooltip: true,
                },
                {
                    title: '添加时间',
                    dataIndex: 'add_time',
                    ellipsis: true,
                    tooltip: true,
                },
            ];

            const data = reactive({
                fingers: [],
                table_data: []
            })

            // 分页参数
            const total = ref(0)
            const pageSize = ref(10)
            const currentPage = ref(1)

            const loadFingers = () => {
                getSimpleFingerPage(pageSize.value, currentPage.value, search).then((res) => {
                    if (res.data.code === 200) {
                        total.value = res.data.data.count
                        data.fingers = res.data.data.results
                        let tmp = []
                        for (let item of data.fingers) {
                            let obj = {}
                            obj['id'] = item.id
                            obj['name'] = item.app.name
                            obj['app_type'] = item.app.app_type
                            obj['app_desc'] = item.app.app_desc
                            obj['fac_name'] = item.app.factory.name
                            obj['add_time'] = timeFormat(item.add_time)
                            tmp.push(obj)
                        }
                        data.table_data = tmp
                    } else {
                        message.value.error("页码错误")
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                })
            }

            const load = () => {
                loadFingers()
            }

            onMounted(() => {
                loadParam()
                load()
            })

            const loadParam = () => {
                if (props.page) {
                    currentPage.value = props.page
                }
                if (props.size) {
                    pageSize.value = props.size
                }
                if (props.app_type) {
                    search.app_type = props.app_type
                }
                if (props.key1) {
                    search.key = props.key1
                }
                if (props.size) {
                    search.value = props.value
                }
            }

            const changePage = () => {
                router.push({
                    name: 'fingerLibrary',
                    query: {
                        page: currentPage.value,
                        size: pageSize.value,
                        app_type: search.app_type,
                        key: search.key,
                        value: search.value
                    }
                })
                load()
            }

            const searchSubmit = () => {
                currentPage.value = 1
                pageSize.value = 10
                router.push({
                    name: 'fingerLibrary',
                    query: {
                        page: currentPage.value,
                        size: pageSize.value,
                        app_type: search.app_type,
                        key: search.key,
                        value: search.value
                    }
                })
                load()
            }

            const search = reactive({
                app_type: '',
                key: '',
                value: ''
            })

            return {
                columns,
                data,
                total,
                pageSize,
                currentPage,
                loading,
                changePage,
                search,
                load,
                searchSubmit
            }
        },
    }
</script>

<style scoped>
    .first-row {
        display: flex;
        justify-content: flex-end;
        /*margin-bottom: 14px;*/
    }
    .last-row {
        display: flex;
        justify-content: flex-end;
    }
</style>