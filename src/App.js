import React from 'react';
import HomeView from './components/Spotify/HomeView/HomeView';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Demo from './components/Spotify/Demo/Demo';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer.js';
import './App.css';


const initialState = {
      userQuery: "",
      artistName: "",
      albumName: "",
      albumImage: [],
      trackId: "",
      trackName: "",
      releaseDate: "",
      trackAnalysisFound: false,
      trackAnalysis: {},
      route: 'demo',
      isSignedIn: false,
      user: {
          id: "",
          email: "",
          trackInfo: [{
            showArtistName: "",
            showTrackTitle: "",
            showAlbumName: "",
            showAlbumCover: ""    
          }],
          joined: ""
      },
      newTrackAdded: false,
      loading: false
    };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuery: "",
      artistName: "",
      albumName: "",
      albumImage: [],
      trackId: "",
      trackName: "",
      releaseDate: "",
      trackAnalysisFound: false,
      trackAnalysis: {},
      route: 'demo',
      isSignedIn: false,
      user: {
          id: "",
          email: "",
          trackInfo: [{
            showArtistName: "",
            showTrackTitle: "",
            showAlbumName: "",
            showAlbumCover: ""    
          }],
          joined: ""
      },
      newTrackAdded: false,
      loading: false
    };
  }

  // loads user when 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      trackInfo: data.trackInfo,
      joined: data.joined
    }})
  }

  // Handles user post button click in HomeView
  onButtonSubmit = () => {
    fetch('https://peaceful-sierra-85182.herokuapp.com/tracks', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
        artistName: this.state.artistName,
        trackName: this.state.trackName,
        albumName: this.state.albumName,
        albumImage: this.state.albumImage,
        releaseDate: this.state.releaseDate
      })
    })
    .then(response => response.json())
    .then(tr => {
      this.setState({
        newTrackAdded: true
        })
      })
    .catch(console.log)
  }

  // User input for track search submission
  handleSubmit = (event) => {
    event.preventDefault();
    this.findTrack();
  }

  // User input for track search
  handleChange = (event) => {
    this.setState({
      userQuery: event.target.value
    })
  }

  setNewTrackAddedToFalse = () => {
    this.setState({
      newTrackAdded: false
    })
  }

  setLoadingToFalse = () => {
    this.setState({
      loading: false
    })
  }

  // Finds track information when user submits UserInput form
  findTrack() {
    fetch('https://peaceful-sierra-85182.herokuapp.com/search/' + this.state.userQuery, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(trackInfo => {

        this.setState({
          artistName: trackInfo.tracks.items[0].artists[0].name,
          albumName: trackInfo.tracks.items[0].album.name,
          albumImage: trackInfo.tracks.items[0].album.images[1],
          trackId: trackInfo.tracks.items[0].id,
          trackName: trackInfo.tracks.items[0].name,
          releaseDate: trackInfo.tracks.items[0].album.release_date,
          trackAnalysisFound: false,
          loading: true

        })
      })
      .catch(err => console.log(err));
  }

  // Finds track analysis once findTrack() resolves
  findTrackAnalysis() {
    fetch('https://peaceful-sierra-85182.herokuapp.com/search/analysis/' + this.state.trackId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())  
    .then(trackAnalysis => {
      this.setState({
        trackAnalysis: trackAnalysis,
        trackAnalysisFound: true,
        loading: false
      })
    })
    .catch(err => console.log(err));
  }


  // Handles views/routes depending on user clicks
  onRouteChange = (route) => {
    if (route === 'signout' || route ==='signin' || route ==='register') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true,
        initialState: initialState
      })
    }  
    this.setState({
      route: route
    })
  }

  // Runs only when findTrack resolves
  componentDidUpdate() {
    if (this.state.trackId && !this.state.trackAnalysisFound) {
      this.findTrackAnalysis();
    }
  }

  render() {
    
    return (
      <div className="App">
          <Navigation 
            isSignedIn={this.state.isSignedIn} 
            onRouteChange={this.onRouteChange}
            email={this.state.user.email} 
            />

        { this.state.route === 'home' 
          ? (
              <div>
                <HomeView
                  trackAnalysis={this.state.trackAnalysis}
                  setLoadingToFalse={this.setLoadingToFalse}
                  loading={this.state.loading}
                  trackAnalysisFound={this.state.trackAnalysisFound}
                  setNewTrackAddedToFalse={this.setNewTrackAddedToFalse}
                  newTrackAdded={this.state.newTrackAdded}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  email={this.state.user.email}
                  onButtonSubmit={this.onButtonSubmit}
                  postAccess={this.state.trackAnalysisFound} 
                  artistName={this.state.artistName}
                  albumName={this.state.albumName}
                  albumImage={this.state.albumImage}
                  trackName={this.state.trackName}
                  releaseDate={this.state.releaseDate}
                  trackInfo={this.state.user.trackInfo}
                  userId={this.state.user.id}
                />
                <Footer/>
              </div>

        ) : this.state.route === 'signin' || this.state.route === 'signout'
           
            ? ( <div>
                  <Signin 
                    loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange} /> 
                  <Footer/>
                </div>

          ) : this.state.route ==='register' 
            ? ( <div>
                  <Register 
                    loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange} /> 
                  <Footer/>
                </div>
            ) : this.state.route === 'demo'

            ? ( 
                <div>
                  <Demo
                    setLoadingToFalse={this.setLoadingToFalse}
                    loading={this.state.loading}
                    trackAnalysisFound={this.state.trackAnalysisFound}
                    setNewTrackAddedToFalse={this.setNewTrackAddedToFalse}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    onButtonSubmit={this.onButtonSubmit}
                    artistName={this.state.artistName}
                    albumName={this.state.albumName}
                    albumImage={this.state.albumImage}
                    trackName={this.state.trackName}
                    releaseDate={this.state.releaseDate}
                    trackAnalysis={this.state.trackAnalysis}
                  />
                  <Footer/>
                </div>
              : null
            )
            : null
        } 


      </div>
    );
  }
}

export default App;
