const multer = require('multer')
const fs = require('fs')

// 设置路径
var uploadFolder = './upload'

// 判断路径是否存在，没有就创建
var createFolder = folder => {
  try {
    fs.accessSync(folder)
  } catch(err){
    fs.mkdirSync(folder)
  }
}
createFolder(uploadFolder)

// 保存文件
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// 限制文件格式
var fileFilter = (req, file, cb) => {
  var MimeType = /^(image\/jpeg|image\/jpg)$/
  if(MimeType.test(file.mimetype)){
    // 接受上传
    cb(null, true)
  }else{
    // 提示并拒绝上传
    cb(new Error('upload failed'), false)
  }
}

/*
  .single(name)  -> 单文件上传
  .array(name,Number) -> 多文件上传
*/
module.exports = () => multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
}).single('imageFile')