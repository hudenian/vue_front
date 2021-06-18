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
                    <el-input placeholder="请输入内容" class="input-with-select">
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
                    {{scope.row.sex === 1 ?'女':'男'}}
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
                    {{scope.row.status ===1?"有效":"无效"}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="modifyUser(scope.row.id)">修改</el-button>
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
    import {getUserList} from "@/api/api";

    export default {
        created() {
            this.getUserList();
        },
        data() {
            return {
                userList: [],
                searchData: [],
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
                debugger
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
            },
            //监听pageSize 改变事件
            handleSizeChange(newSize) {
                this.pagination.pageSize = newSize;
                this.getUserList();
            },
            //监听 页码值改变 改变事件
            handleCurrentChange(newPage) {
                this.pagination.pageNum = newPage;
                this.getUserList();
            },
            modifyUser(id) {
                console.log(id);
            },
            deleteUser(id) {
                console.log(id);
            },
            assignPermission(id) {
                console.log(id);
            },
        }
    };
</script>

<style lang="less" scoped>

</style>