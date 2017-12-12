<template>
  <el-row class="content">
    <el-col :span="24" class="content-inner">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>

<style>
  .header{
    background: #fff;
    height: 51px;
    line-height: 50px;
    border-bottom: 1px solid #e4e4e4;
  }
  .content{
    background: #f2f2f2;
    flex: 1;
    padding: 10px;
    overflow-y: scroll;
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
    min-width: 750px;
    min-height: 500px;
    padding: 10px;
  }
  .footer{
    height: 35px;
    background: #1CA347;
  }

</style>
