<template>
    <div class="sidebar-wrapper" :class="{'sidebar-sub-hide' : subIsHide}">
        <el-row class="nav">
            <el-col :span="mainSidebarSpan" class="nav nav-parent">
                <div class="nav-first-sidebar">
                <span class="nav-header">
                    <div class="logo-element">后台管理</div>
                </span>
                    <ul class="" id="">
                        <li v-for="(item, index) in firstMenu">
                            <a :href="item.url" :class="{'active' : index == currentIndex}"><i :class="item.icon"></i> <span class="nav-label">{{item.name}}</span></a>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="13" class="nav nav-sub">
                <div class="nav-second-sidebar">
                    <span class="title">{{currentTitle}}</span>
                    <div class="slimScrollDiv">
                        <ul class="nav nav-second-level">
                            <li v-for="item in secondMenu">
                                <router-link :to="item.url">{{item.name}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subIsHide: false,
                path: '' //当前路由
            }
        },
        watch: {
            '$route' (to, from) {//路由改变时
                let path = this.path = to.fullPath
                this.$store.dispatch('SET_MENU', { path });
            },
            secondMenu: function () {
                this.subIsHide = this.secondMenu.length <= 0;
            }
        },
        computed: {
            currentTitle(){
                //获取系统定义的所有菜单
                let menu = this.$store.state.menu.menus;
                //获取系统定义的所有菜单
                let i = this.$store.state.menu.firstIndex;

                let current = menu[i];

                return current.title ? current.title : current.name;
            },
            currentIndex(){
                return this.$store.state.menu.firstIndex;
            },
            firstMenu() {
                //获取系统定义的所有菜单
                let menu = this.$store.state.menu.menus;

                let path = this.$router.currentRoute.path;
                this.$store.dispatch('SET_MENU', { path });
                return menu;
            },
            secondMenu() {
                //获取系统定义的所有菜单
                let menu = this.$store.state.menu.menus;
                let i = this.$store.state.menu.firstIndex;

                let children = menu[i].children;

                if (children && children.length > 0){
                    return menu[i].children;
                }

                return [];
            },
            mainSidebarSpan(){
                return this.subIsHide ? 24 : 11;
            }
        },
        methods: {
            /**
             * 将菜单下级菜单复制到上级菜单中，使上级菜单拥有完整的路径
             */
            handleUrl(menu) {
                let menus = [];

                for (let i = 0; i < menu.length; i++){
                    let url = this.getChildrenUrl(menu[i]);
                    menus.push({
                        url: url,
                        name: menu[i].name,
                        title: menu[i].title,
                        icon: menu[i].icon
                    });
                }

                return menus;
            },
            getChildrenUrl(menu) {
                let children = menu.children;

                if (children && children.length > 0){
                    return this.getChildrenUrl(children[0])
                }

                return menu.url;
            }
        }
    }
</script>

<style>
    .sidebar-wrapper {
        width: 200px;
        min-width: 200px;
        max-width: 200px;
        overflow: hidden;
        transition: all .28s ease-out;
        background: #1c2b36;
    }
    .logo-element {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: white;
        height: 50px;
        line-height: 50px;
    }
    .nav{
        height: 100%;
    }
    .nav .nav-parent{
    }
    .nav .nav-sub{
        background: #fff;
        border-right: 1px solid #e4e4e4;
    }
    .nav .nav-parent ul{
    }
    .nav .nav-parent ul li{
        text-align: center;
        display: block;
    }
    .nav .nav-parent ul li a{
        font-size: 14px;
        padding: 10px 15px;
        display: block;
        color: #869fb1;
        text-decoration: none;
    }
    .nav .nav-parent ul li a.active{
        color: #3e3e3e;
        background: #fff;
    }
    .nav .nav-parent ul li a:hover, .nav .nav-parent ul li a:focus {
        background-color: #131e26;
        color: white;
    }
    .nav .nav-parent ul li a.active:hover, .nav .nav-parent ul li a.active:focus {
        background-color: #fff;
        color: #3e3e3e;
    }

    .nav .nav-sub .title {
        display: block;
        height: 50px;
        background: #fff;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #e4e4e4;
    }
    .nav .nav-sub ul li{
        color: #fff;
        line-height: 40px;
    }
    .nav .nav-sub ul li a {
        color: #1c2b36;
        padding: 10px 15px;
        font-size: 14px;
        margin: 0 10px;
    }
    .nav .nav-sub ul li a.active{
        background: #f8f8f8;
    }
    .nav .nav-sub .nav > li > a:hover,
    .nav .nav-sub .nav > li > a:focus {
        background-color: #fff;
        color: #337ab7;
    }
    .sidebar-sub-hide{
        width: 100px;
        min-width: 100px;
        max-width: 100px;
    }
    .sidebar-sub-hide .nav-sub{
        display: none;
    }
</style>
