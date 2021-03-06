const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const global = require('./utils/global')

// .env config
require('dotenv').config();

var app = express()

app.set('isLogin', global.isLogin)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var indexRouters = require('./routes/index')

// CORS
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
})

// 链接数据库
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true }, (err) => {
  if(err){
    console.log('Connection error:' + err)
  }else{
    console.log('Connection success!')
  }
})

indexRouters(app)

app.listen(process.env.PORT,() => {
  console.log('Server start!')
})