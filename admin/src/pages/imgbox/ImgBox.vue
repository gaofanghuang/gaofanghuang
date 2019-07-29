<template>
    <div class="img-box-wrap">
        <el-form ref="form" label-width="120px">
            <el-row type="flex" justify="space-between">
                <el-col :span="6">
                    <el-input placeholder="请输入图片名称" prefix-icon="el-icon-search" v-model="searchKey"></el-input>
                </el-col>
                <el-col :span="6">
                    <div class="img-box-sort">
                        <el-radio @change="sortList" v-model="time" label="last">最新更新</el-radio>
                        <el-radio @change="sortList" v-model="time" label="first">最早发布</el-radio>
                    </div>
                </el-col>
                <el-col :span="6">
                    <UploadImg btn multiple @change="getList" />
                </el-col>
            </el-row>
        </el-form>

        <div class="img-box-list">
            <template v-if="!searchKey">
                <div class="img-box-item" v-for="item in list" :key="`img-${item.id}`">
                    <img :class="`data-${item.id}`"
                        :data-clipboard-text="`![${item.name}](${baseUrl}/img/${item.path})`" :src="item.path | getImg"
                        @click="copyMK(item.id)">
                    <span class="img-box-item-name" @click="showInp(item.id, true)"
                        v-if="!item.inp">{{ item.name }}</span>
                    <i class="img-box-item-delete el-button--danger" @click="deleteImg(item)"><i
                            class="el-icon-delete"></i></i>
                    <input type="text" v-if="item.inp" @keyup.enter="changeImg(item)" v-model="item.name"
                        class="img-box-item-inp">
                </div>
            </template>
            <template v-if="searchKey">
                <div class="img-box-item" v-for="item in searchList" :key="`search-img-${item.id}`">
                    <img :class="`data-${item.id}`"
                        :data-clipboard-text="`![${item.name}](${baseUrl}/img/${item.path})`" :src="item.path | getImg"
                        @click="copyMK(item.id)">
                    <span class="img-box-item-name" @click="showInp(item.id, true)"
                        v-if="!item.inp">{{ item.name }}</span>
                    <i class="img-box-item-delete el-button--danger" @click="deleteImg(item)"><i
                            class="el-icon-delete"></i></i>
                    <input type="text" v-if="item.inp" @keyup.enter="changeImg(item)" v-model="item.name"
                        class="img-box-item-inp">
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import * as api from "@/utils/api"
    import UploadImg from "@/components/UploadImg"
    import Clipboard from "clipboard";

    export default {
        data() {
            return {
                newImg: '',
                list: [],
                searchKey: '',
                time: 'last',
                baseUrl: process.env.VUE_APP_API_HOST,
                canSearch: true,
                searchList: []
            }
        },
        components: {
            UploadImg
        },
        created() {
            this.getList()
        },
        watch: {
            searchKey() {
                if (this.searchKey && this.searchKey.length > 0) {
                    this.handleSearch()
                }
            }
        },
        methods: {
            sortList() {
                if (this.time === 'last') {
                    this.list.sort((a, b) => {
                        return b.id - a.id
                    })
                } else {
                    this.list.sort((a, b) => {
                        return a.id - b.id
                    })
                }
            },
            getList() {
                api.getImgList().then(({
                    data
                }) => {
                    data.sort((a, b) => {
                        return b.id - a.id
                    })
                    data.map(item => {
                        item.inp = false
                    })
                    this.list = data
                })
            },
            handleSearch() {
                if (!this.canSearch) {
                    return
                }
                this.canSearch = false
                let key = this.searchKey.toLowerCase()
                let list = this.list
                this.searchList = []
                for (let item of list) {
                    let name = String(item.name).toLowerCase()
                    if (name.indexOf(key) > -1) {
                        this.searchList.push(item)
                    }
                }
                setTimeout(() => {
                    this.canSearch = true
                }, 600);
            },
            showInp(id, status) {
                for (let i in this.list) {
                    if (this.list[i].id == id) {
                        this.list[i].inp = status
                    }
                }
            },
            deleteImg(img) {
                this.$confirm(`此操作将永久删除图片${img.name}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: img.id,
                        path: img.path
                    }
                    api.deleteImg(params).then(({
                        data
                    }) => {
                        this.$message({
                            type: 'success',
                            message: data.message
                        });
                        this.list = this.list.filter((item) => {
                            return Number(item.id) !== Number(img.id)
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            changeImg(item) {
                let params = {
                    ...item
                }
                api.updatedImg(params).then(({
                    data
                }) => {
                    this.$message({
                        type: 'success',
                        message: data.message
                    });
                    this.showInp(item.id, false)
                })
            },
            copyMK(id) {
                new Clipboard(`.data-${id}`);
                document.execCommand("copy", false);
                this.$message({
                    type: 'success',
                    message: '已复制Markdown格式到剪贴板'
                });
            }
        },
    }
</script>

<style lang="scss">
    .img-box-wrap {
        .img-box-sort {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .img-box-list {
            margin-top: 20px;
            border-top: 1px solid #efefef;
            padding-top: 20px;
            display: flex;
            flex-wrap: wrap;
            max-height: calc(100vh - 164px);
            overflow-y: auto;
        }

        .img-box-item {
            width: 120px;
            height: 120px;
            margin-bottom: 10px;
            margin-right: 10px;
            cursor: pointer;
            background: #333333;
            border-radius: 4px;
            overflow: hidden;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: 0.2s;
            }

            &:hover {

                .img-box-item-name,
                img {
                    opacity: 0.78;
                }

                .img-box-item-delete {
                    opacity: 1;
                }
            }
        }

        .img-box-item-name {
            opacity: 0;
            transition: 0.2s;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 26px;
            line-height: 26px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            background: rgba($color: #000000, $alpha: 0.78);
            color: #ffffff;
        }

        .img-box-item-inp {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 26px;
            line-height: 26px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            background: none;
            border: none;
            background: rgba($color: #000000, $alpha: 0.78);
            color: #ffffff;
        }

        .img-box-item-delete {
            opacity: 0;
            transition: 0.2s;
            position: absolute;
            top: 5px;
            right: 5px;
            width: 20px;
            height: 20px;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
            border-radius: 50%;
        }
    }
</style>