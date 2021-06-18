<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!--登录表单-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!--用户名-->
                <el-form-item prop="name">
                    <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="buttons">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from '@/api/api'

    export default {
        data() {
            return {
                loginForm: {
                    name: 'hudenian',
                    // password: '123456',
                    password: '63d18857edfc1c16809741716e754e5e'
                },
                loginFormRules: {
                    name: [
                        {require: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度 3 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {require: true, message: '请输入登录密码', trigger: 'blur'},
                        {min: 6, max: 100, message: '长度 6 到 100 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                this.$refs.loginFormRef.validate(valid => {
                    if (!valid) {
                        console.info("valid no pass");
                        return;
                    }
                    //只取出data
                    login(this.loginForm, {}).then(
                        res => {
                            if (res.data.code === 10000) {
                                console.log("login success:", res.data);
                                window.sessionStorage.setItem("accessToken", res.data.data.token);
                                this.$router.push('/home');
                            } else {
                                this.$message.error("login fail")
                                console.log('login fail');
                            }
                        }
                    ).catch(err => {
                        this.$message.error("login fail")
                        console.log('login fail', err);
                    })
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    }
</style>