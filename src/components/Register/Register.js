import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, 
	FormLabel, Grid, Button, Card } from '@material-ui/core';


const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


const formValid = ({ formErrors }) => {
	let valid = true;

	Object.values(formErrors).forEach( val => {
		if (val.length > 0) {
			valid = false;
		}
	});

	return valid;
};


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			  formErrors: {
        		email: '',
        		password: ''
      		},
      		errorMessage: '',
		}
	}

	handleSubmit = e => {

		e.preventDefault();
		
		if (formValid(this.state)) {
			this.onSubmitRegister();
		} else {
			this.setState({
				errorMessage: 'registration error'
			})
		}
	}

	handleChange = e => {

		e.preventDefault();

		const { name, value } = e.target;
		let formErrors = this.state.formErrors;

		switch (name) {
			case "email":
				formErrors.email = 
				emailRegex.test(value) && value.length > 0
				? ""
				: "invalid email address"
			break;

			case "password":
				formErrors.password = 
				value.length < 6
				? "minimum 6 characters required"
				: ""
			break;
			default: 
			break;
		}	

		this.setState({ formErrors, [name]: value }, () => {
		})

	}

	onSubmitRegister = () => {

		fetch('https://peaceful-sierra-85182.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
				this.setState({
					errorMessage: ''
				})
			} else {
				this.setState({
				errorMessage: 'email already exists'
				})
			}

		})
	}

	render() {

		const { formErrors } = this.state;

		return (

			<div>
				<Card className="Card">
					<Grid container spacing={4}>

						<Grid item xs={12}>
							<FormLabel>Register</FormLabel>
						</Grid>

						<Grid item xs={12}>
							<FormControl>
							  <InputLabel htmlFor="email">Email address</InputLabel>
							  <Input 
							  	id="email" 
						      	type="email" 
						      	name="email"
							  	aria-describedby="my-helper-text"
							  	onChange={this.handleChange} 
							   />

							  {formErrors.email.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  	}}
							  		id="my-helper-text">
									{formErrors.email}
							  </FormHelperText>)}
							  
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl>
							  <InputLabel htmlFor="password">Password</InputLabel>
							  <Input 
							  	id="password" 
						      	type="password" 
						      	name="password"
						      	aria-describedby="my-helper-text"
						      	onChange={this.handleChange}
							  	/>

							  	{formErrors.password.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  		
							  	}}
							  		id="my-helper-text">
									{formErrors.password}
							  </FormHelperText>)}
					
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl>
								 <Button 
								 	variant="outlined" 
							    	onClick={this.handleSubmit}
							    	type="submit" 
							    	value="Sign Up"
							    	>SIGN UP
							    </Button>
							    {this.state.errorMessage.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '1rem'
							  		
							  	}}
							  		id="my-helper-text">
									{this.state.errorMessage}
							  </FormHelperText>)}

							</FormControl>
						</Grid>

					</Grid>
				</Card>
			  </div>
		);
	}

}

export default Register;