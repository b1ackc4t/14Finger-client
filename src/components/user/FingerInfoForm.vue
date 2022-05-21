<template>
    <div>
        <a-form :model="form" :style="{width:'100%'}" auto-label-width>
            <a-form-item field="method" label="识别方式"  required validate-trigger="blur">
                <a-select v-model="form.method" placeholder="请选择">
                    <a-option value="keyword" label="关键字匹配"></a-option>
                    <a-option value="regex" label="正则匹配"></a-option>
                    <a-option value="md5" label="MD5匹配"></a-option>
                </a-select>
                <template #extra>
                    <div>如何识别出的指纹</div>
                </template>
            </a-form-item>
            <a-form-item field="path" label="识别路径">
                <a-input v-model="form.path" placeholder="填写路径" />
                <template #extra>
                    <div>首页或全局指纹请置空，写路径请以/开头，如：/phpinfo.php</div>
                </template>
            </a-form-item>
            <a-form-item v-if="form.method !== 'md5'" field="location" label="识别位置" >
                <a-select v-model="form.location" placeholder="指纹匹配的位置" >
                    <a-option>header</a-option>
                    <a-option>body</a-option>
                    <a-option>title</a-option>
                    <a-option>url</a-option>
<!--                    <a-option>404页面</a-option>-->
                </a-select>
            </a-form-item>
            <a-form-item field="value" label="匹配值" required validate-trigger="blur">
                <a-input v-model="form.value" placeholder="输入你要匹配的指纹值" />
                <template #extra>
                    <div>不区分大小写</div>
                </template>
            </a-form-item>
<!--            测试url-->
            <a-form-item v-for="(item,index) of form.checkUrls" :field="`checkUrls.${index}.value`" :label="`测试url-${index}`" :key="index">
                <a-input v-model="item.value" placeholder="请输入用例url" />
                <a-button @click="handleDelete(form, index)" status="danger" :style="{marginLeft:'10px'}">删除</a-button>
            </a-form-item>
            <a-form-item label="">
                <a-button @click="handleAdd(form)" style="width: 100%">添加测试URL</a-button>
                <template #extra>
                    <div>至少一个</div>
                </template>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    import {computed} from 'vue'

    export default {
        name: "FingerInfoForm",
        props: {
            modelValue: {
                default: {
                    name: '',

                }
            }
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
            const handleAdd = (form) => {
                form.checkUrls.push({
                    value: ''
                })
            };
            const handleDelete = (form, index) => {
                form.checkUrls.splice(index, 1)
            }

            return {
                form,
                handleAdd,
                handleDelete,
            }
        }
    }
</script>

<style scoped>

</style>