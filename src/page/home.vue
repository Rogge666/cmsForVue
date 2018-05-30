<template>
  <div class="fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu class="el-menu-vertical-demo" min-height="100%" background-color="#324057"
                 text-color="#ddd" active-text-color="#409EFF" router>
          <el-menu-item index="card"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">系统管理</template>
            <el-menu-item index="branch">组织机构树</el-menu-item>
            <el-menu-item index="manager">用户管理</el-menu-item>
            <el-menu-item index="videoParams">影像参数列表</el-menu-item>
            <el-menu-item index="card">卡片管理</el-menu-item>
            <el-menu-item index="cardUnProject">项目卡片关联管理</el-menu-item>
            <el-menu-item index="applyTips">申请页提示语管理</el-menu-item>
            <el-menu-item index="project">项目管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">易销平台审件</template>
            <el-menu-item index="examine">审件操作</el-menu-item>
            <el-menu-item index="examineHistory">审件历史查询</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">系统参数配置</template>
            <el-menu-item index="vueEdit">报表年费佣金参数表</el-menu-item>
            <el-menu-item index="vueEdit">报表佣金参数表</el-menu-item>
            <el-menu-item index="vueEdit">统计报表提示信息管理</el-menu-item>
            <el-menu-item index="vueEdit">进件参数提示语管理</el-menu-item>
            <el-menu-item index="vueEdit">版本管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .table-fixed {
    /deep/ .el-table__fixed-right {
      height: 100% !important; //设置高优先，以覆盖内联样式
    }
  }
</style>
