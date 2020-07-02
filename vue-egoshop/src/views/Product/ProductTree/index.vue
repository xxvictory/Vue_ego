<template>
    <el-tree @node-click="handleNodeClick" :props="defaultProps" :load="loadNode" lazy highlight-current></el-tree>
</template>
<script>

import api from "../../../api"

export default {
    data(){
        return{
            data:[],
            defaultProps:{
                children:"children",
                label:"name"
            }
        }
    },
    methods:{
        handleNodeClick(data){
            this.$emit("onTreeData",data)
        },
        loadNode(node, resolve){
            if(node.level === 0){
               api.getSelectItemCategoryByParentId().then(res =>{
                   if(res.status === 200){
                       return resolve(res.data.data)
                   }else{
                       alert("请求失败")
                   }
               }) 
            }
            if(node.level >= 1){
                 api.getSelectItemCategoryByParentId({
                     id:node.data.cid
                 }).then(res =>{
                   if(res.status === 200){
                       return resolve(res.data.data)
                   }else{
                       alert("请求失败")
                   }
               }).catch(error =>{
                   resolve([])
               })
            }
        }
    }
};
</script>