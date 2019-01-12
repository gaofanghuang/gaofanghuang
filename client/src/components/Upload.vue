<template>
    <div class="upload-wrap">
        <Icon type="tupian" @click="uploadFile" />
        <input type="file" ref="uploadFile" @change="getFile">
    </div>
</template>

<script>
    import * as api from "@/util/api";
    export default {
        methods: {
            uploadFile() {
                this.$refs.uploadFile.click()
            },
            getFile(file) {
                console.log(file)
                let _file = file.target.files[0]
                //判断是否是图片类型
                if (!/image\/\w+/.test(_file.type)) {
                    alert("只能选择图片");
                    return false;
                }
                let self = this;
                let reader = new FileReader();
                reader.readAsDataURL(_file);
                reader.onload = function (e) {
                    api.upload({
                        base64: this.result
                    }).then(({
                        data
                    }) => {
                        console.log(data);
                        self.$emit("file", data.id);
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .upload-wrap {
        input {
            display: none;
        }
    }
</style>