<template>
    <el-row class="content">
        <el-col :span="24" class="content-inner">
    <div class="content-container">
        <el-row class="content-top">
            <el-col :span="12">
                <el-button type="primary" icon="caret-left" size="small"><router-link :to="'/store/module'">返回列表</router-link></el-button>
            </el-col>
            <el-col :span="18">
            </el-col>
        </el-row>

        <el-row class="form">
            <el-col :span="18">
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                    <el-form-item label="模块名称" prop="name">
                        <el-input v-model="form.name" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="模块key" prop="key">
                        <el-input v-model="form.key" placeholder="模块的唯一key不能重复"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
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

                    <el-form-item label="图标2">
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

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
        </el-col>
    </el-row>
</template>
<style lang="scss" type="text/scss" rel="stylesheet/scss">


</style>

<script>
    import { Loading } from 'element-ui';
    export default {
        computed: {
            oss(){
                console.log(this.$store.state.oss);
                return this.$store.state.oss;
            }
        },
        data() {
            return {
                fileList: [],
                form: {
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
                }
            };
        },
        mounted: function () {
            this.$store.dispatch('GET_OSS_CONFIG');
        },
        methods: {
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
