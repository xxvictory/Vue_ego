import axios from "../utils/request"
import base from "./base"

const api = {
    /**
     * 登陆接口
     */
    getLogin(params){
        return axios.post(base.baseUrl + base.login,params);
    },
    /**
     * 注册接口
     */
    getRegister(params){
        return axios.post(base.baseUrl + base.register,params);
    },
    /**
     * 商品查询接口
     */
    getSelectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage,{
            params:params
        })
    },
    /**
     * 商品总条数 
     */
    getTotal(){
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 商品删除接口
     */
    getDeleteItemById(params){
        return axios.get(base.baseUrl + base.deleteItemById,{
            params:params
        })
    },
    /**
     * 类目选择接口
     */
    getSelectItemCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{
            params
        })
    },
    /**
     * 商品添加接口
     */
    getInsertTbItem(params){
        return axios.get(base.baseUrl + base.insertTbItem,{
            params
        })
    },
    /**
     * 预更新接口
     */
    getPreUpdateItem(params){
        return axios.get(base.baseUrl + base.preUpdateItem,{
            params
        })
    },
    /**
     * 商品更新接口
     */
    getUpdateTbItem(params){
        return axios.get(base.baseUrl + base.updateTbItem,{
            params
        })
    },
    /**
     * 规格参数查询接口
     */
    getSelectItemParamAll(params){
        return axios.get(base.baseUrl + base.selectItemParamAll,{
            params
        })
    },
    /**
     * 规格参数删除接口
     */
    getDeleteItemParamById(params){
        return axios.get(base.baseUrl + base.deleteItemParamById,{
            params
        })
    },
    /**
     * 规格参数添加接口
     */
    getInsertItemParam(params){
        return axios.get(base.baseUrl + base.insertItemParam,{
            params
        })
    },
    /**
     * 内容分类管理导航查询接口
     */
    getSelectContentCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId,{
            params
        })
    },
   /**
     * 内容分类管理导航添加接口
     */
    getInsertContentCategory(params){
        return axios.get(base.baseUrl + base.insertContentCategory,{
            params
        })
    },
    /**
     * 内容分类管理导航删除接口
     */
    getDeleteContentCategoryById(params){
        return axios.get(base.baseUrl + base.deleteContentCategoryById,{
            params
        })
    },
    /**
     * 内容分类管理导航修改接口
     */
    getUpdateContentCategory(params){
        return axios.get(base.baseUrl + base.updateContentCategory,{
            params
        })
    },
    /**
     * 内容分类管理 内容 查询接口
     */
    getSelectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId,{
            params
        })
    },
    /**
     * 内容分类管理 内容 删除接口
     */
    getDeleteContentByIds(params){
        return axios.get(base.baseUrl + base.deleteContentByIds,{
            params
        })
    },
    /**
     * 内容分类管理 内容 添加接口
     */
    getInsertTbContent(params){
        return axios.get(base.baseUrl + base.insertTbContent,{
            params
        })
    }
}

export default api;