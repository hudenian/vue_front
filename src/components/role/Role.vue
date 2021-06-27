<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--卡片视图-->
    </el-card>
    <!--添加角色-->
    <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed">
      <el-form :model="addRoleForm" :rules="addRoleRules" ref="addRoleRef" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">添 加</el-button>
      </span>
    </el-dialog>
    <!--修改角色-->
    <el-dialog
        title="修改角色"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed">
      <el-form :model="editRoleForm" :rules="editRoleRules" ref="editRoleRef" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="editRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 认</el-button>
      </span>
    </el-dialog>
    <el-table
        :data="roleList"
        border stripe>
      <el-table-column
          prop="name"
          label="角色名称">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '有效' : '锁定' }}
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showEditDialog(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
          <el-button type="warning" size="mini" @click="assignPermission(scope.row.id)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getAllRoles, addRole, modifyRoleInfo, deleteRoleById} from "../../api/api";

export default {
  created() {
    this.getRoleList();
  },
  data() {
    return {
      roleList: [],
      addDialogClosed: false,
      addDialogVisible: false,
      editDialogVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      editRoleForm: {
        id: '',
        name: '',
        description: '',
      },
      addRoleRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 3, max: 10, message: '角色名称长度在3 到 10 之间', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 10, message: '角色描述长度在3 到 10 之间', trigger: 'blur'}
        ]
      },
      editRoleRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 3, max: 10, message: '角色名称长度在3 到 10 之间', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 10, message: '角色描述长度在3 到 10 之间', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    getRoleList() {
      getAllRoles().then(
          res => {
            if (res.data.code === 10000) {
              this.roleList = res.data.data;
            }
          }
      ).catch(err => {
        this.$message.error("get role fail");
        console.log('get role fail', err);
      })
    },
    addRole() {
      this.$refs.addRoleRef.validate(validate => {
        debugger
        if (validate) {
          debugger
          addRole(this.addRoleForm).then(
              res => {
                debugger
                if (res.data.code === 10000) {
                  this.$message.success("add role success");
                } else {
                  this.$message.error(res.data.message);
                }
                this.addDialogVisible = false;
                this.getRoleList();
              }
          ).catch(err => {
            this.$message.error("add role fail");
            console.log('add role fail', err);
          })
        }
      })
    },
    showEditDialog(row) {
      this.editDialogVisible = true;
      this.editRoleForm.id = row.id;
      this.editRoleForm.name = row.name;
      this.editRoleForm.description = row.description;
    },
    editDialogClosed() {
      this.$refs.editRoleRef.resetFields();
    },
    deleteRole(id) {
      deleteRoleById(id).then(res => {
            if (res.data.code === 10000) {
              this.$message.success("delete success");
            } else {
              this.$message.success("delete fail");
            }
            this.getRoleList();
          }
      ).catch(err => {
        this.$message.error("delete role fail");
        console.log('delete role fail', err);
      })
    },
    assignPermission(id) {
      console.log(id);
    },
    editRole() {
      this.$refs.editRoleRef.validate(valid => {
        if (valid) {
          modifyRoleInfo(this.editRoleForm).then(res => {
            if (res.data.code === 10000) {
              this.$message.success("修改角色信息成功！");
              this.getRoleList();
            } else {
              this.$message.error("修改角色信息失败！");
            }
            this.editDialogVisible = false;
          }).catch(err => {
            this.$message.error("根据id修改角色信息失败！");
            console.log("修改角色信息失败原因：", err)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>