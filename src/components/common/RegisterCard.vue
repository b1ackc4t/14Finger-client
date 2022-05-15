<template>
    <a-card :style="{ width: '500px' }" title="用户注册" hoverable>
        <template #actions>
            <a-link href="/login">登录</a-link>
        </template>
        <a-form :model="form" :style="{width:'450px'}">
            <a-form-item field="username" label="用户名" required validate-trigger="blur">
                <a-input v-model="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" required validate-trigger="blur">
                <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear/>
            </a-form-item>
            <a-form-item field="password2" label="密码确认" required validate-trigger="blur">
                <a-input-password v-model="form.password2" placeholder="请再次输入密码" allow-clear/>
            </a-form-item>
            <a-form-item field="email" label="邮箱" required validate-trigger="blur">
                <a-input v-model="form.email" placeholder="请输入邮箱" />
<!--                <a-button type="primary">发送验证码</a-button>-->
            </a-form-item>
<!--            <a-form-item field="emailCode" label="验证码" required>-->
<!--                <a-input :style="{width:'200px'}" :max-length="4" allow-clear show-word-limit v-model="form.emailCode" />-->
<!--            </a-form-item>-->
            <a-form-item>
                <a-button type="primary" @click="registerSubmit(form)">注册</a-button>
            </a-form-item>
        </a-form>
        <a-card-meta>
            <template #avatar>
<!--                <a-link>找回密码</a-link>-->
            </template>
        </a-card-meta>
    </a-card>
</template>

<script>
    import {computed, inject} from "vue";
    import {register} from "../../api/user.js";

    export default {
        name: "RegisterCard",
        props: {
            modelValue: {
                default: {}
            }
        },
        data() {
            return {
                mes: null
            }
        },
        methods: {
            handleMes() {
                this.$message.info({
                    content: 'This is an info message!',
                });
            },
            registerSubmit(form) {
                if (form.password !== form.password2) {
                    this.mes.error("两次密码不一致")
                } else {
                    register(form).then((res) => {
                        if (res.data.code === 201) {
                            this.mes.success("注册成功")
                        } else {
                            this.mes.error(res.data.data)
                        }
                    }).catch((error) => {
                        this.mes.error(JSON.stringify(error.response.data.data))
                    })
                }
            }
        },
        mounted() {
            this.mes = inject('message')
            console.log(this.mes)
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
            return {
                form,
            }
        }
    }
</script>

<style scoped>

</style>