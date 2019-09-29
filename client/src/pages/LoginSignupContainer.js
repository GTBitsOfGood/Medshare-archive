
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Signup from "../components/Signup"
import Login from "../components/Login"

//actions here
//import

const mapDispatchAsProps = dispatch => {
    return {

    }
}

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
            error_msg: ""
        }
        this.switch = this.switch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit(this);
        this.handleLogin = this.handleLogin(this);
        this.validateEmail = this.validateEmail(this);
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleLogin(e){

        const user = {
            Name: this.state.username,
            Password: this.state.password
        }

        if (!user.Name.replace(/\s/g, "").length) {
            this.setState({
                error_type: "username",
                error_msg: "Empty Username!"
            });
        } else {
            axios.post("/login", user)
                .then(res => {
                    if(res.data.error){
                        this.setState({
                            error_type: res.data.error_type,
                            error_msg: res.data.error_msg
                        });
                    } else {
                        localStorage.setItem("token", res.data.token);
                        console.log("Login Success!")
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    handleSubmit(e) {

        const user = {
            Email: this.state.email,
            Name: this.state.userName,
            Password: this.state.password
        }

        if (!this.validateEmail(user.Email)) {
            this.setState({
                error_type: "email",
                error_msg: "Please enter valid email address!"
            });
        }
        else if(!user.Name.replace(/\s/g, "").length) {
            this.setState({
                error_type: "username",
                error_msg: "Username Empty!"
            })
        }
        else if (user.Password.replace(/\s/g, "").length < 6) {
            this.setState({
                error_type: "password",
                error_msg: "Password is too short; minimum length is 6"
            });
        }
        else if(user.Password !== this.state.confirmPassword){
            this.setState({
                error_type: "password",
                error_msg: "Password confirmation does not match password!"
            });
        }
        else {
            axios.post("/register", user)
                .then(res => {
                    if(res.data.error){
                        this.setState({
                            error_type: res.data.error_type,
                            error_msg: res.data.error_msg
                        });
                    }
                    else {
                        this.props.switchComponent("Login");
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
            "SignUp": <Signup switchComponent = {this.switch} handleInputChange = {this.handleInputChange} handleSubmit = {this.handleSubmit} validateEmail = {this.validateEmail}/>,
            "Login": <Login switchComponent = {this.switch} handleInputChange = {this.handleInputChange} handleSubmit = {this.handleSubmit} validateEmail = {this.validateEmail}/>
        }
        return (
            <div>
            {components[this.state.displayTable]}
            </div>
        )
    }
}

export default withRouter(connect(null, mapDispatchAsProps)(LoginSignupContainer));