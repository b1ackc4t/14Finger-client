<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-space direction="vertical" fill>
                <div>
                    平台批量扫描任务
                </div>
                <div>
                    <a-table :columns="columns" :data="data.table_data" :pagination="true">
                        <template #time="{ record,rowIndex }">
                            <span v-if="record.status === 'success'">{{record.all_time}}</span>
                            <span v-else>null</span>

                        </template>
                        <template #status="{ record,rowIndex }">
                            <a-tag v-if="record.status === 'success'" color="green">扫描已完成</a-tag>
                            <a-tag v-else color="orangered">扫描中</a-tag>
                        </template>
                        <template #action="{ record,rowIndex }">
                            <a-space>
                                <a-button type="primary" status="success" size="small" v-if="record.status === 'success'" @click="download(record.id)">下载结果</a-button>
                                <a-popconfirm content="你确定要删除吗" @ok="deleteTask(record.id)">
                                    <a-button type="primary" status="danger" size="small">删除任务</a-button>
                                </a-popconfirm>

                            </a-space>

                        </template>
                    </a-table>
                </div>
            </a-space>

        </a-spin>
    </div>
</template>

<script>
    import {getMessage, timeFormat, timeFormat2} from "../utils";
    import {onMounted, reactive, ref} from "vue";
    import {getBatchTask, downloadBatchTask, deleteBatchTask} from "../api/finger.js";

    export default {
        name: "Profile",
        setup() {
            const message = getMessage()

            const loading = ref(false)

            const columns = [
                {
                    title: '任务ID',
                    dataIndex: 'id',
                    width: 100
                },
                {
                    title: '任务名称',
                    dataIndex: 'name',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '任务大小',
                    dataIndex: 'url_num',
                    ellipsis: true,
                    tooltip: true,
                    width: 100,
                    sortable: {
                        sortDirections: ['ascend', 'descend']
                    }
                },
                {
                    title: '任务开启时间',
                    dataIndex: 'add_time',
                    ellipsis: true,
                    tooltip: true,
                    width: 150
                },
                {
                    title: '开启用户',
                    dataIndex: 'username',
                    ellipsis: true,
                    tooltip: true,
                    width: 150,
                    sortable: {
                        sortDirections: ['ascend', 'descend']
                    }
                },
                {
                    title: '扫描时长',
                    slotName: 'time',
                    ellipsis: true,
                    tooltip: true,
                    width: 130,
                    sortable: {
                        sortDirections: ['ascend', 'descend']
                    }
                },
                {
                    title: '当前任务状态',
                    slotName: 'status',
                    width: 120
                },
                {
                    title: '操作',
                    slotName: 'action'
                },
            ];

            const data = reactive({
                tasks: [],
                table_data: []
            })

            const download = (id) => {
                downloadBatchTask(id)
            }

            const deleteTask = (id) => {
                loading.value = true
                deleteBatchTask(id).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("删除任务成功")
                        load()
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }

            const loadTasks = () => {
                loading.value = true
                getBatchTask().then((res) => {
                    if (res.data.code === 200) {
                        data.tasks = res.data.data
                        let tmp = []
                        for (let item of data.tasks) {
                            let obj = {}
                            obj['id'] = item.id
                            obj['name'] = item.name
                            obj['username'] = item.user.username
                            obj['status'] = item.status
                            obj['add_time'] = timeFormat(item.add_time)
                            obj['all_time'] = timeFormat2(item.all_time)
                            obj['url_num'] = item.url_num
                            tmp.push(obj)
                        }
                        data.table_data = tmp
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }

            const load = () => {
                loadTasks()
            }

            onMounted(() => {
                load()
            })

            return {
                data,
                columns,
                download,
                deleteTask,
                loading
            }
        }
    }
</script>

<style scoped>

</style>