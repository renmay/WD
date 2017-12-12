<template>
    <el-row class="content" :class="{'content-loading' : isLoading}">
        <el-col :span="24" class="content-inner">
            <el-row class="content-top">
                <el-col :span="6">
                    <el-button type="primary" icon="plus" size="small" @click="dialogFormVisible = true">添加</el-button>
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

        <el-dialog title="模块添加" :visible.sync="dialogFormVisible" size="tiny">
            <el-row>
                <el-col :span="20">
                    <el-form :model="form" :rules="rules" ref="ruleForm">
                        <el-form-item label="模块名称" prop="name"  :label-width="100">
                            <el-input v-model="form.name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="模块key" prop="key" :label-width="100">
                            <el-input v-model="form.key" placeholder="模块的唯一key不能重复"></el-input>
                        </el-form-item>
                        <el-form-item label="图标" :label-width="100">
                            <el-upload
                                    class="upload-demo"
                                    :action="oss.host"
                                    :data='oss'
                                    :file-list='fileList'
                                    :on-success="uploadSuccess"
                                    :limit="2"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>

                        </el-form-item>

                        <el-form-item label="图标2" :label-width="100">
                            <el-upload
                                    class="upload-demo"
                                    :action="oss.host"
                                    :data='oss'
                                    :on-success="uploadSuccess2"
                                    :limit="1"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                form: {
                    id: '',
                    name: '',
                    key: '',
                    icon: '',
                    icon2: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    key: [
                        { required: true, message: '请输入模块key', trigger: 'blur' }
                    ],
                    icon: [
                        { required: true, message: '请选择图标', trigger: 'change' }
                    ]
                },
                isLoading: true,
                dialogFormVisible: false,
                params: {},
                formInline: {
                    name: ''
                },
                multipleSelection: []
            }
        },
        mounted(){
            this.isLoading = false;
            this.$store.dispatch('GET_OSS_CONFIG');
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
            showDialog(){

            },
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
            handleSearch(index, row){

            },
            handleDelete(index, row){
                console.log("index: "+ index + " row:" + JSON.stringify(row));
                this.$store.dispatch('DELETE', {
                    id: row.id
                });
            },
            handleEdit(index, row){
                console.log(index, row);
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.key = row.key;
                this.form.icon = row.icon;
                this.form.icon2 = row.icon2;
                this.dialogFormVisible = true;
            },
            /**
             * 表单提交
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let loading = this.$loading({
                            target: '.content-inner',
                            fullscreen: false
                        });
                        this.$store.dispatch('FORM_SUBMIT', this.form).then(result => {
                            loading.close();
                            if (result.code == 200){
                                this.dialogFormVisible = false;
                                this.$store.dispatch('SET_LIST', {
                                    data: params
                                });
                                this.$message('提交成功');
                            }else{
                                this.$message.error('提交失败，请稍后重试。');
                            }
                        }).catch(err => {
                            loading.close();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            uploadSuccess(data, fileList){
                if (data.code == 200){
                    this.form.icon = data.data.url;
                }
            },
            uploadSuccess2(data, fileList){
                if (data.code == 200){
                    this.form.icon2 = data.data.url;
                }
            }
        }
    }
</script>
