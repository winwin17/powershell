const mysql=require('mysql2');
const conn=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Incognito@17"
});

conn.connect(function(err){
	if(err)
		throw err;
	console.log("connected")
});

conn.query("CREATE DATABASE IF NOT EXISTS mydb5",function(err,result){
	if(err)
		throw err;
	console.log("database created");
});
conn.query("USE mydb5",function(err,result){
	if(err)
		throw err;
	console.log("switched to mydb5");
	
});
var q=`CREATE TABLE IF NOT EXISTS students(name VARCHAR(10),room INT,address VARCHAR(10))`;
conn.query(q,function(err,results){
	if(err)
		throw err;
	console.log("table created");
});