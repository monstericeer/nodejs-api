const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  var isLogin = req.app.get('isLogin')
  var token = req.headers.authorization && req.headers.authorization.split(" ")[1]
  if(token && isLogin){
    // decoded -> 解码后的Token数据
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        console.log('1')
        return res.send({
          code: -1,
          message: 'Auth failed'
        })
      }else{
        req.decoded = decoded
        next()
      }
    })
  }else{
    return res.send({
      code: -1,
      message: 'Auth failed'
    })
  }
}