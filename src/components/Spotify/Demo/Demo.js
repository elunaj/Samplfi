import React from 'react';
import UserInput from '../UserInput/UserInput';
import TrackDisplay from '../TrackDisplay/TrackDisplay';
import TrackAnalysis from '../TrackAnalysis/TrackAnalysis';
import Spinner from '../../Spinner/Spinner';
import { Typography } from '@material-ui/core';
import '../HomeView/HomeView.css';


export default class HomeView extends React.Component {


	render() {
		return (
			<div className="main">

			 <Typography 
			 	style={{
			 		'marginTop': '2.5rem',
			 		'display': 'block'
			 	}}
			 	variant="h3">Get Audio Analysis for your Music Sample
			 	</Typography>

			 <Typography 
			 	style={{
			 		'margin': '0 3rem'
			 	}}
			 	variant="subtitle1">
			 	The search feature conducts a low-level 
			 	analysis of tracks in the Spotify catalog. 
			 	The Audio Analysis describes the track’s structure and musical content, 
			 	including rhythm, pitch, and timbre. All information is precise to the 
			 	audio sample.
			 	</Typography>

				<UserInput
	                handleSubmit={this.props.handleSubmit}
	                handleChange={this.props.handleChange}
              	/>

              	 <Typography 
			 	style={{
			 		'margin': '-2rem 1rem',
			 		'marginBottom': '.5rem',
			 		'textDecoration': 'underline'

			 	}}
			 	variant="subtitle2">
			 	Register to save your tracks
			 	</Typography>

              	{this.props.loading 
              		? 
              			<Spinner/>
              		: null }

              	{this.props.trackAnalysisFound

				?	<div>
						<TrackDisplay
							trackAnalysisFound={this.props.trackAnalysisFound}
							artistName={this.props.artistName}
							albumName={this.props.albumName}
							albumUrl={this.props.albumImage.url}
							trackName={this.props.trackName}
							releaseDate={this.props.releaseDate}
							onButtonSubmit={this.props.onButtonSubmit}
							postAccess={this.props.postAccess}
						/>

						<TrackAnalysis
							trackAnalysis={this.props.trackAnalysis}
							trackAnalysisFound={this.props.trackAnalysisFound}
						/>
					</div>

					
				 : null }

					 
			</div>
		);
	}
}


/*



*/

