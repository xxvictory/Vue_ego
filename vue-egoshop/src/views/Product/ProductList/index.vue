<template>
    <div class="product-list">
        <el-button type="primary" @click="addProduct">添加商品</el-button>
        <element-table :tableData="tableData">
            <el-table-column show-overflow-tooltip prop="id" width="80" label="商品ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="商品名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" width="80" label="图片地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sellPoint" width="300" label="商品卖点"></el-table-column>
            <el-table-column show-overflow-tooltip prop="price" width="80" label="商品价钱"></el-table-column>
            <el-table-column show-overflow-tooltip prop="num" width="80" label="商品数量"></el-table-column>
            <el-table-column show-overflow-tooltip prop="descs" width="280" label="商品描述"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </element-table>
        <!-- 分页 -->
        <ProductPagination @currentPageEvent="getCurrentpageData" />
        <!-- 添加产品对话框 -->
        <el-dialog append-to-body title="添加产品" :visible.sync="dialogAddProductVisible" width="80%">
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="类目选择">
                    <span>{{ categoryData.name }}</span>
                    <el-button type="primary" @click="dialogProductCategoryVisible = true">选择类目</el-button>
                    <el-dialog
                        append-to-body
                        width="60%"
                        title="商品类目"
                        :visible.sync="dialogProductCategoryVisible"
                    >
                        <ProductTree @onTreeData="getTreeData" />
                        <span>
                            <el-button
                                type="primary"
                                @click="dialogProductCategoryVisible = false"
                            >确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="product.title"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                    <span>{{ uploadData.name }}</span>
                    <el-button @click="dialogUploadVisble = true">上传图片</el-button>
                    <el-dialog
                        title="上传图片"
                        width="40%"
                        :visible.sync="dialogUploadVisble"
                        append-to-body
                    >
                        <ProductUpload @onUpload="getUpload" />
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogUploadVisble = false">确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUeditor @onUeditor="getUeditor" />
                </el-form-item>
            </el-form>
            <el-button @click="dialogAddProductVisible=false">取消</el-button>
            <el-button type="primary" @click="submitProductHandle">提交</el-button>
        </el-dialog>
        <!-- 修改产品对话框 -->
        <el-dialog
            append-to-body
            title="修改产品"
            :visible.sync="dialogEditorProductVisible"
            width="80%"
        >
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="类目选择">
                    <span>{{ categoryData.name }}</span>
                    <el-button type="primary" @click="dialogProductCategoryVisible = true">选择类目</el-button>
                    <el-dialog
                        append-to-body
                        width="60%"
                        title="商品类目"
                        :visible.sync="dialogProductCategoryVisible"
                    >
                        <ProductTree @onTreeData="getTreeData" />
                        <span>
                            <el-button
                                type="primary"
                                @click="dialogProductCategoryVisible = false"
                            >确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="product.title"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                    <span>{{ uploadData.name }}</span>
                    <el-button @click="dialogUploadVisble = true">上传图片</el-button>
                    <el-dialog
                        title="上传图片"
                        width="40%"
                        :visible.sync="dialogUploadVisble"
                        append-to-body
                    >
                        <ProductUpload @onUpload="getUpload" />
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogUploadVisble = false">确定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUeditor @onUeditor="getUeditor" />
                </el-form-item>
            </el-form>
            <el-button @click="dialogAddProductVisible=false">取消</el-button>
            <el-button type="primary" @click="reSubmitProductHandle">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import api from "../../../api";
import ElementTable from "../../../components/element-table";
import ProductPagination from "../ProductPagination";
import ProductTree from "../ProductTree";
import ProductUpload from "../ProductUpload";
import ProductUeditor from "../ProductUeditor";

export default {
    name: "ProductList",
    data() {
        return {
            tableData: [],
            page: 1,
            dialogAddProductVisible: false,
            product: {},
            dialogProductCategoryVisible: false,
            categoryData: {},
            dialogUploadVisble: false,
            uploadData: {},
            ueditorData: "",
            dialogEditorProductVisible: false,
            updateId: ""
        };
    },
    components: {
        ElementTable,
        ProductPagination,
        ProductTree,
        ProductUpload,
        ProductUeditor
    },
    mounted() {
        this.http(1);
    },
    methods: {
        http(page) {
            api.getSelectTbItemAllByPage({
                page: page
            }).then(res => {
                if (res.data.status == 200) {
                    this.tableData = res.data.data.result;
                }
            });
        },
        /**
         * 分页器
         */
        getCurrentpageData(page) {
            this.page = page;
            this.http(page);
        },
        /**
         * 编辑
         */
        handleEdit(index, row) {
            this.updateId = row.id;
            api.getPreUpdateItem({
                id: row.id
            }).then(res => {
                if (res.data.status === 200) {
                    this.product = {
                        title: res.data.data.title,
                        sellPoint: res.data.data.sellPoint,
                        price: res.data.data.price,
                        num: res.data.data.num
                    };
                }
            });
            this.dialogEditorProductVisible = true;
        },
        /**
         * 删除
         */
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // 确定删除
                    api.getDeleteItemById({
                        id: row.id
                    }).then(res => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.http(this.page);
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
        },
        /**
         * 添加商品
         */
        addProduct() {
            this.dialogAddProductVisible = true;
        },
        /**
         * 提交添加商品
         */
        submitProductHandle() {
            // 添加产品数据
            api.getInsertTbItem({
                title: this.product.title,
                cid: this.categoryData.cid,
                sellPoint: this.product.sellPoint,
                price: this.product.price,
                num: this.product.num,
                desc: this.ueditorData,
                image: this.uploadData.url
            }).then(res => {
                if (res.data.status === 200) {
                    this.dialogAddProductVisible = false;
                    this.http(1);
                } else {
                    this.$notify({
                        title: "添加失败",
                        message: h("i", { style: "color: teal" }, "请重新添加")
                    });
                }
            });
        },
        /**
         * 更新数据
         */
        reSubmitProductHandle() {
            api.getUpdateTbItem({
                id: this.updateId,
                title: this.product.title,
                sellPoint: this.product.sellPoint,
                price: this.product.price,
                num: this.product.num
            }).then(res => {
                if (res.data.status === 200) {
                    this.dialogEditorProductVisible = false;
                    this.http(1);
                } else {
                    this.$notify({
                        title: "修改失败",
                        message: h("i", { style: "color: teal" }, "请重新修改")
                    });
                }
            });
        },
        /**
         * 获取类目数据
         */
        getTreeData(data) {
            this.categoryData = data;
        },
        /**
         * 获取图片
         */
        getUpload(data) {
            this.uploadData = data;
        },
        /**
         * 获取富文本编辑器数据
         */
        getUeditor(data) {
            this.ueditorData = data;
        }
    }
};
</script>