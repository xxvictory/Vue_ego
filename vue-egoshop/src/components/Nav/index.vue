<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="#fff"
        active-text-color="#409EFF"
        background-color="#545c64"
    >
        <el-menu-item index="1">
            <router-link class="router-text" to="/product">
                <i class="el-icon-search"></i>
                <span class="top-text">查询商品</span>
            </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="router-text" to="/params">
                <i class="el-icon-copy-document"></i>
                <span class="top-text">规格参数</span>
            </router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link class="router-text" to="/content">
                <i class="el-icon-postcard"></i>
                <span class="top-text">内容分类管理</span>
            </router-link>
        </el-menu-item>

        <el-menu-item class="user" index="4">
            <span>{{ user }}</span>
            <el-button @click="logout">退出</el-button>
        </el-menu-item>
    </el-menu>
</template>
<script>

import { mapState,mapMutations } from "vuex"

export default {
    name: "Nav",
    data() {
        return {
            activeIndex: "1"
        };
    },
    computed:{
        ...mapState("LoginModule",{
            user:state => state.user
        })
    },
    mounted(){
        if(localStorage.getItem("currentIndex")){
            this.activeIndex = localStorage.getItem("currentIndex")
        }
    },
    methods: {
        ...mapMutations("LoginModule",["clearToken","clearUser"]),
        handleSelect(key, keyPath) {
            localStorage.setItem("currentIndex",key)
        },
        logout(){
            localStorage.removeItem("egouser");
            localStorage.removeItem("token")
            this.clearToken();
            this.clearUser();
            this.$router.replace("/login")
        }
    }
};
</script>
<style scoped>
.el-menu-demo {
    padding: 0 200px;
}
.router-text{
    display: block;
    width: 100%;
    height: 100%;
}

.user{
    float:right!important;
}

</style>