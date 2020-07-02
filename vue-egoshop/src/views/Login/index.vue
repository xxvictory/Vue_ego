<template>
    <div class="login">
        <el-card class="box-card">
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户登录" name="first">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="用户名">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input type="password" v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即登陆</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="用户注册" name="second">
                        <el-form :model="register" label-width="80px">
                            <el-form-item label="用户名">
                                <el-input v-model="register.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input type="password" v-model="register.password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input type="password" v-model="register.rePassword"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onRegisterSubmit">立即注册</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>
<script>
import api from "../../api";
import { mapMutations } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            form: {},
            register: {},
            activeName: "first"
        };
    },
    methods: {
        ...mapMutations("LoginModule", ["setToken", "setUser"]),
        onSubmit() {
            if (this.form.username && this.form.password) {
                api.getLogin({
                    username: this.form.username,
                    password: this.form.password
                }).then(res => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        // 成功
                        this.setToken(res.data.token);
                        this.setUser(res.data.data[0].username);
                        // 本地存储
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem(
                            "egouser",
                            res.data.data[0].username
                        );
                        this.$router.replace("/product");
                    } else {
                        // 失败
                        this.$message.error(res.data.msg);
                    }
                });
            } else {
                this.$message("请输入信息");
            }
        },
        handleClick(tab, event) {},
        onRegisterSubmit() {
            if (this.register.username && this.register.password) {
                api.getRegister({
                    username: this.register.username,
                    password: this.register.password
                }).then(res => {
                    if (res.data.status === 200) {
                        this.$message(res.data.msg);
                    } else {
                        this.$message(res.data.msg);
                    }
                });
            }
        }
    }
};
</script>
<style scoped>
.login {
    width: 100%;
}
.box-card {
    width: 600px;
    margin: 0 auto;
    margin-top: 100px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}
</style>