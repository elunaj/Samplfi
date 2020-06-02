const axios = require('axios');

const apiCalls = {
	
	searchArtist: (artistName) =>
	axios.get('http://localhost:5000/search/' + artistName)
		.then(response => response)
		.catch(err => 'error'),

	trackAnalysis: (trackId) =>
	axios.get('http://localhost:5000/search/analysis/' + trackId)
		.then(response => response)
		.catch(err => 'error'),
}

module.exports = apiCalls;