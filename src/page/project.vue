<template>
  <div class="fillcontain">
    <!-- v-on 绑定事件  在这里是子组件（head-top）调用父组件的方法-->
    <head-top v-on:cusSearch="cusSearch" v-on:cusDetail="cusDetail"></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" height="550" border highlight-current-row
                @current-change="selectTable">
        <el-table-column prop="cardProductFullName" label="卡片产品名称" width="150"></el-table-column>
        <el-table-column prop="cardProductKind" label="卡类" width="100"></el-table-column>
        <el-table-column prop="cardProductVer" label="卡版" width="100"></el-table-column>
        <el-table-column prop="cardProductFlag" label="主/副卡" width="100">
          <template scope="scope">
            <span>{{scope.row.cardProductFlag==1?'主卡':"副卡"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductGrade" label="卡级别" width="100">
          <template scope="scope">
            <span>{{comCardProductGrade(scope.row.cardProductGrade)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductKing" label="币种" width="100">
          <template scope="scope">
            <span v-if="scope.row.cardProductKing==1">人民币</span>
            <span v-else-if="scope.row.cardProductKing==5">双币</span>
            <span v-else="scope.row.cardProductKing==6">外币</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductType" label="卡组织" width="100">
          <template scope="scope">
            <span v-if="scope.row.cardProductType=='01'">银联</span>
            <span v-else-if="scope.row.cardProductType=='02'">万事达</span>
            <span v-else-if="scope.row.cardProductType=='03'">威士</span>
            <span v-else-if="scope.row.cardProductType=='04'">JCB</span>
            <span v-else="scope.row.cardProductType=='05'">美运</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductState" label="卡状态" width="100">
          <template scope="scope">
            <span>{{scope.row.cardProductState==0?'有效':"无效"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductCreateUserName" label="创建人" width="100"></el-table-column>
        <el-table-column prop="cardProductCreateDate" label="创建日期" width="150"></el-table-column>
        <el-table-column prop="cardProductUpdateUserName" label="修改人" width="100"></el-table-column>
        <el-table-column prop="cardProductUpdateDate" label="修改日期" width="150"></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next "
          :total="count">
        </el-pagination>
      </div>

      <el-dialog title="查看卡片" :visible.sync="detailDialogVisible">
        <el-form :model="currentRow">
          <el-form-item label="卡片名称" label-width="100px">
            <el-input v-model="currentRow.cardProductFullName" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡类" label-width="100px">
            <el-input v-model="currentRow.cardProductKind" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡版" label-width="100px">
            <el-input v-model="currentRow.cardProductVer" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="主/副卡" label-width="100px">
            <el-input v-model="currentRow.cardProductFlag==1?'主卡':'副卡'" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡级别" label-width="100px">
            <el-input :value="comCardProductGrade(currentRow.cardProductGrade)" :auto-complete="off"
                      disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import {getCardList} from '@/api/getData'

  export default {
    name: "project",
    data() {
      return {
        tableData: [],
        limit: 15,
        count: 0,
        currentPage: 1,
        detailDialogVisible: false,
        currentRow: {},
      }
    },
    components: {
      headTop
    },
    created() {
      this.getCards();
    },
    methods: {
      async getCards() {
        const respData = await getCardList({page: this.currentPage, size: this.limit});
        if (respData.code == 0) {
          this.count = respData.data.total;
          this.tableData = respData.data.list;
        } else {
          this.$message({
            type: 'error',
            message: respData.msg
          });
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getCards()
      },
      selectTable(val) {
        this.currentRow = val;
      },
      cusSearch() {
        alert('cusSearchaaaaa');
      },
      cusDetail() {
        if (this.currentRow) {
          this.detailDialogVisible = true;
        } else {
          alert('未选中条目');
        }
      },
      comCardProductGrade: function (data) {
        switch (data) {
          default :
            return '无限卡';
          case 1:
            return '金卡';
          case 2:
            return '普卡';
          case 3:
            return '钛金卡';
          case 4:
            return '白金卡';
          case 5:
            return '美运卡';
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
