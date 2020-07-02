<template>
    <el-pagination
        class="pagination"
        layout="prev,pager,next"
        background
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
    ></el-pagination>
</template>
<script>

import api from "../../../api"

export default {
    name:"Pagination",
    data(){
        return{
            total:0,
            currentPage:1
        }
    },
    mounted(){
        api.getTotal().then(res =>{
            this.total = res.data.result[0]["count(*)"];
        })
    },
    methods:{
        handleCurrentChange(currentPage){
            this.$emit("currentPageEvent",currentPage)
        }
    }
}
</script>
<style scoped>

.pagination{
    margin-top: 20px;
}

</style>