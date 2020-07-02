<template>
    <div>
        <el-tree
            :props="defaultProps"
            :load="loadTreeNodes"
            lazy
            highlight-current
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            :render-content="renderContent"
        ></el-tree>
        <!-- 添加对话框 -->
        <el-dialog
            title="添加广告"
            :visible.sync="contentNavAddVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-input v-model="contentNavName" placeholder="请输入名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="contentNavAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureHandle">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改对话框 -->
        <el-dialog
            title="修改广告"
            :visible.sync="contentNavUpdateVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-input v-model="contentNavUpdateName" placeholder="请输入名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="contentNavUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureUpdateHandle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import api from "../../../api";

export default {
    name: "ContentNav",
    inject: ["reload"],
    data() {
        return {
            contentNavAddVisible: false,
            contentNavUpdateVisible: false,
            contentNavUpdateName: "",
            contentNavName: "",
            currentNavObj: {},
            currentUpdateObj: {},
            defaultProps: {
                children: "children",
                label: "name"
            }
        };
    },
    methods: {
        loadTreeNodes(node, resolve) {
            if (node.level === 0) {
                api.getSelectContentCategoryByParentId()
                    .then(res => {
                        if (res.data.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            resolve([]);
                        }
                    })
                    .catch(error => {
                        resolve([]);
                    });
            }
            if (node.level >= 1) {
                api.getSelectContentCategoryByParentId({
                    id: node.data.pid
                })
                    .then(res => {
                        if (res.data.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            resolve([]);
                        }
                    })
                    .catch(error => {
                        resolve([]);
                    });
            }
        },
        handleNodeClick(data) {
            this.$bus.$emit("nav",data)
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.append(data)}
                        >
                            添加
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.remove(node, data)}
                        >
                            删除
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.editor(node, data)}
                        >
                            修改
                        </el-button>
                    </span>
                </span>
            );
        },
        append(data) {
            this.currentNavObj = data;
            this.contentNavAddVisible = true;
        },
        remove(node, data) {
            api.getDeleteContentCategoryById({
                id: data.pid
            }).then(res => {
                if (res.data.status === 200) {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.reload();
                } else {
                    this.$message({
                        type: "error",
                        message: "删除失败"
                    });
                }
            });
        },
        editor(node, data) {
            this.contentNavUpdateVisible = true;
            this.currentUpdateObj = data;
        },
        handleClose() {
            this.contentNavAddVisible = false;
        },
        /**
         * 添加事件
         */
        sureHandle() {
            api.getInsertContentCategory({
                pid: this.currentNavObj.pid,
                name: this.contentNavName
            }).then(res => {
                if (res.data.status === 200) {
                    this.contentNavAddVisible = false;
                    this.$message({
                        type: "success",
                        message: "添加成功"
                    });
                    this.reload();
                } else {
                    this.$message({
                        type: "error",
                        message: "添加失败"
                    });
                }
            });
        },
        /**
         * 修改事件
         */
        sureUpdateHandle() {
            api.getUpdateContentCategory({
                id: this.currentUpdateObj.pid,
                name: this.contentNavUpdateName
            }).then(res => {
                if (res.data.status === 200) {
                    this.$message({
                        type: "success",
                        message: "修改成功"
                    });
                    this.reload();
                } else {
                    this.$message({
                        type: "error",
                        message: "修改失败"
                    });
                }
            });
        }
    }
};
</script>