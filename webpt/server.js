const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql2');
const cors=require('cors');
const path=require('path');
const app=express();
const port=4300;
const conn=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Incognito@17",
	database:"mydb5"
});
conn.connect(err => {
	if(err)
		throw err;
	console.log("connected");
});
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'public','myht.html'));
});
app.post('/submitform',(req,res)=>{
	const {Name,Room,Address}=req.body;
	const quer=`INSERT INTO students(name,room,address) VALUES (?,?,?)`;
	const val=[Name,Room,Address];
	conn.query(quer,val,(err,results)=>{
		if(err){
			console.error('Error inserting data:', err);
		res.status(500).send(err.message);
		return;
		}
		else{
			
			res.status(200).send("data inserted successfully");
		}
	});
});
app.listen(port,()=>{
	console.log(`server listening on http://localhost:${port}`);
});


