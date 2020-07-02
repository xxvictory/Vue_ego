const base = {
    baseUrl:"/api", // http://localhsot:3003
    login:"/api/login",  // 登陆地址
    register:"/api/register", // 注册接口
    selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage", // 商品查询地址
    total:"/api/total", // 商品总条数地址
    deleteItemById:"/api/backend/item/deleteItemById", // 商品删除地址
    selectItemCategoryByParentId:"/api/backend/itemCategory/selectItemCategoryByParentId", // 类目选择地址
    insertTbItem:"/api/backend/item/insertTbItem", // 商品添加地址
    preUpdateItem:"/api/backend/item/preUpdateItem", // 预更新地址
    updateTbItem:"/api/backend/item/updateTbItem", // 商品更新地址
    selectItemParamAll:"/api/backend/itemParam/selectItemParamAll", // 规格参数查询地址
    deleteItemParamById:"/api/backend/itemParam/deleteItemParamById", // 规格参数删除地址
    insertItemParam:"/api/backend/itemParam/insertItemParam", // 规格参数添加地址
    selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId", // 内容分类管理 导航  查询地址
    insertContentCategory:"/api/content/insertContentCategory", // 内容分类管理 增加地址
    deleteContentCategoryById:"/api/content/deleteContentCategoryById", // 内容分类管理 删除地址
    updateContentCategory:"/api/content/updateContentCategory", // 内容分类管理 修改地址
    insertTbContent:"/api/content/insertTbContent", // 内容分类管理 内容增加地址
    deleteContentByIds:"/api/content/deleteContentByIds", // 内容分类管理 内容增加地址
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId", // 内容分类管理 内容增加地址
}

export default base;