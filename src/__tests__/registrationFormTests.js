const formValid = require('../functions/registrationFunctions');

// Testing form validator function
describe("Testing form validator", () => {


	it("Testing email error", () => {

		const formErrors = {
        		email: "invalid email address",
        		password: ""
      		};

      	expect(formValid(formErrors)).toBeFalsy();
	});

	it("Testing password error", () => {

		const formErrors = {
        		email: "",
        		password: "minimum 6 characters required"
      		};

      	expect(formValid(formErrors)).toBeFalsy();
	});


	it("Testing correct user input", () => {

		const formErrors = {
        		email: "",
        		password: ""
      		};

      	expect(formValid(formErrors)).toBeTruthy();
	});
});