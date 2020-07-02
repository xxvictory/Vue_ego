const express = require("express");
const router = express.Router();
const SQLConnect = require("./SQLConnect");
const jwt = require("jsonwebtoken");
const config = require("./config");
const url = require("url");
const multer = require("multer");
const fs = require("fs")

/**
 * 登陆接口
 */
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = "select * from user where username=? and password=?";
    var arr = [username, password];
    console.log(arr);
    SQLConnect(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                username: username,
                password: password
            }, config.jwtSecret)
            res.send({
                status: 200,
                data: result,
                token: token
            })
        } else {
            res.send({
                status: 500,
                msg: "用户名密码错误"
            })
        }
    })
})

/**
 * 注册接口
 */
router.post("/register",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const sql = "insert into user values (null,?,?,'iwen@sxt.cn')";
    const arr = [username,password];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows >0){
            res.send({
                status:200,
                msg:"注册成功"
            })
        }else{
            res.send({
                status:500,
                msg:"注册失败"
            })
        }
    })
})

/**
 * 查询商品接口
 * 请求方式:get
 * 参数:page
 */
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result
                }
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 数据总条数接口
 */
router.get("/total", (req, res) => {
    const sql = "select count(*) from project where id";
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查询失败"
            })
        }
    })
})

/**
 * 商品删除接口
 */
router.get("/backend/item/deleteItemById", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from project where id=?";
    console.log(id);
    const arr = [id];
    SQLConnect(sql, arr, result => {
        // 删除返回的是影响行数
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 类目选择接口
 *  /backend/itemCategory/selectItemCategoryByParentId
 *  我们和后台协商好，大部分的项目都是前后台同时开发，开发前台的时候
 *  是没有后台接口的，我们自己模拟数据，那么为了后期联调方便，前后台
 *  一般都先把地址规划好
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?";
    var arr = [id]
    SQLConnect(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 上传图片
 *  第三方依赖：multer,cors
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./mock/upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './mock/upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 添加商品接口
 */
router.get("/backend/item/insertTbItem",(req,res) =>{
    var title = url.parse(req.url,true).query.title || "";
    var cid = url.parse(req.url,true).query.cid || "";
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";
    var price = url.parse(req.url,true).query.price || "";
    var num = url.parse(req.url,true).query.num || "";
    var desc = url.parse(req.url,true).query.desc || "";
    var image = url.parse(req.url,true).query.image || "";

    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)"
    var arr = [title,image,sellPoint,price,cid,num,desc];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})

/**
 * 预更新接口
 */
router.get("/backend/item/preUpdateItem",(req,res) =>{
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from project where id=?"
    const arr = [id];
    SQLConnect(sql,arr,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result[0]
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

/**
 * 更新商品数据接口
 */
router.get("/backend/item/updateTbItem",(req,res) =>{
    var id = url.parse(req.url,true).query.id;
    var title = url.parse(req.url,true).query.title || "";
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";
    var price = url.parse(req.url,true).query.price || "";
    var num = url.parse(req.url,true).query.num || "";

    var sql = "update project set title=?,sellPoint=?,price=?,num=? where id=?";
    var arr = [title,sellPoint,price,num,id];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            })
        }
    })
})

/**
 * 规格参数查询接口
 */
router.get("/backend/itemParam/selectItemParamAll",(req,res) =>{
    const page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from params order by id desc limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql,null,result =>{
        if(result.length >0){
            res.send({
                status:200,
                data:{
                    result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })

})

/**
 * 规格参数删除接口
 */
router.get("/backend/itemParam/deleteItemParamById",(req,res) =>{
    const id = url.parse(req.url,true).query.id;
    const sql = "delete from params where id=?";
    const arr = [id]
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})

/**
 * 规格参数添加
 */

router.get("/backend/itemParam/insertItemParam",(req,res) =>{
    const itemCatId = url.parse(req.url,true).query.itemCatId;
    const paramsData = url.parse(req.url,true).query.paramsData;
    const sql = "insert into params values (null,?,?)";
    const arr = [itemCatId,paramsData];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})

/**
 * 内容分类管理 导航查询
 */
router.get("/content/selectContentCategoryByParentId",(req,res) =>{
    const id = url.parse(req.url,true).query.id || 1;
    const sql = "select * from content where id=?";
    const arr = [id];
    SQLConnect(sql,arr,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

/**
 * 内容分类管理 导航 增加
 */
router.get("/content/insertContentCategory",(req,res) =>{
    const pid = url.parse(req.url,true).query.pid;
    const name = url.parse(req.url,true).query.name;
    const currentId = Math.floor(Math.random() * 1000000);
    const sql = "insert into content values (?,?,?)";
    const arr = [pid,name,currentId];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})

/**
 * 内容分类管理 导航 删除
 */
router.get("/content/deleteContentCategoryById",(req,res) =>{
    const id = url.parse(req.url,true).query.id;
    const sql = "delete from content where pid=?";
    const arr = [id];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.send({
                status:500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 导航 修改
 */

router.get("/content/updateContentCategory", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var name = url.parse(req.url, true).query.name;
    const sql = "update content set name=? where pid=?"
    const arr = [name, id];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "修改失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容 查询
 */

router.get("/content/selectTbContentAllByCategoryId",(req,res) =>{
    const id = url.parse(req.url, true).query.id;
    const sql = "select * from contentinfo where pid=?"
    const arr = [id];
    SQLConnect(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 内容分类管理 内容 增加
 */
router.get("/content/insertTbContent", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const name = url.parse(req.url, true).query.name;
    const httpurl = url.parse(req.url, true).query.url;
    const image = url.parse(req.url, true).query.image;
    const sql = 'insert into contentinfo values (null,?,?,?,?)';
    const arr = [pid, name, httpurl, image];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容 删除 
 */
router.get("/content/deleteContentByIds", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from contentinfo where id=?"
    const arr = [id];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            })
        }
    })
})


module.exports = router;