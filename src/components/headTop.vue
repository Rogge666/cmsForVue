<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item) in $route.meta">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row >
      <el-row v-show="showHead">
        <el-button @click="headSearch" plain>查询</el-button>
        <el-button @click="headDetail" v-show="showDetail" type="success" plain>查看</el-button>
        <el-button @click="headAdd" v-show="showAdd" type="success" plain>添加</el-button>
        <el-button @click="headEdit" v-show="showEdit" type="primary" plain>修改</el-button>
        <el-button @click="headReview" v-show="showReview" type="warning" plain>复核</el-button>
        <el-button @click="headDelete" v-show="showDelete" type="danger" plain>删除</el-button>
      </el-row>
    </el-row>

    <el-dropdown @command="handleCommand" menu-align='start'>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="singout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {signout} from '@/api/getData'
  import {baseImgPath} from '@/config/env'
  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        baseImgPath,
        showHead:true,
        showDetail:true,
        showAdd:true,
        showEdit:true,
        showReview:true,
        showDelete:true,
      }
    },
    created() {

    },
    mounted:{

    },
    methods: {
      async handleCommand(command) {
        if (command == 'home') {
          this.$router.push('/manage');
        } else if (command == 'singout') {
          const res = await signout();
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '退出成功'
            });
            this.$router.push('/');
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }
      },
      hideButton(){
        this.showHead = false;
      },
      hideDetail(){
        this.showDetail = false;
      },
      hideAdd(){
        this.showAdd = false;
      },
      hideEdit(){
        this.showEdit = false;
      },
      hideReview(){
        this.showReview = false;
      },
      hideDelete(){
        this.showDelete = false;
      },
      headSearch(){
        this.$emit('cusSearch');
      },
      headDetail(){
        this.$emit('cusDetail');
      },
      headEdit(){
        this.$emit('cusEdit');
      },
      headReview(){
        this.$emit('cusReview');
      },
      headDelete(){
        this.$emit('cusDelete');
      },
      headAdd(){
        this.$emit('cusAdd');
      },
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .avator {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
