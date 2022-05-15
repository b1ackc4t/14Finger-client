<template>
    <div class="register">
        <RegisterCard v-model="userForm"></RegisterCard>
    </div>
</template>

<script>
    import {computed, reactive} from "vue";
    import RegisterCard from "../components/common/RegisterCard.vue";

    export default {
        name: "RegisterView",
        components: {RegisterCard},
        setup() {
            const userForm = reactive({})
            return {
                userForm
            }
        }
    }
</script>

<style scoped>
    .register {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70vh;
    }
</style>