<template>
    <app-layout>
        <router-view></router-view>
    </app-layout>
</template>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
    .el-button a{
        color: #fff;
    }
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
        a{
            color: #fff;
        }
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
    .form{
        border-top: 1px solid #e4e4e4;
        padding: 20px 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<script>

</script>
