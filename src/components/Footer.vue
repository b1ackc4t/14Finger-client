<template>
    <div class="foo">
        <a-divider />
        <div style="margin-bottom: 10px">
            Built by <icon-github /><a-link href="https://github.com/b1ackc4t" style="font-size: 17px">b1ackc4t</a-link>
        </div>
    </div>
</template>

<script setup>
    import {IconQqCircleFill, IconGithub} from '@arco-design/web-vue/es/icon'

</script>

<style scoped>
.foo {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
}
</style>