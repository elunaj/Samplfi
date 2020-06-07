const axios = require('axios');

const apiCalls = {
	
	searchArtist: (artistName) =>
	axios.get('https://peaceful-sierra-85182.herokuapp.com/search/' + artistName)
		.then(response => response)
		.catch(err => 'error'),

	trackAnalysis: (trackId) =>
	axios.get('https://peaceful-sierra-85182.herokuapp.com/search/analysis/' + trackId)
		.then(response => response)
		.catch(err => 'error')
}

module.exports = apiCalls;