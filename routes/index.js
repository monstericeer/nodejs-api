const userController = require('../controllers/users')
const checkToken = require('../middleware/checkToken')
const upload = require('../middleware/upload')

module.exports = app => {
  app.get('/',(req, res) => {
    res.send('ok!')
  }),
  app.post('/signin', userController.userSignin),
  app.post('/signup', userController.userSignup),
  app.post('/checkToken', checkToken, userController.checkTokenTest),
  app.post('/upload/single', checkToken, upload(), userController.uploadSingle)
  // app.post('/upload/Multiple', checkToken, upload(), userController.uploadMultiple)
}