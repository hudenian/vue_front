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
          <el-input placeholder="请输入内容" class="input-with-select" v-model="searchData.name" clearable
                    @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addUserForm" ref="addUserFormRef" :rules="addUserFormRules" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addUserForm.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
        :data="userList"
        border stripe>
      <el-table-column
          type="index">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? '女' : '男' }}
        </template>
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
          {{ scope.row.status === 1 ? "有效" : "无效" }}
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.row.id)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
          <el-button type="warning" size="mini" @click="assignPermission(scope.row.id)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
    </el-pagination>
  </div>
</template>
<script>
import {getUserList, addUser, getUserById, modifyUserInfo, deleteUserById} from "../../api/api";

export default {
  created() {
    this.getUserList();
  },
  data() {
    //验证手机号规则
    const checkPhone = (rule, value, callback) => {
      const regEmail = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error('请输入合法手机号'));
    };
    return {
      userList: [],
      searchData: {
        name: '',
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      addUserForm: {
        name: '',
        phone: '',
        sex: 0
      },
      addUserFormRules: {
        name: [
          {required: true, message: '请输入用户姓名', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名长度在3 到 10 之间', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkPhone, message: '手机号格式错误', trigger: 'blur'}
        ],
      },
      editFormRules:{
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkPhone, message: '手机号格式错误', trigger: 'blur'}
        ],
      },
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      loading: false,
    }
  },
  methods: {
    getUserList() {
      let data = {
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        name: this.searchData.name
      }
      getUserList(data).then(
          res => {
            if (res.data.code === 10000) {
              this.userList = res.data.data.items;
              this.pagination.total = res.data.data.total;
              this.pagination.pageNum = res.data.data.current;
              this.pagination.pageSize = res.data.data.size;
            } else {
              this.$message.error("get user list fail")
              console.log('get user list fail');
            }
          }
      ).catch(err => {
        this.$message.error("login fail")
        console.log('login fail', err);
      })
    }
    ,
    //监听pageSize 改变事件
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.getUserList();
    }
    ,
    //监听 页码值改变 改变事件
    handleCurrentChange(newPage) {
      this.pagination.pageNum = newPage;
      this.getUserList();
    }
    ,
    modifyUser(id) {
      console.log(id);
    }
    ,
    async deleteUser(id) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      if(res !== 'confirm'){
        this.$message.info('已经取消删除！');
      }else{
        let data = {id:id}
        deleteUserById(data).then(
          res=>{
            if(res.data.code === 10000){
              this.$message.success('删除成功！');
              this.getUserList();
            }else {
              this.$message.error('删除失败！');
            }
        }).catch(err=>{
          this.$message.error('删除失败！');
          console.log("删除失败，失败原因",err);
        });
      }
    }
    ,
    assignPermission(id) {
      console.log(id);
    },
    addUser() {
      this.$refs.addUserFormRef.validate(validate => {
        if (validate) {
          addUser(this.addUserForm).then(res => {
            if (res.data.code === 10000) {
              this.$message.success("添加用户成功！");
            } else {
              this.$message.success("添加用户失败！")
            }
          }).catch(err => {
            this.$message.error("添加用户失败")
            console.log('add user fail', err);
          });
          this.addDialogVisible = false;
          this.getUserList();
        }
      })
    },
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    showEditDialog(id) {
      this.editDialogVisible = true;
      getUserById(id).then(res => {
        if (res.data.code === 10000) {
          this.editForm = res.data.data;
        } else {
          this.$message.error("获取用户信息失败")
          this.editDialogVisible = false;
        }
      }).catch(err => {
        this.$message.error("根据id" + id + "获取用户信息失败！");
        console.log("失败原因：", err)
      })
      console.log(id);
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    editUserInfo(){
      this.$refs.editFormRef.validate(valid=>{
        if(valid){
          modifyUserInfo(this.editForm).then(res=>{
            if(res.data.code === 10000){
              this.$message.success("修改用户信息成功！");
              this.getUserList();
            }else{
              this.$message.error("修改用户信息失败！");
            }
            this.editDialogVisible = false;
          }).catch(err =>{
            this.$message.error("根据id修改用户信息失败！");
            console.log("修改用户信息失败原因：", err)
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>

</style>