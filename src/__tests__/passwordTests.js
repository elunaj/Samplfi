const validPassword = require('../functions/passwordFunctions');

// Testing password functions
describe('Test password validator function', () => {

	it("Test password length of 5", () => {
		expect(validPassword('12345')).toBeFalsy();
	});

	it("Test password length of 6", () => {
		expect(validPassword('123456')).toBeTruthy();
	});

	it("Test password length of 7", () => {
		expect(validPassword('1234567')).toBeTruthy();
	});

});