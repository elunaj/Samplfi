const apiCall = require('../functions/apiCalls');

// Testing track analysis query endpoint
describe('Testing track analysis query', () => {

	test("Testing track analysis for The Beatles", () => {
		expect.assertions(1);
		return apiCall.trackAnalysis("6dGnYIeXmHdcikdzNNDMm2").then(response => {
			expect(response.data.tempo).toBeCloseTo(129.171);
		})
	});

	test("Testing track analysis for The Doors", () => {
		expect.assertions(1);
		return apiCall.trackAnalysis("14XWXWv5FoCbFzLksawpEe").then(response => {
			expect(response.data.tempo).toBeCloseTo(103.885);
		})
	});

	test("Testing track analysis for The Rolling Stones", () => {
		expect.assertions(1);
		return apiCall.trackAnalysis("1GcVa4jFySlun4jLSuMhiq").then(response => {
			expect(response.data.tempo).toBeCloseTo(136.302);
		})
	});
});


