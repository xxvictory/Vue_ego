<template>
    <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
    name: "ProductUeditor",
    data() {
        return {
            msg:"",
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: "/UEditor/"
            }
        };
    },
    components: {
        VueUeditorWrap
    },
    watch:{
        msg(data){
            this.$emit("onUeditor",data)
        }
    }
};
</script>