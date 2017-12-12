<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-wrapper">
            <el-row class="main-container">
                <top-nav/>
                <slot></slot>
            </el-row>
        </div>
    </div>
</template>
<style lang="css">
    @import "../../../asset/css/global.css";
    .app-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
    }

    .app-wrapper .main-wrapper {
        min-height: 100%;
        transition: all .28s ease-out;
        min-width: 600px;
        flex-grow: 1;
    }

    .main-container{
        height: 100%;
        display: flex;
        flex-direction: column;
    }



</style>
<script type="text/babel">
    import {Sidebar, TopNav} from 'component/common';
    export default{
        components: {
            TopNav,
            Sidebar
        }
    }
</script>
