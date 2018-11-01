const userController = require('../controllers/users')

module.exports = app => {
  app.get('/',(req, res) => {
    res.send('ok!')
  }),
  app.post('/signin', userController.userSignin),
  app.post('/signup', userController.userSignup)
}