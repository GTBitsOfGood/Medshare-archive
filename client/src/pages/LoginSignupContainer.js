
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
        }

    }


    render(){
        return (
            <Signup />
        )
    }
}

export default withRouter(connect(null, mapDispatchAsProps)(LoginSignupContainer));