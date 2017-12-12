<template>
    <simple-layout>
        <el-row class="login">
            <el-row class="container">
                <div class="login-title"><img src="data:image/png;base64,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"></div>
                <el-form :model="form" :rules="rules" ref="form" label-width="0" class="demo-ruleForm">
                    <el-form-item prop="loginName" class="login-item">
                        <el-input class="form-input" type="input" v-model="form.loginName" auto-complete="off" placeholder="用户名" :autofocus="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-item">
                        <el-input class="form-input" type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item class="login-item">
                        <el-button type="primary" :loading="isLoading" class="form-submit" @click="submitForm('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-row>
    </simple-layout>
</template>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
    html{height: 100%;}
    body {
        background: #18c8f6;
        height: auto;
        background:url("img/login-background.jpg") no-repeat center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        color: rgba(255,255,255,.95);
    }
    .login{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .container{
            width: 340px;
            height: 320px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255,255,255,.3);
            -moz-box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
            -webkit-box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
            box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            padding: 30px;
            .login-title{
                margin-bottom: 25px;
                text-align: center;
                img{
                    width: 80px;
                }
            }
            .login-item {
                .el-input__inner {
                    margin: 0 !important;
                }
            }
            .form-input {
                input {
                    margin-bottom: 15px;
                    font-size: 12px;
                    height: 40px;
                    border: 1px solid #eaeaec;
                    background: #fff;
                    border-radius: 5px;
                    color: #555;
                }
            }
            .form-submit {
                width: 100%;
                font-size: 16px;
                color: #fff;
                /*border-color: #00DFC5;*/
                /*background: #00DFC5;*/
                /*&:active, &:hover {*/
                    /*border-color: #00dfb9;*/
                    /*background: #00dfb9;*/
                /*}*/
            }
        }
    }



</style>
<script type="text/babel">
    export default {
        data() {
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入用户名'));
                }
                callback();
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入密码'));
                }

                if (value.length < 6){
                    return callback(new Error('密码长度不能小于6个字符'));
                }

                callback();
            };
            return {
                form: {
                    loginName: 'admin',
                    password: '123456'
                },
                rules: {
                    loginName: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                },
                isLoading: false
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        this.$http.post(`/login`, this.form).then(response => {
                            this.isLoading = false;
                            let data = response.data;
                            if (data.code == 200){
                                this.$message.error('登录成功');
                                window.location.href = '/order';
                            }
                        }).catch(error => {
                            this.isLoading = false;
                            this.$message.error('登录失败');
                        });
                    } else {
                        this.$message.error('验证失败');
                        this.isLoading = false;
                        return false;
                    }
                });
            }
        }
    }
</script>

