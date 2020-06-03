const validPassword = password => {

	if (password.length < 6) {
		return false;
	} else {
		return true;
	}
}

module.exports = validPassword;