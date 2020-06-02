const apiCall = require('../functions/apiCalls');

// Testing accuracy of search api endpoint
describe('Testing artist search query', () => {

	test("Testing Artist: The Doors", () => {
		expect.assertions(1);
		return apiCall.searchArtist("The Doors").then(response => {
			expect(response.data.tracks.items[0].artists[0].name).toEqual("The Doors");
		})
	});

	test("Testing Artist: The Beatles", () => {
		expect.assertions(1);
		return apiCall.searchArtist("The Beatles").then(response => {
			expect(response.data.tracks.items[0].artists[0].name).toEqual("The Beatles");
		})
	});

	test("Testing Artist: The Rolling Stones", () => {
		expect.assertions(1);
		return apiCall.searchArtist("The Rolling Stones").then(response => {
			expect(response.data.tracks.items[0].artists[0].name).toEqual("The Rolling Stones");
		})
	});
});