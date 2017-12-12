<template>
    <el-row class="header">
        <el-col :span="12">
            <div class="blank">&nbsp;</div>
            <ul class="top-nav">
                <li v-for="item in thirdMenu">
                    <router-link :to="item.url"><span>{{item.name}}</span></router-link>
                </li>
            </ul>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end" class="top-right">
                <el-dropdown class="">
                    <span class="el-dropdown-link">
                      admin<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改信息</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>
<style>
    .header{
        background: #fff;
        height: 51px;
        line-height: 50px;
        border-bottom: 1px solid #e4e4e4;
    }
    .blank{
        width: 10px;
    }
    .top-nav{

    }
    .top-nav li{
        float: left;
    }
    .top-nav li a{
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
    }
    .top-nav li a.active span {
        display: inline-block;
        height: 48px;
        color: #333;
        border-bottom: 2px solid #0099FC;
    }
    .top-right{
        padding: 0 20px;
    }

</style>
<script>
    export default {
        components: {
        },
        computed: {
            thirdMenu() {
                //获取系统定义的所有菜单
                let menu = this.$store.state.menu.menus;
                //获取系统定义的所有菜单
                let i = this.$store.state.menu.firstIndex;

                if (menu[i].children && menu[i].children.length > 0){
                    let j = this.$store.state.menu.secondIndex;
                    return menu[i].children[j].children;
                }

               return [];
            }
        },
        methods: {
        }
    }
</script>



