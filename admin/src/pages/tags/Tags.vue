<template>
    <div class="tags-wrap">
        <div class="tags-tool">
            <el-button size="medium" type="primary" @click="handleAdd">添加标签</el-button>
        </div>
        <el-table stripe border :data="tags" style="width: 100%" :height="height">
            <el-table-column fixed label="一级标签" width="140">
                <template slot-scope="scope">
                    {{ scope.row.pname }}
                </template>
            </el-table-column>
            <el-table-column label="二级标签">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="创建日期" width="140">
                <template slot-scope="scope">
                    <span>{{ scope.row.lasttime | formatDate('yyyy-MM-dd') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="title" :visible.sync="dialogVisible" width="300px">
            <el-form ref="form" label-width="80px">
                <el-form-item label="上级标签">
                    <el-select v-model="curItem.pid" placeholder="请选择上级标签">
                        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签名称">
                    <el-input v-model="curItem.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTags">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from "@/utils/api"
    export default {
        data() {
            return {
                list: [],
                tags: [],
                curItem: {},
                title: '',
                dialogVisible: false
            }
        },
        created() {
            this.getList()
        },
        computed: {
            height() {
                let winH = document.documentElement.clientHeight
                return winH - 168 + 'px'
            }
        },
        methods: {
            handleAdd() {
                this.title = '添加标签'
                this.dialogVisible = true
                this.curItem = {
                    pid: '',
                    name: ''
                }
            },
            handleDelete(row) {
                this.$confirm(`此操作将永久删除标签【${row.pname || row.name}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        pid: row.pid,
                        id: row.id
                    }
                    api.deleteTag(params).then(({
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
            getList() {
                api.getTags().then(({
                    data
                }) => {
                    this.list = data
                    let _data = []
                    for (let item of data) {
                        _data.push({
                            pid: '',
                            id: item.id,
                            pname: item.name,
                            lasttime: item.lasttime
                        })
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
                    this.$store.commit("SaveTags", data);
                })
            },
            addTags() {
                let dateTime = new Date().getTime();
                let params = {
                    pid: this.curItem.pid,
                    id: dateTime,
                    name: this.curItem.name,
                    lasttime: dateTime
                }
                api.addTags(params).then(({
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
        },
    }
</script>

<style lang="scss">
    .tags-wrap {
        .cell {
            text-align: center;
        }

        .tags-tool {
            text-align: right;
            margin-bottom: 20px;
        }

        .el-table--scrollable-y .el-table__body-wrapper {
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
        }
    }
</style>