<template>
    <div>
        <el-button
            v-if="flag"
            class="addBtn"
            type="primary"
            @click="addContentVisible = true"
        >添加{{ textContent.name }}</el-button>
        <el-table :data="content">
            <el-table-column show-overflow-tooltip prop="id" label="ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="广告名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="广告图片"></el-table-column>
            <el-table-column show-overflow-tooltip prop="url" label="广告连接地址"></el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加内容" :visible="addContentVisible" :before-close="handleClose">
            <el-form :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="url地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="form.image"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button @click="addContentVisible = false">取消</el-button>
                <el-button type="primary" @click="addContentHandle">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import api from "../../../api";

export default {
    name: "ContentShow",
    inject: ["reload"],
    data() {
        return {
            content: [],
            addContentVisible: false,
            form: {},
            textContent: {},
            flag: false
        };
    },
    mounted() {
        this.$bus.$on("nav", data => {
            this.textContent = data;
            this.flag = true;
            api.getSelectTbContentAllByCategoryId({
                id: data.pid
            }).then(res => {
                if (res.data.status === 200) {
                    this.content = res.data.data;
                } else {
                    this.content = [];
                }
            });
        });
    },
    methods: {
        handleClose() {
            this.addContentVisible = false;
        },
        /**
         * 添加数据
         */
        addContentHandle() {
            api.getInsertTbContent({
                pid: this.textContent.pid,
                name: this.form.name,
                url: this.form.url,
                image: this.form.image
            }).then(res => {
                if (res.data.status === 200) {
                    this.addContentVisible = false;
                    this.reload();
                } else {
                    alert("添加失败");
                }
            });
        },
        /**
         * 删除
         */
        handleDelete(index,row){
            api.getDeleteContentByIds({
                id:row.id
            }).then(res =>{
                if(res.data.status === 200){
                    this.reload();
                }else{
                    alert("删除失败")
                }
            })
        }
    }
};
</script>