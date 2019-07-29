<template>
    <div class="project-list">
        <div class="project-list-tool">
            <el-input placeholder="请输入项目名称" prefix-icon="el-icon-search" v-model="searchKey"></el-input>
            <el-button size="medium" type="primary" @click="handleAdd">添加项目</el-button>
        </div>

        <template v-if="!searchKey">
        
        <el-table stripe border :data="list" style="width: 100%">
            <el-table-column label="项目缩略图" width="100">
                <template slot-scope="scope">
                    <img v-if="scope.row.cover" :src="scope.row.cover.path | getImg" class="project-list-cover">
                </template>
            </el-table-column>
            <el-table-column label="项目名称">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="项目标签">
                <template slot-scope="scope">
                    <TagMap :list="scope.row.tag" />
                </template>
            </el-table-column>
            <el-table-column label="记录数" width="90">
                <template slot-scope="scope">
                    {{ scope.row.logCount || 0 }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.status ? '开发中' : '已完成' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新日期" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.lasttime | formatDate('yyyy-MM-dd') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleView(scope.row)">记录</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        </template>

        <template v-if="searchKey">
        
        <el-table stripe border :data="searchList" style="width: 100%">
            <el-table-column label="项目缩略图" width="100">
                <template slot-scope="scope">
                    <img v-if="scope.row.cover" :src="scope.row.cover.path | getImg" class="project-list-cover">
                </template>
            </el-table-column>
            <el-table-column label="项目名称">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="项目标签">
                <template slot-scope="scope">
                    <TagMap :list="scope.row.tag" />
                </template>
            </el-table-column>
            <el-table-column label="记录数" width="90">
                <template slot-scope="scope">
                    {{ scope.row.logCount || 0 }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.status ? '开发中' : '已完成' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新日期" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.lasttime | formatDate('yyyy-MM-dd') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="primary" @click="handleView(scope.row)">记录</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        </template>

        <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
            <el-form ref="form" label-width="80px">
                <el-row>
                    <el-col :span="9">
                        <UploadImg v-if="curItem.cover" v-model="curItem.cover.path" @change="uploadImage" />
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="名称">
                            <el-input v-model="curItem.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" :rows="6" v-model="curItem.describe"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="18">

                        <el-form-item label="标签">
                            <el-select v-model="curItem.tag" filterable multiple placeholder="请选择标签">
                                <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <el-switch v-model="curItem.status">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="二维码">
                    <el-input v-model="curItem.qrcode"></el-input>
                </el-form-item>

                <el-form-item label="链接">
                    <el-input v-model="curItem.url"></el-input>
                </el-form-item>

                <el-form-item label="github">
                    <el-input v-model="curItem.github"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveProject">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import * as api from "@/utils/api"
    import UploadImg from "@/components/UploadImg"
    import TagMap from "@/components/TagMap"
    export default {
        data() {
            return {
                dialogVisible: false,
                searchKey: '',
                title: '',
                curItem: {},
                list: [],
                searchList: [],
                tags: [],
                canSearch: true
            }
        },
        watch: {
            searchkey() {
                if (this.searchKey && this.searchKey.length > 0) {
                    this.handleSearch()
                }
            }
        },
        created() {
            this.getTags()
            this.getList()
        },
        components: {
            UploadImg,
            TagMap
        },
        methods: {
            getList() {
                api.getProjectList().then(({
                    data
                }) => {
                    data.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = data
                    this.$store.commit("SaveList", this.list);
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
                    let tags = item.tag.join(",").toLowerCase()
                    let name = item.name.toLowerCase()
                    let describe = item.describe.toLowerCase()
                    if (tags.indexOf(key) > -1 || name.indexOf(key) > -1 || describe.indexOf(key) > -1) {
                        this.searchList.push(item)
                    }
                }
                setTimeout(() => {
                    this.canSearch = true
                }, 600);
            },
            getTags() {
                api.getTags().then(({
                    data
                }) => {
                    let _data = []
                    for (let item of data) {
                        if (item.tags && item.tags.length > 0) {
                            for (let tag of item.tags) {
                                _data.push({
                                    pid: item.id,
                                    ...tag
                                })
                            }
                        }
                    }
                    this.tags = _data
                })
            },
            handleEdit(row) {
                this.title = "编辑项目"
                this.dialogVisible = true
                this.curItem = {
                    ...row
                }
                // console.log(index, row);
            },
            handleAdd() {
                this.title = "添加项目"
                this.curItem = {
                    name: '',
                    describe: '',
                    tag: [],
                    status: true,
                    qrcode: '',
                    url: '',
                    github: '',
                    cover: {
                        id: 1563953818185,
                        path: '1563953818185.png'
                    }
                }
                this.dialogVisible = true
            },
            handleView(row) {
                // console.log(index, row);
                this.$router.push(`/project-info/${row.id}`)
            },
            handleDelete(row) {
                this.$confirm(`此操作将永久删除项目${row.name}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: row.id
                    }
                    api.deleteProject(params).then(({
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
            uploadImage(cover) {
                this.curItem.cover = cover
            },
            saveProject() {
                let dateTime = new Date().getTime()
                let params = this.curItem
                params.lasttime = dateTime
                if (!params.id) {
                    params.id = dateTime
                }
                api.updatedProject(params).then(({
                    data
                }) => {
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.getList()
                })
            }
        }
    }
</script>

<style lang="scss">
    .project-list {
        .cell {
            text-align: center;
        }

        .project-list-tool {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }

        .el-select {
            width: 100%;
        }

        .project-list-cover {
            width: 100%;
            height: 40px;
            object-fit: cover;
        }
    }
</style>