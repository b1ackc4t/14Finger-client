<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-space direction="vertical" fill size="medium">
                <div class="first-row">
                    <a-space>
                        <a-select :style="{width:'200px'}" placeholder="年份">
                            <a-option>2022</a-option>
                            <a-option>2021</a-option>
                            <a-option>2020</a-option>
                        </a-select>

                    </a-space>
                </div>
                <a-table :columns="columns" :data="data.table_data" :pagination="true"/>

            </a-space>
        </a-spin>


    </div>
</template>

<script>
    import {onMounted, reactive, ref} from "vue";
    import {getUserRank} from "../api/user.js";
    import {timeFormat} from "../utils";

    export default {
        name: "Rank",
        setup() {
            const loading = ref(false)
            const columns = [
                {
                    title: '排行',
                    dataIndex: 'rank',
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                },
                {
                    title: '角色',
                    dataIndex: 'role',
                },
                {
                    title: '贡献指纹数量',
                    dataIndex: 'finger_num',
                },
                {
                    title: '贡献应用数量',
                    dataIndex: 'app_num',
                },
            ];
            const data = reactive({
                table_data: []
            });

            const loadRank = () => {
                loading.value = true
                getUserRank().then((res) => {
                    if (res.data.code === 200) {
                        data.table_data = res.data.data
                    }
                    loading.value = false
                }).catch((error) => {
                    console.log(error)
                    loading.value = false
                    message.value.error("hacker！")
                })
            }

            const load = () => {
                loadRank()
            }

            onMounted(() => {
                load()
            })

            return {
                columns,
                data,
                loading
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