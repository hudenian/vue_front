<template>
    <el-table
            :data="userList"
            style="width: 100%"
            :row-class-name="tableRowClassName">
        <el-table-column
                prop="date"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>
    </el-table>
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
                searchData: {},
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
                            this.$message.error("get user list fail")
                            console.log('get user list fail');
                        }
                    }
                ).catch(err => {
                    this.$message.error("login fail")
                    console.log('login fail', err);
                })
            }
        }
    };
</script>

<style lang="less" scoped>

</style>