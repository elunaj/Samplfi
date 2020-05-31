import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './TrackCollection.css';

export default class TrackCollection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchStatus: this.props.fetchStatus

		}
	}

	render() {

		return (
			<div>
				{this.state.fetchStatus 

					?	(this.props.userTracksCollection.map( (track, i) => {
					 			return (
					 				<Card className="track-collection" key={i}>
						 				<CardActions>
						 					<Grid 
						 						container
						 						direction="row"
						 						alignItems = 'center'
						 						justify="center"
						 						>
										        <Button 
										        	size="small" 
										        	color="primary"
													onClick={() => this.props.deleteTrack(track.track_id, i)}
										        	>Remove
										        </Button>
										    </Grid>
										      </CardActions>
									      <CardActionArea>
								        <CardMedia
								          component="img"
								          alt="Album cover image"
								          height="100%"
								          width="100%"
								          image={track.album_cover_url}
								          title="Track"
								        />
								        <CardContent>
								          <Typography gutterBottom variant="h4" component="h2">
								            Artist:{' '}{track.artist_name}
								          </Typography>
								           <Typography gutterBottom variant="h5" component="h2">
								            Track title:{' '}{track.track_title}
								          </Typography>
								           <Typography gutterBottom variant="h6" component="h6">
								            Album:{' '}{track.album_name}
								          </Typography>
								          <Typography variant="body2" color="textSecondary" component="p">
								            Release date:{' '}{track.release_date}
								          </Typography>
								        </CardContent>
								      </CardActionArea>
								    </Card>
					 			)
					 		})
					 	)

				 	: null }
			 	
			</div>
		);
	}
}


