<template>
    <a-card :style="{ width: '500px' }" title="用户登录" hoverable>
        <template #actions>
            <a-link href="/register">注册新用户</a-link>
        </template>
        <a-form :model="form" :style="{width:'450px'}">
            <a-form-item field="username" label="用户名" v-if="isUserName">
                <a-input v-model="form.username" placeholder="请输入用户名..." />
                <a-button type="primary" @click="()=>{isUserName = false}">切换邮箱</a-button>
            </a-form-item>
            <a-form-item field="email" label="邮箱" v-else>
                <a-input v-model="form.email" placeholder="请输入邮箱..." />
                <a-button type="primary" @click="()=>{isUserName = true}">切换用户名</a-button>
            </a-form-item>
            <a-form-item field="password" label="密码">
                <a-input-password v-model="form.password" placeholder="请输入密码..." allow-clear/>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="loginSubmit">登录</a-button>
            </a-form-item>
        </a-form>
        <a-card-meta>
            <template #avatar>

            </template>
        </a-card-meta>
    </a-card>
</template>

<script>
    import {computed, ref, onMounted, inject} from "vue";
    import {login, register} from "../../api/user.js";
    import {useRouter} from "vue-router";

    export default {
        name: "LoginCard",
        props: {
            modelValue: {
                default: {}
            }
        },
        setup(props, context) {
            // v-model
            const form = computed({
                get: () => {
                    return props.modelValue
                },
                set: (value) => {
                    context.emit(`update:modelValue`, value)
                }
            })

            // 获取message对象
            const message = ref(null)
            onMounted(() => {
                message.value = inject("message")
            })

            const isUserName = ref(true)
            const router = useRouter()
            // 登录提交
            const loginSubmit = () => {
                if (isUserName.value) {
                    form.value.email = null
                } else {
                    form.value.username = null
                }
                login(form.value).then((res) => {
                    if (res.data.code === 200) {
                        message.value.success("登录成功")
                        router.push({name: 'main'})
                    } else {
                        message.value.error("用户名或密码错误")
                    }
                }).catch((error) => {
                    message.value.error("用户名或密码错误")
                    console.log(error)
                })
            }

            return {
                form,
                message,
                loginSubmit,
                isUserName,
            }
        }
    }
</script>

<style scoped>

</style>