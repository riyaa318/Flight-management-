var mysql=require("mysql2")
var pool=mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'192604',
        database:'flightpr',
        multipleStatements:'true',
        connectionLimit:100
    })
    module.exports=pool