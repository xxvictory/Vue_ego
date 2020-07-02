const mysql = require("mysql");
const sqlObj = {
    host:"localhost",
    user:"root",
    password:"",
    database:"web1912"
}

const client = mysql.createConnection(sqlObj);

function SQLConnect(sql,arr,callback){
    client.query(sql,arr,(error,result) =>{
        if(error){
            console.log(error);
            return;
        }
        callback(result)
    })
}

module.exports = SQLConnect