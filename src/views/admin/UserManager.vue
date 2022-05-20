<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-space direction="vertical" fill size="medium">
                <div class="first-row">
                    <a-space>
                        <a-select :style="{width:'200px'}" placeholder="搜索范围" v-model="search.key">
                            <a-option label="用户名" value="username"></a-option>
                            <a-option label="邮箱" value="email"></a-option>
                            <a-option label="角色" value="role"></a-option>
                        </a-select>
                        <a-input-search v-model="search.value" :style="{width:'200px'}" placeholder="搜索" search-button @search="load"/>
                    </a-space>
                </div>
                <a-table :columns="columns" :data="data.table_data" :pagination="false" @cell-click="enterFinger" class="mytable" column-resizable>
                    <template #action="{ record,rowIndex }">
                        <a-space>
                            <a-button type="primary" status="warning" size="mini" @click="handleClick(record)">编辑</a-button>
                            <a-popconfirm content="你确定要删除吗(这会同时删除此用户提交的所有指纹信息)？" @ok="deleteU(record.id)">
                                <a-button type="primary" status="danger" size="mini">删除</a-button>
                            </a-popconfirm>
                        </a-space>

                    </template>
                </a-table>
                <div class="last-row">
                    <a-pagination :total="total" v-model:current="currentPage" v-model:page-size="pageSize" @change="changePage" show-total show-jumper/>
                </div>
                <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
                    <template #title>
                        修改用户
                    </template>
                    <div>
                        <a-form :model="data.form">
                            <a-form-item field="username" label="用户名" required validate-trigger="blur">
                                <a-input v-model="data.form.username" placeholder="please enter your username..." />
                            </a-form-item>
                            <a-form-item field="password" label="密码">
                                <a-input v-model="data.form.password" placeholder="不修改密码请置空" />
                            </a-form-item>
                            <a-form-item field="email" label="邮箱" required validate-trigger="blur">
                                <a-input v-model="data.form.email" placeholder="please enter your post..." />
                            </a-form-item>
                            <a-form-item field="role" label="角色">
                                <a-select v-model="data.form.role" :style="{width:'200px'}" placeholder="">
                                    <a-option>user</a-option>
                                    <a-option>admin</a-option>
                                </a-select>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-modal>
            </a-space>
        </a-spin>
    </div>
</template>

<script>
    import {getMessage, timeFormat} from "../../utils";
    import {onMounted, reactive, ref} from "vue";
    import {getUserPageForAdmin, getUser, updateUser, deleteUser} from "../../api/user.js";

    export default {
        name: "UserManager",
        setup() {
            const message = getMessage()

            const loading = ref(false)

            // 分页参数
            const total = ref(0)
            const pageSize = ref(10)
            const currentPage = ref(1)
            const changePage = () => {
                load()
            }

            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    width: 100
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '角色',
                    dataIndex: 'role',
                    ellipsis: true,
                    tooltip: true,
                    width: 200
                },
                {
                    title: '操作',
                    slotName: 'action'
                },
            ];

            const data = reactive({
                table_data: [],
                form: {}
            })

            const loadUsers = () => {
                loading.value = true
                getUserPageForAdmin(pageSize.value, currentPage.value, search).then((res) => {
                    if (res.data.code === 200) {
                        total.value = res.data.data.count
                        data.table_data = res.data.data.results
                    } else {
                        message.value.error("页码错误")
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("服务端错误，请重试！")
                })
            }

            const load = () => {
                loadUsers()
            }

            onMounted(() => {
                load()
            })

            // 对话框
            const visible = ref(false);

            const handleClick = (user) => {
                data.form = user
                data.form.password = null
                visible.value = true;

            };
            const handleOk = () => {
                loading.value = true
                updateUser(data.form).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("修改成功")
                    } else {
                        message.value.error("页码错误")
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("服务端错误，请重试！")
                })
                visible.value = false;
            };
            const handleCancel = () => {
                visible.value = false;
            }

            const deleteU = (id) => {
                loading.value = true
                deleteUser(id).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("修改成功")
                    } else {
                        message.value.watch("操作错误")
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("服务端错误，请重试！")
                })
            }

            const search = reactive({
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
                load,
                changePage,
                visible,
                handleClick,
                handleOk,
                handleCancel,
                deleteU,
                search,
            }

        }
    }
</script>

<style scoped>

</style>