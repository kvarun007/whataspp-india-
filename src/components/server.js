const express = require("express");
const mysql = require("mysql");

const app = express();

const dp = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "newuser",
    password: "1212",
    database: "whatsapp"
})

app.get("/", (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const sql = "select * from history";
    dp.query(sql,(err,data)=>{
        if(err){
            //console.log(err)  
            return res.json("error");
        }
        else{
            //console.log(res);
            return res.json(data)
        }
    })
})


app.get("/delete", (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "delect, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const sql = "DELETE FROM history";
    dp.query(sql,(err,data)=>{
        if(err){
            console.log(err)  
            return res.json("error");
        }
        else{
            return res.status(200).send({ message: 'History deleted' });
        }
    })
})

// app.options('/add',(req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     res.setHeader("Access-Control-Allow-Headers", "application/json");
//     res.setHeader("Access-Control-Max-Age","600");
//     res.status(200)
// })
app.get('/add', (req, res) => {
    console.log(req.query.number)
    console.log(req.query.firstName)
    console.log(req.query.lastName)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const sql = `INSERT INTO history (first_name,last_name,number) VALUES ("${req.query.firstName}","${req.query.lastName}",${req.query.number})`;
    //console.log(sql)
    dp.query(sql,(err, results) => {
      if (err) {
        //console.log("error1")
        return res.status(500).json({ error: err.message });
      }
      //console.log(results)
      //console.log("d")
      res.status(201).send({ message: 'Number added', id: results.insertId });
      //console.log(results)
    });
  });
app.listen(4100,()=>{console.log("server is running at 4100")})