const apiCall = require('../functions/apiCalls');

// Testing track analysis query endpoint
describe('Testing track analysis query', () => {

	test("Testing track analysis for The Beatles", () => {
		expect.assertions(1);
		return apiCall.trackAnalysis("6dGnYIeXmHdcikdzNNDMm2").then(response => {
			expect(response.data.tempo).toBeCloseTo(129.171);
		})
	});
});


