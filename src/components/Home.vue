<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/huma.png" alt="">
                <span>huma管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!--        侧边栏菜单-->
                <el-menu
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false"
                        router>
                    <!--          一级菜单-->
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <!--            一级菜单模版区域-->
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <!--            二级菜单-->
                        <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ subItem.name }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import {getAllMenus} from "../api/api";

    export default {
        data() {
            return {
                //左侧菜单
                menuList: [],
                iconsObj: {
                    '28': 'iconFont el-icon-s-custom',
                    '31': 'iconFont el-icon-s-ticket',
                },
                isCollapse: false,
            }
        },
        created() {
            this.getMenuList();
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            //获取所有的菜单
            getMenuList() {
                getAllMenus({}, {}).then(
                    res => {
                        debugger
                        if (res.data.code === 10000) {
                            console.log(this.menuList);
                            this.menuList = res.data.data;
                        } else {
                            this.$message.error("get menus fail")
                            console.log('get menus fail');
                        }
                    }
                ).catch(err => {
                    this.$message.error("get menus fail")
                    console.log('get menus fail', err);
                })
            },

            // async getMenuList() {
            //   const {data: res} = await this.$http.get('permission/getAllMenus')
            //   console.log(res);
            //   if (res.code === 10000) {
            //     this.menuList = res.data;
            //     console.log(this.menuList);
            //   } else {
            //     this.$message.error("获取菜单列表失败！");
            //   }
            // },
            //点击按钮切换折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;

        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconFont {
        margin-left: 10px;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>