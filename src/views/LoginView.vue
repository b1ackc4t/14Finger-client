<template>
    <div class="login">
        <LoginCard v-model="userForm"></LoginCard>
    </div>

</template>

<script>
    import LoginCard from "../components/common/LoginCard.vue";
    import {reactive, onMounted, inject} from 'vue';
    import {register, getMe} from "../api/user.js";

    export default {
        name: "LoginView",
        components: {LoginCard},
        setup() {
            const userForm = reactive({})
            onMounted(() => {
                getMe().then((res) => {
                    if (res.data.code === 200) {
                        console.log(res.data.data)
                    }
                }).catch((error) => {
                    console.log(error)
                })

            })
            return {
                userForm,
                inject
            }
        }
    }
</script>

<style scoped>
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70vh;
    }
</style>