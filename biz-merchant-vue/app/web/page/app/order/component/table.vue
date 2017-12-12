<template>
    <el-row class="content" :class="{'content-loading' : isLoading}">
        <el-col :span="24" class="content-inner">
            <slot name="top"></slot>

            <el-row class="table">
                <el-row class="oper">
                    <el-col :span="6" class="oper-left">
                        <el-row>
                            <slot name="oper"></slot>
                        </el-row>
                    </el-col>
                    <el-col :span="18" class="oper-right">
                    </el-col>
                </el-row>

                <slot></slot>

                <el-row class="oper">
                    <el-col :span="6">
                        <el-row>
                            <slot name="oper-bottom"></slot>
                        </el-row>
                    </el-col>
                    <el-col :span="18">
                        <el-row type="flex" class="row-bg" justify="end">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageNo"
                                    :page-sizes="[1, 2, 3, 4, 5, 10, 20, 30, 40, 50]"
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

    </el-row>
</template>
<style type="text/less">
    .content{
        background: #f2f2f2;
        flex: 1;
        padding: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .content::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
        opacity: 0.5;
    }

    .content::-webkit-scrollbar{
        width: 5px;
        background-color: #F5F5F5;
        opacity: 0.5;
    }

    .content::-webkit-scrollbar-thumb{
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
    }

    .content .content-inner{
        background: #fff;
        border: 1px solid #e4e4e4;
        padding: 10px;
    }
    .footer{
        height: 35px;
        background: #1CA347;
    }

    .content-top{
        padding: 10px 10px 5px 10px;
    }
    .content-top .el-form-item{
        height: 20px;
    }
    .table{
        border-top: 1px solid #e4e4e4;
    }
    .table .oper{
        height: 50px;
        padding: 10px;
    }
    .content-loading{
        display: flex;
    }
    .content-loading .content-inner{
        flex: 1;
        position: relative;
    }
    .content-loading .content-inner .content-top{
        height: 50px;
    }
    .content-loading .content-inner .inner-loading{
        position: absolute;
        z-index: 9999;
        margin: 0;
        top: 50px;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        opacity: 1;
    }
</style>
<script type="text/babel">
    import { Loading } from 'element-ui';
    export default {
        computed: {
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
                    user: '',
                    region: ''
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
        preFetch ({ state, dispatch, commit }) {
            return Promise.all([
                dispatch('SET_LIST')
            ])
        },
        beforeMount() {
            return Promise.all([
                this.$store.dispatch('SET_LIST')
            ]);
        },
        methods: {
            fetch(){
                let params = this.params;
                this.$store.dispatch('SET_LIST', params);
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
