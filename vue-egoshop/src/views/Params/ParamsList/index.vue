<template>
    <div class="params">
        <el-button type="primary" @click="paramsVisible = true">添加规格参数</el-button>
        <element-table :tableData="tableData">
            <el-table-column width="100" prop="id" label="规格参数ID"></el-table-column>
            <el-table-column width="100" prop="itemCatId" label="分类ID"></el-table-column>
            <el-table-column prop="paramData" label="规格参数结构"></el-table-column>
            <el-table-column label="操作" width="100" fiexd="righr">
                <template slot-scope="scope">
                    <el-button
                        @click="handleDelete(scope.$index,scope.row)"
                        type="danger"
                        size="mini"
                    >删除</el-button>
                </template>
            </el-table-column>
        </element-table>
        <!-- 添加规格参数 -->
        <el-dialog width="60%" title="规格参数添加" :visible.sync="paramsVisible">
            <!-- <ParamsTree @onTreeData="getTreeData"/> -->
            <ParamsTree />
            <el-dialog append-to-body title="添加分组" width="50%" :visible.sync="groupVisible">
                <ParamsAdd :treeDataObj="treeDataObj" @onSuccess="getSuccess"/>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="paramsVisible = false">取消</el-button>
                <el-button type="primary" @click="groupVisible = true">确定并添加规格参数</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import api from "../../../api";
import ElementTable from "../../../components/element-table";
import ParamsTree from "../ParamsTree";
import ParamsAdd from "../ParamsAdd";

export default {
    name: "ParamsList",
    data() {
        return {
            tableData: [],
            paramsVisible: false,
            groupVisible: false,
            treeDataObj: {}
        };
    },
    components: {
        ElementTable,
        ParamsTree,
        ParamsAdd
    },
    mounted() {
        this.http();
        this.$bus.$on("treeData", treeData => {
            this.treeDataObj = treeData;
            console.log(this.treeDataObj);
        });
    },
    methods: {
        http() {
            api.getSelectItemParamAll().then(res => {
                if (res.data.status === 200) {
                    this.tableData = res.data.data.result;
                }
            });
        },
        // getTreeData(data) {
        //     this.treeData = data;
        // },
        getSuccess() {
            this.paramsVisible = false;
            this.groupVisible = false;
            this.http();
        },
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // 确定删除
                    api.getDeleteItemParamById({
                        id: row.id
                    }).then(res => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.http();
                        } else {
                            this.$message({
                                type: "error",
                                message: "删除出现错误"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>