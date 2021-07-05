<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
        :data="permissionList"
        border>
      <el-table-column
          type="index">
      </el-table-column>
      <el-table-column
          prop="name"
          label="权限名称">
      </el-table-column>
      <el-table-column
          prop="parentName"
          label="父级权限名称">
      </el-table-column>
      <el-table-column
          prop="url"
          label="菜单url">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column
          prop="seqNo"
          label="序号">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '锁定' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="type"
          label="菜单类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1">目录</el-tag>
          <el-tag type="success" v-else>菜单</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getAllPermissiions} from '@/api/api'

export default {
  created() {
    this.getAllPermission();
  },
  data() {
    return {
      permissionList: [],
    }
  },
  methods: {
    getAllPermission() {
      getAllPermissiions().then(res => {
        if (res.data.code === 10000) {
          console.log(res.data.data);
          this.permissionList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(err => {
        console.log("获取权限列表失败", err);
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>