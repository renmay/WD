<template>
    <el-row class="content">
        <el-col :span="24" class="content-inner">
    <div class="content-container">
        <el-row class="content-top">
            <el-col :span="12">
                <el-button type="primary" icon="caret-left" size="small"><router-link :to="'/app/table'">返回列表</router-link></el-button>
                <el-button type="primary" icon="search" size="small">搜索</el-button>
                <el-button type="primary" size="small">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-col>
            <el-col :span="18">
            </el-col>
        </el-row>

        <el-row class="form">
            <el-col :span="18">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送" prop="delivery">
                        <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="图片上传">
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList2"
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
    .content-top{
        padding: 10px 10px 5px 10px;
        a{
            color: #fff;
        }
    }
    .content-top .el-form-item{
        height: 20px;
    }
    .form{
        border-top: 1px solid #e4e4e4;
        padding: 20px 10px;
    }
</style>

<script>
    import { Loading } from 'element-ui';
    export default {
        data() {
            return {
                fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let loading = this.$loading({
                            target: '.content-inner',
                            fullscreen: false
                        });
                        this.$store.dispatch('FORM_SUBMIT').then(result => {
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>
