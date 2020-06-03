const testEmailRegex = require('../functions/emailFunctions');

// Testing email function
describe('Test if email meets regex reqs', () => {

	it("Test email without @ symbol", () => {
		expect(testEmailRegex('testemail.com')).toBeFalsy();
	});

	it("Test email without .", () => {
		expect(testEmailRegex('testemail@com')).toBeFalsy();
	});

	it("Test email without com", () => {
		expect(testEmailRegex('testemail@gmail.')).toBeFalsy();
	});

	it("Test invalid tld", () => {
		expect(testEmailRegex('testemail@gmail.d')).toBeFalsy();
	});

	it("Test email starting with .", () => {
		expect(testEmailRegex('.testemail@gmail.com')).toBeFalsy();
	});

	it("Test no character before @", () => {
		expect(testEmailRegex('@gmail.d')).toBeFalsy();
	});

});