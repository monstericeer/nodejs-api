const bcrypt = require('bcryptjs')

module.exports = {
	// 密码生成哈希存入数据库
	generateHash: password => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	},
	// 验证密码
	signinPasswordValidator: (password, dpassword) => {
		return bcrypt.compareSync(password, dpassword)
	},

	//字母,数字,汉字,下划线
  signupUsernameValidator: (username) => {
		var usernameRegex = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/
		return usernameRegex.test(username)
	},
	// 6-16个字母、数字、特殊符号
	signupPasswordValidator: (password) => {
		var passwordReg = /^[\u4e00-\u9fa50-9a-zA-Z_?=.*#@!~%^&*]{6,16}$/
		return passwordReg.test(password)
	}
}