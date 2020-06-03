const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const testEmailRegex = email => {

	return emailRegex.test(email);
}

module.exports = testEmailRegex;