<template>
    <div class="project-info-wrap">
        <div class="project-info-head">
            <div class="project-info-cover">
                <img v-if="info.cover" :src="info.cover.path | getImg">
            </div>
            <div class="project-info-text">
                <div class="project-info-title">{{ info.name }}</div>
                <div class="project-info-describe">{{ info.describe }}</div>
                <div class="project-info-tags">
                    <TagMap v-if="info.id" :list="info.tag" />
                </div>
                <div class="project-info-url">
                    <span>二维码地址: <a :href="info.qrcode" target="_blank">{{ info.qrcode }}</a></span>
                    <span>项目地址: <a :href="info.url" target="_blank">{{ info.url }}</a></span>
                    <span>Github地址: <a :href="info.github" target="_blank">{{ info.github }}</a></span>
                </div>
            </div>
            <div class="project-info-btn">
                <el-button size="medium" type="primary" @click="handleAdd">添加记录</el-button>
            </div>
        </div>

        <el-table stripe border :data="list" style="width: 100%">

            <el-table-column label="id" width="140">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="版本号" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.version }}</span>
                </template>
            </el-table-column>
            <el-table-column label="记录类型" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.type | typeMap }}</span>
                </template>
            </el-table-column>
            <el-table-column label="记录标题">
                <template slot-scope="scope">
                    <span>
                        <span>{{ scope.row.title || '-' }}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="记录内容">
                <template slot-scope="scope">
                    <span>
                        <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="发布日期" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.id | formatDate('yyyy-MM-dd') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新日期" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.lasttime | formatDate('yyyy-MM-dd') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
            <el-form ref="form" label-width="80px">

                <div class="project-info-edit">
                    <el-form-item label="类型">
                        <el-select v-model="curItem.type" placeholder="请选择类型">
                            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="curItem.title" placeholder="请选择标题，可不填"></el-input>
                    </el-form-item>
                    <el-form-item label="版本">
                        <el-input v-model="curItem.version"></el-input>
                    </el-form-item>
                </div>

                <template v-if="curItem.type === 1">
                    <el-form-item label="需求">
                        <div class="log-item-todolist">
                            <div class="log-item-todoitem" v-for="item in curItem.todo" :key="`todo-${item.id}`">
                                <el-checkbox v-model="item.checked"></el-checkbox>
                                <el-input v-model="item.content" placeholder="请输入需求内容"></el-input>
                                <el-button size="mini" type="danger" @click="deleteToDo(item.id)">删除</el-button>
                            </div>
                        </div>
                        <div class="log-item-todoadd" @click="addToDo">+</div>
                    </el-form-item>
                </template>

                <template v-if="curItem.type === 2">
                    <el-form-item label="图文">
                        <MDeditor v-if="dialogVisible" v-model="curItem.content" />
                    </el-form-item>
                </template>

                <template v-if="curItem.type === 3">
                    <el-form-item label="图集">
                        <div class="log-item-imgs">
                            <UploadImg multiple @change="uploadImg" />
                            <div class="log-item-img" v-for="item in curItem.imgs" :key="item.id">
                                <img :src="item.path | getImg">
                                <i class="log-item-img-delete el-button--danger" @click="deleteImg(item)"><i
                                        class="el-icon-delete"></i></i>
                            </div>
                        </div>
                    </el-form-item>
                </template>

                <template v-if="curItem.type === 4">
                    <el-form-item label="视频">
                        <el-input v-model="curItem.video" placeholder="请输入B站AV号"></el-input>
                    </el-form-item>
                </template>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveLog">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="title2" :visible.sync="dialogVisible2" width="800px">

            <template v-if="curItem.type === 1">
                <div class="log-view-todolist">
                    <div class="log-view-todoitem" v-for="item in curItem.todo" :key="`todo-${item.id}`">
                        <span class="log-view-todo-check"><i v-if="item.checked" class="el-icon-check"></i></span>
                        <span :class="{'checked': item.checked}">{{ item.content }}</span>
                    </div>
                </div>
            </template>

            <template v-if="curItem.type === 2">
                <div class="log-view-content markdown-view" v-html="viewContent"></div>
            </template>

            <template v-if="curItem.type === 3">
                <div class="log-view-imgs">
                    <img :src="item.path | getImg" v-for="item in curItem.imgs" :key="item.id">
                </div>
            </template>

            <template v-if="curItem.type === 4">
                <iframe :src="`//player.bilibili.com/player.html?aid=${curItem.video}`" width="100%" height="500px"
                    scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
                </iframe>
            </template>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex"

    import * as api from "@/utils/api"

    import UploadImg from "@/components/UploadImg"
    import TagMap from "@/components/TagMap"
    import MDeditor from "@/components/MDeditor"
    import md from "@/utils/markdown"

    const TYPES = [{
        id: 1,
        name: '需求'
    }, {
        id: 2,
        name: '图文'
    }, {
        id: 3,
        name: '图集'
    }, {
        id: 4,
        name: '视频'
    }]

    export default {
        data() {
            return {
                id: this.$route.params.id,
                list: [],
                title: '',
                dialogVisible: false,
                title2: '',
                dialogVisible2: false,
                curItem: {},
                types: TYPES
            }
        },
        components: {
            UploadImg,
            TagMap,
            MDeditor
        },
        computed: {
            ...mapState({
                projectList: state => state.projectList || []
            }),
            info() {
                return this.projectList.length > 0 ? this.projectList.find(item => item.id == this.id) : {}
            },
            viewContent() {
                return this.curItem.content ? md(this.curItem.content) : ''
            }
        },
        created() {
            this.getList()
        },
        filters: {
            typeMap(type) {
                return TYPES.find(item => item.id == type).name
            }
        },
        methods: {
            handleAdd() {
                this.dialogVisible = true
                this.title = '添加记录'
                let version = this.list.length > 0 ? this.list[0].version : ''
                if (version) {
                    version = version.split('.')
                    version[2] = Number(version[2]) + 1
                    version = version.join('.')
                } else {
                    version = '0.0.0'
                }
                this.curItem = {
                    type: 2,
                    title: '',
                    content: '',
                    imgs: [],
                    img: '',
                    video: '',
                    version: version,
                    todo: []
                }
            },
            handleView(row) {
                this.title2 = `查看记录【${row.id}】`
                this.dialogVisible2 = true
                this.curItem = row
            },
            handleEdit(row) {
                this.title = `编辑记录【${row.id}】`
                this.dialogVisible = true
                this.curItem = row
            },
            handleDelete(row) {
                this.$confirm(`此操作将永久删除记录【${row.id}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: row.id,
                        pid: this.id
                    }
                    api.deleteLog(params).then(({
                        data
                    }) => {
                        this.$message({
                            type: 'success',
                            message: data.message
                        });
                        this.getList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteToDo(id) {
                this.curItem.todo = this.curItem.todo.filter((item) => {
                    return Number(item.id) !== Number(id)
                })
            },
            getList() {
                let params = {
                    id: this.id
                }
                api.getLogs(params).then(({
                    data
                }) => {
                    data.sort((a, b) => {
                        return b.id - a.id
                    })
                    this.list = data
                })
            },
            uploadImg(item) {
                this.curItem.imgs.push(item)
            },
            deleteImg(img) {
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
                    this.curItem.imgs = this.curItem.imgs.filter(item => {
                        return Number(item.id) !== Number(img.id)
                    })
                })
            },
            saveLog() {
                let dateTime = new Date().getTime()
                let params = this.curItem
                params.lasttime = dateTime
                params.pid = this.id
                if (!params.id) {
                    params.id = dateTime
                }
                api.updatedLog(params).then(({
                    data
                }) => {
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.getList()
                })
            },
            addToDo() {
                let dateTime = new Date().getTime()
                this.curItem.todo.push({
                    checked: false,
                    id: dateTime,
                    content: ''
                })
            }
        },
    }
</script>

<style lang="scss">
    .project-info-wrap {
        .cell {
            text-align: center;
        }

        .project-info-head {
            display: flex;
            color: #666666;
            margin-bottom: 20px;
        }

        .project-info-cover {
            margin-right: 20px;

            img {
                width: 142px;
                height: 100px;
                object-fit: cover;
            }
        }

        .project-info-text {
            width: calc(100% - 160px);
        }

        .project-info-title {
            margin-bottom: 5px;
        }

        .project-info-describe {
            font-size: 12px;
            color: #999999;
            margin-bottom: 10px;
        }

        .project-info-url {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 12px;
            color: #999999;

            span {
                display: inline-block;
                max-width: 32%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            a {
                color: #999999;
                text-decoration: none;

                &:hover {
                    color: #23BED5;
                }
            }
        }

        .log-item-img,
        .upload-wrap.type-cover {
            width: 100px;
            height: 100px;
        }

        .log-item-imgs {
            display: flex;
            flex-wrap: wrap;
        }

        .log-item-img {
            margin-left: 10px;
            margin-bottom: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .log-item-img-delete {
                position: absolute;
                top: 5px;
                right: 5px;
                width: 20px;
                height: 20px;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                cursor: pointer;
            }
        }

        .log-item-todoadd {
            width: 200px;
            height: 36px;
            line-height: 36px;
            border: 1px dashed #dfdfdf;
            color: #999999;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;

            &:hover {
                border-color: #409EFF;
            }
        }

        .log-view-todoitem,
        .log-item-todoitem {
            display: flex;
            margin-bottom: 10px;
        }

        .log-view-todo-check {
            display: inline-block;
            width: 30px;
        }

        .log-item-todoitem .el-button {
            margin-left: 20px;
            margin-right: 20px;
        }

        .log-view-todoitem .checked {
            color: #999999;
            text-decoration: line-through;
        }

        .project-info-edit {
            display: flex;
            justify-content: space-between;
        }

        .log-item-todolist,
        .log-view-content,
        .log-view-imgs {
            height: 300px;
            overflow-y: auto;


            &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba($color: #999999, $alpha: 0.2);
                transition: 0.2s;
                border-radius: 8px;
            }

            &::-webkit-scrollbar-track {
                background-color: rgba($color: #000000, $alpha: 0);
            }

            &:hover::-webkit-scrollbar-thumb {
                background-color: rgba($color: #999999, $alpha: 0.6);
            }

            img {
                display: block;
                max-width: 100%;
                margin-bottom: 10px;
            }
        }
    }
</style>