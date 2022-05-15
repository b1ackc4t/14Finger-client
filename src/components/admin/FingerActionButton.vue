<template>
    <div>
        <a-space>
            <a-popconfirm content="若您修改了请先提交修改" @ok="passfunc" v-if="props.view">
                <a-button type="primary" status="success" :size="props.size">通过</a-button>
            </a-popconfirm>
            <a-button v-else type="primary" status="success" :size="props.size" @click="passfunc">通过</a-button>
            <a-button type="primary" status="warning" :size="props.size" @click="cancelfunc">取消</a-button>
            <a-popconfirm content="你确定要删除吗" @ok="deletefunc">
                <a-button type="primary" status="danger" :size="props.size">删除</a-button>
            </a-popconfirm>

        </a-space>
    </div>
</template>

<script>
    import {actionFingerForAdmin} from "../../api/finger.js";
    import {getMessage} from "../../utils";

    export default {
        name: "FingerActionButton",
        props: {
            size: String,
            id: Number,
            view: {
                default: false
            }
        },
        setup(props, context) {
            const message = getMessage()

            const passfunc = () => {
                actionFingerForAdmin('pass', props.id).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success('操作成功')
                    }
                    context.emit('reload')
                }).catch((error) => {
                    console.log(error)
                    message.value.error("hacker！不是管理员！")
                })
            }

            const cancelfunc = () => {
                actionFingerForAdmin('cancel', props.id).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success('取消成功')
                    }
                    context.emit('reload')
                }).catch((error) => {
                    console.log(error)
                    message.value.error("hacker！不是管理员！")
                })
            }

            const deletefunc = () => {
                actionFingerForAdmin('delete', props.id).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success('删除成功')
                    }
                    context.emit('delete_reload')
                }).catch((error) => {
                    console.log(error)
                    message.value.error("hacker！不是管理员！")
                })
            }
            return {
                props,
                passfunc,
                cancelfunc,
                deletefunc
            }
        }
    }
</script>

<style scoped>

</style>