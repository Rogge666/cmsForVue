<template>
  <div class="fillcontain">
    <!-- v-on 绑定事件  在这里是子组件（head-top）调用父组件的方法-->
    <head-top v-on:cusSearch="cusSearch"
              v-on:cusDetail="detailDialogVisible = true"
              v-on:cusEdit="editDialogVisible = true"
              v-on:cusReview="reviewDialogVisible = true"
              v-on:cusAdd="addDialogVisible = true"
              v-on:cusDelete="deleteDialogVisible = true">
    </head-top>
    <el-input v-model="searchName" type="text" style="width: 180px;padding-left: 20px;padding-top: 20px"
              placeholder="请输入卡片名称"></el-input>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" height="550" border highlight-current-row
                @current-change="selectTable">
        <el-table-column prop="cardProductFullName" label="卡片产品名称" width="150" align="center"></el-table-column>
        <el-table-column prop="cardProductKind" label="卡类" width="100" align="center"></el-table-column>
        <el-table-column prop="cardProductVer" label="卡版" width="100" align="center"></el-table-column>
        <el-table-column prop="cardProductFlag" label="主/副卡" width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.cardProductFlag==1?'主卡':"副卡"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductGrade" label="卡级别" width="100" align="center">
          <template scope="scope">
            <span>{{comCardProductGrade(scope.row.cardProductGrade)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductKing" label="币种" width="100" align="center">
          <template scope="scope">
            <span v-if="scope.row.cardProductKing==1">人民币</span>
            <span v-else-if="scope.row.cardProductKing==5">双币</span>
            <span v-else="scope.row.cardProductKing==6">外币</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductType" label="卡组织" width="100" align="center">
          <template scope="scope">
            <span v-if="scope.row.cardProductType=='01'">银联</span>
            <span v-else-if="scope.row.cardProductType=='02'">万事达</span>
            <span v-else-if="scope.row.cardProductType=='03'">威士</span>
            <span v-else-if="scope.row.cardProductType=='04'">JCB</span>
            <span v-else="scope.row.cardProductType=='05'">美运</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductState" label="卡状态" width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.cardProductState==0?'有效':"无效"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductOperate" label="复核状态" width="100" align="center">
          <template scope="scope">
            <span v-if="scope.row.cardProductOperate==1">添加</span>
            <span v-else-if="scope.row.cardProductOperate==2">删除</span>
            <span v-else-if="scope.row.cardProductOperate==3">修改</span>
            <span v-else="scope.row.cardProductOperate"></span>
          </template>
        </el-table-column>
        <el-table-column prop="cardProductCreateUserName" label="创建人" width="100" align="center"></el-table-column>
        <el-table-column prop="cardProductCreateDate" label="创建日期" width="150" align="center"></el-table-column>
        <el-table-column prop="cardProductUpdateUserName" label="修改人" width="100" align="center"></el-table-column>
        <el-table-column prop="cardProductUpdateDate" label="修改日期" width="150" align="center"></el-table-column>
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
          <el-form-item label="卡组织" label-width="100px">
            <el-radio v-model="currentRow.cardProductType" label="01" disabled="true">银联</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="02" disabled="true">万事达</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="03" disabled="true">威士</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="04" disabled="true">JCB</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="05" disabled="true">美运</el-radio>
          </el-form-item>
          <el-form-item label="币种" label-width="100px">
            <el-radio v-model="currentRow.cardProductKing" label="1" disabled="true">人民币</el-radio>
            <el-radio v-model="currentRow.cardProductKing" label="5" disabled="true">双币</el-radio>
            <el-radio v-model="currentRow.cardProductKing" label="3" disabled="true">外币</el-radio>
          </el-form-item>
          <el-form-item label="卡状态" label-width="100px">
            <el-radio v-model="currentRow.cardProductState" label="0" disabled="true">有效</el-radio>
            <el-radio v-model="currentRow.cardProductState" label="1" disabled="true">无效</el-radio>
          </el-form-item>
          <el-form-item label="卡片描述1" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryOne" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述2" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryTwo" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述3" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryThree" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述4" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryFour" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述5" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryFive" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="复核卡片" :visible.sync="reviewDialogVisible">
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
          <el-form-item label="卡组织" label-width="100px">
            <el-radio v-model="currentRow.cardProductType" label="01" disabled="true">银联</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="02" disabled="true">万事达</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="03" disabled="true">威士</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="04" disabled="true">JCB</el-radio>
            <el-radio v-model="currentRow.cardProductType" label="05" disabled="true">美运</el-radio>
          </el-form-item>
          <el-form-item label="币种" label-width="100px">
            <el-radio v-model="currentRow.cardProductKing" label="1" disabled="true">人民币</el-radio>
            <el-radio v-model="currentRow.cardProductKing" label="5" disabled="true">双币</el-radio>
            <el-radio v-model="currentRow.cardProductKing" label="3" disabled="true">外币</el-radio>
          </el-form-item>
          <el-form-item label="卡状态" label-width="100px">
            <el-radio v-model="currentRow.cardProductState" label="0" disabled="true">有效</el-radio>
            <el-radio v-model="currentRow.cardProductState" label="1" disabled="true">无效</el-radio>
          </el-form-item>
          <el-form-item label="卡片描述1" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryOne" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述2" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryTwo" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述3" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryThree" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述4" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryFour" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="卡片描述5" label-width="100px">
            <el-input v-model="currentRow.cardProductSummaryFive" :auto-complete="off" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitReviewData(1)">同意修改</el-button>
          <el-button type="warring" @click="submitReviewData(2)">不同意修改</el-button>
          <el-button @click="reviewDialogVisible = false">关 闭</el-button>
        </div>
      </el-dialog>

      <el-dialog title="删除卡片" :visible.sync="deleteDialogVisible">
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteDialogVisible = false">关闭</el-button>
          <el-button type="error" @click="deleteCard">删 除</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import {getCardList, reviewCard,deleteCard} from '@/api/getData'

  export default {
    name: "card",
    data() {
      return {
        tableData: [],
        limit: 15,
        count: 0,
        currentPage: 1,
        detailDialogVisible: false,
        editDialogVisible: false,
        reviewDialogVisible: false,
        addDialogVisible: false,
        deleteDialogVisible: false,
        currentRow: {},
        searchName: '',
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
        const respData = await getCardList({page: this.currentPage, size: this.limit, fullName: this.searchName});
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
      //查询卡片
      cusSearch() {
        this.currentPage = 1;
        this.getCards();
      },
      //复核卡片
      async submitReviewData(data) {
        const respData = await reviewCard({id: this.currentRow.cardProductId, state: data});
        if (respData.code == 0) {
          this.$message({
            type: 'success',
            message: respData.msg
          });
        } else {
          this.$message({
            type: 'error',
            message: respData.msg
          });
        }
        this.reviewDialogVisible = false;
        this.cusSearch();
      },
      //删除卡片
      async deleteCard() {
        const respData = await deleteCard({id:this.currentRow.cardProductId});
        if (respData.code == 0) {
          this.$message({
            type: 'success',
            message: respData.msg
          });
        } else {
          this.$message({
            type: 'error',
            message: respData.msg
          });
        }
        this.deleteDialogVisible = false;
        this.cusSearch();
      },
      comCardProductGrade: function (data) {
        switch (data) {
          default :
            return '无限卡';
          case '1':
            return '金卡';
          case '2':
            return '普卡';
          case '3':
            return '钛金卡';
          case '4':
            return '白金卡';
          case '5':
            return '美运卡';
        }
      },
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
