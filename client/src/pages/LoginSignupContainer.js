
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Signup from "../components/Signup"
import Login from "../components/Login"

import performLogin from "../actions/performLogin";
import performSignup from "../actions/performSignup";


class LoginSignupContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            displayTable: "SignUp",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            error_type: undefined,
            error_msg: "",
        };
        this.switch = this.switch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    validateEmail(email) {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleLogin(e){
        if (e)
            e.preventDefault();

        const user = {
            Name: this.state.username,
            Password: this.state.password
        };

        if (!user.Name.replace(/\s/g, "").length) {
            this.setState({
                error_type: "username",
                error_msg: "Empty Username!"
            });
        } else {
            this.props.performLogin(user)
                .then(_ => {
                    if(this.props.login_response.error){
                        this.setState({
                            error_type: this.props.login_response.error_type,
                            error_msg: this.props.login_response.error_msg
                        });
                    } else {
                        localStorage.setItem("token", this.props.login_response.token);
                        console.log("Login Success!")
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    handleSubmit(e) {
        if (e)
            e.preventDefault();

        const user = {
            Email: this.state.email,
            Name: this.state.username,
            Password: this.state.password
        };

        if (!this.validateEmail(user.Email)) {
            this.setState({
                error_type: "email",
                error_msg: "Please enter valid email address!"
            });
        }
        else if(!user.Name.replace(/\s/g, "").length) {
            this.setState({
                error_type: "username",
                error_msg: "Username empty!"
            })
        }
        else if (user.Password.replace(/\s/g, "").length < 6) {
            this.setState({
                error_type: "password",
                error_msg: "Password is too short; minimum length is 6."
            });
        }
        else if(user.Password !== this.state.confirmPassword){
            this.setState({
                error_type: "password",
                error_msg: "Password confirmation does not match password!"
            });
        }
        else {
            this.props.performSignup(user)
                .then(_ => {
                    if(this.props.signup_response.error){
                        this.setState({
                            error_type: this.props.signup_response.error_type,
                            error_msg: this.props.signup_response.error_msg
                        });
                    }
                    else {
                        this.setState({
                            displayTable: "Login"
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    handleInputChange(e){
        const   name    = e.target.name,
            value   = e.target.value;

        this.setState({
            [name]: value,
            error_type: undefined,
            error_msg: ""
        });
    }

    switch(componentName) {
        this.setState({
            displayTable: componentName
        });
    }

    render(){
        const components = {
            "SignUp": <Signup switchComponent = {this.switch} handleInputChange = {this.handleInputChange} handleSubmit = {this.handleSubmit} validateEmail = {this.validateEmail} errorType = {this.state.error_type} errorMessage = {this.state.error_msg}/>,
            "Login": <Login switchComponent = {this.switch} handleInputChange = {this.handleInputChange} handleLogin = {this.handleLogin} validateEmail = {this.validateEmail} errorType = {this.state.error_type} errorMessage = {this.state.error_msg}/>
        };
        return (
            <div>
            {components[this.state.displayTable]}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signup_response: state.AccountReducer.signup_response,
        login_response: state.AccountReducer.login_response,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        performSignup: (payload) => dispatch(performSignup(payload)),
        performLogin: (payload) => dispatch(performLogin(payload)),
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(LoginSignupContainer));