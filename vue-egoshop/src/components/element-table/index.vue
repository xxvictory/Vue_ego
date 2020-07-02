<template>
    <el-table :data="tableData" style="width:100%">
        <slot></slot>
    </el-table>
</template>
<script>
export default {
    /**
     * 二次封装
     *    样式的修改，结构的修改
     */
    name:"ElementTable",
    props:{
        tableData:{
            type:Array,
            default:() =>{
                return []
            }
        }
    }
}
</script>
