<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--搜索框-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table
        :data="userList"
         border stripe>
      <el-table-column
          type="index">
      </el-table-column>
      <el-table-column
          prop="id"
          label="序号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="日期">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <!--作用域插槽 true 打开 false 关闭-->
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
      width="300px">
        <template slot-scope="scope">
          {{scope.row.id}}
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="warning" size="mini">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
    </el-pagination>
  </div>
</template>
<script>
    import {getUserList} from "@/api/api";

    export default {
        created() {
            this.getUserList();
        },
        data() {
            return {
                userList: [],
                searchData: {

                },
                pagination: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                loading: false
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            getUserList() {
                let data = {
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize,
                    name: this.searchData.name
                }
                getUserList(data).then(
                    res => {
                        debugger
                        if (res.data.code === 10000) {
                            this.$message.success('login success');
                            console.log("login success", res.data.data);
                        } else {
                            // this.$message.error("get user list fail")
                            // console.log('get user list fail');
                          this.userList = [{id:1,name:"hudenian",status:1,createTime:"20100315"},{id:2,name:"hu",status:1,createTime:"20100319"},{id:3,name:"hu",status:2,createTime:"20100319"}];
                        }
                    }
                ).catch(err => {
                    this.$message.error("login fail")
                    console.log('login fail', err);
                })
            },
          //监听pagessize 改变事件
          handleSizeChange(newSize){
              this.pagination.pageSize = newSize;
            console.log(newSize);
          },
          //监听 页码值改变 改变事件
          handleCurrentChange(newPage){
            console.log(newPage);
          },
          // currentPage4(){
          //
          // }
        }
    };
</script>

<style lang="less" scoped>

</style>