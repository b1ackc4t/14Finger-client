<template>

    <a-input :style="{width:'200px'}" :max-length="4" allow-clear show-word-limit style="margin-right: 10px" v-model="vCode"/>
    <img src="../../assets/img/xxxafwa.png" width="80">
</template>

<script>
    import {computed, ref} from 'vue'

    export default {
        name: "VCode",
        props: {
            modelValue: {
                default: ''
            }
        },
        setup(props, context) {

            const vCode = computed({
                get: () => {
                    return props.modelValue
                },
                set: (value) => {
                    context.emit(`update:modelValue`, value)
                }
            })
            return {
                vCode,
            }
        }
    }
</script>

<style scoped>

</style>