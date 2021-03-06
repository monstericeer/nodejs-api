const jwt = require('jsonwebtoken')  //生成Token
const verification = require('../utils/verification')  //校验

/*
  code: 
    1: success,
   -1: error
 */

// models
const UserModel = require('../models/user')

module.exports = {
  // 登录
  userSignin: (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
      return res.send({
        code: -1,
        message: 'Required input cannot be blank'
      })
    }
    
    UserModel.find({
      username: username
    }).then(data => {
      if(data.length !== 1){
        return res.send({
          code: -1,
          message: 'Auth failed'
        })
      }
      // 匹配用户输入的密码与数据库拿到的密码
      if(!verification.signinPasswordValidator(password, data[0].password)){
        return res.send({
          code: -1,
          message: 'Auth failed'
        })
      }else{
        const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, {expiresIn : 60*60*1})  // 有效时间24小时
        req.app.set('isLogin', true)
        return res.send({
          code: 1,
          message: 'success',
          token: token
        })
      }
    }).catch(err => {
      return res.send({
        code: -1,
        message: 'Server Error'
      })
    })
  },
  // 注册
  userSignup: (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
      return res.send({
        code: -1,
        message: 'Bad input'
      })
    }
    if(!verification.signupUsernameValidator(username) || !verification.signupPasswordValidator(password)){
      return res.send({
        code: -1,
        message: 'Bad verification'
      })
    }

    // 判断数据库中是否重复
    UserModel.find({
      username: username
    }).then(data => {
      if(data.length > 0){
        return res.send({
          code: -1,
          message: 'Account already exist'
        })
      }
      // 保存到数据库
      UserModel.create({
        username: username,
        password: verification.generateHash(password)
      }).then(data => {
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: 60*60*1 })
        req.app.set('isLogin', true)
        return res.send({
          code: 1,
          message: 'Signed up',
          token: token
        }).catch(err => {
          return res.send({
            code: -1,
            message: 'Server Error'
          })
        })
      })
    }).catch(err => {
      return res.send({
        code: -1,
        message: 'Server Error'
      })
    })
  },
  // 上传文件(单)
  uploadSingle: (req, res, next) => {
    return res.send({
      code: 1,
      message: 'upload success!',
      data: {
        name: req.file.originalname,
        path: req.file.path
      }
    })
  },
  // 上传文件(多)
  uploadMultiple: (req, res, next) => {
    var files = req.files
    var filesArr = []
    for(var arr of files){
      filesArr.push({name: arr.originalname, path: arr.path})
    }
    return res.send({
      code: 1,
      message: 'upload success!',
      data: filesArr
    })
  },
  // 获取所有用户
  userList: (req, res, next) => {
    var data = {}
    if(req.body.keyword){
      data = { username: req.body.keyword}
    }
    UserModel.find(data).then(data => {
      var usersData = []
      for(var arr of data){
        usersData.push({id: arr._id, username: arr.username})
      }
      return res.send({
        code: 1,
        message: 'get success!',
        data:  usersData
      })
    }).catch(err => {
      return res.send({
        code: -1,
        message: 'server error'
      })
    })
  }
}