<template>
    <el-row class="content" :class="{'content-loading' : isLoading}">
        <el-col :span="24" class="content-inner">
            <el-row class="content-top">
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-plus" size="small"><router-link :to="'/store/module/edit'">添加</router-link></el-button>
                </el-col>
                <el-col :span="18">
                    <el-row type="flex" class="row-bg" justify="end">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
                            <el-form-item label="名称">
                                <el-input v-model="formInline.name" placeholder="名称" size="small"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleSearch()" icon="search" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="table">
                <el-table
                        ref="multipleTable"
                        v-loading="tableLoading"
                        :data="list"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="key"
                            label="key">
                    </el-table-column>
                    <el-table-column
                            prop="icon"
                            label="icon"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="icon2"
                            label="icon2"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="small"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-row class="oper">
                    <el-col :span="6">
                        <el-row>
                            <el-button size="small" @click="toggleSelection()">删除</el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="18">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageNo"
                                    :page-sizes="[5, 10, 15, 20, 30, 40, 50]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="totalSize">
                            </el-pagination>
                        </el-row>
                    </el-col>
                </el-row>

            </el-row>

            <el-row class="inner-loading" v-show="isLoading">
                <div class="el-loading-mask" style="">
                    <div class="el-loading-spinner">
                        <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!---->
                    </div>
                </div>
            </el-row>
        </el-col>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" size="tiny">
            <el-row>
                <el-col :span="20">
                    <el-form :model="form">
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称" :label-width="100">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </el-row>
</template>
<style type="text/less">

</style>
<script type="text/babel">
    import { Loading } from 'element-ui';
    export default {
        computed: {
            oss(){
                return this.$store.state.oss;
            },
            list() {
                return this.$store.state.list;
            },
            pageNo(){
                return this.$store.state.pageNo;
            },
            pageSize(){
                return this.$store.state.pageSize;
            },
            totalSize(){
                return this.$store.state.totalSize;
            },
            tableLoading(){
                return this.$store.state.isLoading;
            }
        },
        data() {
            return {
                isLoading: true,
                dialogFormVisible: false,
                params: {},
//                pageNo: 1,
//                pageSize: 10,
//                totalSize: 400,

                formInline: {
                    name: ''
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                multipleSelection: []
            }
        },
        mounted(){
            this.isLoading = false;
        },
        preFetch ({ state, dispatch, commit, cookies }) {
            return Promise.all([
                dispatch('SET_LIST', { cookies })
            ])
        },
//        beforeMount() {
//            return Promise.all([
//                this.$store.dispatch('SET_LIST')
//            ]);
//        },
        methods: {
            fetch(){
                let params = this.params;
                this.$store.dispatch('SET_LIST', {
                    data: params
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.$store.dispatch('SET_PAGE', {
                    pageSize: val
                });
                this.fetch();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$store.dispatch('SET_PAGE', {
                    pageNo: val
                });
                this.fetch();
            },
            handleSearch(){

            },
            handleDelete(index, row){
                console.log("index: "+ index + " row:" + JSON.stringify(row));
                this.$store.dispatch('DELETE', {
                    id: row.id
                });
            },
            handleEdit(){}
        }
    }
</script>
