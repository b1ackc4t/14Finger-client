<template>
    <div>
        <a-spin :loading="loading" style="width: 100%" :size="40">
            <a-form :model="form" :style="{width:'100%'}" auto-label-width>
                <div v-if="mode === 'submit'">
                    <a-form-item field="factory_id" label="厂商" required validate-trigger="blur" v-if="!form.is_new && mode === 'submit'" :disabled="disable">
                        <a-select v-model="form.factory_id" placeholder="请选择厂商" allow-search>
                            <a-option v-for="item of data.factorys" :key="item.id" :value="item.id" :label="item.name"></a-option>
                        </a-select>
                        <template #extra>
                            <div>平台已经收录的厂商</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="is_new" label="是否新建厂商"  :disabled="disable">
                        <a-switch v-model="form.is_new">
                            <template #checked>
                                是
                            </template>
                            <template #unchecked>
                                否
                            </template>
                        </a-switch>
                        <template #extra>
                            <div>平台未收录该厂商</div>
                        </template>
                    </a-form-item>
                </div>
                <div v-if="form.is_new || mode === 'view'">
                    <a-form-item field="name" label="名称" required validate-trigger="blur">
                        <a-input v-model="form.name" placeholder="厂商的通用名称" />
                        <template #extra>
                            <div>例如：腾讯/Tencent</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="officialSite" label="官网" >
                        <a-input v-model="form.official_site" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="relParCompany" label="关联母公司" >
                        <a-input v-model="form.rel_par_company" placeholder="有代表性的母公司" />
                    </a-form-item>
                    <a-form-item field="relSonCompany" label="关联子公司" >
                        <a-input v-model="form.rel_son_company" placeholder="有代表性的子公司" />
                    </a-form-item>
                    <a-form-item field="country" label="国家" >
                        <a-select v-model="form.country" placeholder="请选择" allow-search>
                            <a-option>中国</a-option>
                            <a-option>美国</a-option>
                            <a-option>俄罗斯</a-option>
                            <a-option>日本</a-option>
                        </a-select>
                        <template #extra>
                            <div>厂商从属的国家</div>
                        </template>
                    </a-form-item>
                </div>

            </a-form>
        </a-spin>

    </div>
</template>

<script>
    import {computed, reactive, onMounted, watch, ref} from "vue";
    import {getAllFactory} from "../../api/factory.js";

    export default {
        name: "FactoryInfoForm",
        props: {
            modelValue: {
                default: {
                    name: '',

                }
            },
            mode: {
                default: 'submit'
            },
            disable: Boolean,
            iwatch: Boolean
        },
        setup(props) {
            // v-model
            const form = computed({
                get: () => {
                    return props.modelValue
                },
                set: (value) => {
                    context.emit(`update:modelValue`, value)
                }
            })

            const data = reactive({
                factorys: []
            })
            const loading = ref(false)
            // 获取平台所有厂商
            const loadFactory = () => {
                loading.value = true
                getAllFactory().then((res) => {
                    if (res.data.code === 200) {
                        data.factorys = res.data.data
                    }
                    loading.value = false
                }).catch((error) => {
                    loading.value = false
                    console.log(error)
                })
            }

            const load = () => {
                loadFactory()
            }
            onMounted(() => {
                load()
            })
            watch(()=>props.iwatch, () => {
                load()
            })
            return {
                form,
                data,
                props,
                loading
            }
        }
    }
</script>

<style scoped>

</style>