<template>
    <div>
        <el-button @click="addDomain">添加分组</el-button>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
            <el-form-item
                v-for="(domain,index) in dynamicValidateForm.domains"
                :key="index"
                :label="'规格参数'+index"
                :prop="'规格参数'+index"
            >
                <el-input v-model="domain.value" style="width:80%"></el-input>
                <el-button @click="addParams(index)">添加参数</el-button>
                <el-button @click="removeDomain(domain)">删除分组</el-button>
                <div
                    v-for="(item,index1) in dynamicValidateForm.domains[index].children"
                    :key="index1"
                    :label="'参数'+index"
                    :prop="'参数'+index"
                >
                    <el-input v-model="item.childValue" style="width:60%;margin-left:80px"></el-input>
                    <el-button @click="removeChild(index,item)">删除参数</el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import api from "../../../api";

export default {
    name: "ParamsAdd",
    data() {
        return {
            dynamicValidateForm: {
                domains: [
                    {
                        value: "",
                        children: [
                            {
                                childValue: "",
                                value: ""
                            },
                            {
                                childValue: "",
                                value: ""
                            }
                        ]
                    }
                ]
            },
            treeData: {}
        };
    },
    props:{
        treeDataObj:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    methods: {
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                children: [
                    {
                        childValue: "",
                        value: ""
                    }
                ]
            });
        },
        addParams(index) {
            this.dynamicValidateForm.domains[index].children.push({
                childValue: "",
                value: ""
            });
        },
        removeDomain(domain) {
            // 查询删除结构是否存在
            var index = this.dynamicValidateForm.domains.indexOf(domain);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        removeChild(index, item) {
            var num = this.dynamicValidateForm.domains[index].children.indexOf(
                item
            );
            if (num !== -1) {
                this.dynamicValidateForm.domains[index].children.splice(num, 1);
            }
        },
        submitForm() {
            // 对象类型数据不可以直接传递，以前我们都是字符串
            api.getInsertItemParam({
                itemCatId: this.treeDataObj.cid,
                paramsData: JSON.stringify(this.dynamicValidateForm.domains)
            }).then(res => {
                if (res.data.status === 200) {
                    this.$emit("onSuccess");
                }
            });
        }
    }
};
</script>